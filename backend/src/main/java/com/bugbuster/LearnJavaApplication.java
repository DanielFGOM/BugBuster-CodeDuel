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
                save(levelRepository, 1, "Hola Mundo", "Usa System.out.println() para imprimir exactamente: Hola Mundo", "public class HolaMundo {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Hola Mundo", "System.out.println() es la instrucción básica para enviar texto a la consola.");
                save(levelRepository, 2, "Variables Enteras", "Crea un int llamado 'edad' con valor 25 e imprímelo.", "public class VariablesEnteras {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "25", "El tipo 'int' se usa para números enteros sin decimales.");
                save(levelRepository, 3, "Cadenas de Texto", "Crea un String 'nombre' con el valor 'Juan' e imprímelo.", "public class CadenasDeTexto {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Juan", "Los Strings almacenan texto y siempre van entre comillas dobles.");
                save(levelRepository, 4, "Números Decimales", "Declara un double 'precio' con valor 19.99 e imprímelo.", "public class NumerosDecimales {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "19.99", "El tipo 'double' permite guardar números con decimales.");
                save(levelRepository, 5, "Operaciones Básicas", "Suma 10 + 5 e imprime el resultado.", "public class OperacionesBasicas {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "15", "Java usa los operadores +, -, *, / y % para cálculos.");
                save(levelRepository, 6, "Concatenación", "Une el String 'Hola ' con la variable 'nombre' (Juan).", "public class Concatenacion {\n    public static void main(String[] args) {\n        String nombre = \"Juan\";\n        // Escribe tu código aquí\n    }\n}", "Hola Juan", "El operador + sirve para unir cadenas de texto.");
                save(levelRepository, 7, "Booleanos", "Crea un boolean 'esJavaGenial' en true e imprímelo.", "public class Booleanos {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "true", "El tipo boolean solo acepta dos valores: true o false.");
                save(levelRepository, 8, "Constantes", "Crea una constante final int PI = 3 e imprímela.", "public class Constantes {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "3", "La palabra 'final' impide que el valor de una variable sea modificado.");
                save(levelRepository, 9, "Casting", "Convierte el double 9.99 a un entero (int) e imprímelo.", "public class Casting {\n    public static void main(String[] args) {\n        double d = 9.99;\n        // Escribe tu código aquí\n    }\n}", "9", "El casting permite forzar un tipo de dato a convertirse en otro.");
                save(levelRepository, 10, "Operador Módulo", "Imprime el resto de dividir 10 entre 3.", "public class OperadorModulo {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "1", "El operador % devuelve el residuo de una división.");
                save(levelRepository, 11, "Suma de Strings", "Une 'Bug' y 'Buster' para formar 'BugBuster'.", "public class SumaDeStrings {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "BugBuster", "Concatenar es la base para construir mensajes dinámicos.");
                save(levelRepository, 12, "Entrada Básica", "Simula la lectura de un dato imprimiendo 'Entrada recibida'.", "public class EntradaBasica {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Entrada recibida", "En aplicaciones reales usaríamos la clase Scanner.");
                save(levelRepository, 13, "If Simple", "Si x=10 es > 5, imprime 'Mayor'.", "public class IfSimple {\n    public static void main(String[] args) {\n        int x = 10;\n        // Escribe tu código aquí\n    }\n}", "Mayor", "La sentencia 'if' ejecuta código solo si la condición es verdadera.");
                save(levelRepository, 14, "If-Else", "Si x=3 es > 5 imprime 'Mayor', si no imprime 'Menor'.", "public class IfElse {\n    public static void main(String[] args) {\n        int x = 3;\n        // Escribe tu código aquí\n    }\n}", "Menor", "El 'else' captura todos los casos donde la condición inicial fue falsa.");
                save(levelRepository, 15, "Else-If", "Si n=10 imprime 'Diez', si n=5 'Cinco', sino 'Otro'.", "public class ElseIf {\n    public static void main(String[] args) {\n        int n = 10;\n        // Escribe tu código aquí\n    }\n}", "Diez", "El 'else if' permite evaluar múltiples condiciones en orden.");
                save(levelRepository, 16, "Switch Case", "Usa switch para imprimir 'Lunes' si el dia es 1.", "public class SwitchCase {\n    public static void main(String[] args) {\n        int dia = 1;\n        // Escribe tu código aquí\n    }\n}", "Lunes", "El 'switch' es más limpio que muchos if-else.");
                save(levelRepository, 17, "Bucle For", "Imprime los números del 1 al 3 (uno por línea).", "public class BucleFor {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "1\n2\n3", "El bucle 'for' se usa cuando sabemos cuántas veces repetir.");
                save(levelRepository, 18, "Bucle While", "Usa while para imprimir 1, 2, 3.", "public class BucleWhile {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "1\n2\n3", "El 'while' repite la acción mientras la condición sea verdadera.");
                save(levelRepository, 19, "Do-While", "Imprime 'Hola' una sola vez usando do-while.", "public class DoWhile {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Hola", "El 'do-while' garantiza que el código se ejecute al menos una vez.");
                save(levelRepository, 20, "Break", "En un for del 1 al 10, usa break para detenerlo en el 3.", "public class Break {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "1\n2", "La instrucción 'break' rompe la ejecución del bucle.");
                save(levelRepository, 21, "Continue", "En un for del 1 al 3, usa continue para saltar el 2.", "public class Continue {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "1\n3", "La instrucción 'continue' salta la iteración actual.");
                save(levelRepository, 22, "Bucle Anidado", "Crea un bucle for dentro de otro para imprimir '1-1'.", "public class BucleAnidado {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "1-1", "Los bucles anidados son esenciales para matrices.");
                save(levelRepository, 23, "Operadores Lógicos AND", "Si x=5 Y y=10, imprime 'Ambos'.", "public class OperadoresAnd {\n    public static void main(String[] args) {\n        int x = 5, y = 10;\n        // Escribe tu código aquí\n    }\n}", "Ambos", "El operador && requiere que AMBAS condiciones sean verdaderas.");
                save(levelRepository, 24, "Operadores Lógicos OR", "Si x=5 O y=0, imprime 'Uno'.", "public class OperadoresOr {\n    public static void main(String[] args) {\n        int x = 5, y = 0;\n        // Escribe tu código aquí\n    }\n}", "Uno", "El operador || es verdadero si AL MENOS UNA condición se cumple.");
                save(levelRepository, 25, "Ternario", "Usa el operador ternario para imprimir 'Par' si x=4.", "public class Ternario {\n    public static void main(String[] args) {\n        int x = 4;\n        // Escribe tu código aquí\n    }\n}", "Par", "El operador ternario es una forma compacta de escribir un if-else.");
                save(levelRepository, 26, "Arrays Básicos", "Crea un array {1, 2, 3} e imprime el primer elemento.", "public class ArraysBasicos {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "1", "Los arrays almacenan múltiples valores del mismo tipo.");
                save(levelRepository, 27, "Índices de Array", "Crea un array {10, 20, 30} e imprime el tercer elemento.", "public class IndicesArray {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "30", "Los índices en Java empiezan en 0.");
                save(levelRepository, 28, "Suma de Arrays", "Suma los elementos de {5, 5} e imprime el resultado.", "public class SumaArrays {\n    public static void main(String[] args) {\n        int[] a = {5, 5};\n        // Escribe tu código aquí\n    }\n}", "10", "Recorrer arrays con bucles es la base del procesamiento de datos.");
                save(levelRepository, 29, "For-Each", "Usa for-each para imprimir 'Ok' por cada elemento de {1, 2}.", "public class ForEach {\n    public static void main(String[] args) {\n        int[] a = {1, 2};\n        // Escribe tu código aquí\n    }\n}", "Ok\nOk", "El for-each es la forma más legible de recorrer colecciones.");
                save(levelRepository, 30, "ArrayList Inicio", "Usa ArrayList para guardar 'Java' e imprimirlo.", "public class ArrayListInicio {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Java", "El ArrayList puede cambiar de tamaño dinámicamente.");
                save(levelRepository, 31, "ArrayList Agregar", "Añade 'A' y 'B' a un ArrayList e imprime el tamaño.", "public class ArrayListAgregar {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "2", "El método .add() permite insertar elementos.");
                save(levelRepository, 32, "ArrayList Eliminar", "Crea una lista con 'A', 'B', elimina 'A' e imprime la lista.", "public class ArrayListEliminar {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "[B]", "El método .remove() elimina elementos.");
                save(levelRepository, 33, "HashMap Básico", "Crea un mapa, guarda 'Java'->'Genial' e imprime el valor.", "public class HashMapBasico {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Genial", "Los HashMaps guardan pares Clave-Valor.");
                save(levelRepository, 34, "Métodos de String", "Convierte 'java' a mayúsculas e imprímelo.", "public class MetodosString {\n    public static void main(String[] args) {\n        String s = \"java\";\n        // Escribe tu código aquí\n    }\n}", "JAVA", "La clase String tiene métodos útiles como .toUpperCase().");
                save(levelRepository, 35, "Longitud de String", "Imprime la longitud de la palabra 'BugBuster'.", "public class LongitudString {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "10", "El método .length() devuelve la cantidad de caracteres.");
                save(levelRepository, 36, "Crear Clase", "Crea la clase 'Persona' con un atributo 'nombre' y muéstralo.", "public class CrearClase {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Juan", "Una clase es un molde para crear objetos.");
                save(levelRepository, 37, "Instanciar Objetos", "Crea un objeto de la clase 'Coche' e imprime su marca.", "public class InstanciarObjetos {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Toyota", "Instanciar es crear un objeto real usando 'new'.");
                save(levelRepository, 38, "Constructores", "Usa un constructor para asignar el nombre a un 'Usuario'.", "public class Constructores {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Admin", "El constructor se ejecuta al crear el objeto.");
                save(levelRepository, 39, "Métodos", "Crea un método 'sumar' que retorne 5+5 e imprímelo.", "public class Metodos {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "10", "Los métodos permiten reutilizar lógica.");
                save(levelRepository, 40, "Getters y Setters", "Usa un setter para cambiar la edad de un 'Jugador' a 20.", "public class GettersSetters {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "20", "El encapsulamiento protege los datos.");
                save(levelRepository, 41, "Herencia Básica", "Crea la clase 'Perro' que herede de 'Animal' e imprime 'Guau'.", "public class HerenciaBasica {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Guau", "La herencia permite reutilizar código de una clase padre.");
                save(levelRepository, 42, "Sobrescritura", "Sobrescribe el método 'hacerSonido' en la clase Gato para que diga 'Miau'.", "public class Sobrescritura {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Miau", "El @Override permite cambiar el comportamiento heredado.");
                save(levelRepository, 43, "Interfaces", "Crea la interfaz 'Volable' con el método volar().", "public class Interfaces {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Volando", "Las interfaces definen un contrato.");
                save(levelRepository, 44, "Polimorfismo", "Crea una lista de 'Animales' con Perros y Gatos e imprime sus sonidos.", "public class Polimorfismo {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Guau\nMiau", "El polimorfismo permite tratar objetos diferentes como una misma base.");
                save(levelRepository, 45, "Clase Abstracta", "Crea una clase abstracta 'Forma' y una subclase 'Circulo'.", "public class ClaseAbstracta {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Circulo", "Las clases abstractas no se pueden instanciar.");
                save(levelRepository, 46, "Static", "Crea una variable static 'contador' que sume cada vez que creas un objeto.", "public class Static {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "2", "Las variables static pertenecen a la clase.");
                save(levelRepository, 47, "Manejo de Excepciones", "Usa try-catch para capturar una división por cero.", "public class ManejoExcepciones {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Error", "Try-catch evita que el programa se cierre.");
                save(levelRepository, 48, "Finally", "Usa la sentencia finally para imprimir 'Fin'.", "public class Finally {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "Fin", "El bloque finally siempre se ejecuta.");
                save(levelRepository, 49, "Enumeraciones", "Crea un Enum 'Dia' y asigna el valor LUNES.", "public class Enumeraciones {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "LUNES", "Los Enums definen constantes fijas.");
                save(levelRepository, 50, "Proyecto Final", "Crea un sistema simple que sume dos números usando una clase Calculadora.", "public class ProyectoFinal {\n    public static void main(String[] args) {\n        // Escribe tu código aquí\n    }\n}", "100", "Sintetiza todo lo aprendido.");

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
