package com.bugbuster.service;

import org.springframework.stereotype.Service;
import javax.tools.*;
import java.io.*;
import java.util.*;

@Service
public class CompilerService {

    public CompilationResult compileAndRun(String userCode, String expectedOutput) {
        try {
            File tempDir = new File(System.getProperty("java.io.tmpdir"), "bugbuster");
            tempDir.mkdirs();
            File sourceFile = new File(tempDir, "Main.java");
            try (FileWriter fw = new FileWriter(sourceFile)) {
                fw.write(userCode);
            }

            JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
            DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();
            StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);
            Iterable<? extends JavaFileObject> fileObjects = fileManager.getJavaFileObjects(sourceFile);

            ByteArrayOutputStream compileOut = new ByteArrayOutputStream();
            PrintWriter compileWriter = new PrintWriter(compileOut);
            boolean success = compiler.getTask(compileWriter, fileManager, diagnostics, null, null, fileObjects).call();
            compileWriter.flush();
            
            if (!success) {
                return new CompilationResult(false, "Error de compilación:\n" + compileOut.toString(), null);
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
            process.waitFor();

            String actualOutput = output.toString().trim();
            boolean passed = expectedOutput != null && actualOutput.equals(expectedOutput.trim());

            return new CompilationResult(true, passed ? "¡Correcto!" : "Salida incorrecta", actualOutput);

        } catch (Exception e) {
            return new CompilationResult(false, "Error del sistema: " + e.getMessage(), null);
        }
    }

    public static class CompilationResult {
        private boolean success;
        private String message;
        private String output;

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
