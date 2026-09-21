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
            if (levelRepository.count() == 0) {
                // MÓDULO 1: FUNDAMENTOS
                save(levelRepository, 1, "Hola Mundo", "Usa System.out.println() para imprimir exactamente: Hola Mundo", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Hola Mundo", "System.out.println() es la instrucción básica para enviar texto a la consola.");
                
                save(levelRepository, 2, "Variables Enteras", "Crea un int llamado 'edad' con valor 25 e imprímelo.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "25", "El tipo 'int' se usa para números enteros sin decimales.");
                
                save(levelRepository, 3, "Cadenas de Texto", "Crea un String 'nombre' con el valor 'Juan' e imprímelo.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Juan", "Los Strings almacenan texto y siempre van entre comillas dobles.");
                
                save(levelRepository, 4, "Números Decimales", "Declara un double 'precio' con valor 19.99 e imprímelo.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "19.99", "El tipo 'double' permite guardar números con decimales.");
                
                save(levelRepository, 5, "Operaciones Básicas", "Suma 10 + 5 e imprime el resultado.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "15", "Java usa los operadores +, -, *, / y % para cálculos matemáticos.");
                
                save(levelRepository, 6, "Concatenación", "Une el String 'Hola ' con la variable 'nombre' (Juan).", 
                    "public class Main {\n    public static void main(String[] args) {\n        String nombre = \"Juan\";\n        //USER_CODE\n    }\n}", "Hola Juan", "El operador + sirve para unir cadenas de texto.");
                
                save(levelRepository, 7, "Booleanos", "Crea un boolean 'esJavaGenial' en true e imprímelo.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "true", "El tipo boolean solo acepta dos valores: true o false.");
                
                save(levelRepository, 8, "Constantes", "Crea una constante final int PI = 3 e imprímela.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "3", "La palabra 'final' impide que el valor de una variable sea modificado.");
                
                save(levelRepository, 9, "Casting", "Convierte el double 9.99 a un entero (int) e imprímelo.", 
                    "public class Main {\n    public static void main(String[] args) {\n        double d = 9.99;\n        //USER_CODE\n    }\n}", "9", "El casting permite forzar un tipo de dato a convertirse en otro.");
                
                save(levelRepository, 10, "Operador Módulo", "Imprime el resto de dividir 10 entre 3.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "1", "El operador % devuelve el residuo de una división.");
                
                save(levelRepository, 11, "Suma de Strings", "Une 'Bug' y 'Buster' para formar 'BugBuster'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "BugBuster", "Concatenar es la base para construir mensajes dinámicos.");
                
                save(levelRepository, 12, "Entrada Básica", "Simula la lectura de un dato imprimiendo 'Entrada recibida'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Entrada recibida", "En aplicaciones reales usaríamos la clase Scanner.");

                // MÓDULO 2: LÓGICA (13-25)
                save(levelRepository, 13, "If Simple", "Si x=10 es > 5, imprime 'Mayor'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        int x = 10;\n        //USER_CODE\n    }\n}", "Mayor", "La sentencia 'if' ejecuta código solo si la condición es verdadera.");
                
                save(levelRepository, 14, "If-Else", "Si x=3 es > 5 imprime 'Mayor', si no imprime 'Menor'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        int x = 3;\n        //USER_CODE\n    }\n}", "Menor", "El 'else' captura todos los casos donde la condición inicial fue falsa.");
                
                save(levelRepository, 15, "Else-If", "Si n=10 imprime 'Diez', si n=5 'Cinco', sino 'Otro'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        int n = 10;\n        //USER_CODE\n    }\n}", "Diez", "El 'else if' permite evaluar múltiples condiciones en orden.");
                
                save(levelRepository, 16, "Switch Case", "Usa switch para imprimir 'Lunes' si el dia es 1.", 
                    "public class Main {\n    public static void main(String[] args) {\n        int dia = 1;\n        //USER_CODE\n    }\n}", "Lunes", "El 'switch' es más limpio que muchos if-else cuando comparamos una sola variable.");
                
                save(levelRepository, 17, "Bucle For", "Imprime los números del 1 al 3 (uno por línea).", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "1\n2\n3", "El bucle 'for' se usa cuando sabemos exactamente cuántas veces repetir.");
                
                save(levelRepository, 18, "Bucle While", "Usa while para imprimir 1, 2, 3.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "1\n2\n3", "El 'while' repite la acción mientras la condición sea verdadera.");
                
                save(levelRepository, 19, "Do-While", "Imprime 'Hola' una sola vez usando do-while.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Hola", "El 'do-while' garantiza que el código se ejecute al menos una vez.");
                
                save(levelRepository, 20, "Break", "En un for del 1 al 10, usa break para detenerlo en el 3.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "1\n2", "La instrucción 'break' rompe la ejecución del bucle inmediatamente.");
                
                save(levelRepository, 21, "Continue", "En un for del 1 al 3, usa continue para saltar el 2.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "1\n3", "La instrucción 'continue' salta la iteración actual y pasa a la siguiente.");
                
                save(levelRepository, 22, "Bucle Anidado", "Crea un bucle for dentro de otro para imprimir '1-1'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "1-1", "Los bucles anidados son esenciales para trabajar con tablas o matrices.");
                
                save(levelRepository, 23, "Operadores Lógicos AND", "Si x=5 Y y=10, imprime 'Ambos'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        int x = 5, y = 10;\n        //USER_CODE\n    }\n}", "Ambos", "El operador && requiere que AMBAS condiciones sean verdaderas.");
                
                save(levelRepository, 24, "Operadores Lógicos OR", "Si x=5 O y=0, imprime 'Uno'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        int x = 5, y = 0;\n        //USER_CODE\n    }\n}", "Uno", "El operador || es verdadero si AL MENOS UNA condición se cumple.");
                
                save(levelRepository, 25, "Ternario", "Usa el operador ternario para imprimir 'Par' si x=4.", 
                    "public class Main {\n    public static void main(String[] args) {\n        int x = 4;\n        //USER_CODE\n    }\n}", "Par", "El operador ternario es una forma compacta de escribir un if-else.");

                // MÓDULO 3: DATOS (26-35)
                save(levelRepository, 26, "Arrays Básicos", "Crea un array {1, 2, 3} e imprime el primer elemento.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "1", "Los arrays almacenan múltiples valores del mismo tipo en una posición fija.");
                
                save(levelRepository, 27, "Índices de Array", "Crea un array {10, 20, 30} e imprime el tercer elemento.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "30", "Recuerda que los índices en Java empiezan en 0.");
                
                save(levelRepository, 28, "Suma de Arrays", "Suma los elementos de {5, 5} e imprime el resultado.", 
                    "public class Main {\n    public static void main(String[] args) {\n        int[] a = {5, 5};\n        //USER_CODE\n    }\n}", "10", "Recorrer arrays con bucles es la base del procesamiento de datos.");
                
                save(levelRepository, 29, "For-Each", "Usa for-each para imprimir 'Ok' por cada elemento de {1, 2}.", 
                    "public class Main {\n    public static void main(String[] args) {\n        int[] a = {1, 2};\n        //USER_CODE\n    }\n}", "Ok\nOk", "El for-each es la forma más legible de recorrer colecciones.");
                
                save(levelRepository, 30, "ArrayList Inicio", "Usa ArrayList para guardar 'Java' e imprimirlo.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Java", "A diferencia de los arrays, el ArrayList puede cambiar de tamaño.");
                
                save(levelRepository, 31, "ArrayList Agregar", "Añade 'A' y 'B' a un ArrayList e imprime el tamaño.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "2", "El método .add() permite insertar elementos dinámicamente.");
                
                save(levelRepository, 32, "ArrayList Eliminar", "Crea una lista con 'A', 'B', elimina 'A' e imprime la lista.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "[B]", "El método .remove() elimina elementos por índice o valor.");
                
                save(levelRepository, 33, "HashMap Básico", "Crea un mapa, guarda 'Java'->'Genial' e imprime el valor.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Genial", "Los HashMaps guardan pares Clave-Valor para búsquedas rápidas.");
                
                save(levelRepository, 34, "Métodos de String", "Convierte 'java' a mayúsculas e imprímelo.", 
                    "public class Main {\n    public static void main(String[] args) {\n        String s = \"java\";\n        //USER_CODE\n    }\n}", "JAVA", "La clase String tiene métodos útiles como .toUpperCase().");
                
                save(levelRepository, 35, "Longitud de String", "Imprime la longitud de la palabra 'BugBuster'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "10", "El método .length() devuelve la cantidad de caracteres de una cadena.");

                // MÓDULO 4: OOP (36-50)
                save(levelRepository, 36, "Crear Clase", "Crea la clase 'Persona' con un atributo 'nombre' y muéstralo.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Juan", "Una clase es un molde para crear objetos con atributos.");
                
                save(levelRepository, 37, "Instanciar Objetos", "Crea un objeto de la clase 'Coche' e imprime su marca.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Toyota", "Instanciar es crear un objeto real usando la palabra 'new'.");
                
                save(levelRepository, 38, "Constructores", "Usa un constructor para asignar el nombre a un 'Usuario'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Admin", "El constructor es un método especial que se ejecuta al crear el objeto.");
                
                save(levelRepository, 39, "Métodos", "Crea un método 'sumar' que retorne 5+5 e imprímelo.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "10", "Los métodos permiten reutilizar lógica en diferentes partes del programa.");
                
                save(levelRepository, 40, "Getters y Setters", "Usa un setter para cambiar la edad de un 'Jugador' a 20.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "20", "El encapsulamiento protege los datos usando métodos públicos.");
                
                save(levelRepository, 41, "Herencia Básica", "Crea la clase 'Perro' que herede de 'Animal' e imprime 'Guau'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Guau", "La herencia permite que una clase hija reutilice el código de una clase padre.");
                
                save(levelRepository, 42, "Sobrescritura", "Sobrescribe el método 'hacerSonido' en la clase Gato para que diga 'Miau'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Miau", "El @Override permite cambiar el comportamiento de un método heredado.");
                
                save(levelRepository, 43, "Interfaces", "Crea la interfaz 'Volable' con el método volar().", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Volando", "Las interfaces definen un contrato que las clases deben cumplir.");
                
                save(levelRepository, 44, "Polimorfismo", "Crea una lista de 'Animales' con Perros y Gatos e imprime sus sonidos.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Guau\nMiau", "El polimorfismo permite tratar objetos de diferentes clases como si fueran de la misma base.");
                
                save(levelRepository, 45, "Clase Abstracta", "Crea una clase abstracta 'Forma' y una subclase 'Circulo'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Circulo", "Las clases abstractas no se pueden instanciar, sirven solo como base.");
                
                save(levelRepository, 46, "Static", "Crea una variable static 'contador' que sume cada vez que creas un objeto.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "2", "Las variables static pertenecen a la clase, no a un objeto específico.");
                
                save(levelRepository, 47, "Manejo de Excepciones", "Usa try-catch para capturar una división por cero.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Error", "Try-catch evita que el programa se cierre inesperadamente.");
                
                save(levelRepository, 48, "Finally", "Usa la sentencia finally para imprimir 'Fin'.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "Fin", "El bloque finally siempre se ejecuta, haya habido error o no.");
                
                save(levelRepository, 49, "Enumeraciones", "Crea un Enum 'Dia' y asigna el valor LUNES.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "LUNES", "Los Enums definen un conjunto fijo de constantes.");
                
                save(levelRepository, 50, "Proyecto Final", "Suma dos números usando una clase Calculadora.", 
                    "public class Main {\n    public static void main(String[] args) {\n        //USER_CODE\n    }\n}", "100", "Sintetiza todo lo aprendido: Clases, Métodos y Operaciones.");

                System.out.println("🚀 PostgreSQL: 50 niveles cargados con éxito.");
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
