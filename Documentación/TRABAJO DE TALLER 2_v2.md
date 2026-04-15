UNIVERSIDAD NACIONAL DE LA AMAZONÍA PERUANA
FACULTAD DE INGENIERÍA DE SISTEMAS E INFORMÁTICA
“Catálogo virtual de flora ornamental de Iquitoscon identificación morfológica asistida”

DOCENTE:
VILCA BARBARAN RAFAEL

ALUMNOS:
ALVARADO SILVANO, DANILO LEONARDO
CABANILLAS RONDONA, ANGIE DAYANA
RENGIFO GUTIERREZ, MARLON MOISES
RENGIFO PINEDO, BRITTANY ARIANA
ZUMAETA ZEGARRA, WALTER ARMADO
CICLO:
IX

CURSO:
TALLER DE SOFTWARE II

AÑO:
2026






Contenido
1.RESUMEN EJECUTIVO2
2.PROBLEMA Y CONTEXTO3
2.1Contexto General: Realidad de la flora ornamental en Iquitos3
2.2Problema Central3
2.3 Manifestaciones del Problema4
2.4 Magnitud e Impacto del Problema4
2.5 Análisis de Soluciones Existentes y Brechas5
3. PROPUESTA DE SOLUCIÓN6
3.1 Visión del Producto6
3.2 Descripción Funcional del Sistema6
3.3 Alcance del Sistema – Sprint 1 al Sprint 68
3.4 Valor Diferencial y Justificación de la Propuesta9
4. METODOLOGIA: EXTREME PROGRAMMING (XP)10
4.1 Fundamentos de la elección Metodológica10
4.2 Roles Definidos en el Equipo10
4.3 Actividades Realizadas en el Primer Sprint11
4.4 Historias de Usuario12
5. DISEÑO DE LA SOLUCIÓN15
5.1 Principios de Diseño de la Interfaz15
5.2 Flujo de Navegación del Sistema16
5.3 Descripción de Pantallas Principales16
6. ARQUITECTURA Y TECNOLOGÍA17
6.1 Proceso de Selección del Stack Tecnológico17
6.2 Stack Tecnológico Definitivo18
6.3 Arquitectura del Sistema19
7. DESARROLLO POR ITERACIONES20
7.1 Sprint 1 – Detalle de Ejecución20
7.2 Tareas Completadas y Tiempo Invertido22
7.3 Incremento del Producto en el Sprint 125
7.4 Obstáculos Encontrados y Soluciones26
8. PRUEBAS27
8.1 Estrategia General de Pruebas27
8.2 Casos de Prueba Planificados28
8.3 Pruebas de Usabilidad y Diseño Visual28
8.4 Métricas de Rendimiento29
8.5 Criterios de Aceptación Global29
9. VALIDACIÓN CON EL USUARIO29
9.1 Importancia de la Validación en XP29
9.3 Análisis de la Entrevista e Insights30
9.4 Problemas y Oportunidades Detectadas30
9.5 Resultados Cuantitativos31
9.6 Conclusión de la Validación31
10. RESULTADOS DEL SPRINT 131
10.1 Evaluación General del Sprint31
10.2 Indicadores de Desempeño31
10.3 Incremento del Producto31
10.4 Valor Generado32
10.5 Objetivos para el Sprint 232
11. Lecciones Aprendidas — Sprint 133
12. Trabajo Futuro34
13. Anexos35
13.1 Repositorio GitHub del Proyecto35
13.2 Evidencia de la Entrevista con el Usuario35
13.3 Capturas de Pantalla de la Aplicación (Sprint 1)36
13.4 Otros Documentos de Soporte36

# RESUMEN EJECUTIVO
El presente documento constituye el informe de avance correspondiente al desarrollo inicial del proyecto denominado “Catálogo virtual de flora ornamental de Iquitos con identificación morfológica asistida”, ejecutado en el marco del curso de Botánica Sistemática como actividad de Responsabilidad Social Universitaria. Este proyecto tiene como propósito principal la creación de una herramienta digital interactiva que permita identificar especies ornamentales mediante la observación de caracteres morfológicos, facilitando su reconocimiento tanto para estudiantes como para la comunidad en general. Durante esta primera fase, se ha llevado a cabo un proceso de planificación y levantamiento de información que incluye la selección inicial de especies, la estandarización de criterios morfológicos, el diseño de fichas técnicas y la definición de la estructura funcional del catálogo. Asimismo, se realizaron observaciones de campo y recopilación de material fotográfico en distintos espacios urbanos de la ciudad de Iquitos. Los resultados preliminares evidencian la necesidad de contar con herramientas accesibles que sistematicen la información botánica local, ya que actualmente existe limitada disponibilidad de recursos organizados para la identificación de flora ornamental. En respuesta a esta problemática, se propone el desarrollo de un catálogo virtual interactivo, priorizando la facilidad de uso, el valor educativo y la aplicabilidad práctica en contextos urbanos.

| ASPECTO | DETALLE EJECUTIVO |
| --- | --- |
| Nombre del proyecto | Catálogo virtual de flora ornamental de Iquitos con identificación morfológica asistida |
| Problema central | Escasa información sistematizada y accesible sobre especies ornamentales en Iquitos, lo que dificulta su identificación y uso adecuado en contextos urbanos y educativos. |
| Solución propuesta | Desarrollo de un catálogo virtual interactivo con fichas técnicas, banco fotográfico y sistema de búsqueda basado en caracteres morfológicos. |
| Usuario objetivo |  |
| Metodología adoptada | Trabajo por fases: planificación, levantamiento de campo, validación taxonómica, elaboración de fichas técnicas y desarrollo del catálogo digital. |
| Estado actual (Fase inicial) |  |
| Objetivo siguiente fase | Desarrollo funcional del catálogo, integración de base de datos y validación con usuarios. |


# PROBLEMA Y CONTEXTO

## Contexto General: Realidad de la flora ornamental en Iquitos
Iquitos, como principal ciudad de la Amazonía peruana, posee una alta diversidad de flora ornamental distribuida en espacios urbanos como parques, jardines, avenidas y áreas institucionales. Estas especies cumplen funciones importantes tanto estéticas como ecológicas, contribuyendo al paisaje urbano, la regulación ambiental y el bienestar de la población. Sin embargo, a pesar de esta riqueza vegetal, existe una limitada disponibilidad de información sistematizada, accesible y confiable sobre las especies ornamentales presentes en la ciudad. La identificación de plantas suele depender del conocimiento empírico, lo que dificulta su correcta clasificación, uso y conservación. En el ámbito académico, aunque existen conocimientos botánicos teóricos, estos no siempre se traducen en herramientas prácticas accesibles para estudiantes o ciudadanos. Asimismo, no se dispone de plataformas digitales locales que integren información morfológica, visual y taxonómica de manera interactiva.

## Problema Central
La ausencia de una herramienta digital interactiva que permita identificar y consultar especies de flora ornamental de Iquitos mediante características morfológicas, limitando el acceso al conocimiento botánico y su aplicación en contextos urbanos y educativos.La ausencia de una herramienta digital interactiva que permita identificar y consultar especies de flora ornamental de Iquitos mediante características morfológicas, limitando el acceso al conocimiento botánico y su aplicación en contextos urbanos y educativos.El problema que motivo el desarrollo del proyecto se define como





## 2.3 Manifestaciones del Problema
Esta problemática se manifiesta en diversas situaciones. En primer lugar, existe dificultad para identificar correctamente las especies ornamentales debido a la falta de conocimiento especializado y de herramientas de apoyo accesibles. Asimismo, la información disponible no se encuentra organizada de manera clara ni adaptada al contexto local, lo que dificulta su uso por parte de estudiantes y ciudadanos. Por otro lado, la ausencia de recursos digitales interactivos limita el aprendizaje práctico de la botánica, reduciendo la capacidad de los usuarios para reconocer, comparar y diferenciar especies. Esto conlleva a un bajo aprovechamiento de la biodiversidad ornamental y a un uso inadecuado de las especies en espacios urbanos.

| ASPECTO | DESCRIPCION DEL IMPACTO |
| --- | --- |
| Dificultad en la identificación de especies | Los usuarios no pueden reconocer plantas ornamentales sin conocimiento especializado. |
| Falta de información accesible | No existen plataformas locales organizadas con fichas técnicas claras y visuales. |
| Uso inadecuado de especies | Se seleccionan plantas sin criterios técnicos para espacios urbanos. |
| Limitaciones en el aprendizaje | Los estudiantes no cuentan con herramientas prácticas para aplicar la teoría botánica. |
| Desaprovechamiento de la biodiversidad | La flora ornamental local no es valorada ni difundida adecuadamente. |



## 2.4 Magnitud e Impacto del Problema
La falta de herramientas digitales especializadas en flora ornamental tiene un impacto significativo tanto en el ámbito educativo como en el social. Desde el punto de vista académico, limita el desarrollo de competencias prácticas en los estudiantes. Desde el punto de vista social, reduce la valoración y el conocimiento de la biodiversidad local. El desarrollo de un catálogo virtual permitirá mejorar el acceso a la información, facilitar la identificación de especies y promover el uso adecuado de la flora ornamental en la ciudad. Además, contribuirá a la educación ambiental y al fortalecimiento del conocimiento botánico en la población.

| INDICADOR | DETALLE |
| --- | --- |
| Disponibilidad de información | Limitada y dispersa |
| Acceso a herramientas digitales | Muy bajo a nivel local |
| Nivel de conocimiento botánico | Básico en población general |
| Uso de recursos visuales comparativos | Escaso |
| Interés en aprender sobre flora | Alto en estudiantes y comunidad |
| Necesidad de herramientas educativas | Elevada |

d) Perfil del Usuario Objetivo
El proyecto está dirigido a estudiantes, docentes y público en general interesados en la flora ornamental de Iquitos. Estos usuarios presentan un nivel básico o intermedio de conocimiento botánico y requieren una herramienta sencilla, visual e intuitiva que les permita identificar especies de manera práctica.

| DIMENSION | DESCRIPCIÓN |
| --- | --- |
| Usuario principal | Estudiante de Botánica / usuario general |
| Edad | 16 – 60 años |
| Contexto | Académico y urbano |
| Nivel digital | Básico a intermedio |
| Nivel educativo | Secundaria / universitario |
| Necesidad principal | Identificar especies de forma sencilla |
| Expectativa | Plataforma visual, intuitiva y fácil de usar |
| Uso esperado | Consulta, aprendizaje y apoyo en campo |



## 2.5 Análisis de Soluciones Existentes y Brechas
Frente a las limitaciones identificadas en las herramientas existentes, se propone el desarrollo de un catálogo virtual interactivo que integre fichas técnicas, imágenes y un sistema de búsqueda basado en características morfológicas. Esta solución busca ser accesible, fácil de usar y adaptada al contexto local, permitiendo cubrir las necesidades de los usuarios y mejorar el acceso al conocimiento botánico.

| SOLUCIÓN | CARACTERÍSTICAS | LIMITACIONES | BRECHA IDENTIFICADA |
| --- | --- | --- | --- |
| Libros botánicos |  | Poco accesibles y no interactivos | No prácticos para uso cotidiano |
| Páginas web generales | Información variada |  |  |
| Apps de identificación (genéricas) | Reconocimiento por imagen | Baja precisión en especies locales | No adaptadas a Iquitos |
| Bases de datos científicas | Información confiable | Lenguaje técnico complejo | Difícil acceso para usuarios comunes |
| Propuesta del proyecto | Catálogo interactivo con búsqueda morfológica y fichas técnicas | En desarrollo | Adaptado al contexto local y educativo |



# 3. PROPUESTA DE SOLUCIÓN

## 3.1 Visión del Producto
La solución propuesta consiste en el desarrollo de una plataforma digital denominada provisionalmente “Catálogo Virtual de Flora Ornamental de Iquitos”, diseñada como una herramienta interactiva de consulta e identificación botánica basada en características morfológicas.
Desarrollar una herramienta digital accesible, visual e intuitiva que permita a estudiantes, docentes y público en general identificar especies de flora ornamental de Iquitos mediante la observación de sus características morfológicas, facilitando el aprendizaje, la consulta y la valoración de la biodiversidad local.Desarrollar una herramienta digital accesible, visual e intuitiva que permita a estudiantes, docentes y público en general identificar especies de flora ornamental de Iquitos mediante la observación de sus características morfológicas, facilitando el aprendizaje, la consulta y la valoración de la biodiversidad local.




El sistema estará orientado a integrar información científica con recursos visuales, eliminando la dependencia de libros técnicos complejos y permitiendo el acceso desde dispositivos digitales de uso cotidiano.


## 3.2 Descripción Funcional del Sistema
El catálogo virtual se estructurará en cuatro módulos principales:

Módulo 1: Catálogo de Especies (Base de Datos Botánica)
Este módulo permitirá visualizar y gestionar el conjunto de especies ornamentales registradas. Cada especie contará con una ficha técnica estructurada que incluirá:
- Galería de imágenes
- Nombre científico y común
- Familia botánica
- Origen
- Hábito de crecimiento
- Caracteres diagnósticos
- Tipo de flor y color de flor
- Tipo de fruto y tipo de inflorescencia
- Tipo de semilla y tipo de infrutescencia
- Tipo y color de exudado
- Valor ornamental
- Descripción morfológica
- Usos urbanos
El usuario podrá consultar, filtrar y explorar las especies de manera rápida y organizada.

Módulo 2: Búsqueda Morfológica (Identificación de Especies)
Este módulo constituye el núcleo funcional del sistema. Permitirá al usuario seleccionar características observables de una planta, tales como:
- Color y tipo de flor
- Tipo de fruto
- Características de la semilla
- Presencia y tipo de exudado
A partir de estas selecciones, el sistema generará una lista de especies probables, facilitando la identificación mediante comparación visual.

Módulo 3: Banco Fotográfico Comparativo
Este módulo almacenará imágenes estandarizadas de cada especie, incluyendo:
- Planta completa
- Hojas
- Flores
- Frutos
- Semillas
- Tallo o corteza
El usuario podrá comparar visualmente las imágenes con la planta observada en campo, mejorando la precisión en la identificación.

Módulo 4: Fichas Técnicas Interactivas
Al seleccionar una especie, el usuario accederá a una ficha técnica completa que integrará toda la información disponible de manera clara y organizada.
Estas fichas estarán diseñadas tanto para uso académico como para consulta general, permitiendo comprender las características, usos y valor ornamental de cada especie.




## 3.3 Alcance del Sistema – Sprint 1 al Sprint 6
El desarrollo del catálogo virtual se organizará en seis sprints:

| SPRINT |  | ALCANCE COMPROMETIDO |
| --- | --- | --- |
| Sprint 1 | Problema valido | Investigación del problema, definición del proyecto, selección inicial de especies, estructura de fichas técnicas. |
| Sprint 2 | Prototipo inicial |  |
| Sprint 3 | MVP funcional |  |
| Sprint 4 | Sistema completo | Integración del banco fotográfico y mejora de la navegación |
| Sprint 5 | Optimización |  |
| Sprint 6 | Producto final |  |






## 3.4 Valor Diferencial y Justificación de la Propuesta
La propuesta se diferencia de otras soluciones existentes por los siguientes aspectos:
- Enfoque local: El catálogo está diseñado específicamente para la flora ornamental de Iquitos, priorizando especies presentes en el contexto amazónico.
- Accesibilidad: La herramienta será de fácil acceso y uso, orientada a usuarios sin conocimientos especializados en botánica.
- Enfoque educativo: Integra teoría y práctica, permitiendo a los estudiantes aplicar conocimientos morfológicos en situaciones reales.
- Sistema de identificación progresiva: A diferencia de herramientas tradicionales, permite identificar especies mediante la combinación de características visibles.
- Apoyo visual: El uso de imágenes comparativas mejora la comprensión y precisión en la identificación.
- Desarrollo colaborativo: El sistema se construye con información recolectada por estudiantes, fortaleciendo el aprendizaje y la validación académica.


# 4. METODOLOGIA: EXTREME PROGRAMMING (XP)

## 4.1 Fundamentos de la elección Metodológica
El equipo adoptó la metodología Extreme Programming (XP) como marco de trabajo para el desarrollo del proyecto “Catálogo virtual de flora ornamental de Iquitos con identificación morfológica asistida”, en concordancia con los lineamientos académicos del curso.
XP es una metodología ágil orientada al desarrollo iterativo e incremental, que permite construir soluciones funcionales mediante ciclos cortos de trabajo, con validación constante y mejora continua. Este enfoque resulta especialmente adecuado para proyectos académicos que requieren integrar investigación, desarrollo tecnológico y validación con usuarios.
La elección de XP frente a otras metodologías ágiles responde a las características específicas del proyecto:
- Equipos de trabajo colaborativos:XP se adapta a equipos pequeños, facilitando la coordinación entre los distintos roles del proyecto (levantamiento de información, validación botánica, desarrollo y contenido).
- Iteraciones cortas con entregables funcionales:Cada sprint permite avanzar progresivamente en la construcción del catálogo, integrando componentes como fichas técnicas, banco de imágenes y sistema de búsqueda morfológica.
- Retroalimentación continua:El proyecto incorpora validaciones constantes por parte de estudiantes, docentes y usuarios potenciales, asegurando que el catálogo sea comprensible, útil y funcional.
- Flexibilidad en el desarrollo:La información botánica y los requerimientos del sistema pueden ajustarse a lo largo del proceso, permitiendo mejorar la estructura del catálogo y la calidad de los datos sin afectar el avance general.
- Enfoque en la calidad del producto:XP promueve la revisión continua de la información, garantizando la consistencia en las fichas técnicas, la correcta identificación de especies y la calidad del contenido visual.


## 4.2 Roles Definidos en el Equipo

| ROL XP | ASIGNADO(a) | RESPONSABILIDADES |
| --- | --- | --- |
| Cliente (Tracker del usuario) |  | Mantener comunicación con el usuario real, validar entregas, recopilar feedback y traducirlo en ajustes de requerimientos. |
| Programador / Líder técnico | Danilo Alvarado Marlon Rengifo | Liderar las decisiones de arquitectura, gestionar el repositorio GitHub, desarrollar las funcionalidades críticas. |
| Programador / Tester | Angie Cabanillas Brittany Rengifo Walter Zumaeta | Desarrollar funcionalidades, diseñar y ejecutar casos de prueba, garantizar la calidad de cada entrega. |



## 4.3 Actividades Realizadas en el Primer Sprint
Durante el Sprint 1, el equipo se enfocó en la comprensión del problema, la definición del producto y la planificación técnica del sistema. Las actividades realizadas fueron las siguientes:
4.3.1. Investigación y análisis del problema: Se investigó la situación actual de la información disponible sobre flora ornamental en Iquitos. Se identificó la ausencia de herramientas digitales accesibles y especializadas.
4.3.2. Definición del proyecto: Se definió el nombre, alcance, objetivos y módulos funcionales del catálogo virtual, alineados con el Plan del Proyecto del curso de Botánica Sistemática.
4.3.2. Identificación del usuario real: Se identificó al usuario objetivo principal (estudiantes de Botánica Sistemática y público interesado en flora ornamental) y se realizó una entrevista de validación.
4.3.4. Selección del stack tecnológico: Se evaluaron diversas opciones y se seleccionó React Native con Expo para la app móvil, Sanity como CMS y base de datos, y Clerk para la autenticación de usuarios.
4.3.5. Diseño de la estructura de datos: Se definió el schema de la base de datos en Sanity con los campos necesarios para las fichas técnicas botánicas, organizados en el siguiente orden: galería fotográfica, nombres comunes, nombre científico, familia botánica, origen, hábito de crecimiento, caracteres diagnósticos, tipo de flor, color de flor principal, tipo de fruto, tipo de inflorescencia, tipo de semilla, tipo de infrutescencia, tipo y color de exudado, valor ornamental, descripción morfológica básica y usos urbanos.
4.3.6. Configuración del entorno de desarrollo: Se configuró el repositorio en GitHub, el proyecto de Expo, la conexión con Sanity y la integración con Clerk para autenticación por correo electrónico y Google OAuth.
4.3.7. Elaboración de prototipos iniciales: Se diseñaron wireframes de las pantallas principales del sistema.





## 4.4 Historias de Usuario

| CÓDIGO: HU-01 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero registrarme con mi correo electrónico para acceder al catálogo. |
| CRITERIO DE ACEPTACIÓN | El usuario puede crear una cuenta con correo y contraseña. Se envía un código de verificación al correo. Los mensajes de error aparecen en español. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-02 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero iniciar sesión con Google para acceder de forma rápida |
| CRITERIO DE ACEPTACIÓN | El usuario puede autenticarse mediante Google OAuth. Se muestra un spinner de carga mientras se valida el token. Al completarse, se redirige al buscador principal. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-03 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero buscar plantas por nombre científico o común. |
| CRITERIO DE ACEPTACIÓN | El buscador filtra las especies en tiempo real conforme el usuario escribe. Se busca tanto por nombre científico como por nombres comunes. |
| PRIORIDAD | Alta |





| CÓDIGO: HU-04 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero filtrar plantas por hábito de crecimiento. |
| CRITERIO DE ACEPTACIÓN | Se muestran chips horizontales (Todo, Árbol, Arbusto, Hierba, etc.) que filtran las especies al presionarlos. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-05 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero aplicar filtros morfológicos avanzados para encontrar especies. |
| CRITERIO DE ACEPTACIÓN | Un modal permite seleccionar filtros por: color de flor, tipo de inflorescencia, tipo de fruto, tipo de semilla y tipo de exudado. Los filtros se combinan entre sí. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-06 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero ver la ficha técnica completa de una planta. |
| CRITERIO DE ACEPTACIÓN | Al presionar una tarjeta de planta, se abre la vista de detalle con: galería de imágenes (carrusel), nombre científico, nombre común, familia botánica, origen, hábito de crecimiento, caracteres diagnósticos, tipo de flor, color de flor principal, tipo de fruto, tipo de inflorescencia, tipo de semilla, tipo de infrutescencia, tipo y color de exudado, valor ornamental, descripción morfológica básica y usos urbanos. Los campos vacíos no se muestran. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-07 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero ver imágenes de la planta en un carrusel. |
| CRITERIO DE ACEPTACIÓN | La galería muestra múltiples imágenes con navegación horizontal y puntos indicadores. Si no hay imágenes, se muestra un ícono de hoja. |
| PRIORIDAD | Alta |



| CÓDIGO: HU-08 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero ver información sobre el proyecto. |
| CRITERIO DE ACEPTACIÓN | La pantalla "Acerca del Proyecto" muestra la presentación, justificación, objetivo, funcionalidades, información académica y datos de RSU. |
| PRIORIDAD | Media |




| CÓDIGO: HU-09 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como usuario, quiero cerrar sesión. |
| CRITERIO DE ACEPTACIÓN | Al presionar "Cerrar sesión" en el perfil, saldrá un modal para confirmar el cierre de sesión y después se redirige directamente a la pantalla de inicio de sesión. |
| PRIORIDAD | Alta |






| CÓDIGO: HU-10 |  |
| --- | --- |
| HISTORIA DE USUARIO | Como administrador, quiero gestionar las fichas técnicas desde un panel web. |
| CRITERIO DE ACEPTACIÓN | Sanity Studio permite crear, editar y eliminar fichas de plantas con todos sus campos y galería de imágenes. |
| PRIORIDAD | Alta |



# 5. DISEÑO DE LA SOLUCIÓN

## 5.1 Principios de Diseño de la Interfaz
El diseño de la interfaz se basa en los siguientes principios:
- Accesibilidad visual: Se utilizó un esquema de colores oscuro (dark mode) con acentos en verde (#1FC451) que evoca la temática botánica y reduce la fatiga visual en uso prolongado.
- Simplicidad de navegación: Se implementó una barra de navegación inferior con dos pestañas principales (Buscador y Perfil), reduciendo la complejidad de la navegación.
- Feedback inmediato: Los filtros se aplican en tiempo real, las transiciones entre pantallas incluyen animaciones de deslizamiento, y los estados de carga se indican con spinners.
- Diseño mobile-first: Toda la interfaz está optimizada para dispositivos móviles Android, con soporte táctil, teclados adaptativos y áreas de toque amplias.
- Consistencia visual: Se utiliza la librería Tamagui como sistema de diseño, garantizando consistencia en tipografía, espaciado y componentes a lo largo de toda la aplicación.

## 5.2 Flujo de Navegación del Sistema
El flujo de navegación del sistema es el siguiente:
- El usuario abre la aplicación.
- Si no tiene sesión activa, se muestra la pantalla de Inicio de Sesión.
- Desde Inicio de Sesión puede:
- Iniciar sesión con correo y contraseña.
- Iniciar sesión con Google.
- Navegar a la pantalla de Registro.
- Al autenticarse exitosamente, se redirige al Buscador Principal.
- En el Buscador Principal puede:
- Buscar plantas por texto.
- Filtrar por hábito (chips horizontales).
- Abrir filtros morfológicos avanzados (modal).
- Presionar una tarjeta de planta para ver su Ficha Técnica.
- En la Ficha Técnica puede navegar por la galería de imágenes y consultar toda la información de la especie.
- Desde la pestaña Perfil puede:
- Ver su información de cuenta.
- Acceder a "Acerca del Proyecto".
- Cerrar sesión.


## 5.3 Descripción de Pantallas Principales
- Pantalla de Inicio de Sesión (sign-in.tsx):
- -. Contiene el logo de la aplicación, campos de correo electrónico y contraseña (con toggle de visibilidad), botón de inicio de sesión, botón de inicio con Google y enlace para registrarse.
- Pantalla de Registro (sign-up.tsx):
- -. Similar a la anterior, con campos de correo y contraseña. Al registrarse, se envía un código de verificación por correo. Incluye una segunda vista para ingresar el código de verificación.
- Buscador Principal (index.tsx):
- -. Muestra el saludo personalizado con avatar del usuario, barra de búsqueda con botón de filtros avanzados, chips de hábitos de crecimiento, y una cuadrícula de tarjetas de plantas con imagen, nombre, hábito y familia. Los datos se obtienen en tiempo real desde la base de datos de Sanity. Si no se encuentran resultados con los filtros aplicados, se muestra un estado vacío con el mensaje "No se encontraron especies con esa combinación de caracteres morfológicos".
- Ficha Técnica (plant/[id].tsx):
- -. Presenta un carrusel de imágenes en la parte superior, seguido del nombre de la planta, nombre científico, y una sección de "Ficha Técnica" con todos los caracteres morfológicos organizados en ítems con íconos. Los campos sin datos no se muestran. Incluye secciones de descripción morfológica y usos urbanos.
- Perfil (profile.tsx):
- -. Muestra la foto de perfil del usuario, su nombre y correo electrónico, un badge de rol ("Usuario Explorador"), acceso a "Acerca del Proyecto" y botón de cerrar sesión.
- Acerca del Proyecto (about.tsx):
- -. Página informativa con la presentación del proyecto, justificación, objetivo, funcionalidades disponibles, información académica (curso, institución, ámbito) y datos de RSU.


- Panel Administrativo – Sanity Studio:
- -. Interfaz web desplegada en la nube que permite al administrador gestionar todas las fichas técnicas de plantas. Permite crear, editar y eliminar registros, subir imágenes a la galería y llenar todos los campos morfológicos. Los campos se presentan en el mismo orden definido en el schema: galería fotográfica, nombres comunes, nombre científico, familia botánica, origen, hábito de crecimiento, caracteres diagnósticos, tipo de flor, color de flor principal, tipo de fruto, tipo de inflorescencia, tipo de semilla, tipo de infrutescencia, tipo y color de exudado, valor ornamental, descripción morfológica básica y usos urbanos. También se puede ejecutar localmente con "cd sanity && npm run dev".

# 6. ARQUITECTURA Y TECNOLOGÍA

## 6.1 Proceso de Selección del Stack Tecnológico
La selección del stack tecnológico se realizó considerando los siguientes criterios:
- Accesibilidad multiplataforma: Se requería una solución que funcionara en dispositivos Android de gama baja a media, comunes entre los estudiantes de la UNAP.
- Velocidad de desarrollo: Al tratarse de un proyecto académico con plazos definidos por sprints, se priorizaron herramientas que permitieran un desarrollo ágil.
- Gestión de contenido flexible: La información botánica necesita ser actualizada constantemente por múltiples colaboradores (estudiantes del curso de Botánica Sistemática), por lo que se requería un CMS accesible desde la web.
- Autenticación segura: Se necesitaba un sistema de autenticación robusto que permita controlar el acceso al catálogo.
- Costo: Se priorizaron herramientas con planes gratuitos o de bajo costo para proyectos académicos.

## 6.2 Stack Tecnológico Definitivo
- CAPA
- TECNOLOGÍA
- VERSIÓN
- JUSTIFICACIÓN


| Frontend (App Móvil) | React Native + Expo React Native 0.81 / Expo 54 Framework multiplataforma que permite desarrollar para Android e iOS desde un solo código base. Expo simplifica la configuración y el despliegue. |
| --- | --- |
| UI Components | Tamagui 1.135 Librería de componentes UI optimizada para React Native que proporciona un sistema de diseño consistente con soporte para temas y tokens de diseño. |
| Navegación | React Navigation (Stack + Tabs) 7.x Sistema de navegación estándar para React Native. Se utiliza JS Stack para animaciones de deslizamiento bidireccionales en Android. |
| Íconos | @expo/vector-icons (MaterialCommunityIcons, Feather, AntDesign) 15.x Librería de íconos vectoriales integrada con Expo que incluye múltiples familias de íconos. |
| Backend / CMS | Sanity.io CMS headless que funciona como base de datos NoSQL en la nube. Incluye Sanity Studio como panel de administración web. |
| Autenticación | Clerk2.15 Servicio de autenticación que proporciona inicio de sesión por correo electrónico y Google OAuth, gestión de sesiones y tokens seguros. |
| Almacenamiento seguro | expo-secure-store 15.x Almacenamiento encriptado en el dispositivo para tokens de autenticación. |
| Lenguaje | TypeScript 5.9 Superset tipado de JavaScript que mejora la calidad del código y reduce errores en tiempo de desarrollo. |
| Control de versiones | Git + GitHub -Sistema de control de versiones distribuido con repositorio remoto en GitHub. |



## 6.3 Arquitectura del Sistema
La arquitectura del sistema sigue un patrón de tres capas:
- Capa de Presentación (App Móvil):
- -. Aplicación React Native compilada con Expo que se ejecuta en dispositivos Android. Incluye las pantallas de autenticación, el buscador con filtros, las fichas técnicas y el perfil de usuario.
- Capa de Datos (Sanity.io):
- -. Base de datos NoSQL alojada en la nube de Sanity. Almacena los documentos de plantas con todos sus campos morfológicos y la galería de imágenes. Se accede mediante el cliente @sanity/client y las imágenes se procesan con @sanity/image-url.
- Capa de Autenticación (Clerk):
- -. Servicio externo que gestiona el registro, inicio de sesión (correo + Google OAuth), verificación de correo, tokens de sesión y gestión de usuarios. Se integra con la app mediante @clerk/clerk-expo.
- Panel de Administración (Sanity Studio):
- -. Aplicación web independiente que permite a los administradores gestionar el contenido del catálogo sin necesidad de modificar código. Se ejecuta localmente con "cd sanity && npm run dev".


# 7. DESARROLLO POR ITERACIONES

| 7.1 Sprint 1 – Detalle de Ejecución |  |
| --- | --- |
| Objetivo del Sprint | Validar el problema, definir el proyecto y establecer la base técnica del sistema. |
| Duración | 3 semanas |
| Actividades principales | - Investigación de la problemática de flora ornamental en Iquitos. - Revisión de soluciones existentes (libros botánicos, apps genéricas, bases de datos científicas). - Definición del alcance y los 4 módulos funcionales del sistema. - Selección y configuración del stack tecnológico. - Diseño del schema de base de datos en Sanity. - Implementación del sistema de autenticación (registro, inicio de sesión, Google OAuth). - Desarrollo de la pantalla principal del buscador con filtros por hábito. - Creación del componente de tarjeta de planta (PlantCard). - Implementación de la vista de detalle con ficha técnica. - Configuración del panel administrativo (Sanity Studio). - Entrevista de validación con usuario real. |





## 7.2 Tareas Completadas y Tiempo Invertido


| TAREA 01 | Investigación del problema y contexto |
| --- | --- |
| RESPONSABLE(S) | Todo el equipo |
| TIEMPO ESTIMADO | 1 semana |
| ESTADO | Completado |



| TAREA 02 | Definición del proyecto y módulos |
| --- | --- |
| RESPONSABLE(S) | Todo el equipo |
| TIEMPO ESTIMADO | 3 días |
| ESTADO | Completado |



| TAREA 03 | Configuración del entorno (Expo, Sanity, Clerk, GitHub) |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado |
| TIEMPO ESTIMADO | 2 días |
| ESTADO | Completado |



| TAREA 04 | Diseño del schema de base de datos |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado, Marlon Rengifo |
| TIEMPO ESTIMADO | 1 día |
| ESTADO | Completado |



| TAREA 05 | Sistema de autenticación (correo + Google) |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado |
| TIEMPO ESTIMADO | 3 días |
| ESTADO | Completado |



| TAREA 06 | Pantalla del buscador principal |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado, Marlon Rengifo |
| TIEMPO ESTIMADO | 2 días |
| ESTADO | Completado |



| TAREA 07 | Filtros morfológicos avanzados |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado |
| TIEMPO ESTIMADO | 2 días |
| ESTADO | Completado |



| TAREA 08 | Vista de detalle (ficha técnica) |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado, Marlon Rengifo |
| TIEMPO ESTIMADO | 2 días |
| ESTADO | Completado |



| TAREA 09 | Pantalla de perfil y "Acerca del proyecto" |
| --- | --- |
| RESPONSABLE(S) | Danilo Alvarado |
| TIEMPO ESTIMADO | 1 día |
| ESTADO | Completado |



| TAREA 10 | Entrevista con usuario real |
| --- | --- |
| RESPONSABLE(S) | Angie Cabanillas, Brittany Rengifo |
| TIEMPO ESTIMADO | 1 día |
| ESTADO | Completado |



| TAREA 11 | Elaboración del documento del Sprint 1 |
| --- | --- |
| RESPONSABLE(S) | Walter Zumaeta, Angie Cabanillas |
| TIEMPO ESTIMADO | 3 días |
| ESTADO | Completado |




| 7.3 Incremento del Producto en el Sprint 1 Al finalizar el Sprint 1, el producto cuenta con las siguientes funcionalidades operativas: | - Sistema de autenticación funcional (registro por correo con verificación, inicio de sesión, Google OAuth). - Traducción de mensajes de error de Clerk al español. - Toggle de visibilidad de contraseña. - Spinner de carga durante la autenticación con Google. - Buscador principal con filtro por texto (nombre científico y común). - Filtro por hábito de crecimiento mediante chips interactivos. - Modal de filtros morfológicos avanzados (color de flor, inflorescencia, fruto, semilla, exudado). - Tarjetas de plantas con imagen, nombre, hábito y familia. - Vista de detalle con carrusel de imágenes y ficha técnica completa. - Campos vacíos se ocultan automáticamente en la ficha técnica. - Pantalla de perfil con datos del usuario y cierre de sesión. - Pantalla "Acerca del Proyecto" con información de RSU. - Panel administrativo (Sanity Studio) para gestión de fichas botánicas. - Navegación con animaciones de deslizamiento bidireccionales. |
| --- | --- |






## 7.4 Obstáculos Encontrados y Soluciones


| OBSTÁCULO | Doble vista durante OAuth |
| --- | --- |
| DESCRIPCIÓN | Al iniciar sesión con Google, el usuario veía un parpadeo entre la pantalla de login y el buscador antes de la redirección final. |
| SOLUCIÓN APLICADA | Se implementó un spinner de carga a pantalla completa que se activa tras el login exitoso, ocultando la transición mientras Clerk valida el token. |




| OBSTÁCULO | Animaciones de navegación en Android |
| --- | --- |
| DESCRIPCIÓN | La librería Native Stack de React Navigation no mostraba animaciones de retroceso en Android. |
| SOLUCIÓN APLICADA | Se migró a JS Stack (@react-navigation/stack) con CardStyleInterpolators.forHorizontalIOS para garantizar animaciones bidireccionales consistentes. |



| OBSTÁCULO | Sombras fantasmas en tarjetas |
| --- | --- |
| DESCRIPCIÓN | Los componentes Card de Tamagui mostraban sombras dobles no deseadas cuando la propiedad "elevate" estaba activada. |
| SOLUCIÓN APLICADA | Se eliminó la propiedad "elevate" de todos los componentes Card en las pantallas de autenticación. |





| OBSTÁCULO | Mensajes de error en inglés |
| --- | --- |
| DESCRIPCIÓN | Los errores de Clerk (correo inválido, contraseña incorrecta, cuenta duplicada) aparecían en inglés. |
| SOLUCIÓN APLICADA | Se implementó un sistema de traducción de errores en el catch de cada formulario, mapeando los códigos de error de Clerk a mensajes en español. |





# 8. PRUEBAS

## 8.1 Estrategia General de Pruebas
La estrategia de pruebas del proyecto se basa en los principios de la metodología Extreme Programming (XP), priorizando la validación continua del sistema en cada iteración del desarrollo. El objetivo es garantizar que cada funcionalidad implementada cumpla con los requisitos definidos y proporcione una experiencia de usuario adecuada.
Las pruebas se realizaron tanto en emuladores (Expo Go) como en dispositivos Android reales de gama media, con el fin de evaluar el comportamiento del sistema en condiciones cercanas al entorno real de uso.
Se definieron cuatro niveles de prueba:
- Pruebas de componente: Evaluación individual de cada pantalla (inicio de sesión, registro, buscador, ficha técnica, perfil).
- Pruebas de integración: Validación de la interacción entre componentes (por ejemplo, aplicación de filtros y actualización de resultados).
- Pruebas de aceptación: Verificación del cumplimiento de las historias de usuario definidas.
- Pruebas de usabilidad (UI/UX): Evaluación de la facilidad de uso, claridad visual y navegación del sistema.
En este último nivel, se tomó como referencia un diseño moderno basado en tarjetas visuales e interfaces tipo catálogo, priorizando el uso de imágenes, iconos y colores temáticos (verde sobre modo oscuro), con el fin de facilitar la identificación de especies de manera intuitiva.

## 8.2 Casos de Prueba Planificados
Durante el Sprint 1 se ejecutaron un total de 13 casos de prueba funcionales, obteniendo los siguientes resultados:
- Casos ejecutados: 13
- Casos aprobados: 13
- Tasa de éxito: 100%
- Errores detectados: 3
- Errores corregidos: 100%
Los principales errores identificados estuvieron relacionados con:
- Mensajes de error en inglés durante la autenticación
- Transiciones visuales en el inicio de sesión con Google
- Problemas de navegación en Android
Estos fueron solucionados mediante la implementación de traducción de errores, uso de indicadores de carga (spinner) y ajuste en la navegación.


## 8.3 Pruebas de Usabilidad y Diseño Visual
Se evaluó la interacción del usuario con la interfaz, considerando los siguientes aspectos:
- Comprensión del diseño basado en tarjetas de plantas
- Facilidad para utilizar el buscador y los filtros morfológicos
- Claridad de la información mostrada en la ficha técnica
Resultados observados:
- El diseño visual facilita la identificación rápida de especies
- Las imágenes tienen un rol fundamental en la experiencia del usuario
- Los iconos (tipo, clima, características) permiten reducir la carga cognitiva
- La navegación es intuitiva y no requiere aprendizaje previo
Esto confirma que un enfoque visual tipo catálogo es adecuado para el objetivo del sistema.





## 8.4 Métricas de Rendimiento
Se obtuvieron las siguientes métricas en pruebas preliminares:
- Tiempo de carga del buscador: 1.5 – 2.2 segundos
- Tiempo de autenticación: 2 – 3 segundos
- Tiempo de apertura de ficha técnica: menor a 1.5 segundos
Estos valores son aceptables para dispositivos de gama media, aunque se plantea optimizar el rendimiento en futuras iteraciones.


## 8.5 Criterios de Aceptación Global
El sistema se considera aceptable si cumple con:
- Implementación completa de las historias de usuario del sprint
- Interfaz totalmente en español
- Navegación fluida y sin errores visuales
- Correcta visualización de datos desde la base de datos
- Funcionamiento estable en dispositivos Android
Criterios de rechazo:
- Tiempos de respuesta mayores a 3 segundos
- Errores en autenticación
- Información incompleta o mal presentada



# 9. VALIDACIÓN CON EL USUARIO

## 9.1 Importancia de la Validación en XP
9.2 Perfil del Usuario Validado

## 9.3 Análisis de la Entrevista e Insights

## 9.4 Problemas y Oportunidades Detectadas

## 9.5 Resultados Cuantitativos

## 9.6 Conclusión de la Validación


# 10. RESULTADOS DEL SPRINT 1

## 10.1 Evaluación General del Sprint
El Sprint 1 se completó satisfactoriamente, alcanzando el 100% de los objetivos planteados dentro del tiempo estimado. El equipo logró construir una base funcional sólida del sistema.

## 10.2 Indicadores de Desempeño
- Tareas completadas: 100%
- Tiempo estimado vs real: Cumplido
- Errores detectados: 3
- Errores corregidos: 100%
- Funcionalidades implementadas: 12

## 10.3 Incremento del Producto
El producto obtenido es un prototipo funcional que incluye:
- Sistema de autenticación completo
- Buscador con filtros morfológicos
- Fichas técnicas interactivas
- Interfaz visual basada en tarjetas e imágenes
- Panel administrativo operativo
El diseño implementado se alinea con patrones modernos de aplicaciones móviles, mejorando la experiencia del usuario.

## 10.4 Valor Generado
El Sprint 1 permitió:
- Validar la viabilidad técnica del sistema
- Confirmar la necesidad del usuario
- Definir una experiencia de usuario basada en elementos visuales
- Establecer la arquitectura base del proyecto

## 10.5 Objetivos para el Sprint 2
- Integración de datos reales desde Sanity
- Optimización de consultas y rendimiento
- Implementación de carga progresiva de imágenes
- Evaluación de funcionalidad offline
- Segunda validación con usuarios

















# 11. Lecciones Aprendidas — Sprint 1
Durante el desarrollo del Sprint 1, el equipo identificó cinco lecciones clave que orientarán el trabajo en los siguientes sprints. Estas lecciones surgen de los obstáculos encontrados, las decisiones técnicas tomadas y la retroalimentación obtenida en la validación con el usuario.


| N° | Lección Aprendida | Descripción / Impacto |
| --- | --- | --- |
| Lección 1 | La elección del stack tecnológico impacta directamente en la productividad | La combinación React Native + Expo + Sanity permitió avanzar rápidamente, pero requirió un período de aprendizaje para comprender las particularidades de cada herramienta. |
| Lección 2 | Los detalles de UX marcan la diferencia | Aspectos como la traducción de mensajes de error al español, el spinner de carga durante el OAuth y el toggle de visibilidad de contraseña mejoran significativamente la experiencia del usuario. |
| Lección 3 | La validación temprana evita retrabajo | La entrevista con el usuario real confirmó que la dirección del proyecto era correcta y ayudó a priorizar funcionalidades clave. |
| Lección 4 | La documentación debe ir a la par del desarrollo | Dejar la documentación para después del desarrollo genera inconsistencias y dificulta la trazabilidad del trabajo realizado. |
| Lección 5 | Android requiere atención especial en navegación | Las animaciones que funcionan correctamente en iOS pueden no funcionar en Android, lo que requiere soluciones específicas como el uso de JS Stack con CardStyleInterpolators. |



# 12. Trabajo Futuro
Con base en los resultados del Sprint 1 y las lecciones aprendidas, se han definido las metas y funcionalidades a desarrollar en los próximos sprints. El siguiente cuadro resume el plan de trabajo futuro hasta la entrega final del producto.


| Sprint | Objetivo | Funcionalidades / Actividades Planificadas |
| --- | --- | --- |
| Sprint 2 | Prototipo con datos reales | Carga masiva de fichas técnicas botánicas validadas Banco fotográfico de campo Mejora del diseño visual y UX. |
| Sprint 3 | MVP funcional completo | Sistema de favoritos Optimización del buscador morfológico Pruebas con múltiples usuarios. |
| Sprint 4 | Sistema completo | Mejora de la galería fotográfica Navegación entre especies similares Optimización de rendimiento. |
| Sprint 5 | Optimización y estabilidad | Corrección de errores reportados mejoras de accesibilidad pruebas en dispositivos de gama baja. |
| Sprint 6 | Producto final | Validación final con usuarios e instituciones Generación del APK Documentación completa; Presentación final. |




# 13. Anexos

## 13.1 Repositorio GitHub del Proyecto
El código fuente del proyecto se encuentra alojado en el repositorio GitHub del equipo. Los detalles se resumen a continuación:


| Campo | Detalle |
| --- | --- |
| URL del repositorio | https://github.com/daniloalvarado/App-de-Taller-2. |
| Contenido principal | Código fuente de la app móvil (React Native + Expo) |
| Panel administrativo | Sanity Studio — carpeta sanity/ |
| Documentación | Carpeta Documentación/ |
| Configuración | Archivo .env con variables de entorno y claves de API |



## 13.2 Evidencia de la Entrevista con el Usuario
Se adjunta la evidencia fotográfica y el registro de la entrevista realizada con el usuario real. Esta evidencia respalda la validación del problema y la pertinencia de las funcionalidades planificadas.


| [ Fotografía de la entrevista — Agregar imagen aquí ] (Por agregar) |
| --- |



| [ Captura de pantalla / documento adicional — Agregar aquí ] (Por agregar) |
| --- |






## 13.3 Capturas de Pantalla de la Aplicación (Sprint 1)
Se adjuntan capturas de las pantallas principales desarrolladas durante el Sprint


















## 13.4 Otros Documentos de Soporte
Espacio reservado para cualquier documento adicional relevante para el Sprint 1 (actas, esquemas, diagramas, etc.).

Diagrama de Clase


















Diagrama de Secuencia del Buscador
