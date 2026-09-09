package com.bugbuster;

import com.bugbuster.model.Level;
import com.bugbuster.repository.LevelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LearnJavaApplication {

    public static void main(String[] args) {
        SpringApplication.run(LearnJavaApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(LevelRepository levelRepository) {
        return args -> {
            // Solo inserta si la tabla de niveles en PostgreSQL está vacía
            if (levelRepository.count() == 0) {
                save(levelRepository, 1, "Hola Mundo", "Usa System.out.println() para imprimir: Hola Mundo", 
                    "public class DynamicSolution {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Hola Mundo", "System.out.println(\"Hola Mundo\");");
                
                save(levelRepository, 2, "Variables", "Crea un String 'mensaje' con 'Java es genial' e imprímelo.", 
                    "public class DynamicSolution {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Java es genial", "String mensaje = \"Java es genial\"; System.out.println(mensaje);");
                
                save(levelRepository, 3, "Suma Básica", "Suma a=15 y b=7 e imprime el resultado.", 
                    "public class DynamicSolution {\n    public static void main(String[] args) {\n        int a = 15;\n        int b = 7;\n        //USER_CODE\n    }\n}", "22", "int suma = a + b; System.out.println(suma);");
                
                save(levelRepository, 4, "If/Else", "Si numero=10 es > 5 imprime 'Mayor', sino 'Menor'.", 
                    "public class DynamicSolution {\n    public static void main(String[] args) {\n        int numero = 10;\n        //USER_CODE\n    }\n}", "Mayor", "if (numero > 5) { System.out.println(\"Mayor\"); } else { System.out.println(\"Menor\"); }");
                
                save(levelRepository, 5, "Operador Modulo", "numero=8. Imprime 'Par' si el resto de 2 es 0.", 
                    "public class DynamicSolution {\n    public static void main(String[] args) {\n        int numero = 8;\n        //USER_CODE\n    }\n}", "Par", "if (numero % 2 == 0) { System.out.println(\"Par\"); } else { System.out.println(\"Impar\"); }");
                
                save(levelRepository, 6, "Bucle For", "Imprime números del 1 al 5.", 
                    "public class DynamicSolution {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "1\n2\n3\n4\n5", "for (int i = 1; i <= 5; i++) { System.out.println(i); }");
                
                save(levelRepository, 7, "Bucle While", "Usa while para imprimir hasta 3.", 
                    "public class DynamicSolution {\n    public static void main(String[] args) {\n        int contador = 1;\n        //USER_CODE\n    }\n}", "1\n2\n3", "while (contador <= 3) { System.out.println(contador); contador++; }");
                
                save(levelRepository, 8, "Llamada a Método", "Llama al método saludar() desde main.", 
                    "public class DynamicSolution {\n    static void saludar() { System.out.println(\"Hola desde un metodo\"); }\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Hola desde un metodo", "saludar();");
                
                save(levelRepository, 9, "Arrays", "Imprime el primer elemento de {3, 1, 4}.", 
                    "public class DynamicSolution {\n    public static void main(String[] args) {\n        int[] numeros = {3, 1, 4};\n        //USER_CODE\n    }\n}", "3", "System.out.println(numeros[0]);");
                
                save(levelRepository, 10, "Strings UpperCase", "Convierte \"java\" a mayúsculas.", 
                    "public class DynamicSolution {\n    public static void main(String[] args) {\n        String texto = \"java\";\n        //USER_CODE\n    }\n}", "JAVA", "System.out.println(texto.toUpperCase());");

                System.out.println("🚀 PostgreSQL: 10 niveles cargados permanentemente");
            }
        };
    }

    private void save(LevelRepository repo, int order, String title, String desc, String template, String expected, String hint) {
        Level l = new Level();
        l.setOrderNumber(order);
        l.setTitle(title);
        l.setDescription(desc);
        l.setTemplate(template);
        l.setExpectedOutput(expected);
        l.setHint(hint);
        repo.save(l);
    }
}
