# Fullfuel API (v1)

<p align="center">
  <img width="150" alt="Fullfuel" src="src/static/brand/fullfuelIcon.png">
</p>

![Fullfuel API CI](https://github.com/medinamarquezp/full-fuel/workflows/Fullfuel%20API%20CI/badge.svg)

## Documentación
- [¿Qué es Fullfuel API?](#que-es-fullfuel-api)
- [¿Qúe necesito para poder hacer funcionar este proyecto?](#que-necesito-para-poder-hacer-funcionar-este-proyecto)
- [Cómo configurar el proyecto](#como-configurar-el-proyecto)
- [Cómo cargar datos en la aplicación](#como-cargar-datos-en-la-aplicacion)
- [Uso de la API](#uso-de-la-api)
- [Testeo de la aplicación](#testeo-de-la-aplicacion)
- [Estilo de commits](#estilo-de-commits)

## ¿Qué es Fullfuel API?
Fullfuel API expone los contenidos consumidos por la [APP Fullfuel](https://github.com/medinamarquezp/full-fuel-app). Esta API obtiene datos desde [https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help](https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help), los procesa y los expone de una manera más amigable. Además de esto, expone una serie de endpoints adicionales necesarios para el correcto funcionamiento de la aplicación. Más adelante se explican en detalle cada uno de los endpoints disponibles en esta API.

## ¿Qúe necesito para poder hacer funcionar este proyecto?
Esta API ha sido desarrollada haciendo uso de [NodeJS](https://nodejs.org/es/download/) y [TypeScript](https://www.typescriptlang.org/), por lo que es necesario disponer del runtime de NodeJS instalado. Además de esto, es recomendable disponer de [Docker](https://docs.docker.com/desktop/#download-and-install) para poder ejecutar el entorno de desarrollo.

## Cómo configurar el proyecto
Comenzaremos clonando la rama master de este repositorio a nuestro equipo. hecho esto y antes de proseguir, instalaremos las dependencias del proyecto ejecutando el siguiente comando en la raíz del proyecto:

```
npm install
```

Tras esto, deberemos crear el fichero de conficguración con las variables de entorno necesarias para poder ejecutar el proyecto. Es posible trabajar con un entorno de desarrollo local, pero recomendable utilizar Docker y Docker compose. Para ello:
- Deberemos acceder al directorio ```/src/config```.
- En este directorio disponemos del fichero .env. Lo clonaremos y llamaremos docker.env.
- A continuación se definen cada una de las variables disponibles:
    - LOGGER: Los logs de la aplicación pueden ser pintados de dos modos "file" y "console". File arroja todos los logs a ficheros que serán ubicados en ```/logs```. Si elegimos console, los log serán pintados en la consola.
    - SERVER_PORT: Puerto en el que se ejecutará la API.
    - MYSQL_*: Variables relacionadas con la configuración de la conexión a la base de datos.
    - REDIS_CONNECTION_PATH: URL de conexión al servidor de Redis. Si lo ejecutamos mediante docker, esta URL será "redis://redis:6379".
    - RATE_LIMITER_POINTS: Número de peticiones máximas que podrá realizar una IP a la API antes de ser bloqueada como medida de protección ante ataques de denegación de servicio.
    - RATE_LIMITER_DURATION: Tiempo que quedará bloqueada la IP por haber superado el número de peticiones indicado en RATE_LIMITER_POINTS.
    - FCM_*: Datos de conexión a [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging).
    - API_TOKEN: Token que deberá ser utilizado en la cabecera Authorization para poder hacer uso de la API.
- Con el fichero de configuración creado y configurado, pasaremos a ejecutar docker compose para iniciar nuestro entorno de desarrollo.
- Para ello, volveremos a la ruta raíz del proyecto y ejecutaremos el siguiente comando para levantar el proyecto: ```docker-compose up -d```.
- Cuando el proyecto se haya iniciado, podremos acceder a http://localhost:SERVER_PORT/ y deberemos ver una respuesta similar a la siguiente:
```json
{
    "timestamp": "2021-02-04T23:56:39.199Z",
    "status": "OK",
    "statusCode": 200,
    "response": "Fullfuel app UP and running!"
}
```
- Para poder continuar, necesitaremos crear el esquema sql en el contenedor docker de la base de datos MySQL. El esquema se encuentra disponible en ```/db/schema.sql```. Para poder ejecurarlo en el contenedor y crear el esquema ejecuteraremos el siguiente comando en la ruta raíz del proyecto:

```
docker exec -i api_db mysql -uMYSQL_USER -pMYSQL_PASSWORD fullfuel < db/schema.sql
```

Con el proyecto configurado y el esquema creado, podemos proseguir con los pasos necesarios para cargar contenido en nuestra aplicación.

## Cómo cargar datos en la aplicación
Esta aplicación dispone de una serie de comandos para poder descargar datos desde los servidores de Minetur y almacenarlos procesados en nuestra base de datos y caché para que estos estén disponibles para consumir desde nuestra API. A continuación se muestran los pasos necesarios para poder realizar una carga inicial de contenidos en nuestro proyecto:

- Comenzaremos compilando los ficheros del proyecto para poder ejecutar los comandos de carga de datos. Esto es necesario debido a que el código fuente del proyecto es TypeScript y para poder hacer uso de este debemos compilarlo a JavaScript, para ello, en la raíz de nuestro proyecto ejecutaremos el siguiente comando:
```
npm run build
```
- Con el código del proyecto compilado, comenzaremos descargando los datos de las comunidades autónomas. Estos datos son necesarios para posteriormente descargar los datos relacionados con las estaciones de servicio, por lo que siempre deberemos ejecutarlos en este orden. Para ello ejecutaremos:
```
npm run ccaaJob
```

Al ejecutar el comando en nuestro proyecto, podríamos encontrarnos el siguiente error:
*UnhandledPromiseRejectionWarning: Error: Error on persisting CCAAs. Error: SequelizeAccessDeniedError: Access denied for user ''@'172.18.0.1' (using password: NO)*

Esto es debido a que, al ejecutar el comando de npm, no se están teniendo en cuenta las variables de entorno que hemos configurado previante en nuestro proyecto. Para solucionarlo, deberemos realizar el siguiente ajuste en la setencia asociada al comando en el fichero ```package.json```.

Agregaremos antes de la palabra node lo siguiente:
**env-cmd -f ./src/config/docker.env**

De modo que el comando debería quedar de la siguiente manera:
```env-cmd -f ./src/config/docker.env node build/apps/scheduledTasks/jobs/CCAAJob.js```

Es importante que este cambio no lo subamos al repositorio de código, por lo que podemos mantenerlo en un stash local. Deberemos aplicar los mismos cambios al resto de comando que queramos ejecutar.

- Seguidamente descargaremos los datos de todas las estaciones de servicio de España, los procesaremos y almacenaremos en nuestra base de datos local y en la caché. Este proceso se ejecuta en paralelo, lanzando un proceso por cada una de las comunidades autónomas, por lo que no debería demorarse más de 10 minutos (dependerá de la máquina en la que se ejecute y del número de procesos que esta pueda ejecutar en paralelo). Deberemos ejecutar el siguiente comando:
```
npm run fuelStationsJob
```
Cuando ejecutes este comando, es posible que te encuentres un mensaje como el siguiente *Current hour is XX and job should not be running.* Esta es una validación que previene ejecutar el comando por error en entornos productivos cuando no debe ejecutarse. Esta validación podemos inhabilitarla en nuestro entorno local de la siguiente manera:
- Accederemos al fichero ```/apps/shceduledTasks/jobs/FuelStationsJob```. Deberemos comentar los métodos ```validateJobExecutionTime()``` y ```validateIfJobExecuted()```.
- Seguidamente volveremos a compilar nuestro proyecto y probaremos a ejecutar de nuevo el comando ```npm run fuelStationsJob```

Estos son los dos comandos principales y necesarios para hacer funcionar este proyecto. Existen otros comandos disponibles en el fichero ```package.json```, pero estos no son necesarios para comenzar a trabajar en el proyecto, por lo que de momento no serán documentados.

## Uso de la API
Tras haber configurado el proyecto y haber realizado nuestra primera carga de datos, ya podemos utilizar la API en nuestro entorno local 🎉🎉🎉

A continuación se muestran los endpoints disponibles para poder consultar en nuestra API. Esta documentación pretende migrarse a Swagger próximamente, pero de momento por algo hay que empezar 😉

- **Api levantada y funcionando:** Se trata de un simple endpoint que nos indica si la API está levantanda y escuchando. Podemos acceder a este mediante una petición **GET** a la ruta: ```http://localhost:SERVER_PORT```

El resto de endpoints disponibles en esta API requiren un token para poder ser usados. Este token es el que habremos configurado en nuestro archivo .env con el identificador **API_TOKEN**.

La manera de usarlo es tan sencilla como indicar en la cabecera el parámetro **Authorization** y asignarle el valor **bearer API_TOKEN**. Teniendo esto en cuenta, podemos continuar.

- **Estaciones de servicio:** Las estaciones de servicio pueden ser consultadas usando diferentes peticiones. Es importante recordar que en todas ellas debemos usar el parámetro de autorización en la cabecera.

  - **Listado de estaciones de servicio por geoposición:** Esta petición debe rebicir obligatoriamente los parametros latitud, longitud y radio de búsqueda. Podríamos enviar un cuarto parámetro opcional que consistiría en un valor booleano (true/false) que indicaría si queremos recibir únicamente las estaciones de servicio que se encuentren abiertas al momento de realizar la consulta:
  **GET** ```http://localhost:SERVER_PORT/v1/fuelstations/list/geo/{latitud}/{longitud}/{radio}/{soloEstacionesAbiertas(opcional)}```.

  - **Listado de estaciones de servicio por ID de estación de servicio:** Similar a la petición anterior, pero en lugar de listar las estaciones de servicio próximas a un radio, esta petición lista las estaciones de servicio que nosotros solicitemos por sus Ids. Los parametros obligatorios son latitud, longitud y el listado de ids separados por comas (ejemplo: 1,2,3):
  **GET** ```http://localhost:SERVER_PORT/v1/fuelstations/list/id/{latitud}/{longitud}/{ids}```.

  - **Detalle de una estación de servicio:** Mediante este endpoint podremos consultar el detalle completo de una estación de servicio particular. Para obtener esta respuesta debemos mandar obligatoriamente los parámetros latidud, longitud e ID de estación de servicio:
  **GET** ```http://localhost:SERVER_PORT/v1/fuelstations/detail/{latitud}/{longitud}/{id}```

- **Subscripciones:** Las subscripciones son la manera de saber si disponemos de usuarios interesados en las actualizaciones sobre el precio del combustible de una estación de servicio particular. Al ser una aplicación totalmente anónima, solo almacenamos el número de subsccriptores activos para saber si debemos notificar o no al tópico específico:

  - **Agregar un nuevo subscriptor:** Agregaremos un nuevo subscriptor al computo total. Los parámetros necesarios son el ID de la estación de servicio y el identificador del combustible:
  **PUT** ```http://localhost:SERVER_PORT/v1/subscriptions/add/{idEstacionServicio}/{idCombustible}```

  - **Eliminar un subscriptor:** Restaremos un subscriptor al computo total. Los parámetros necesarios son el ID de la estación de servicio y el identificador del combustible:
  **PUT** ```http://localhost:SERVER_PORT/v1/subscriptions/remove/{idEstacionServicio}/{idCombustible}```

De momento estos son los endpoints disponibles en esta API.

## Testeo de la aplicación
Gran parte del código fuente de la lógica de la aplicación ha sido testeado con tests unitarios y funcionales. Estos tests se encuentran disponibles en ```/tests/contexts```. Los tests han sido realizados usando [Jest](https://jestjs.io/). Para poder ejecutarlos utilizaremos el siguiente comando:

```
npm run test
```

## Estilo de commits
Esta aplicación utiliza la convención [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) para el estilo de los mensajes de los commits. Es importante que se respete esta convención para poder realizar commits sobre la aplicación, ya que existe un preHook que se encarga de validarlo.
