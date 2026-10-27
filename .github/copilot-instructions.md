# Instrucciones del proyecto

## Contexto y estructura

- Es una página estática de una sola página, en español, para una experiencia breve de respiración y calma.
- Mantén la implementación en los ficheros de la raíz: `index.html` para el contenido y la estructura, `styles.css` para la presentación y `script.js` para las interacciones.
- El proyecto usa HTML, CSS y JavaScript nativos. No introduzcas frameworks, dependencias ni pasos de compilación sin que el proyecto lo requiera expresamente.

## Convenciones de implementación

- Conserva el idioma español (`lang="es"`) y el tono visual y tranquilo de la página.
- Usa HTML semántico y controles nativos. Mantén textos alternativos y nombres accesibles descriptivos; los cambios en el temporizador deben conservar sus anuncios accesibles.
- En JavaScript, utiliza APIs del navegador y los elementos existentes del DOM. Si cambias identificadores en HTML, actualiza también sus selectores en `script.js`.
- En CSS, reutiliza las propiedades personalizadas de `:root` y sigue los estilos existentes. Conserva el diseño adaptable, el punto de ruptura móvil y el soporte para `prefers-reduced-motion`.
- Evita añadir comentarios, abstracciones o código externo que no sean necesarios para el cambio.

## Validación

- No hay configuración de compilación ni pruebas automatizadas. Valida en un navegador los cambios de comportamiento y presentación.
- Para cambios en las interacciones, comprueba el inicio, la cuenta atrás y el reinicio del temporizador, así como la actualización del reloj local; el sonido debe seguir siendo opcional cuando el navegador no admita Web Audio.
- Revisa la página en escritorio y móvil, y comprueba la navegación por teclado cuando cambies controles o enlaces.