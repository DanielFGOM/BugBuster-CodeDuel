package com.bugbuster;

import com.bugbuster.model.Level;
import com.bugbuster.repository.LevelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class LearnJavaApplication {

    public static void main(String[] args) {
        SpringApplication.run(LearnJavaApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(LevelRepository levelRepository) {
        return args -> {
            List<LevelSeed> seeds = levelSeeds();
            List<Level> existingLevels = levelRepository.findAllByOrderByOrderNumberAsc();
            Map<Integer, Level> byOrder = new HashMap<>();

            for (Level level : existingLevels) {
                byOrder.putIfAbsent(level.getOrderNumber(), level);
            }

            for (LevelSeed seed : seeds) {
                Level level = byOrder.getOrDefault(seed.orderNumber(), new Level());
                level.setOrderNumber(seed.orderNumber());
                level.setTitle(seed.title());
                level.setDescription(seed.description());
                level.setTemplate("");
                level.setTestCode("");
                level.setExpectedOutput(seed.expectedOutput());
                level.setHint(seed.hint());
                levelRepository.save(level);
            }

            if (existingLevels.isEmpty()) {
                System.out.println("BugBuster: 50 niveles cargados correctamente.");
            } else {
                System.out.println("BugBuster: 50 niveles sincronizados correctamente.");
            }
        };
    }

    private List<LevelSeed> levelSeeds() {
        return List.of(
            level(1, "Hola Mundo",
                "Escribe un programa que imprima exactamente: Hola Mundo.",
                "System.out.println() muestra texto en la consola. El texto va entre comillas dobles.",
                "Hola Mundo"),
            level(2, "Variables Enteras",
                "Declara un int llamado edad con valor 25 y después imprímelo.",
                "int almacena números enteros. La forma básica es: int nombre = valor;.",
                "25"),
            level(3, "Cadenas de Texto",
                "Declara un String llamado nombre con el valor Juan y después imprímelo.",
                "String almacena texto. Las cadenas siempre se escriben entre comillas dobles.",
                "Juan"),
            level(4, "Suma",
                "Declara dos variables enteras con 10 y 5, súmalas e imprime el resultado.",
                "El operador + permite sumar números. Puedes guardar el resultado en otra variable o imprimirlo directamente.",
                "15"),
            level(5, "If y Else",
                "Crea una variable numero con valor 8. Si es mayor que 5 imprime Mayor; en caso contrario imprime Menor.",
                "if ejecuta un bloque cuando la condición es verdadera. else cubre el caso contrario.",
                "Mayor"),
            level(6, "Par o Impar",
                "Crea una variable numero con valor 7 y determina si es Par o Impar usando el operador módulo.",
                "El operador % devuelve el residuo de una división. Un número es par cuando numero % 2 es 0.",
                "Impar"),
            level(7, "Bucle For",
                "Usa un for para imprimir los números del 1 al 5, uno por línea.",
                "for permite repetir código usando una variable de control, una condición y un incremento.",
                "1\n2\n3\n4\n5"),
            level(8, "Bucle While",
                "Usa while para imprimir los números del 1 al 3, uno por línea.",
                "while repite un bloque mientras su condición siga siendo verdadera. Recuerda actualizar el contador.",
                "1\n2\n3"),
            level(9, "Método Propio",
                "Crea un método llamado saludar que imprima Hola Mundo y llámalo desde main.",
                "Un método agrupa instrucciones para poder reutilizarlas. Un método estático puede llamarse desde main.",
                "Hola Mundo"),
            level(10, "Array",
                "Declara un array de enteros con  {10, 20, 30} e imprime solamente su primer elemento.",
                "Un array guarda varios valores del mismo tipo. El primer índice siempre es 0.",
                "10"),

            level(11, "Double",
                "Declara un double llamado precio con valor 19.99 e imprímelo.",
                "double permite almacenar números con parte decimal.",
                "19.99"),
            level(12, "Char",
                "Declara un char llamado inicial con la letra B e imprímelo.",
                "char representa un solo carácter y se escribe entre comillas simples.",
                "B"),
            level(13, "Boolean",
                "Declara un boolean llamado activo con valor true e imprímelo.",
                "boolean solo puede tener los valores true o false.",
                "true"),
            level(14, "Operaciones",
                "Declara a=20 y b=6. Imprime el resultado de a-b.",
                "Java usa - para restar. Las operaciones aritméticas pueden trabajar con variables numéricas.",
                "14"),
            level(15, "Incremento",
                "Declara contador=4, incrementa su valor una vez usando ++ e imprime el resultado.",
                "++ aumenta una variable en una unidad. También existe -- para disminuirla.",
                "5"),
            level(16, "If Simple",
                "Con numero=10, usa if para imprimir Mayor cuando numero sea mayor que 5.",
                "Una condición puede comparar valores usando operadores como >, <, >=, <=, == y !=.",
                "Mayor"),
            level(17, "If Else",
                "Con numero=3, imprime Mayor si es mayor que 5 y Menor en caso contrario.",
                "if y else permiten elegir entre dos caminos del programa.",
                "Menor"),
            level(18, "Else If",
                "Con numero=2, imprime Uno si es 1, Dos si es 2 y Otro para cualquier otro valor.",
                "else if permite comprobar varias condiciones una después de otra.",
                "Dos"),
            level(19, "Switch",
                "Usa switch con dia=1 para imprimir Lunes.",
                "switch permite elegir una acción según el valor de una expresión. Usa case y break.",
                "Lunes"),
            level(20, "For y Suma",
                "Usa un for para sumar los números del 1 al 5 e imprimir el total.",
                "Una variable acumuladora puede guardar un resultado que cambia en cada vuelta del bucle.",
                "15"),
            level(21, "While y Contador",
                "Usa while para imprimir una cuenta regresiva: 3, 2 y 1, uno por línea.",
                "La condición del while puede controlar una cuenta regresiva usando decrementos.",
                "3\n2\n1"),
            level(22, "Do While",
                "Usa do-while para imprimir la palabra Hola exactamente una vez.",
                "do-while ejecuta primero el bloque y comprueba la condición después, por lo que siempre corre al menos una vez.",
                "Hola"),
            level(23, "Break",
                "Recorre del 1 al 5 y usa break para detener el bucle cuando el contador llegue a 4. Imprime antes de romper.",
                "break termina inmediatamente el bucle actual.",
                "1\n2\n3"),
            level(24, "Continue",
                "Recorre del 1 al 4 y usa continue para no imprimir el número 2.",
                "continue salta el resto de la iteración actual y pasa a la siguiente.",
                "1\n3\n4"),
            level(25, "Bucles Anidados",
                "Usa dos for anidados para imprimir dos veces la cadena 1-1, una por línea.",
                "Un bucle anidado es un bucle dentro de otro. El interior se repite por cada vuelta del exterior.",
                "1-1\n1-1"),

            level(26, "AND Lógico",
                "Con edad=20 y tieneID=true, usa && para imprimir Acceso concedido cuando ambas condiciones se cumplan.",
                "&& devuelve true solamente cuando las dos condiciones son verdaderas.",
                "Acceso concedido"),
            level(27, "OR Lógico",
                "Con codigo=0 y activo=true, usa || para imprimir Disponible cuando al menos una condición sea verdadera.",
                "|| devuelve true cuando una o ambas condiciones son verdaderas.",
                "Disponible"),
            level(28, "NOT Lógico",
                "Con conectado=false, usa ! para imprimir Sin conexión.",
                "! invierte un valor booleano: true se vuelve false y false se vuelve true.",
                "Sin conexión"),
            level(29, "Operador Ternario",
                "Con numero=4, usa el operador ternario para imprimir Par si es divisible entre 2 y Impar si no lo es.",
                "La expresión condicion ? valor1 : valor2 es una forma compacta de elegir entre dos resultados.",
                "Par"),
            level(30, "Array y Suma",
                "Crea un array {5, 10, 15}, recórrelo y calcula la suma total.",
                "Los arrays pueden recorrerse con índices y bucles para procesar todos sus elementos.",
                "30"),
            level(31, "For Each",
                "Crea un array {2, 4, 6} y usa for-each para imprimir cada elemento, uno por línea.",
                "for-each recorre directamente cada elemento de un array sin manejar el índice manualmente.",
                "2\n4\n6"),
            level(32, "Mayor de un Array",
                "Crea el array {3, 9, 5, 7} y encuentra e imprime el número mayor.",
                "Puedes usar una variable mayor y compararla con cada elemento mientras recorres el array.",
                "9"),
            level(33, "String Length",
                "Crea el String BugBuster e imprime la cantidad de caracteres.",
                "length() devuelve la cantidad de caracteres que contiene un String.",
                "9"),
            level(34, "String Uppercase",
                "Crea el String java y conviértelo a mayúsculas usando toUpperCase().", 
                "toUpperCase() devuelve una nueva cadena con sus letras en mayúsculas.",
                "JAVA"),
            level(35, "ArrayList",
                "Usa ArrayList para guardar Java y Python, y luego imprime el segundo elemento.",
                "ArrayList es una colección que puede crecer dinámicamente. Usa add() para agregar elementos y get() para obtenerlos.",
                "Python"),

            level(36, "ArrayList Remove",
                "Crea una ArrayList con A, B y C. Elimina A e imprime la lista resultante.",
                "remove() permite eliminar un elemento de una ArrayList. La lista se ajusta automáticamente.",
                "[B, C]"),
            level(37, "HashMap",
                "Crea un HashMap y guarda la relación Java -> Genial. Después imprime el valor asociado a Java.",
                "HashMap almacena pares clave-valor. put() guarda datos y get() los recupera por su clave.",
                "Genial"),
            level(38, "Crear una Clase",
                "Crea una clase Persona con un atributo nombre, asígnale Juan y muestra el nombre desde main.",
                "Una clase es un molde. Los atributos representan datos que pertenecen a sus objetos.",
                "Juan"),
            level(39, "Crear un Objeto",
                "Crea una clase Coche con un atributo marca. Instancia un objeto y asígnale Toyota.",
                "new crea una instancia de una clase. El objeto puede acceder a sus atributos mediante el punto.",
                "Toyota"),
            level(40, "Constructor",
                "Crea una clase Usuario con un constructor que reciba el nombre. Crea un Usuario llamado Admin e imprime su nombre.",
                "El constructor tiene el mismo nombre de la clase y se ejecuta al usar new.",
                "Admin"),
            level(41, "Método de Objeto",
                "Crea una clase Calculadora con un método sumar que reciba dos enteros y retorne su suma. Llama al método con 4 y 6.",
                "Un método puede recibir parámetros, procesarlos y devolver un resultado con return.",
                "10"),
            level(42, "Static",
                "Crea una variable static contador. Cada vez que se construya un objeto, aumenta contador. Crea dos objetos e imprime 2.",
                "static hace que un atributo pertenezca a la clase y sea compartido por sus objetos.",
                "2"),
            level(43, "Getters y Setters",
                "Crea una clase Jugador con edad privada. Usa un setter para poner 20 y un getter para imprimirla.",
                "private protege los atributos. Los getters leen datos y los setters permiten modificarlos de forma controlada.",
                "20"),
            level(44, "Herencia",
                "Crea Animal con un método comer. Crea Perro que herede de Animal y demuestra la herencia imprimiendo Come.",
                "extends indica que una clase hereda atributos y métodos de otra clase.",
                "Come"),
            level(45, "Sobrescritura",
                "Crea Animal con hacerSonido() y sobrescríbelo en Perro para imprimir Guau.",
                "@Override indica que una subclase proporciona su propia implementación de un método heredado.",
                "Guau"),
            level(46, "Interface",
                "Crea una interfaz Volable con volar(). Haz que Avion la implemente e imprime Volando al llamar al método.",
                "Una interfaz define un contrato que una clase puede implementar usando implements.",
                "Volando"),
            level(47, "Polimorfismo",
                "Crea Animal con hacerSonido(), implementa Perro y Gato con Guau y Miau, y usa una referencia Animal para llamar a ambos.",
                "El polimorfismo permite trabajar con distintos objetos mediante un mismo tipo base y ejecutar su implementación concreta.",
                "Guau\nMiau"),
            level(48, "Clase Abstracta",
                "Crea una clase abstracta Forma con un método abstracto dibujar(). Crea Circulo y haz que dibujar imprima Circulo.",
                "Una clase abstracta puede definir comportamiento común y métodos abstractos que las subclases deben implementar.",
                "Circulo"),
            level(49, "Excepciones",
                "Usa try-catch para intentar dividir 10 entre 0. Cuando ocurra la excepción, imprime Error.",
                "try contiene código que puede fallar y catch permite manejar la excepción sin terminar el programa abruptamente.",
                "Error"),
            level(50, "Proyecto Final",
                "Crea una clase Calculadora con un método static sumar. Llámalo con 40 y 60 e imprime 100.",
                "El proyecto final combina clases, métodos, parámetros, retorno y llamadas a código reutilizable.",
                "100")
        );
    }

    private LevelSeed level(int orderNumber, String title, String description, String hint, String expectedOutput) {
        return new LevelSeed(orderNumber, title, description, hint, expectedOutput);
    }

    private record LevelSeed(
        int orderNumber,
        String title,
        String description,
        String hint,
        String expectedOutput
    ) {}
}
