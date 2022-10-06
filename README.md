# App_Notass

TÍTULO
App de Notas de texto.
DESCRIPCIÓN
Implementar una API que permita publicar notas privadas de texto y categorizarlas.

ANÓNIMO:
● Login: usando email + contraseña
● Registro: pide email + contraseña

USUARIOS REGISTRADOS:
● Ver su listado de notas (en el listado sólo se ven los títulos)
● Visualizar una nota
● Crear una nota: título, texto y categoría única (fijas).
● Modificar sus notas: título, texto y categoría
● Opcional:
○ Marcar una nota como pública:
Por defecto todas las notas son privadas y solo puede verlas el usuario que las
creó, pero sí una nota se marca como pública esta se puede ver por cualquier
usuario esté registrado y logueado en la aplicación o no. Las notas públicas
sólo se puede acceder si se conoce la URL.
○ Eliminar una nota
○ Crear, editar y borrar categorías
○ Imagen: poder asociar una imagen (única) a cada nota.

cosas que quedan:

readme.md también las instrucciones para arrancar la API
Falta la colección postman. Ponerla en el repo.

Requisitos mínimos:

ok pero no hay "protecciones" en las notas que tendrían que ser privadas

DB:

DB con solo dos tablas. Habría creado una tabla para las categorias o por lo menos un enum en notes/categoria

"code" y implementar endpoint que devuelve la nota publica que coincide con el code (che paso por param en la url como en la validación usuario de diario de viaje)

API:

en el middleware canEdit no se hace ningun check, solo hacen la query al DB

no cantedit en la creacion de notas

Utilizar Joi en todos los endpoint
getUser, getNotes y getNote sin token? NO

GetNotes devuelve las notas de todo el mundo!! NO. Son privadas.

Controlar usuario que hace la petición.
(En general un usuario puede leer, borrar y editar solo sus notas, revisar esto.
get notes devuelve todo!)
