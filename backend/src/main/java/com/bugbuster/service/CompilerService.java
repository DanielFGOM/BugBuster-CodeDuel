package com.bugbuster.service;

import org.springframework.stereotype.Service;
import javax.tools.*;
import java.io.*;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

@Service
public class CompilerService {

    public CompilationResult compileAndRun(String fullCode, String expectedOutput) {
        // Creamos un archivo temporal con el código
        try {
            // Guardar el código en un archivo temporal
            File tempDir = new File(System.getProperty("java.io.tmpdir"), "bugbuster");
            tempDir.mkdirs();
            File sourceFile = new File(tempDir, "DynamicSolution.java");
            try (FileWriter fw = new FileWriter(sourceFile)) {
                fw.write(fullCode);
            }

            // Compilar
            JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
            DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();
            StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);
            Iterable<? extends JavaFileObject> fileObjects = fileManager.getJavaFileObjects(sourceFile);

            ByteArrayOutputStream compileOut = new ByteArrayOutputStream();
            PrintWriter compileWriter = new PrintWriter(compileOut);
            boolean success = compiler.getTask(compileWriter, fileManager, diagnostics, null, null, fileObjects).call();
            compileWriter.flush();
            if (!success) {
                return new CompilationResult(false, "Error de compilación: " + compileOut.toString(), null);
            }

            // Ejecutar la clase (asumimos método main o un método estático que devuelva String)
            // Simulación: ejecutamos con ProcessBuilder
            ProcessBuilder pb = new ProcessBuilder("java", "-cp", tempDir.getAbsolutePath(), "DynamicSolution");
            pb.redirectErrorStream(true);
            Process process = pb.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            int exitCode = process.waitFor();

            String actualOutput = output.toString().trim();
            boolean passed = expectedOutput != null && actualOutput.equals(expectedOutput.trim());

            return new CompilationResult(true, passed ? "Correcto" : "Salida incorrecta", actualOutput);

        } catch (Exception e) {
            return new CompilationResult(false, "Error: " + e.getMessage(), null);
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