# Plan de implementación

## Descripción

Partiendo de una aplicación Todo list en una etapa muy temprana de desarrollo se quiere reestructurar sus componentes y arquitectura a la vez que se trabaja en el desarrollo de funcionalidades.
Las funcionalidades a realizar serían:
- crear y eliminar una task. (la edición queda fuera del alcance)
- marcar y desmarcar como completada una task.
- añadir varios contadores: Tareas por hacer, tareas completadas y total de tareas (contando las eliminadas)

A falta de más información voy a asumir el funcionamiento de las funcionalidades a la hora de realizar el desarrollo, tal y como se especifica a continuación:

- Cargar tareas: (estado inicial en LocalStorage): Por sencillez y por usabilidad, asumiremos que el usuario en un inicio tendrá todo vacío. En caso de que el usuario haya guardado algo, en siguientes sesiones se mostrará la información guardada. 
- Guardar tareas: (en LocalStorage): Se guardará en LocalStorage cada uno de los casos siguientes: (crear tarea, eliminar tarea, marcar como completada, desmarcar como completada)

- Crear tarea: Se añade un elemento al listado de TODO list. Las tareas se crean en el estado todo. Debe aumentar en 1 los contadores de tareas actuales y totales.
- Eliminar tarea: Se elimina un elemento del listado de TODO list. Esta acción no afectará al contador de tareas totales, pero sí el de las tareas actuales.
- Marcar como completada: Cambia el estado de la tarea de TODO a Done. Disminuye en 1 el contador de tareas actuales y aumenta en 1 el contador de tareas completadas.
- Desmarcar como completada: Cambia el estado de la tarea de Done a TODO. Disminuye en 1 el contador de tareas completadas y aumenta en 1 el contador de tareas actuales.

## Estructura de datos

### Entidades

TodoTask: 
- id: number => es el identificador de cada tarea
- label: string => contenido de la task
- checked: boolean => estado de la tarea (si es true está en done, si es false está en pending)


## Iteraciones

### It1: Desacoplar los elementos que componen app.tsx en componentes externos y establecer una arquitectura bien definida. 

**Objetivos de la iteración**:

- Mover la página de Todo fuera de app.tsx
- Mover los componentes reutilizables a una carpeta “ui”
- Mover las lógicas de dominio a las correspondientes carpetas (usando clean)

**Overview**:

[Define los componentes que quieres crear]

[Aquí va un diagrama del dominio que vas a usar y las carpetas en las que va a ir]

ui:

- TodoItem
- TodoList
- TodoForm
- Checkbox
- TodoResults

domain:

- c

**Tareas**:


---

### It2: Memorizar todo items

**Objetivos de la iteración**:

- Crear una implementación del repositorio que utilice LocalStorage
- Integrar el nuevo repositorio

**Overview**:

[Aquí va un diagrama actualizado del dominio que vas a usar y las carpetas en las que va a ir]

**Tareas**:

- Bla bla bla

## Notas

- Al haber hecho uso de repositorios ha sido sencillo sustituir el TodoMockRepositoryImpl por el TodoLocalStorageRepositoryImpl. Esto sería también así en caso de querer añadir una implementación que apunte a un endpoint.
- Se ha decidido no mapear las respuestas devueltas por el repositorio dado que los datos son sencillos, pero si la respuesta viniera de backend habría que añadir esa capa adicional antes de que el repositorio devuelva la respuesta.