package com.bugbuster.service;

import org.springframework.stereotype.Service;
import javax.tools.*;
import java.io.*;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class CompilerService {
    public CompilationResult compileAndRun(String userCode, String expectedOutput) {
        File tempDir = null;
        try {
            tempDir = new File(System.getProperty("java.io.tmpdir"), "bugbuster_" + UUID.randomUUID());
            tempDir.mkdirs();
            
            File sourceFile = new File(tempDir, "Main.java");
            try (FileWriter fw = new FileWriter(sourceFile)) {
                fw.write(userCode);
            }

            JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
            if (compiler == null) {
                return new CompilationResult(false, "❌ Error: JDK no encontrado en el servidor.", null);
            }

            DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();
            StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);
            Iterable<? extends JavaFileObject> fileObjects = fileManager.getJavaFileObjects(sourceFile);

            StringWriter compileOut = new StringWriter();
            boolean success = compiler.getTask(new PrintWriter(compileOut), fileManager, diagnostics, null, null, fileObjects).call();
            
            if (!success) {
                StringBuilder sb = new StringBuilder("❌ Error de compilación:\n");
                for (Diagnostic<? extends JavaFileObject> diagnostic : diagnostics.getDiagnostics()) {
                    sb.append(String.format("Línea %d: %s\n", diagnostic.getLineNumber(), diagnostic.getMessage(null)));
                }
                return new CompilationResult(false, sb.toString(), null);
            }

            ProcessBuilder pb = new ProcessBuilder("java", "-cp", tempDir.getAbsolutePath(), "Main");
            pb.redirectErrorStream(true); 
            Process process = pb.start();
            
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            
            if (!process.waitFor(5, TimeUnit.SECONDS)) {
                process.destroyForcibly();
                return new CompilationResult(false, "❌ Error: Tiempo de ejecución excedido (Timeout)", null);
            }

            String actualOutput = output.toString().trim();
            boolean passed = expectedOutput != null && actualOutput.equals(expectedOutput.trim());

            return new CompilationResult(true, passed ? "¡Correcto!" : "La salida no coincide", actualOutput);
        } catch (Exception e) {
            return new CompilationResult(false, "❌ Error del sistema: " + e.getMessage(), null);
        } finally {
            if (tempDir != null) deleteDirectory(tempDir);
        }
    }

    private void deleteDirectory(File directory) {
        File[] allContents = directory.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                if (file.isDirectory()) deleteDirectory(file);
                else file.delete();
            }
        }
        directory.delete();
    }

    public static class CompilationResult {
        private final boolean success;
        private final String message;
        private final String output;
        public CompilationResult(boolean success, String message, String output) {
            this.success = success; this.message = message; this.output = output;
        }
        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public String getOutput() { return output; }
    }
}
