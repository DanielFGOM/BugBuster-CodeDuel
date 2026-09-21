package com.bugbuster.service;

import org.springframework.stereotype.Service;
import javax.tools.*;
import java.io.*;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CompilerService {

    public CompilationResult compileAndRun(String userCode, String expectedOutput) {
        File tempDir = null;
        try {
            tempDir = new File(System.getProperty("java.io.tmpdir"), "bugbuster_" + UUID.randomUUID());
            tempDir.mkdirs();

            // 1. DETECTAR NOMBRE DE LA CLASE PÚBLICA (para evitar el error de archivo vs clase)
            String className = "Main"; 
            Pattern pattern = Pattern.compile("public\\s+class\\s+([a-zA-Z0-9_]+)");
            Matcher matcher = pattern.matcher(userCode);
            if (matcher.find()) {
                className = matcher.group(1);
            }

            // 2. GUARDAR EL ARCHIVO CON EL NOMBRE EXACTO DE LA CLASE
            File sourceFile = new File(tempDir, className + ".java");
            try (FileWriter fw = new FileWriter(sourceFile)) {
                fw.write(userCode);
            }

            // 3. COMPILACIÓN SIN TEMPLATES (Código puro del usuario)
            JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
            if (compiler == null) {
                return new CompilationResult(false, "Error interno: JDK no configurado en el servidor.", null);
            }

            DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();
            StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);
            Iterable<? extends JavaFileObject> fileObjects = fileManager.getJavaFileObjects(sourceFile);

            StringWriter compileOut = new StringWriter();
            boolean success = compiler.getTask(new PrintWriter(compileOut), fileManager, diagnostics, null, null, fileObjects).call();

            if (!success) {
                StringBuilder errorMsg = new StringBuilder("Error de compilación:\n");
                for (Diagnostic<? extends JavaFileObject> diagnostic : diagnostics.getDiagnostics()) {
                    errorMsg.append("Línea ").append(diagnostic.getLineNumber())
                            .append(": ").append(diagnostic.getMessage(null))
                            .append("\n");
                }
                return new CompilationResult(false, errorMsg.toString(), null);
            }

            // 4. EJECUCIÓN DE LA CLASE DETECTADA
            ProcessBuilder pb = new ProcessBuilder("java", "-cp", tempDir.getAbsolutePath(), className);
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
                return new CompilationResult(false, "Error: Tiempo de ejecución excedido (Timeout).", null);
            }

            String actualOutput = output.toString().trim();
            boolean passed = expectedOutput != null && actualOutput.equals(expectedOutput.trim());

            return new CompilationResult(true, passed ? "¡Correcto!" : "La salida no coincide", actualOutput);

        } catch (Exception e) {
            return new CompilationResult(false, "Error del sistema: " + e.getMessage(), null);
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
            this.success = success;
            this.message = message;
            this.output = output;
        }

        public boolean isSuccess() { return success; }
        public String getMessage() { return message; }
        public String getOutput() { return output; }
    }
}
