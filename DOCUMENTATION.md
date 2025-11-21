
# Documentación del Proyecto Signealo

## 1. Visión General
**Signealo** es una aplicación web educativa diseñada para la enseñanza de la **Lengua de Señas Mexicana (LSM)**. El proyecto está construido como una aplicación web estática (sin backend) orientada a principiantes hispanohablantes que desean aprender vocabulario de manera autodidacta.

### Propósito y Alcance
La aplicación ofrece múltiples modalidades de aprendizaje, incluyendo exploración visual, cuestionarios (quizzes) y navegación por diccionario. Actualmente cubre:
*   **34 palabras** organizadas en 6 categorías temáticas.
*   **28 señas del alfabeto** (A-Z + Ñ).
*   **10 números** y **8 colores**.
*   Más de **70 recursos visuales** (imágenes y demostraciones).

### Stack Tecnológico
El proyecto no utiliza frameworks, transpiladores ni gestores de paquetes.

| Tecnología | Propósito |
|:---|:---|
| **HTML5** | Estructura de componentes independientes. |
| **CSS3** | Estilos globales (`style.css`) y estilos en línea. |
| **Vanilla JavaScript** | Lógica de la aplicación en etiquetas `<script>`. |
| **Bootstrap Icons** | Iconografía vía CDN (v1.11.3). |
| **Assets Estáticos** | Imágenes JPEG/PNG servidas directamente. |

---

## 2. Arquitectura del Sistema

### Estructura de Directorios
El proyecto sigue una estructura jerárquica clara:

```text
signealo/
├── index.html                          # Punto de entrada (redirección)
├── src/
│   ├── index.html                      # Landing page principal
│   ├── caracteristicas.html            # Hub de lecciones (menú principal)
│   ├── style.css                       # Hoja de estilos global
│   ├── script.js                       # Lógica principal (búsqueda, palabra del día)
│   ├── data.js                         # Base de datos (Diccionario)
│   ├── assets/                         # Carpeta única de imágenes
│   └── componentes/                    # Módulos de aprendizaje
│       ├── alfabeto/alfabeto.html
│       ├── numeros/numeros.html
│       ├── colores/colores.html
│       ├── diccionario/diccionario.html
│       ├── interprete/interprete.html
│       ├── juegos/memorama.html        # (Inactivo/Comentado)
│       └── examen/examen.html          # (Inactivo/Comentado)
```

### Patrón de Navegación (Hub-and-Spoke)
La aplicación utiliza un modelo de navegación de dos niveles:
1.  **Entrada:** `index.html` (raíz) redirige a `src/index.html` (App principal).
2.  **Landing Page:** Muestra búsqueda, accesos rápidos y "Palabra del día".
3.  **Hub de Lecciones:** `caracteristicas.html` actúa como directorio central.
4.  **Componentes:** Archivos HTML independientes (`alfabeto.html`, etc.) que contienen su propia lógica.

**Navegación Persistente:**
Existe una barra de navegación inferior (`.bottom-nav`) visible en las páginas principales que permite alternar entre "Inicio" y "Aprender".

---

## 3. Sistema de Datos (Diccionario)

Toda la información del vocabulario reside en un único objeto JavaScript exportado desde **`src/data.js`**.

### Esquema de Datos
El objeto `dictionary` contiene categorías, y cada categoría contiene items.

```javascript
// Ejemplo de estructura en data.js
dictionary.saludos = {
    title: "Saludos",          // Título visible
    icon: "bi-emoji-smile",    // Icono de Bootstrap
    items: [
        {
            word: "Hola",                  // Palabra en español
            image: "assets/HOLAA.jpg",     // Ilustración del concepto
            sign: "assets/hola.jpg"        // Foto de la seña (mano)
        }
    ]
}
```

### Categorías Disponibles
1.  **Pronombres** (6 items)
2.  **Saludos** (7 items)
3.  **Cortesía** (5 items)
4.  **Frases Útiles** (4 items)
5.  **Adjetivos** (6 items)
6.  **Información Básica** (6 items)

**Nota sobre Imágenes:** Se utiliza un sistema dual. `image` suele ser una ilustración conceptual (ej. dibujo de un sol para "Buenos días"), mientras que `sign` es la fotografía de la mano haciendo la seña.

---

## 4. Componentes de Aprendizaje

Cada componente es un archivo HTML autocontenido (Single-File Component) que importa `style.css` y opcionalmente `data.js`.

### 1. Alfabeto (`alfabeto.html`)
*   **Tipo:** Visualizador.
*   **Funcionalidad:** Teclado A-Z + Ñ. Al hacer clic, muestra la imagen de la seña en un visor central.
*   **Manejo de Errores:** Implementa carga en cascada (intenta cargar PNG -> si falla, intenta JPG -> si falla, muestra texto).

### 2. Números (`numeros.html`)
*   **Tipo:** Interactivo (Dual).
*   **Modo Explorar:** Similar al alfabeto, muestra señas del 1 al 10.
*   **Modo Quiz:** Genera preguntas aleatorias donde el usuario debe identificar el número basado en la seña. Incluye puntuación y feedback visual (verde/rojo).

### 3. Colores (`colores.html`)
*   **Tipo:** Visualizador Interactivo.
*   **Funcionalidad:** Al seleccionar un color, cambia el fondo de la página (`body background`) al color elegido y muestra la seña correspondiente.
*   **Normalización:** Limpia nombres de archivos (ej. "Amarillo" -> "amarillo") para cargar assets.

### 4. Diccionario (`diccionario.html`)
*   **Tipo:** Navegador.
*   **Flujo:**
    1.  Muestra tarjetas de categorías (generadas desde `data.js`).
    2.  Al seleccionar una categoría, muestra una rejilla de palabras.
    3.  Al hacer clic en una palabra, abre un **Modal de Bootstrap** con la seña en grande.
*   **Routing:** Soporta parámetros URL (ej. `diccionario.html?categoria=saludos`) para enlaces directos desde el buscador.

### 5. Intérprete IA (`interprete.html`)
*   **Estado:** BETA / Informativo.
*   **Funcionalidad:** Página estática que describe una futura funcionalidad de reconocimiento de señas mediante cámara. No tiene lógica activa actualmente.

### Componentes Inactivos
Existen dos componentes presentes en el código pero comentados en `caracteristicas.html`:
*   **Memorama:** Juego de memoria para emparejar palabra con seña.
*   **Examen General:** Cuestionario de 10 preguntas aleatorias de todo el diccionario.

---

## 5. Gestión de Assets (Recursos)

Todas las imágenes se encuentran en `src/assets/`.

### Resolución de Rutas
Dado que no hay un proceso de compilación, las rutas son relativas y dependen de la profundidad del archivo HTML:

*   Desde `src/index.html`: La ruta es `assets/archivo.jpg`.
*   Desde `src/componentes/alfabeto/`: La ruta es `../../assets/archivo.jpg`.

Los scripts (`script.js` y componentes individuales) calculan dinámicamente un `pathPrefix` o usan variables como `assetsPath` para resolver esto correctamente.

---

## 6. Sistema de Estilos (`style.css`)

El diseño es "Mobile-First" y utiliza **Variables CSS** para mantener la consistencia.

### Variables Principales
*   `--primary-color`: `#6a11cb` (Morado)
*   `--secondary-color`: `#2575fc` (Azul)
*   `--accent-color`: `#ff4081` (Rosa)
*   `--border-radius`: `20px`

### Clases Utilitarias Clave
*   `.page-header`: Cabecera pegajosa con botón de "Atrás".
*   `.card-grid` / `.card`: Sistema de tarjetas con sombras y efectos hover.
*   `.viewer-box`: Contenedor estandarizado para mostrar imágenes de señas.
*   `.keyboard-grid` / `.key-btn`: Rejillas de botones para alfabeto y números.
*   `.bottom-nav`: Barra de navegación inferior fija.

---

## 7. Guía para Desarrolladores

### Cómo agregar una nueva palabra
1.  Abrir `src/data.js`.
2.  Localizar la categoría adecuada (ej. `saludos`).
3.  Agregar un objeto al array `items`:
    ```javascript
    {
      word: "Nueva Palabra",
      image: "assets/visual_nueva.jpg",
      sign: "assets/seña_nueva.jpg"
    }
    ```
4.  Asegurarse de que las imágenes existan en `src/assets/`.

### Cómo agregar un nuevo componente
1.  Crear una carpeta en `src/componentes/` (ej. `nuevo-tema/`).
2.  Crear el archivo HTML.
3.  Importar estilos globales: `<link rel="stylesheet" href="../../style.css">`.
4.  Importar datos si es necesario: `<script src="../../data.js"></script>`.
5.  Agregar enlace en `src/caracteristicas.html`.

### Consideraciones de Despliegue
Al ser una aplicación estática:
*   No requiere `npm install` ni `npm run build`. En cambio si lo quieres convertir a una aplicacion para android necesitaras correr `npm run android dev` o compilar con `npm run android build`.
*   Puede alojarse en GitHub Pages, Netlify o cualquier servidor web simple.
*   Asegurarse de que la estructura de carpetas se mantenga intacta para que las rutas relativas funcionen.
