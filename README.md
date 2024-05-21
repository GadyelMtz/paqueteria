# Estructura de proyecto

/paqueteria
   |
   |---/src
   |        |---/config
   |        |           |---db.js
   |        |---/controllers
   |        |           |---cliente.js
   |        |           |---envio.js
   |        |           |---oficina.js
   |        |           |---query.js
   |        |           |---tipo-envio.js
   |        |---/middleware
   |        |           |---logger.js
   |        |---/models
   |        |           |---cliente.js
   |        |           |---envio.js
   |        |           |---oficina.js
   |        |           |---tipo-envio.js
   |        |---/routes
   |        |           |---cliente.js
   |        |           |---envio.js
   |        |           |---oficina.js
   |        |           |---query.js
   |        |           |---tipo-envio.js
   |        |---server.js
   |---.env
   |---docker-compose.yml
   |---Dockerfile
   |---Entregable final.postman_collection.json
   |---package-lock.json
   |---package.json
   |---README.md


# Modelado de datos 
## Mongo
```
Entidades:
	Oficina:
		ID
		Nombre
		Dirección (calle, número, ciudad, código postal)
		Teléfono
		Email
	Cliente:
		CURP
		Nombre
		Apellidos
		Email
	Tipo de envío:
		ID
		Descripción (terrestre|aéreo|express)
		Precio por km
		Tiempo de entrega estimado
	Envío:
		ID
		Fecha de envío
		Origen (oficina)
		Destino (oficina)
		Tipo de envío
		Cliente
		Peso
		Dimensiones
		Costo total
		Estatus (pendiente|tránsito|entregado)
```

## Redis
```
req: {
	  time: new Date(),
	  method: req.method,
	  url: req.originalUrl,
	  body: req.body,
},
res: {
	  method: res.method,
      body: body,
	},
}
```
# Tabla de endpoints
## CRUD
### Oficinas

| Método | URL                            | Params/Body                                                                                                                                                                                                                                                                                                                                                                                                                | Descripción                                                       |
| ------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| GET    | localhost:3000/api/oficina     | No aplica                                                                                                                                                                                                                                                                                                                                                                                                                  | Muestra la información de todas las oficinas de la base de datos. |
| POST   | localhost:3000/api/oficina/    | {<br>  "_id": "777777777777777777777777",<br>  "ID":"O7",<br>  "NOMBRE": "SUCURSAL NORTWEST",<br>  "DIRECCION": {<br>    "CALLE": "AVENIDA INSURGENTES",<br>    "NUMERO": "400",<br>    "CIUDAD": "TEPIC",<br>    "CODIGO_POSTAL": "63000"<br>  },<br>  "TELEFONO": "+52 1324 43242 54343",<br>  "EMAIL": "NORTHWEST@icloud.com",<br>  "CLIENTES":[<br>      "MAGG020623HNTRZDA9"],<br>  "ENVIOS":[<br>      "E31"]<br>}   | Crea una una oficina con los datos.                               |
| GET    | localhost:3000/api/oficina/:id | id = O7                                                                                                                                                                                                                                                                                                                                                                                                                    | Muestra toda la información de la oficina con el id O1.           |
| PUT    | localhost:3000/api/oficina/O7  | {<br>  "_id": "777777777777777777777777",<br>  "ID":"O7",<br>  "NOMBRE": "SUCURSAL MODIFICADA",<br>  "DIRECCION": {<br>    "CALLE": "AVENIDA INSURGENTES",<br>    "NUMERO": "400",<br>    "CIUDAD": "TEPIC",<br>    "CODIGO_POSTAL": "63000"<br>  },<br>  "TELEFONO": "+52 1324 43242 54343",<br>  "EMAIL": "NORTHWEST@icloud.com",<br>  "CLIENTES":[<br>      "MAGG020623HNTRZDA9"],<br>  "ENVIOS":[<br>      "E31"]<br>} | Actualiza una  oficina dado un id.                                |
| DELETE | localhost:3000/api/oficina/:id | id = O7                                                                                                                                                                                                                                                                                                                                                                                                                    | Elimina una oficina dado un id.                                   |

### Clientes

| Método | URL                                           | Params/Body                                                                                                                                                                                      | Descripción                                                           |
| ------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| GET    | localhost:3000/api/cliente                    | No aplica                                                                                                                                                                                        | Muestra la información de todas las oficinas de la base de datos.     |
| POST   | localhost:3000/api/cliente                    | {<br>  "CURP": "MAGG020623HNTRZDA9",<br>  "NOMBRE": "GADYEL JOSUE",<br>  "APELLIDOS": "MARTINEZ GUZMAN",<br>  "EMAIL": "gadyelmtz@gmail.com",<br>  "OFICINAS":["O7"],<br>  "ENVIOS":["E31"]<br>} | Crea un cliente con los datos.                                        |
| GET    | localhost:3000/api/cliente/:id                | id = MAGG020623HNTRZDA9                                                                                                                                                                          | Muestra toda la información del cliente con el id MAGG020623HNTRZDA9. |
| PUT    | localhost:3000/api/cliente/MAGG020623HNTRZDA9 | {<br>  "CURP": "MAGG020623HNTRZDA9",<br>  "NOMBRE": "GADYEL J",<br>  "APELLIDOS": "MARTINEZ GUZMAN",<br>  "EMAIL": "gadyelmtz@gmail.com",<br>  "OFICINAS":["O7"],<br>  "ENVIOS":["E31"]<br>}     | Actualiza un cliente con el id MAGG020623HNTRZDA9.                    |
| DELETE | localhost:3000/api/cliente/:id                | id = MAGG020623HNTRZDA9                                                                                                                                                                          | Elimina un cliente con el id MAGG020623HNTRZDA9                       |

### Envíos

| Método | URL                          | Params/Body                                                                                                                                                                                                                                                                                       | Descripción                                       |
| ------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| GET    | localhost:3000/api/envio     | No aplica                                                                                                                                                                                                                                                                                         | Muestra todos los envios                          |
| POST   | localhost:3000/api/envio     | {<br>  "ID": "E31",<br>  "FECHA_DE_ENVIO": "2024-05-21",<br>  "PESO": "300 KG",<br>  "DIMENSIONES": "25X25X25 CM",<br>  "COSTO_TOTAL": "$250.00",<br>  "ESTATUS": "TRÁNSITO",<br>  "CLIENTE": "MAGG020623HNTRZDA9",<br>  "ORIGEN": "O1",<br>  "DESTINO": "O2",<br>  "TIPO_DE_ENVIO": "TIPO4"<br>} | Crea un envio con los datos.                      |
| GET    | localhost:3000/api/envio/:id | id = E31                                                                                                                                                                                                                                                                                          | Muestra toda la información del envío con id E31. |
| PUT    | localhost:3000/api/envio/:id | {<br>  "ID": "E31",<br>  "FECHA_DE_ENVIO": "2024-05-21",<br>  "PESO": "30 KG",<br>  "DIMENSIONES": "25X25X25 CM",<br>  "COSTO_TOTAL": "$2500.00",<br>  "ESTATUS": "TRÁNSITO",<br>  "CLIENTE": "MAGG020623HNTRZDA9",<br>  "ORIGEN": "O1",<br>  "DESTINO": "O2",<br>  "TIPO_DE_ENVIO": "TIPO4"<br>} | Actualiza un envío con el id E31.                 |
| DELETE | localhost:3000/api/envio/:id | id= E31                                                                                                                                                                                                                                                                                           | Elimina un envío con el id E31.                   |

### Tipo de envíos

| Método | URL                                  | Params/Body                                                                                                                                                 | Descripción                                                  |
| ------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| GET    | localhost:3000/api/tipo-envio/       | No aplica                                                                                                                                                   | Muestra la información de todos los tipos de envío.          |
| POST   | localhost:3000/api/tipo-envio/       | {<br>  "ID": "TIPO11",<br>  "DESCRIPCION": "TERRESTRE",<br>  "PRECIO_KM": "$10.50",<br>  "TIEMPO_ENTREGA": "24 HORAS",<br>  "ENVIOS":[<br>      "E31"]<br>} | Crea un tipo de envío con los datos.                         |
| GET    | localhost:3000/api/tipo-envio/:id    | id = TIPO11                                                                                                                                                 | Muestra toda la información del tipo de envío con id TIPO11. |
| PUT    | localhost:3000/api/tipo-envio/TIPO11 | {<br>  "ID": "TIPO11",<br>  "DESCRIPCION": "EXPRESS",<br>  "PRECIO_KM": "$10.50",<br>  "TIEMPO_ENTREGA": "26 HORAS",<br>  "ENVIOS":[<br>      "E31"]<br>}   | Actualiza un tipo de envío con el id TIPO11.                 |
| DELETE | localhost:3000/api/tipo-envio/:id    | id = TIPO11                                                                                                                                                 | Elimina un envío con el id TIPO11.                           |

## Querys

| Método | URL                                                  | Params/Body             | Descripción                                                                                                          |
| ------ | ---------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| GET    | localhost:3000/api/query/oficinas                    | No aplica               | Listar los datos de todas las oficinas.                                                                              |
| GET    | localhost:3000/api/query/oficinas/:id/envios         | id = O2                 | Listar los envíos realizados en determinada oficina.                                                                 |
| GET    | localhost:3000/api/query/tipos-envio/:id/envios      | id = TIPO10             | Listar los envíos que utilizan un tipo específico de envío.                                                          |
| GET    | localhost:3000/api/query/clientes/:id/envios         | id = GASM880805HJGMND04 | Listar los envíos realizados por un cliente en específico en todas las oficinas                                      |
| GET    | localhost:3000/api/query/oficinas/:id/clientes       | id = O3                 | <br>Listar los clientes que han realizado eníos en una determinada oficina.                                          |
| GET    | localhost:3000/api/query/envios/entregados           | No aplica               | Listar los envíos de todas las oficinas con estatus de entregado.                                                    |
| GET    | localhost:3000/api/query/envios/terrestre            | No aplica               | Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas.<br>  |
| GET    | localhost:3000/api/query/oficinas/:id/envios/express | id = O1                 | Listar los clientes y sus envíos que se han remitido por el servicio express considerando una oficina en específico. |

# Códigos y procedimientos documentados
## src/config/db.js
```
// /src/config/db.js
const mongoose = require("mongoose"); // Módulo para interactuar con MongoDB
const redis = require("redis"); // Módulo para interactuar con Redis
require("dotenv").config(); // Cargar variables de entorno desde un archivo .env
// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB"); // Mensaje de éxito en la conexión
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error); // Mensaje de error en la conexión
  });
  
// Configuración de Redis
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
redisClient.on("error", (err) => {
  console.error("Error en la conexión a Redis:", err); // Mensaje de error en la conexión a Redis
});
redisClient
  .connect()
  .then(() => {
    console.log("Conectado a Redis");
  })
  .catch((err) => {
    console.error("No se pudo conectar a Redis:", err);
  });

// Exportamos las instancias de mongoose y redisClient para usarlas en otras partes de
// la aplicación

module.exports = { mongoose, redisClient };
```
## src/controllers/cliente.js
```
// /src/controllers/oficina.js
// Importar los modelos necesarios
const Cliente = require("../models/cliente");
const Envio = require("../models/envio");
const Oficina = require("../models/oficina");
const TipoEnvio = require("../models/tipo-envio");

/*
// Asociar una constante a una funcion arrow anonima
const obtenerClientes = async (req, res) => {
  try {
    // Buscar todos los clientes en la base de datos
    const clientes = await Cliente.find();

    // Realizar populate manualmente para cada cliente
    const clientesConDetalles = await Promise.all(clientes.map(async (cliente) => {
      const oficinas = await Oficina.find({ ID: { $in: cliente.OFICINAS } });
      const envios = await Envio.find({ ID: { $in: cliente.ENVIOS } });

      // Convertir cliente a objeto plano para poder modificarlo
      const clienteObj = cliente.toObject();

      // Asignar las oficinas y envíos poblados al objeto del cliente
      clienteObj.OFICINAS = oficinas;
      clienteObj.ENVIOS = envios;

      return clienteObj;
    }));

    // Enviar la lista de clientes como respuesta
    res.status(200).json(clientesConDetalles);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};
*/

// Asociar una constante a una funcion arrow anonima
const obtenerClientes = async (req, res) => {
  try {
    // Buscar todos los clientes en la base de datos
    const clientes = await Cliente.find().select('-_id');
    // Enviar la lista de clientes como respuesta
    res.status(200).json(clientes);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({message: error.message });
  }
};


const crearCliente = async (req, res) => {
  // Crear un nuevo cliente con la carga de datos del body
  const nuevoCliente = new Cliente(req.body);
  try {
    // Guardar el nuevo cliente en la base de datos
    const clienteGuardado = await nuevoCliente.save();
    // Enviar el cliente guardado como respuesta
    res.status(201).json(clienteGuardado);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(400).json({ message: error.message });
  }
};

/*
// Buscar un cliente por su Id (CURP)
const obtenerClientePorId = async (req, res) => {
  try {
    // Buscar un cliente por su CURP en la base de datos
    const cliente = await Cliente.findOne({ CURP: req.params.id });

    if (cliente == null) {
      // Si el cliente no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró el cliente" });
    }

    // Realizar populate manualmente para OFICINAS y ENVIOS
    const oficinas = await Oficina.find({ ID: { $in: cliente.OFICINAS } });
    const envios = await Envio.find({ ID: { $in: cliente.ENVIOS } });

    // Convertir cliente a objeto plano para poder modificarlo
    const clienteObj = cliente.toObject();

    // Asignar las oficinas y envíos poblados al objeto del cliente
    clienteObj.OFICINAS = oficinas;
    clienteObj.ENVIOS = envios;

    // Enviar el cliente encontrado como respuesta
    res.status(200).json(clienteObj);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};
*/

// Buscar un cliente por su Id (CURP)
const obtenerClientePorId = async (req, res) => {
  try {
    // Buscar un cliente por su CURP en la base de datos
    const cliente = await Cliente.findOne({ CURP: req.params.id}).select('-_id');

    if (cliente == null) {
      // Si el cliente no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró el cliente"});
    }
    // Enviar el cliente encontrado como respuesta
    res.status(200).json(cliente);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};


const actualizarCliente = async (req, res) => {
  try {
    // Buscar y actualizar un cliente por su CURP
    // El argumento { new: true } indica que se debe retornar el documento actualizado
    const clienteActualizado = await Cliente.findOneAndUpdate(
      { CURP: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (clienteActualizado == null) {
      // Si el cliente no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró el cliente" });
    }
    // Enviar la oficina actualizada como respuesta
    res.status(200).json(clienteActualizado);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(400).json({ message: error.message });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    // Buscar y eliminar un cliente por su CURP
    const cliente = await Cliente.findOneAndDelete({ CURP: req.params.id });
    if (cliente == null) {
      // Si el cliente no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró el cliente" });
    }
    // Enviar un mensaje de éxito como respuesta
    res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};


// Exportamos las funciones del controlador
module.exports = {
  obtenerClientes,
  crearCliente,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente
};
```
## src/controllers/envio.js
```
// /src/controllers/envio.js
// Importar los modelos necesarios
const Cliente = require("../models/cliente");
const Envio = require("../models/envio");
const Oficina = require("../models/oficina");
const TipoEnvio = require("../models/tipo-envio");

/*
// Asociar una constante a una función arrow anónima
const obtenerEnvios = async (req, res) => {
  try {
    // Buscar todos los envíos en la base de datos
    const envios = await Envio.find();

    // Realizar populate manualmente para cada envío
    const enviosConDetalles = await Promise.all(envios.map(async (envio) => {
      const cliente = await Cliente.findOne({ CURP: envio.CLIENTE });
      const origen = await Oficina.findOne({ ID: envio.ORIGEN });
      const destino = await Oficina.findOne({ ID: envio.DESTINO });
      const tipoEnvio = await TipoEnvio.findOne({ ID: envio.TIPO_DE_ENVIO });

      // Convertir envío a objeto plano para poder modificarlo
      const envioObj = envio.toObject();

      // Asignar los detalles poblados al objeto del envío
      envioObj.CLIENTE = cliente;
      envioObj.ORIGEN = origen;
      envioObj.DESTINO = destino;
      envioObj.TIPO_DE_ENVIO = tipoEnvio;

      return envioObj;
    }));

    // Enviar la lista de envíos como respuesta
    res.status(200).json(enviosConDetalles);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};
*/

// Asociar una constante a una funcion arrow anonima
const obtenerEnvios = async (req, res) => {
  try {
    // Buscar todos los envios en la base de datos
    const envios = await Envio.find().select('-_id');
    // Enviar la lista de Envios como respuesta
    res.status(200).json(envios);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({message: error.message });
  }
};


const crearEnvio = async (req, res) => {
  // Crear un nuevo envio con la carga de datos del body
  const nuevoEnvio = new Envio(req.body);
  try {
    // Guardar el nuevo envio en la base de datos
    const envioGuardado = await nuevoEnvio.save();
    // Enviar el cliente guardado como respuesta
    res.status(201).json(envioGuardado);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(400).json({ message: error.message });
  }
};

/*
const obtenerEnvioPorId = async (req, res) => {
  try {
    // Buscar un envio por su ID en la base de datos
    const envio = await Envio.findOne({ ID: req.params.id });

    if (envio == null) {
      // Si el envio no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró el envio" });
    }

    // Realizar populate manualmente para CLIENTE, ORIGEN, DESTINO, y TIPO_DE_ENVIO
    const cliente = await Cliente.findOne({ CURP: envio.CLIENTE });
    const origen = await Oficina.findOne({ ID: envio.ORIGEN });
    const destino = await Oficina.findOne({ ID: envio.DESTINO });
    const tipoEnvio = await TipoEnvio.findOne({ ID: envio.TIPO_DE_ENVIO });

    // Convertir envio a objeto plano para poder modificarlo
    const envioObj = envio.toObject();

    // Asignar los datos poblados al objeto del envio
    envioObj.CLIENTE = cliente;
    envioObj.ORIGEN = origen;
    envioObj.DESTINO = destino;
    envioObj.TIPO_DE_ENVIO = tipoEnvio;

    // Enviar el envio encontrado como respuesta
    res.status(200).json(envioObj);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
}; 
*/

// Buscar un envio por su ID
const obtenerEnvioPorId = async (req, res) => {
  try {
    // Buscar un envio por su ID en la base de datos
    const envio = await Envio.findOne({ ID: req.params.id}).select('-_id');

    if (envio == null) {
      // Si el envio no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró el envio"});
    }
    // Enviar el envio encontrado como respuesta
    res.status(200).json(envio);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};


const actualizarEnvio = async (req, res) => {
  try {
    // Buscar y actualizar un envio por su ID
    // El argumento { new: true } indica que se debe retornar el documento actualizado
    const envioActualizado = await Envio.findOneAndUpdate(
      { ID: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (envioActualizado == null) {
      // Si el envio no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró el envio" });
    }
    // Enviar el envio actualizado como respuesta
    res.status(200).json(envioActualizado);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(400).json({ message: error.message });
  }
};

const eliminarEnvio = async (req, res) => {
  try {
    // Buscar y eliminar un envio por su ID
    const envio = await Envio.findOneAndDelete({ ID: req.params.id });
    if (envio == null) {
      // Si el alumno no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró el envio" });
    }
    // Enviar un mensaje de éxito como respuesta
    res.status(200).json({ message: "Envio eliminado correctamente" });
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};


// Exportamos las funciones del controlador
module.exports = {
  obtenerEnvios,
  crearEnvio,
  obtenerEnvioPorId,
  actualizarEnvio,
  eliminarEnvio
};

```
## src/controllers/oficina.js
```
// /src/controllers/oficina.js
// Importar los modelos necesarios
const Cliente = require("../models/cliente");
const Envio = require("../models/envio");
const Oficina = require("../models/oficina");
const TipoEnvio = require("../models/tipo-envio");

/*
// Asociar una constante a una función arrow anónima
const obtenerOficinas = async (req, res) => {
  try {
    // Buscar todas las oficinas en la base de datos
    const oficinas = await Oficina.find();

    // Arreglo para almacenar las oficinas pobladas
    const oficinasPobladas = [];

    // Recorrer cada oficina para realizar población manual
    for (const oficina of oficinas) {
      // Realizar populate manualmente para CLIENTES y ENVIOS
      const clientes = await Cliente.find({ CURP: { $in: oficina.CLIENTES } });
      const envios = await Envio.find({ ID: { $in: oficina.ENVIOS } });

      // Convertir oficina a objeto plano para poder modificarlo
      const oficinaObj = oficina.toObject();

      // Asignar los clientes y envios poblados al objeto de la oficina
      oficinaObj.CLIENTES = clientes;
      oficinaObj.ENVIOS = envios;

      // Agregar la oficina poblada al arreglo de oficinas pobladas
      oficinasPobladas.push(oficinaObj);
    }

    // Enviar la lista de oficinas pobladas como respuesta
    res.status(200).json(oficinasPobladas);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};
*/

// Asociar una constante a una funcion arrow anonima
const obtenerOficinas = async (req, res) => {
  try {
    // Buscar todas las oficinas en la base de datos
    const oficinas = await Oficina.find().select('-_id');
    // Enviar la lista de clientes como respuesta
    res.status(200).json(oficinas);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({message: error.message });
  }
};

const crearOficina = async (req, res) => {
  // Crear una nueva oficina con la carga de datos del body
  const nuevaOficina = new Oficina(req.body);
  try {
    // Guardar la nueva oficina en la base de datos
    const oficinaGuardada = await nuevaOficina.save();
    // Enviar la oficina guardada como respuesta
    res.status(201).json(oficinaGuardada);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(400).json({ message: error.message });
  }
};

// Buscar una oficina por su Id
const obtenerOficinaPorId = async (req, res) => {
  try {
    // Buscar una oficina por su ID en la base de datos
    const oficina = await Oficina.findOne({ ID: req.params.id }).select('-_id');

    if (oficina == null) {
      // Si la oficina no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró la oficina" });
    }

    // Realizar populate manualmente para CLIENTES y ENVIOS
    const clientes = await Cliente.find({ CURP: { $in: oficina.CLIENTES } });
    const envios = await Envio.find({ ID: { $in: oficina.ENVIOS } });

    // Convertir oficina a objeto plano para poder modificarlo
    const oficinaObj = oficina.toObject();

    // Asignar los clientes y envios poblados al objeto de la oficina
    oficinaObj.CLIENTES = clientes;
    oficinaObj.ENVIOS = envios;

    // Enviar la oficina encontrada como respuesta
    res.status(200).json(oficinaObj);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};


const actualizarOficina = async (req, res) => {
  try {
    // Buscar y actualizar una oficina por su ID
    // El argumento { new: true } indica que se debe retornar el documento actualizado
    const oficinaActualizada = await Oficina.findOneAndUpdate(
      { ID: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (oficinaActualizada == null) {
      // Si la oficina no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró la oficina" });
    }
    // Enviar la oficina actualizada como respuesta
    res.status(200).json(oficinaActualizada);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(400).json({ message: error.message });
  }
};

const eliminarOficina = async (req, res) => {
  try {
    // Buscar y eliminar una oficina por su ID
    const oficina = await Oficina.findOneAndDelete({ ID: req.params.id });
    if (oficina == null) {
      // Si la oficina no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró la oficina" });
    }
    // Enviar un mensaje de éxito como respuesta
    res.status(200).json({ message: "Oficina eliminada correctamente" });
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};


// Exportamos las funciones del controlador
module.exports = {
  obtenerOficinas,
  crearOficina,
  obtenerOficinaPorId,
  actualizarOficina,
  eliminarOficina
};

```
## src/controllers/query.js
```
// /src/controllers/query.js
// Importar los modelos necesarios
const Cliente = require("../models/cliente");
const envio = require("../models/envio");
const Envio = require("../models/envio");
const Oficina = require("../models/oficina");
const TipoEnvio = require("../models/tipo-envio");


//Q1. Listar los datos de todas las oficinas
const Q1 = async (req, res) => {
    try {

      // Buscar las oficinas en la base de datos y seleccionar unicamente los campos deseados
      const oficinas = await Oficina.find();
      
      // Buscar los envios en la base de datos y seleccionar unicamente los campos deseados
      const envios = await Envio.find({ ID: { $in: oficinas.ENVIOS }}).select('-_id');

      // Se genera un array para almacenar las oficinas con los datos en orden
      const oficinasArray = [];
      
      for (const oficina of oficinas) {
        const oficinaObj = {
        NOMBRE: oficina.NOMBRE,
        TELEFONO: oficina.TELEFONO,
        EMAIL: oficina.EMAIL,
        DIRECCION: oficina.DIRECCION, // Mantener la dirección como un objeto
        ENVIOS: envios  // Incluir los envíos
      };

      // Se almacenan las oficinas llenas en el arreglo
      oficinasArray.push(oficinaObj);
    }
      res.status(200).json(oficinas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Q2. Listar los envios realizados en determinada oficina
const Q2 = async (req, res) => {
    try {
      // Buscar la oficina en la base de datos
      const oficina = await Oficina.findOne({ ID: req.params.id}).select('-_id');
      // Buscar los datos de los envios en el modelo Envio
      const envios = await Envio.find({ ID: { $in: oficina.ENVIOS }}).select('-_id');

      // Convertir la oficina en un object para pode modificarlo
      const oficinaObj = oficina.toObject();
      oficinaObj.ENVIOS = envios;
  
      // Enviar la lista de oficinas con los envios como respuesta
      res.status(200).json(oficinaObj);
    } catch (error) {
      // En caso de error, enviar un mensaje de error
      res.status(500).json({ message: error.message });
    }
  };

// Q3. Listar los envíos que utilizan un tipo específico de envío
const Q3 = async (req, res) => {
    try {
      // Buscar los envios cuyo tipo de envio coincida con el especificado 
      const envios = await Envio.find({ TIPO_DE_ENVIO: req.params.id}).select('-_id');
      
      const enviosArray = [];

      // Metodo para hacer el populate de forma manual
      for (const envio of envios) {

        // Buscar el cliente que están en el envio
        const cliente = await Cliente.findOne({CURP: envio.CLIENTE }).select('CURP NOMBRE APELLIDOS EMAIL -_id');
        // Buscar la oficina de origen que está en el envio
        const origen = await Oficina.findOne({ ID: envio.ORIGEN }).select('NOMBRE DIRECCION TELEFONO EMAIL -_id');;
        // Buscar las oficina de origen que está en el envio
        const destino = await Oficina.findOne({ ID: envio.DESTINO }).select('NOMBRE DIRECCION TELEFONO EMAIL -_id');;
        // Buscar el tipo de envio que está en cada envio
        const tipo = await TipoEnvio.findOne({ ID: envio.TIPO_DE_ENVIO }).select('ID DESCRIPCION PRECIO_KM TIEMPO_ENTREGA -_id');
        
        //Se estructura un nuevo objeto para mandar los datos en orden
        const envioObj = {
          ID: envio.ID,
          FECHA_DE_ENVIO: envio.FECHA_DE_ENVIO,
          PESO: envio.PESO,
          DIMENSIONES: envio.DIMENSIONES,
          COSTO_TOTAL: envio.COSTO_TOTAL,
          ESTATUS: envio.ESTATUS,
          CLIENTE: cliente,
          ORIGEN: origen,
          DESTINO: destino,
          TIPO_DE_ENVIO: tipo
        }

        enviosArray.push(envioObj);
      }
      if (!envios.length) {
        return res.status(404).json({ message: "No se encontraron envíos para el tipo de envío especificado" });
      }
  
      res.status(200).json(enviosArray); // Enviar el primer (y único) documento en el resultado
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//Q4. Listar los envíos realizados por un cliente en específico en todas las oficinas
const Q4 = async (req, res) => {
    try {

      // Buscar el cliente en la base de datos
      const cliente = await Cliente.findOne({CURP: req.params.curp }).select('-_id');
      // Buscar los datos de los envios en el modelo Envio
      const envios = await Envio.find({ ID: { $in: cliente.ENVIOS }}).select('-_id');
      
      // Convertir el cliente en un object para poder modificarlo
      const clienteObj = cliente.toObject();
      clienteObj.ENVIOS = envios;

  
      if (!envios.length) {
        return res.status(404).json({ message: "No se encontraron envíos para el cliente especificado" });
      }
  
      res.status(200).json(clienteObj); // Enviar el primer (y único) documento en el resultado
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Q5. Listar los clientes que han realizado envíos en una determinada oficina.
  const Q5 = async (req, res) => {
    try {
      // Buscar la oficina en la base de datos
      const oficina = await Oficina.findOne({ ID: req.params.id }).select('ID NOMBRE DIRECCION TELEFONO EMAIL CLIENTES -_id');
  
      // Buscar los clientes que han realizado envíos en la oficina
      const clientes = await Cliente.find({ CURP: { $in: oficina.CLIENTES } }).select('CURP NOMBRE APELLIDOS EMAIL -_id');
  
      // Convertir la oficina en un objeto para poder modificarlo
      const oficinaObj = oficina.toObject();
      oficinaObj.CLIENTES = clientes;
  
      // Enviar la oficina con los clientes como respuesta
      res.status(200).json(oficinaObj);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Q6. Listar los envíos de todas las oficinas con estatus de entregado.
const Q6 = async (req, res) => {
  try {
    // Buscar todos los envíos con ese estatus
    const envios = await Envio.find({ ESTATUS: 'ENTREGADO' }).select('-_id');

    // Verificar si se encontraron envíos
    if (!envios || envios.length === 0) {
      return res.status(404).json({ message: "No se encontraron envíos con el estatus especificado" });
    }

    console.log("Tipo de envios:", typeof envios); // Agregado para depuración

    const enviosArray = [];

    // Método para hacer el populate de forma manual
    for (const envio of envios) {
      console.log("Envío:", envio); // Agregado para depuración
      
      // Buscar el cliente que está en el envío
      const cliente = await Cliente.findOne({ CURP: envio.CLIENTE }).select('CURP NOMBRE APELLIDOS EMAIL -_id');
      // Buscar la oficina de origen que está en el envío
      const origen = await Oficina.findOne({ ID: envio.ORIGEN }).select('NOMBRE DIRECCION TELEFONO EMAIL -_id');
      // Buscar la oficina de destino que está en el envío
      const destino = await Oficina.findOne({ ID: envio.DESTINO }).select('NOMBRE DIRECCION TELEFONO EMAIL -_id');
      // Buscar el tipo de envío que está en cada envío
      const tipo = await TipoEnvio.findOne({ ID: envio.TIPO_DE_ENVIO }).select('ID DESCRIPCION PRECIO_KM TIEMPO_ENTREGA -_id');
      
      // Se estructura un nuevo objeto para mandar los datos en orden
      const envioObj = {
        ID: envio.ID,
        FECHA_DE_ENVIO: envio.FECHA_DE_ENVIO,
        PESO: envio.PESO,
        DIMENSIONES: envio.DIMENSIONES,
        COSTO_TOTAL: envio.COSTO_TOTAL,
        ESTATUS: envio.ESTATUS,
        CLIENTE: cliente,
        ORIGEN: origen,
        DESTINO: destino,
        TIPO_DE_ENVIO: tipo
      };

      enviosArray.push(envioObj);
    }

    // Enviar la respuesta con los envíos encontrados
    res.status(200).json(enviosArray);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Q7. Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas.
const Q7 = async (req, res) => {
  try {
    // Encontrar el tipo de envío correspondiente al servicio terrestre
    const tipoEnvio = await TipoEnvio.find({ DESCRIPCION : 'TERRESTRE'}).select('-_id -createdAt -updatedAt -__v');

    const tipoEnvioArray = [];

    // Cargar el arreglo de TipoEnvio con la información de cada Envio
    for (const tipo of tipoEnvio){

      // Buscar los envíos con los ID proporcionados en el tipo de envío
      const envios = await Envio.find({ TIPO_DE_ENVIO : tipo.ID }).select('-_id -createdAt -updatedAt -__v');

      const arrayEnvios = [];
      // Para cada envío, buscar y agregar los datos del cliente
      for (const envio of envios) {
        const cliente = await Cliente.findOne({ CURP : envio.CLIENTE }).select('CURP NOMBRE APELLIDOS EMAIL -_id');
        
        const objEnvio = envio.toObject();
        
        objEnvio.CLIENTE = cliente;

        arrayEnvios.push(objEnvio);
      }

      // Crear un nuevo objeto que contenga el tipo de envío y sus envíos correspondientes
      const tipoConEnvios = {
        ID: tipo.ID,
        DESCRIPCION: tipo.DESCRIPCION,
        PRECIO_KM: tipo.PRECIO_KM,
        TIEMPO_ENTREGA: tipo.TIEMPO_ENTREGA,
        ENVIOS: arrayEnvios
      };

      // Agregar el objeto al arreglo
      tipoEnvioArray.push(tipoConEnvios);
    }


    // Retornar los detalles de los envíos terrestres y sus clientes asociados
    res.status(200).json(tipoEnvioArray);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Q8. Listar los clientes y sus envíos que se han remitido por el servicio express considerando una oficina
const Q8 = async (req, res) => {
  try {
    // Recuperamos la oficina
    const oficina = await Oficina.findOne({ ID: req.params.id }).select('-_id -createdAt -updatedAt -__v -CLIENTES');

    // Recuperamos los envios que son express
    const tipoEnvio = await TipoEnvio.find({ DESCRIPCION : 'EXPRESS'}).select('-_id ID DESCRIPCION PRECIO_KM TIEMPO_ENTREGA');

    // Almacenamos los ids que recuperamos 
    const ids = tipoEnvio.map(tipo => tipo.ID);

    // Filtramos los envíos que son express y están en la oficina
    const enviosExpress = await Envio.find({ 
      ID: { $in: oficina.ENVIOS }, 
      TIPO_DE_ENVIO:  { $in : ids } 
    }).select('-_id -createdAt -updatedAt -__v');


    // Generamos un arreglo donde almacenar los envios
    const enviosArray = [];

    // Recorremos los envios
    for (const envio of enviosExpress){
      // Buscamos el cliente
      const cliente = await Cliente.find({ CURP : envio.CLIENTE }).select('-_id -createdAt -updatedAt -__v -ENVIOS -OFICINAS');

      // Buscamos el tipo 
      const tipo = await TipoEnvio.find({ID : envio.TIPO_DE_ENVIO}).select('-_id -createdAt -updatedAt -__v -ENVIOS');
      // Lo convertimos en objeto para modificarlo
      const envioObj = envio.toObject();

      // Asignamos los nuevos valores
      envioObj.CLIENTE = cliente;
      envioObj.TIPO_DE_ENVIO = tipo;

      enviosArray.push(envioObj);
    }

    // Convertimos la oficina a un objeto para modificarlo
    const oficinaObj = oficina.toObject();

    // Asignamos los envíos express filtrados a la propiedad ENVIOS
    oficinaObj.ENVIOS = enviosArray;

    // Retornamos los envíos express con sus clientes asociados
    res.status(200).json(oficinaObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
{
    "DIRECCION": {
        "CALLE": "CALLE HIDALGO",
        "NUMERO": "202",
        "CIUDAD": "GUADALAJARA",
        "CODIGO_POSTAL": "78901"
    },
    "ID": "O5",
    "NOMBRE": "SUCURSAL OESTE",
    "TELEFONO": "+52 33 6543 2109",
    "EMAIL": "SUCURSALGDL@gmail.com",
    "ENVIOS": [
        {
            "ID": "E22",
            "FECHA_DE_ENVIO": "2024-04-28",
            "PESO": "1.3 KG",
            "DIMENSIONES": "17X17X17 CM",
            "COSTO_TOTAL": "$130.00",
            "ESTATUS": "PENDIENTE",
            "CLIENTE": "JLCA960505HMNGRS22",
            "ORIGEN": "O5",
            "DESTINO": "O1",
            "TIPO_DE_ENVIO": "TIPO6"
        },
        {
            "ID": "E9",
            "FECHA_DE_ENVIO": "2024-04-15",
            "PESO": "3.2 KG",
            "DIMENSIONES": "28X28X28 CM",
            "COSTO_TOTAL": "$280.00",
            "ESTATUS": "PENDIENTE",
            "CLIENTE": "RCMM871121HDFXHJ09",
            "ORIGEN": "O5",
            "DESTINO": "O4",
            "TIPO_DE_ENVIO": "TIPO9"
        }
    ]
}
 */

// Exportamos las funciones del controlador
module.exports = {
  Q1,
  Q2,
  Q3,
  Q4,
  Q5,
  Q6,
  Q7,
  Q8
};

```
## src/controllers/tipo-envio.js
```
// /src/controllers/oficina.js
// Importar los modelos necesarios
const Cliente = require("../models/cliente");
const Envio = require("../models/envio");
const Oficina = require("../models/oficina");
const TipoEnvio = require("../models/tipo-envio");

/*
// Asociar una constante a una función arrow anónima
const obtenerOficinas = async (req, res) => {
  try {
    // Buscar todas las oficinas en la base de datos
    const oficinas = await Oficina.find();

    // Arreglo para almacenar las oficinas pobladas
    const oficinasPobladas = [];

    // Recorrer cada oficina para realizar población manual
    for (const oficina of oficinas) {
      // Realizar populate manualmente para CLIENTES y ENVIOS
      const clientes = await Cliente.find({ CURP: { $in: oficina.CLIENTES } });
      const envios = await Envio.find({ ID: { $in: oficina.ENVIOS } });

      // Convertir oficina a objeto plano para poder modificarlo
      const oficinaObj = oficina.toObject();

      // Asignar los clientes y envios poblados al objeto de la oficina
      oficinaObj.CLIENTES = clientes;
      oficinaObj.ENVIOS = envios;

      // Agregar la oficina poblada al arreglo de oficinas pobladas
      oficinasPobladas.push(oficinaObj);
    }

    // Enviar la lista de oficinas pobladas como respuesta
    res.status(200).json(oficinasPobladas);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};
*/

// Asociar una constante a una funcion arrow anonima
const obtenerTiposEnvio = async (req, res) => {
  try {
    // Buscar todos los tipos de envio en la base de datos
    const tipos = await TipoEnvio.find().select('-_id');
    // Enviar la lista de tipos de envios como respuesta
    res.status(200).json(tipos);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({message: error.message });
  }
};


const crearTipoEnvio = async (req, res) => {
  // Crear un nuevo tipo de envio con la carga de datos del body
  const nuevoTipoEnvio = new TipoEnvio(req.body);
  try {
    // Guardar el nuevo tipo en la base de datos
    const tipoGuardado = await nuevoTipoEnvio.save();
    // Enviar el tipo guardado como respuesta
    res.status(201).json(tipoGuardado);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(400).json({ message: error.message });
  }
};

/*
// Buscar una tipo por su Id
const obtenerTipoPorId = async (req, res) => {
  try {
    // Buscar una tipo por su ID en la base de datos
    const tipo = await TipoEnvio.findOne({ ID: req.params.id});

    if (tipo == null) {
      // Si el tipo no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró el tipo de envio" });
    }

    // Realizar populate manualmente para ENVIOS
    const envios = await Envio.find({ ID: { $in: oficina.ENVIOS } });

    // Convertir oficina a objeto plano para poder modificarlo
    const tipoObj = tipo.toObject();

    // Asignar los clientes y envios poblados al objeto de la oficina
    tipoObj.ENVIOS = envios;

    // Enviar la oficina encontrada como respuesta
    res.status(200).json(tipoObj);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};
*/

// Buscar un tipo de envio por su ID
const obtenerTipoEnvioPorId = async (req, res) => {
  try {
    // Buscar un tipo de envio por su ID en la base de datos
    const tipo = await TipoEnvio.findOne({ ID: req.params.id}).select('-_id');

    if (tipo == null) {
      // Si el tipo de envio no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró el tipo de envio"});
    }
    // Enviar el tipo de envio encontrado como respuesta
    res.status(200).json(tipo);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};

const actualizarTipoEnvio = async (req, res) => {
  try {
    // Buscar y actualizar una tipo de envio por su ID
    // El argumento { new: true } indica que se debe retornar el documento actualizado
    const tipoActualizado = await TipoEnvio.findOneAndUpdate(
      { ID: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    if (tipoActualizado == null) {
      // Si el tipo  no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró el tipo de envio" });
    }
    // Enviar el tipo de envio actualizado como respuesta
    res.status(200).json(tipoActualizado);
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(400).json({ message: error.message });
  }
};

const eliminarTipoEnvio = async (req, res) => {
  try {
    // Buscar y eliminar un tipo de envio por su ID
    const tipo = await TipoEnvio.findOneAndDelete({ ID: req.params.id });
    if (tipo == null) {
      // Si el tipo de envio no se encuentra, enviar un mensaje de error
      return res.status(404).json({ message: "No se encontró el tipo de envio" });
    }
    // Enviar un mensaje de éxito como respuesta
    res.status(200).json({ message: "Tipo de envio eliminado correctamente" });
  } catch (error) {
    // En caso de error, enviar un mensaje de error
    res.status(500).json({ message: error.message });
  }
};


// Exportamos las funciones del controlador
module.exports = {
  obtenerTiposEnvio,
  crearTipoEnvio,
  obtenerTipoEnvioPorId,
  actualizarTipoEnvio,
  eliminarTipoEnvio
};

```
## src/middleware/logger.js
```
// /src/middleware/logger.js
const redis = require("redis");
const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

client.on("error", (err) => {
  console.error("Redis error de conexion:", err);
});

client.connect()
  .then(() => {
    console.log("Conectado-->> Redis");
  })
  .catch((err) => {
    console.error("Error conexion a Redis:", err);
  });

module.exports = (req, res, next) => {
  let originalWrite = res.write;
  let originalEnd = res.end;
  let chunks = [];

  res.write = function(chunk, ...args) {
    chunks.push(chunk);
    originalWrite.apply(res, [chunk, ...args]);
  };

  res.end = function(chunk, ...args) {
    if (chunk) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString('utf8');
    res.body = body;

    if (!client.isOpen) {
      console.error("Redis client -->> No conectado.");
    } else {
      const key = `${req.method}:${Date.now()}:${req.originalUrl}`;
      const logEntry = JSON.stringify({
        req: {
          time: new Date(),
          method: req.method,
          url: req.originalUrl,
          body: req.body,
        },
        res: {
          method: res.method,
          body: body,
        },
      });
      client.set(key, logEntry, "EX", 60 * 60 * 24)
        .catch((err) => {
          console.error("Error al guardar:", err);
        });
    }
    
    originalEnd.apply(res, [chunk, ...args]);
  };

  next();
};

```
## src/models/cliente.js
```
// /src/models/cliente.js
// Importar mongoose para definir esquema y modelo
const mongoose = require("mongoose");
// Definir el esquema de oficina
const clienteSchema = new mongoose.Schema(
  {
    // campo CURP para diferenciar a los clientes de tipo entero, unico y requerido
    CURP: {
      type: String,
      required: true,
      unique: true,
    },

    // campo nombre para el nombre del cliente, de tipo String y requerido
    NOMBRE: {
      type: String,
      required: true,
    },

    // campo nombre para el nombre del cliente, de tipo String y requerido
    APELLIDOS: {
      type: String,
      required: true,
    },

    // campo email para el correo electrónico del cliente, de tipo String y requerido
    EMAIL: {
      type: String,
      required: true,
      unique: true,
    },

    // campo oficinas para almacenar las oficinas, es un arreglo de Strings referenciando al modelo 'oficina'
    OFICINAS: [
      {
        type: String,
        ref: "Oficina",
      },
    ],

    // campo envios para almacenar los envios del cliente, es un arreglo de Strings referenciando al modelo 'envio'
    ENVIOS: [
      {
        type: String,
        ref: "Envio",
      },
    ],
  },
  {
    // Configuración de opciones del esquema: timestamps agrega createdAt y updatedAt automáticamente
    timestamps: true,
  }
);

// Exportar el modelo Cliente
module.exports = mongoose.model("Cliente", clienteSchema);

```
## src/models/envio.js
```
// /src/models/cliente.js
// Importar mongoose para definir esquema y modelo
const mongoose = require("mongoose");
// Definir el esquema de envio
const envioSchema = new mongoose.Schema(
  {
    // campo ID para diferenciar a los envios de tipo String, unico y requerido
    ID: {
      type: String,
      required: true,
      unique: true,
    },

    // campo fecha de envio de tipo String y requerido
    FECHA_DE_ENVIO: {
      type: String,
      required: true,
    },

    // campo peso de tipo String y requerido
    PESO: {
      type: String,
      required: true,
    },

    // campo dimensiones de tipo String y requerido
    DIMENSIONES: {
      type: String,
      required: true,
    },

    // campo costo total de tipo String y requerido
    COSTO_TOTAL: {
      type: String,
      required: true,
    },

    // campo estatus de tipo String y requerido
    ESTATUS: {
      type: String,
      required: true,
    },

    // campo cliente de tipo String que hace referencia al modelo 'Cliente'
    CLIENTE: {
      type: String,
      ref: "Cliente",
    },

    // campo origen de tipo String que hace referencia al modelo 'Oficina'
    ORIGEN: {
      type: String,
      ref: "Oficina",
    },

    // campo destino de tipo String que hace referencia al modelo 'Oficina'
    DESTINO: {
      type: String,
      ref: "Oficina",
    },


    // campo destino de tipo String que hace referencia al modelo 'TipoEnvio'
    TIPO_DE_ENVIO: {
      type: String,
      ref: "TipoEnvio",
    },
  },
  {
    // Configuración de opciones del esquema: timestamps agrega createdAt y updatedAt automáticamente
    timestamps: true,
  }
);

// Exportar el modelo Oficina
module.exports = mongoose.model("Envio", envioSchema);
```

## src/models/oficina.js
```
// /src/models/paqueteria.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const oficinaSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    ID: {
      type: String,
      required: true,
      unique: true,
    },
    NOMBRE: {
      type: String,
      required: true,
    },
    DIRECCION: {
      CALLE: { type: String, required: true },
      NUMERO: { type: String, required: true },
      CIUDAD: { type: String, required: true },
      CODIGO_POSTAL: { type: String, required: true },
    },
    TELEFONO: {
      type: String,
      required: true,
      unique: true,
    },
    EMAIL: {
      type: String,
      required: true,
      unique: true,
    },
    CLIENTES: [
      {
        type: String,
        ref: "Cliente",
      },
    ],
    ENVIOS: [
      {
        type: String,
        ref: "Envio",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Oficina", oficinaSchema);
```

## src/models/tipo-envio.js
```
// /src/models/tipo-envio.js
// Importar mongoose para definir esquema y modelo
const mongoose = require("mongoose");
// Definir el esquema de envio
const tipoEnvioSchema = new mongoose.Schema(
  {
    // campo ID para diferenciar a los tipos de envio de tipo String, unico y requerido
    ID: {
      type: String,
      required: true,
      unique: true,
    },

    // campo descripcion de tipo String y requerido
    DESCRIPCION: {
      type: String,
      required: true,
    },

    // campo precio por kilometreo de tipo String y requerido
    PRECIO_KM: {
      type: String,
      required: true,
    },

    // campo tiempo de entrega de tipo String y requerido
    TIEMPO_ENTREGA: {
      type: String,
      required: true,
    },

    // campo envios de tipo String que hace referencia al modelo 'Envio'
    ENVIOS: [
      {
        type: String,
        ref: "Envio",
      },
    ],
  },
  {
    // Configuración de opciones del esquema: timestamps agrega createdAt y updatedAt automáticamente
    timestamps: true,
  }
);

// Exportar el modelo Oficina
module.exports = mongoose.model("TipoEnvio", tipoEnvioSchema);

```
## src/routes/cliente.js
```
// /src/routes/cliente.js
// Importar los módulos necesarios
const express = require('express'); // Framework para construir aplicaciones web y APIs
const router = express.Router(); // Módulo de enrutador de Express
const {
    obtenerClientes,
    crearCliente,
    obtenerClientePorId,
    actualizarCliente,
    eliminarCliente
} = require('../controllers/cliente'); // Importamos las funciones del controlador de alumnos

// Ruta para obtener todos los clientes
router.get('/', obtenerClientes);
// Cuando se hace una solicitud GET a la ruta raíz ("/"), se ejecuta la función
// obtenerClientes del controlador

// Ruta para obtener un cliente por su CURP
router.get('/:id', obtenerClientePorId);
// Cuando se hace una solicitud GET a la ruta con un parámetro de ID ("/:id"), se
// ejecuta la función obtenerClientePorId del controlador

// Ruta para crear un nuevo cliente
router.post('/', crearCliente);
// Cuando se hace una solicitud POST a la ruta raíz ("/"), se ejecuta la función
// crearCliente del controlador

// Ruta para actualizar un cliente por su CURP
router.put('/:id', actualizarCliente);
// Cuando se hace una solicitud PUT a la ruta con un parámetro de CURP ("/:id"), se
// ejecuta la función actualizarCliente del controlador

// Ruta para eliminar un cliente por su CURP
router.delete('/:id', eliminarCliente);
// Cuando se hace una solicitud DELETE a la ruta con un parámetro de CURP ("/:id"), se 
// ejecuta la función eliminarCliente del controlador

// Exportamos el enrutador para cuando se requiera ser utilizado en otros archivos
module.exports = router;
```
## src/routes/envio.js
```
// /src/routes/envio.js
// Importar los módulos necesarios
const express = require('express'); // Framework para construir aplicaciones web y APIs
const router = express.Router(); // Módulo de enrutador de Express
const {
    obtenerEnvios,
    crearEnvio,
    obtenerEnvioPorId,
    actualizarEnvio,
    eliminarEnvio
} = require('../controllers/envio'); // Importamos las funciones del controlador de envios

// Ruta para obtener todos los envios
router.get('/', obtenerEnvios);
// Cuando se hace una solicitud GET a la ruta raíz ("/"), se ejecuta la función
// obtenerEnvios del controlador

// Ruta para obtener una envio por su ID
router.get('/:id', obtenerEnvioPorId);
// Cuando se hace una solicitud GET a la ruta con un parámetro de ID ("/:id"), se
// ejecuta la función obtenerEnvioPorId del controlador

// Ruta para crear un nuevo envio
router.post('/', crearEnvio);
// Cuando se hace una solicitud POST a la ruta raíz ("/"), se ejecuta la función
// crearEnvio del controlador

// Ruta para actualizar una envio por su ID
router.put('/:id', actualizarEnvio);
// Cuando se hace una solicitud PUT a la ruta con un parámetro de ID ("/:id"), se
// ejecuta la función actualizarEnvio del controlador

// Ruta para eliminar un envio por su ID
router.delete('/:id', eliminarEnvio);
// Cuando se hace una solicitud DELETE a la ruta con un parámetro de ID ("/:id"), se 
// ejecuta la función eliminarEnvio del controlador

// Exportamos el enrutador para cuando se requiera ser utilizado en otros archivos
module.exports = router;
```
## src/routes/oficina.js
```
// /src/routes/oficina.js
// Importar los módulos necesarios
const express = require('express'); // Framework para construir aplicaciones web y APIs
const router = express.Router(); // Módulo de enrutador de Express
const {
    obtenerOficinas,
    crearOficina,
    obtenerOficinaPorId,
    actualizarOficina,
    eliminarOficina
} = require('../controllers/oficina'); // Importamos las funciones del controlador de oficinas

// Ruta para obtener todos los oficinas
router.get('/', obtenerOficinas);
// Cuando se hace una solicitud GET a la ruta raíz ("/"), se ejecuta la función
// obtenerOficinas del controlador

// Ruta para obtener una oficina por su ID
router.get('/:id', obtenerOficinaPorId);
// Cuando se hace una solicitud GET a la ruta con un parámetro de ID ("/:id"), se
// ejecuta la función obtenerOficinaPorId del controlador

// Ruta para crear un nuevo oficina
router.post('/', crearOficina);
// Cuando se hace una solicitud POST a la ruta raíz ("/"), se ejecuta la función
// crearoficina del controlador

// Ruta para actualizar una oficina por su ID
router.put('/:id', actualizarOficina);
// Cuando se hace una solicitud PUT a la ruta con un parámetro de ID ("/:id"), se
// ejecuta la función actualizarOficina del controlador

// Ruta para eliminar un oficina por su ID
router.delete('/:id', eliminarOficina);
// Cuando se hace una solicitud DELETE a la ruta con un parámetro de ID ("/:id"), se 
// ejecuta la función eliminarOficina del controlador

// Exportamos el enrutador para cuando se requiera ser utilizado en otros archivos
module.exports = router;
```
## src/routes/query.js
```
const express = require("express");
const router = express.Router();
const { Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8 } = require("../controllers/query");

// Q1. Listar los datos de todas las oficinas
router.get("/oficinas", Q1);

// Q2. Listar los envíos realizados en una determinada oficina
router.get("/oficinas/:id/envios", Q2);

// Q3. Listar los envíos que utilizan un tipo específico de envío
router.get("/tipos-envio/:id/envios", Q3);

// Q4. Listar los envíos realizados por un cliente en específico en todas las oficinas
router.get("/clientes/:curp/envios", Q4);

// Q5. Listar los clientes que han realizado envíos en una determinada oficina
router.get("/oficinas/:id/clientes", Q5);

// Q6. Listar los envíos de todas las oficinas con estatus de entregado
router.get("/envios/entregados", Q6);

// Q7. Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas
router.get("/envios/terrestre", Q7);

// Q8. Listar los clientes y sus envíos que se han remitido por el servicio express considerando una oficina en específico
router.get("/oficinas/:id/envios/express", Q8);

module.exports = router;

```
## src/routes/tipo-envio.js
```
// /src/routes/tipo-envio.js
// Importar los módulos necesarios
const express = require('express'); // Framework para construir aplicaciones web y APIs
const router = express.Router(); // Módulo de enrutador de Express
const {
    obtenerTiposEnvio,
    crearTipoEnvio,
    obtenerTipoEnvioPorId,
    actualizarTipoEnvio,
    eliminarTipoEnvio
} = require('../controllers/tipo-envio'); // Importamos las funciones del controlador de envios

// Ruta para obtener todos los tipos de envio
router.get('/', obtenerTiposEnvio);
// Cuando se hace una solicitud GET a la ruta raíz ("/"), se ejecuta la función
// obtenerEnvios del controlador

// Ruta para obtener un tipo de envio por su ID
router.get('/:id', obtenerTipoEnvioPorId);
// Cuando se hace una solicitud GET a la ruta con un parámetro de ID ("/:id"), se
// ejecuta la función obtenerTipoEnvioPorId del controlador

// Ruta para crear un nuevo tipo de envio
router.post('/', crearTipoEnvio);
// Cuando se hace una solicitud POST a la ruta raíz ("/"), se ejecuta la función
// crearEnvio del controlador

// Ruta para actualizar un tipo de envio por su ID
router.put('/:id', actualizarTipoEnvio);
// Cuando se hace una solicitud PUT a la ruta con un parámetro de ID ("/:id"), se
// ejecuta la función actualizarTipoEnvio del controlador

// Ruta para eliminar un envio tipo de envio por su ID
router.delete('/:id', eliminarTipoEnvio);
// Cuando se hace una solicitud DELETE a la ruta con un parámetro de ID ("/:id"), se 
// ejecuta la función eliminarTipoEnvio del controlador

// Exportamos el enrutador para cuando se requiera ser utilizado en otros archivos
module.exports = router;
```
## server.js
```
// /src/server.js
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env
const express = require('express'); // Framework para construir aplicaciones web y APIs
const cors = require('cors'); // Middleware para permitir solicitudes de recursos cruzados
const morgan = require('morgan'); // Middleware para el registro de solicitudes HTTP
const logger = require('./middleware/logger'); // Middleware personalizado para registrar solicitudes en Redis
const { mongoose, redisClient
 } = require('./config/db'); // Importamos las configuraciones de MongoDB y Redis

// Importamos las rutas
const oficinaRoutes = require('./routes/oficina'); // Rutas relacionadas con la entidad oficina
const clienteRoutes = require('./routes/cliente'); // Rutas relacionadas con la entidad cliente
const envioRoutes = require('./routes/envio'); // Rutas relacionadas con la entidad envio
const tipoEnvioRoutes = require('./routes/tipo-envio'); // Rutas relacionadas con la entidad de tipo de envio
const queryRoutes = require('./routes/query'); // Rutas relacionadas con la entidad cliente

// Creamos una instancia de la aplicación Express
const app = express();

// Middleware para parsear solicitudes JSON
app.use(express.json());

// Middleware para permitir solicitudes de recursos cruzados
app.use(cors());

// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));

// Middleware personalizado para registrar solicitudes en Redis
app.use(logger);

// Usamos las rutas importadas
app.use('/api/oficina', oficinaRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/envio', envioRoutes);
app.use('/api/tipo-envio', tipoEnvioRoutes);
app.use('/api/query', queryRoutes);

// Definimos el puerto en el que la aplicación escuchará las solicitudes
const PORT = process.env.PORT || 3000;

// Iniciamos el servidor y lo ponemos a escuchar en el puerto definido
app.listen(PORT, () => {
console.log(`Servidor corriendo en puerto ${PORT}`);
});
```
## .env
```
# URI de conexión a la base de datos MongoDB
# Formato: mongodb://[usuario:contraseña@]host:puerto/baseDeDatos
MONGO_URI=mongodb://mongo01:27017/paqueteria
# Host del servidor Redis
# Generalmente es el nombre del servicio definido en docker-compose o la dirección IP
# del servidor Redis
REDIS_HOST=redis01
# Puerto en el que Redis está escuchando
REDIS_PORT=6379
# Puerto en el que nuestra aplicaci'on Node.js escuchará
PORT=3000
```
# Dockerfile
```
# Usar la imagen oficial de Node.js como base
FROM node
# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./
# Instalar las dependencias del proyecto
RUN npm install
# Copiar el resto de los archivos del proyecto al directorio de trabajo
COPY . .
# Exponer el puerto en el que la aplicación va a correr
EXPOSE 3000
# Comando para iniciar la aplicación
CMD ["node", "src/server.js"]
```
# docker-compose.yml
```
version: '3.8'
services:
  app01:
    build: 'gadyelmtz/paqueteria-modificado'
    ports:
      - "3000:3000"
    depends_on:
      - mongo01
      - mongo01-replica1
      - mongo01-replica2
      - redis01
    environment:
      - MONGO_URI=mongodb://mongo01:27017/paqueteria?replicaSet=replica
      - REDIS_HOST=redis01
      - REDIS_PORT=6379
      - PORT=3000
    networks:
      - red01
  
  mongo01:
    image: mongo:latest
    command: mongod --replSet replica --bind_ip_all
    ports:
      - "27017:27017"
    networks:
      - red01
  
  mongo01-replica1:
    image: mongo:latest
    command: mongod --replSet replica --bind_ip_all
    ports:
      - "27018:27017"
    networks:
      - red01
  
  mongo01-replica2:
    image: mongo:latest
    command: mongod --replSet replica --bind_ip_all
    ports:
      - "27019:27017"
    networks:
      - red01
  
  redis01:
    image: redis:latest
    ports:
      - "6379:6379"
    networks:
      - red01
  
networks:
  red01:
    driver: bridge
```
# Escenario de datos

### Oficinas
```
{
  "_id": "111111111111111111111111",
  "ID":"O1",
  "NOMBRE": "OFICINA CENTRAL",
  "DIRECCION": {
    "CALLE": "AVENIDA REVOLUCIÓN",
    "NUMERO": "123",
    "CIUDAD": "CIUDAD DE MÉXICO",
    "CODIGO_POSTAL": "12345"
  },
  "TELEFONO": "+52 55 1234 5678",
  "EMAIL": "OFICINACENTRALRVLUCION@gmail.com",
  "CLIENTES":[
	  "SABC560626MHGRLR01",
	  "GAMA840204HJGSTC07",
	  "DACJ950317HMNRXR12",
	  "MPCV920327HDFPST18",
	  "RCMM871121HDFXHJ09"],
  "ENVIOS":[
	  "E1",
	  "E7",
	  "E12",
	  "E18",
	  "E27"]
}

{
  "_id": "222222222222222222222222",
  "ID":"O2",
  "NOMBRE": "SUCURSAL NORTE",
  "DIRECCION": {
    "CALLE": "CALLE REFORMA",
    "NUMERO": "456",
    "CIUDAD": "MONTERREY",
    "CODIGO_POSTAL": "54321"
  },
  "TELEFONO": "+52 81 9876 5432",
  "EMAIL": "SUCURSALNTEMTY@outlook.com",
  "CLIENTES":[
	  "GASM880805HJGMND04",
	  "CFGL850415HMNBGD17",
	  "MGVC910617HMNXDS24"],
  "ENVIOS":[
	  "E4",
	  "E17",
	  "E24",
	  "E30"]
}

{
  "_id": "333333333333333333333333",
  "ID":"O3",
  "NOMBRE": "SUCURSAL SUR",
  "DIRECCION": {
    "CALLE": "AVENIDA JUÁREZ",
    "NUMERO": "789",
    "CIUDAD": "GUADALAJARA",
    "CODIGO_POSTAL": "67890"
  },
  "TELEFONO": "+52 33 8765 4321",
  "EMAIL": "SUCURSALSURGDL@icloud.com",
  "CLIENTES":[
	  "FESP970726HDFXYZ02",
	  "CSGM980410HDFQPL05",
	  "LAJF960713HDFCNP08",
	  "SGLC881002HMNDLZ11",
	  "GJDL901113HDFRSM16",
	  "JLPC921218HMNXMR19",
	  "RLGS950613HMNNSR23",
	  "GASM880805HJGMND04"],
  "ENVIOS":[
	  "E2",
	  "E5",
	  "E8",
	  "E11",
	  "E16",
	  "E20",
	  "E1",
	  "E29"]
}

{
  "_id": "444444444444444444444444",
  "ID":"O4",
  "NOMBRE": "SUCURSAL ESTE",
  "DIRECCION": {
    "CALLE": "CALLE MORELOS",
    "NUMERO": "101",
    "CIUDAD": "PUEBLA",
    "CODIGO_POSTAL": "45678"
  },
  "TELEFONO": "+52 222 7654 3210",
  "EMAIL": "SUCURSALPUEBLA@outlook.com",
  "CLIENTES":[
	  "MPFA900915HMNKRC06",
	  "RJMP970801HMNXLR15",
	  "MTDC910509HDFRVR20",
	  "JLFR860220HMNRXX13"],
  "ENVIOS":[
	  "E6",
	  "E15",
	  "E19",
	  "E26",
	  "E28"]
}

{
  "_id": "555555555555555555555555",
  "ID":"O5",
  "NOMBRE": "SUCURSAL OESTE",
  "DIRECCION": {
    "CALLE": "CALLE HIDALGO",
    "NUMERO": "202",
    "CIUDAD": "GUADALAJARA",
    "CODIGO_POSTAL": "78901"
  },
  "TELEFONO": "+52 33 6543 2109",
  "EMAIL": "SUCURSALGDL@gmail.com",
  "CLIENTES":[
	  "LMJR901010MHGNRS03",
	  "RCMM871121HDFXHJ09",
	  "LAGC931212HMNDSW14",
	  "JLCA960505HMNGRS22"],
  "ENVIOS":[
	  "E3",
	  "E9",
	  "E14",
	  "E22"]
}

{
  "_id": "666666666666666666666666",
  "ID":"O6",
  "NOMBRE": "SUCURSAL CENTRAL",
  "DIRECCION": {
    "CALLE": "AVENIDA BENITO JUÁREZ",
    "NUMERO": "303",
    "CIUDAD": "TIJUANA",
    "CODIGO_POSTAL": "23456"
  },
  "TELEFONO": "+52 664 5432 1098",
  "EMAIL": "SUCURSALBJUARES@icloud.com",
  "CLIENTES":[
	  "MOMG940330HMNXBN10",
	  "JLFR860220HMNRXX13",
	  "ARLP880303HMNRFR21",
	  "SPTM900414HMNVPS25"],
  "ENVIOS":[
	  "E10",
	  "E13",
	  "E21",
	  "E25"]
}
```

### Clientes
```
{
  "CURP": "SABC560626MHGRLR01",
  "NOMBRE": "CONCEPCIÓN",
  "APELLIDOS": "SALGADO BRISEÑO",
  "EMAIL": "clienteuno@gmail.com",
  "OFICINAS":["O1"],
  "ENVIOS":["E1"]
}

{
  "CURP": "FESP970726HDFXYZ02",
  "NOMBRE": "FERNANDA",
  "APELLIDOS": "ESPINOZA SÁNCHEZ",
  "EMAIL": "clientedos@outlook.com",
  "OFICINAS":["O1"],
  "ENVIOS":["E2"]
}

{
  "CURP": "LMJR901010MHGNRS03",
  "NOMBRE": "LUIS MANUEL",
  "APELLIDOS": "JIMÉNEZ ROBLES",
  "EMAIL": "clientetres@icloud.com",
  "OFICINAS":["O5"],
  "ENVIOS":["E3"]
}

{
  "CURP": "GASM880805HJGMND04",
  "NOMBRE": "GABRIELA",
  "APELLIDOS": "SALAZAR MARTÍNEZ",
  "EMAIL": "clientecuatro@gmail.com",
  "OFICINAS":["O2","O3"],
  "ENVIOS":["E4","E29","E30"]
}

{
  "CURP": "CSGM980410HDFQPL05",
  "NOMBRE": "CARLOS",
  "APELLIDOS": "SANTANA GARCÍA",
  "EMAIL": "clientecinco@outlook.com",
  "OFICINAS":["O3"],
  "ENVIOS":["E5"]
}

{
  "CURP": "MPFA900915HMNKRC06",
  "NOMBRE": "MARÍA",
  "APELLIDOS": "PÉREZ FLORES",
  "EMAIL": "clienteseis@gmail.com",
  "OFICINAS":["O4"],
  "ENVIOS":["E6","E28"]
}

{
  "CURP": "GAMA840204HJGSTC07",
  "NOMBRE": "GUSTAVO",
  "APELLIDOS": "MARTÍNEZ GONZÁLEZ",
  "EMAIL": "clientesiete@icloud.com",
  "ENVIOS":["E7"],
  "OFICINAS":["O1"]
}

{
  "CURP": "LAJF960713HDFCNP08",
  "NOMBRE": "LUISA",
  "APELLIDOS": "ALVARADO JUÁREZ",
  "EMAIL": "clienteocho@outlook.com",
  "ENVIOS":["E8"],
  "OFICINAS":["O3"]
}

{
  "CURP": "RCMM871121HDFXHJ09",
  "NOMBRE": "ROBERTO",
  "APELLIDOS": "CERVANTES MÉNDEZ",
  "EMAIL": "clientenueve@gmail.com",
  "ENVIOS":["E9","E27"],
  "OFICINAS":["O5","O1"]
}

{
  "CURP": "MOMG940330HMNXBN10",
  "NOMBRE": "MÓNICA",
  "APELLIDOS": "ORTEGA MORALES",
  "EMAIL": "clientediez@icloud.com",
  "ENVIOS":["E10"],
  "OFICINAS":["O6"]
}

{
  "CURP": "SGLC881002HMNDLZ11",
  "NOMBRE": "SERGIO",
  "APELLIDOS": "GÓMEZ LÓPEZ",
  "EMAIL": "clienteonce@gmail.com",
  "ENVIOS":["E11"],
  "OFICINAS":["03"]
}

{
  "CURP": "DACJ950317HMNRXR12",
  "NOMBRE": "DANIELA",
  "APELLIDOS": "AGUILAR CRUZ",
  "EMAIL": "clientedoce@outlook.com",
  "ENVIOS":["E12"],
  "OFICINAS":["O1"]
}

{
  "CURP": "JLFR860220HMNRXX13",
  "NOMBRE": "JUAN LUIS",
  "APELLIDOS": "FLORES RAMÍREZ",
  "EMAIL": "clientetrece@gmail.com",
  "ENVIOS":["E13","E26"],
  "OFICINAS":["O6","O4"]
}

{
  "CURP": "LAGC931212HMNDSW14",
  "NOMBRE": "LUCÍA",
  "APELLIDOS": "ARELLANO GUTIÉRREZ",
  "EMAIL": "clientecatorce@icloud.com",
  "ENVIOS":["E14"],
  "OFICINAS":["O5"]
}

{
  "CURP": "RJMP970801HMNXLR15",
  "NOMBRE": "ROSA",
  "APELLIDOS": "JIMÉNEZ MORA",
  "EMAIL": "clientequince@outlook.com",
  "ENVIOS":["E15"],
  "OFICINAS":["O4"]
}

{
  "CURP": "GJDL901113HDFRSM16",
  "NOMBRE": "GUSTAVO",
  "APELLIDOS": "JUÁREZ DELGADO",
  "EMAIL": "clientedieciseis@gmail.com",
  "ENVIOS":["E16"],
  "OFICINAS":["O3"]
}

{
  "CURP": "CFGL850415HMNBGD17",
  "NOMBRE": "CARLOS",
  "APELLIDOS": "FLORES GARCÍA",
  "EMAIL": "clientediecisiete@icloud.com",
  "ENVIOS":["E17"],
  "OFICINAS":["O2"]
}

{
  "CURP": "MPCV920327HDFPST18",
  "NOMBRE": "MARÍA",
  "APELLIDOS": "PEREZ CASTILLO",
  "EMAIL": "clientedieciocho@outlook.com",
  "ENVIOS":["E18"],
  "OFICINAS":["O1"]
}

{
  "CURP": "JLPC921218HMNXMR19",
  "NOMBRE": "JUAN LUIS",
  "APELLIDOS": "PINEDA CRUZ",
  "EMAIL": "clientediecinueve@gmail.com",
  "OFICINAS":["O4"],
  "ENVIOS":["E19"]
}

{
  "CURP": "MTDC910509HDFRVR20",
  "NOMBRE": "MARÍA TERESA",
  "APELLIDOS": "DOMÍNGUEZ CASTRO",
  "EMAIL": "clienteveinte@icloud.com",
  "OFICINAS":["O3"],
  "ENVIOS":["E20"]
}

{
  "CURP": "ARLP880303HMNRFR21",
  "NOMBRE": "ANA ROSA",
  "APELLIDOS": "RAMÍREZ LÓPEZ",
  "EMAIL": "clienteveintiuno@gmail.com",
  "OFICINAS":["O6"],
  "ENVIOS":["E21"]
}

{
  "CURP": "JLCA960505HMNGRS22",
  "NOMBRE": "JUAN LUIS",
  "APELLIDOS": "CASTILLO ÁLVAREZ",
  "EMAIL": "clienteveintidos@outlook.com",
  "OFICINAS":["O5"],
  "ENVIOS":["E22"]
}

{
  "CURP": "RLGS950613HMNNSR23",
  "NOMBRE": "ROBERTO",
  "APELLIDOS": "LOZANO GÓMEZ",
  "EMAIL": "clienteveintitres@gmail.com",
  "OFICINAS":["O3"],
  "ENVIOS":["E23"]
}

{
  "CURP": "MGVC910617HMNXDS24",
  "NOMBRE": "MÓNICA",
  "APELLIDOS": "GONZÁLEZ VÁZQUEZ",
  "EMAIL": "cli8enteveinticuatro@icloud.com",
  "OFICINAS":["O2"],
  "ENVIOS":["E24"]
}

{
  "CURP": "SPTM900414HMNVPS25",
  "NOMBRE": "SOFÍA",
  "APELLIDOS": "PÉREZ TORRES",
  "EMAIL": "clienteveinticinco@gmail.com",
  "OFICINAS":["O6"],
  "ENVIOS":["E25"]
}	
```
### Envío
```
{
  "ID": "E1",
  "FECHA_DE_ENVIO": "2024-04-09",
  "PESO": "2 KG",
  "DIMENSIONES": "20X20X20 CM",
  "COSTO_TOTAL": "$200.00",
  "ESTATUS": "PENDIENTE",
  "CLIENTE": "SABC560626MHGRLR01",
  "ORIGEN": "O1",
  "DESTINO": "O2",
  "TIPO_DE_ENVIO": "TIPO10"
}

{
  "ID": "E2",
  "FECHA_DE_ENVIO": "2024-04-10",
  "PESO": "5 KG",
  "DIMENSIONES": "30X30X30 CM",
  "COSTO_TOTAL": "$350.00",
  "ESTATUS": "TRÁNSITO",
  "CLIENTE": "FESP970726HDFXYZ02",
  "ORIGEN": "O3",
  "DESTINO": "O4",
  "TIPO_DE_ENVIO": "TIPO5"
}

{
  "ID": "E3",
  "FECHA_DE_ENVIO": "2024-04-11",
  "PESO": "3 KG",
  "DIMENSIONES": "25X25X25 CM",
  "COSTO_TOTAL": "$250.00",
  "ESTATUS": "TRÁNSITO",
  "CLIENTE": "LMJR901010MHGNRS03",
  "ORIGEN": "O5",
  "DESTINO": "O6",
  "TIPO_DE_ENVIO": "TIPO4"
}

{
  "ID": "E4",
  "FECHA_DE_ENVIO": "2024-04-10",
  "CLIENTE": "GASM880805HJGMND04",
  "ORIGEN": "O2",
  "DESTINO": "O1",
  "TIPO_DE_ENVIO": "TIPO1",
  "PESO": "5 KG",
  "DIMENSIONES": "30X30X30 CM",
  "COSTO_TOTAL": "$350.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E5",
  "FECHA_DE_ENVIO": "2024-04-11",
  "CLIENTE": "CSGM980410HDFQPL05",
  "ORIGEN": "03",
  "DESTINO": "05",
  "TIPO_DE_ENVIO": "TIPO2",
  "PESO": "3 KG",
  "DIMENSIONES": "25X25X25 CM",
  "COSTO_TOTAL": "$250.00",
  "ESTATUS": "TRÁNSITO"
}

{
  "ID": "E6",
  "FECHA_DE_ENVIO": "2024-04-12",
  "CLIENTE": "MPFA900915HMNKRC06",
  "ORIGEN": "O4",
  "DESTINO": "O3",
  "TIPO_DE_ENVIO": "TIPO3",
  "PESO": "4 KG",
  "DIMENSIONES": "35X35X35 CM",
  "COSTO_TOTAL": "$300.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E7",
  "FECHA_DE_ENVIO": "2024-04-13",
  "CLIENTE": "GAMA840204HJGSTC07",
  "ORIGEN": "O1",
  "DESTINO": "O3",
  "TIPO_DE_ENVIO": "TIPO3",
  "PESO": "1 KG",
  "DIMENSIONES": "15X15X15 CM",
  "COSTO_TOTAL": "$150.00",
  "ESTATUS": "TRÁNSITO"
}

{
  "ID": "E8",
  "FECHA_DE_ENVIO": "2024-04-14",
  "CLIENTE": "LAJF960713HDFCNP08",
  "ORIGEN": "O3",
  "DESTINO": "O6",
  "TIPO_DE_ENVIO": "TIPO4",
  "PESO": "2.5 KG",
  "DIMENSIONES": "22X22X22 CM",
  "COSTO_TOTAL": "$275.00",
  "ESTATUS": "ENTREGADO"
}

{
  "ID": "E9",
  "FECHA_DE_ENVIO": "2024-04-15",
  "CLIENTE": "RCMM871121HDFXHJ09",
  "ORIGEN": "O5",
  "DESTINO": "O4",
  "TIPO_DE_ENVIO": "TIPO9",
  "PESO": "3.2 KG",
  "DIMENSIONES": "28X28X28 CM",
  "COSTO_TOTAL": "$280.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E10",
  "FECHA_DE_ENVIO": "2024-04-16",
  "CLIENTE": "MOMG940330HMNXBN10",
  "ORIGEN": "O6",
  "DESTINO": "O3",
  "TIPO_DE_ENVIO": "TIPO1",
  "PESO": "4.8 KG",
  "DIMENSIONES": "32X32X32 CM",
  "COSTO_TOTAL": "$420.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E11",
  "FECHA_DE_ENVIO": "2024-04-17",
  "CLIENTE": "SGLC881002HMNDLZ11",
  "ORIGEN": "O3",
  "DESTINO": "O2",
  "TIPO_DE_ENVIO": "TIPO2",
  "PESO": "1.8 KG",
  "DIMENSIONES": "18X18X18 CM",
  "COSTO_TOTAL": "$200.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E12",
  "FECHA_DE_ENVIO": "2024-04-18",
  "CLIENTE": "DACJ950317HMNRXR12",
  "ORIGEN": "O1",
  "DESTINO": "O6",
  "TIPO_DE_ENVIO": "TIPO5",
  "PESO": "3.5 KG",
  "DIMENSIONES": "30X30X25 CM",
  "COSTO_TOTAL": "$300.00",
  "ESTATUS": "ENTREGADO"
}

{
  "ID": "E13",
  "FECHA_DE_ENVIO": "2024-04-19",
  "CLIENTE": "JLFR860220HMNRXX13",
  "ORIGEN": "O6",
  "DESTINO": "O3",
  "TIPO_DE_ENVIO": "TIPO8",
  "PESO": "2.2 KG",
  "DIMENSIONES": "22X22X20 CM",
  "COSTO_TOTAL": "$220.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E14",
  "FECHA_DE_ENVIO": "2024-04-20",
  "CLIENTE": "LAGC931212HMNDSW14",
  "ORIGEN": "O5",
  "DESTINO": "O1",
  "TIPO_DE_ENVIO": "TIPO7",
  "PESO": "1.5 KG",
  "DIMENSIONES": "15X15X15 CM",
  "COSTO_TOTAL": "$180.00",
  "ESTATUS": "TRÁNSITO"
}

{
  "ID": "E15",
  "FECHA_DE_ENVIO": "2024-04-21",
  "CLIENTE": "RJMP970801HMNXLR15",
  "ORIGEN": "O4",
  "DESTINO": "O3",
  "TIPO_DE_ENVIO": "TIPO7",
  "PESO": "2.7 KG",
  "DIMENSIONES": "25X25X25 CM",
  "COSTO_TOTAL": "$250.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E16",
  "FECHA_DE_ENVIO": "2024-04-22",
  "CLIENTE": "GJDL901113HDFRSM16",
  "ORIGEN": "O3",
  "DESTINO": "O1",
  "TIPO_DE_ENVIO": "TIPO5",
  "PESO": "3.8 KG",
  "DIMENSIONES": "35X35X30 CM",
  "COSTO_TOTAL": "$380.00",
  "ESTATUS": "TRÁNSITO"
}

{
  "ID":"E17",
  "FECHA_DE_ENVIO": "2024-04-23",
  "CLIENTE": "CFGL850415HMNBGD17",
  "ORIGEN": "O2",
  "DESTINO": "O5",
  "TIPO_DE_ENVIO": "TIPO3",
  "PESO": "2.3 KG",
  "DIMENSIONES": "23X23X23 CM",
  "COSTO_TOTAL": "$230.00",
  "ESTATUS": "TRÁNSITO"
}

{
  "ID": "E18",
  "FECHA_DE_ENVIO": "2024-04-24",
  "CLIENTE": "MPCV920327HDFPST18",
  "ORIGEN": "O1",
  "DESTINO": "O6",
  "TIPO_DE_ENVIO": "TIPO7",
  "PESO": "2.1 KG",
  "DIMENSIONES": "21X21X21 CM",
  "COSTO_TOTAL": "$210.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E19",
  "FECHA_DE_ENVIO": "2024-04-25",
  "CLIENTE": "MTDC910509HDFRVR20",
  "ORIGEN": "O4",
  "DESTINO": "O5",
  "TIPO_DE_ENVIO": "TIPO9",
  "PESO": "4.5 KG",
  "DIMENSIONES": "33X33X33 CM",
  "COSTO_TOTAL": "$400.00",
  "ESTATUS": "ENTREGADO"
}

{
  "ID": "E20",
  "FECHA_DE_ENVIO": "2024-04-26",
  "CLIENTE": "JLPC921218HMNXMR19",
  "ORIGEN": "O3",
  "DESTINO": "O4",
  "TIPO_DE_ENVIO": "TIPO2",
  "PESO": "2.9 KG",
  "DIMENSIONES": "29X29X29 CM",
  "COSTO_TOTAL": "$290.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E21",
  "FECHA_DE_ENVIO": "2024-04-27",
  "CLIENTE": "ARLP880303HMNRFR21",
  "ORIGEN": "O6",
  "DESTINO": "O3",
  "TIPO_DE_ENVIO": "TIPO4",
  "PESO": "3.7 KG",
  "DIMENSIONES": "31X31X31 CM",
  "COSTO_TOTAL": "$320.00",
  "ESTATUS": "ENTREGADO"
}

{
  "ID": "E22",
  "FECHA_DE_ENVIO": "2024-04-28",
  "CLIENTE": "JLCA960505HMNGRS22",
  "ORIGEN": "O5",
  "DESTINO": "O1",
  "TIPO_DE_ENVIO": "TIPO6",
  "PESO": "1.3 KG",
  "DIMENSIONES": "17X17X17 CM",
  "COSTO_TOTAL": "$130.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E23",
  "FECHA_DE_ENVIO": "2024-04-29",
  "CLIENTE": "RLGS950613HMNNSR23",
  "ORIGEN": "O3",
  "DESTINO": "O2",
  "TIPO_DE_ENVIO": "TIPO8",
  "PESO": "2.3 KG",
  "DIMENSIONES": "23X23X23 CM",
  "COSTO_TOTAL": "$220.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E24",
  "FECHA_DE_ENVIO": "2024-04-30",
  "CLIENTE": "MGVC910617HMNXDS24",
  "ORIGEN": "O2",
  "DESTINO": "O6",
  "TIPO_DE_ENVIO": "TIPO10",
  "PESO": "4.2 KG",
  "DIMENSIONES": "32X32X32 CM",
  "COSTO_TOTAL": "$350.00",
  "ESTATUS": "TRÁNSITO"
}

{
  "ID": "E25",
  "FECHA_DE_ENVIO": "2024-05-01",
  "CLIENTE": "SPTM900414HMNVPS25",
  "ORIGEN": "O6",
  "DESTINO": "O4",
  "TIPO_DE_ENVIO": "TIPO1",
  "PESO": "3.6 KG",
  "DIMENSIONES": "30X30X30 CM",
  "COSTO_TOTAL": "$380.00",
  "ESTATUS": "ENTREGADO"
}

{
  "ID": "E26",
  "FECHA_DE_ENVIO": "2024-05-02",
  "CLIENTE": "JLFR860220HMNRXX13",
  "ORIGEN": "O4",
  "DESTINO": "O3",
  "TIPO_DE_ENVIO": "TIPO3",
  "PESO": "2.8 KG",
  "DIMENSIONES": "28X28X28 CM",
  "COSTO_TOTAL": "$260.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E27",
  "FECHA_DE_ENVIO": "2024-05-03",
  "CLIENTE": "RCMM871121HDFXHJ09",
  "ORIGEN": "O1",
  "DESTINO": "O2",
  "TIPO_DE_ENVIO": "TIPO7",
  "PESO": "3.1 KG",
  "DIMENSIONES": "29X29X29 CM",
  "COSTO_TOTAL": "$270.00",
  "ESTATUS": "TRÁNSITO"
}

{
  "ID": "E28",
  "FECHA_DE_ENVIO": "2024-05-04",
  "CLIENTE": "MPFA900915HMNKRC06",
  "ORIGEN": "O4",
  "DESTINO": "O1",
  "TIPO_DE_ENVIO": "TIPO5",
  "PESO": "4.9 KG",
  "DIMENSIONES": "35X35X35 CM",
  "COSTO_TOTAL": "$420.00",
  "ESTATUS": "PENDIENTE"
}

{
  "ID": "E29",
  "FECHA_DE_ENVIO": "2024-05-05",
  "CLIENTE": "GASM880805HJGMND04",
  "ORIGEN": "O3",
  "DESTINO": "O2",
  "TIPO_DE_ENVIO": "TIPO7",
  "PESO": "1.7 KG",
  "DIMENSIONES": "17X17X17 CM",
  "COSTO_TOTAL": "$180.00",
  "ESTATUS": "ENTREGADO"
}

{
  "ID": "E30",
  "FECHA_DE_ENVIO": "2024-05-06",
  "CLIENTE": "GASM880805HJGMND04",
  "ORIGEN": "O2",
  "DESTINO": "O1",
  "TIPO_DE_ENVIO": "TIPO10",
  "PESO": "2.4 KG",
  "DIMENSIONES": "24X24X24 CM",
  "COSTO_TOTAL": "$240.00",
  "ESTATUS": "TRÁNSITO"
}
```


### Tipo de envío
```
{
  "ID": "TIPO1",
  "DESCRIPCION": "TERRESTRE",
  "PRECIO_KM": "$1.50",
  "TIEMPO_ENTREGA": "2 DÍAS",
  "ENVIOS":[
	"E1",
	"E10",
	"E25"]
}

{
  "ID": "TIPO2",
  "DESCRIPCION": "AEREO",
  "PRECIO_KM": "$3.00",
  "TIEMPO_ENTREGA": "1 DÍA",
  "ENVIOS":[
	"E5",
	"E11",
	"E20"]
}

{
  "ID": "TIPO3",
  "DESCRIPCION": "EXPRESS",
  "PRECIO_KM": "$5.00",
  "TIEMPO_ENTREGA": "4 HORAS",
  "ENVIOS":[
	"E6",
	"E7",
	"E17",
	"E26"]
}

{
  "ID": "TIPO4",
  "DESCRIPCION": "TERRESTRE",
  "PRECIO_KM": "$1.00",
  "TIEMPO_ENTREGA": "5 DÍAS",
  "ENVIOS":[
	"E3",
	"E8",
	"E21"]
}

{
  "ID": "TIPO5",
  "DESCRIPCION": "AEREO",
  "PRECIO_KM": "$7.00",
  "TIEMPO_ENTREGA": "1 HORA",
  "ENVIOS":[
	"E2",
	"E12",
	"E16",
	"E28"]
}

{
  "ID": "TIPO6",
  "DESCRIPCION": "EXPRESS",
  "PRECIO_KM": "$10.00",
  "TIEMPO_ENTREGA": "30 MINUTOS",
  "ENVIOS":[
	"E22",
  ]
}

{
  "ID": "TIPO7",
  "DESCRIPCION": "TERRESTRE",
  "PRECIO_KM": "$4.00",
  "TIEMPO_ENTREGA": "3 DÍAS",
  "ENVIOS":[
	"E14",
	"E15",
	"E18",
	"E27",
	"E29"]
}

{
  "ID": "TIPO8",
  "DESCRIPCION": "AEREO",
  "PRECIO_KM": "$0.75",
  "TIEMPO_ENTREGA": "1 DÍA",
  "ENVIOS":[
	  "E13",
	  "E23"]
}

{
  "ID": "TIPO9",
  "DESCRIPCION": "EXPRESS",
  "PRECIO_KM": "$2.50",
  "TIEMPO_ENTREGA": "3 DÍAS",
  "ENVIOS":[
	  "E9",
	  "E19"]
}

{
  "ID": "TIPO10",
  "DESCRIPCION": "TERRESTRE",
  "PRECIO_KM": "$4.50",
  "TIEMPO_ENTREGA": "12 HORAS",
  "ENVIOS":[
	  "E1",
	  "E24",
	  "E30"]
}
```

# JSON Postman
```
{
	"info": {
		"_postman_id": "ba506bbe-a3ae-4c72-8d6f-d8798db59e30",
		"name": "Entregable final",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "31312999"
	},
	"item": [
		{
			"name": "Escenario de datos",
			"item": [
				{
					"name": "Clientes",
					"item": [
						{
							"name": "Cliente 1",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"SABC560626MHGRLR01\",\r\n  \"NOMBRE\": \"CONCEPCIÓN\",\r\n  \"APELLIDOS\": \"SALGADO BRISEÑO\",\r\n  \"EMAIL\": \"clienteuno@gmail.com\",\r\n  \"OFICINAS\":[\"O1\"],\r\n  \"ENVIOS\":[\"E1\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 2",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"FESP970726HDFXYZ02\",\r\n  \"NOMBRE\": \"FERNANDA\",\r\n  \"APELLIDOS\": \"ESPINOZA SÁNCHEZ\",\r\n  \"EMAIL\": \"clientedos@outlook.com\",\r\n  \"OFICINAS\":[\"O1\"],\r\n  \"ENVIOS\":[\"E2\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 3",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"LMJR901010MHGNRS03\",\r\n  \"NOMBRE\": \"LUIS MANUEL\",\r\n  \"APELLIDOS\": \"JIMÉNEZ ROBLES\",\r\n  \"EMAIL\": \"clientetres@icloud.com\",\r\n  \"OFICINAS\":[\"O5\"],\r\n  \"ENVIOS\":[\"E3\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 4",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"GASM880805HJGMND04\",\r\n  \"NOMBRE\": \"GABRIELA\",\r\n  \"APELLIDOS\": \"SALAZAR MARTÍNEZ\",\r\n  \"EMAIL\": \"clientecuatro@gmail.com\",\r\n  \"OFICINAS\":[\"O2\",\"O3\"],\r\n  \"ENVIOS\":[\"E4\",\"E29\",\"E30\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 5",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"CSGM980410HDFQPL05\",\r\n  \"NOMBRE\": \"CARLOS\",\r\n  \"APELLIDOS\": \"SANTANA GARCÍA\",\r\n  \"EMAIL\": \"clientecinco@outlook.com\",\r\n  \"OFICINAS\":[\"O3\"],\r\n  \"ENVIOS\":[\"E5\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 6",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"MPFA900915HMNKRC06\",\r\n  \"NOMBRE\": \"MARÍA\",\r\n  \"APELLIDOS\": \"PÉREZ FLORES\",\r\n  \"EMAIL\": \"clienteseis@gmail.com\",\r\n  \"OFICINAS\":[\"O4\"],\r\n  \"ENVIOS\":[\"E6\",\"E28\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 7",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"GAMA840204HJGSTC07\",\r\n  \"NOMBRE\": \"GUSTAVO\",\r\n  \"APELLIDOS\": \"MARTÍNEZ GONZÁLEZ\",\r\n  \"EMAIL\": \"clientesiete@icloud.com\",\r\n  \"ENVIOS\":[\"E7\"],\r\n  \"OFICINAS\":[\"O1\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 8",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"LAJF960713HDFCNP08\",\r\n  \"NOMBRE\": \"LUISA\",\r\n  \"APELLIDOS\": \"ALVARADO JUÁREZ\",\r\n  \"EMAIL\": \"clienteocho@outlook.com\",\r\n  \"ENVIOS\":[\"E8\"],\r\n  \"OFICINAS\":[\"O3\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 9",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"RCMM871121HDFXHJ09\",\r\n  \"NOMBRE\": \"ROBERTO\",\r\n  \"APELLIDOS\": \"CERVANTES MÉNDEZ\",\r\n  \"EMAIL\": \"clientenueve@gmail.com\",\r\n  \"ENVIOS\":[\"E9\",\"E27\"],\r\n  \"OFICINAS\":[\"O5\",\"O1\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 10",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"MOMG940330HMNXBN10\",\r\n  \"NOMBRE\": \"MÓNICA\",\r\n  \"APELLIDOS\": \"ORTEGA MORALES\",\r\n  \"EMAIL\": \"clientediez@icloud.com\",\r\n  \"ENVIOS\":[\"E10\"],\r\n  \"OFICINAS\":[\"O6\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 11",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"SGLC881002HMNDLZ11\",\r\n  \"NOMBRE\": \"SERGIO\",\r\n  \"APELLIDOS\": \"GÓMEZ LÓPEZ\",\r\n  \"EMAIL\": \"clienteonce@gmail.com\",\r\n  \"ENVIOS\":[\"E11\"],\r\n  \"OFICINAS\":[\"03\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 12",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"DACJ950317HMNRXR12\",\r\n  \"NOMBRE\": \"DANIELA\",\r\n  \"APELLIDOS\": \"AGUILAR CRUZ\",\r\n  \"EMAIL\": \"clientedoce@outlook.com\",\r\n  \"ENVIOS\":[\"E12\"],\r\n  \"OFICINAS\":[\"O1\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 13",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"JLFR860220HMNRXX13\",\r\n  \"NOMBRE\": \"JUAN LUIS\",\r\n  \"APELLIDOS\": \"FLORES RAMÍREZ\",\r\n  \"EMAIL\": \"clientetrece@gmail.com\",\r\n  \"ENVIOS\":[\"E13\",\"E26\"],\r\n  \"OFICINAS\":[\"O6\",\"O4\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 14",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"LAGC931212HMNDSW14\",\r\n  \"NOMBRE\": \"LUCÍA\",\r\n  \"APELLIDOS\": \"ARELLANO GUTIÉRREZ\",\r\n  \"EMAIL\": \"clientecatorce@icloud.com\",\r\n  \"ENVIOS\":[\"E14\"],\r\n  \"OFICINAS\":[\"O5\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 15",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"RJMP970801HMNXLR15\",\r\n  \"NOMBRE\": \"ROSA\",\r\n  \"APELLIDOS\": \"JIMÉNEZ MORA\",\r\n  \"EMAIL\": \"clientequince@outlook.com\",\r\n  \"ENVIOS\":[\"E15\"],\r\n  \"OFICINAS\":[\"O4\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 16",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"GJDL901113HDFRSM16\",\r\n  \"NOMBRE\": \"GUSTAVO\",\r\n  \"APELLIDOS\": \"JUÁREZ DELGADO\",\r\n  \"EMAIL\": \"clientedieciseis@gmail.com\",\r\n  \"ENVIOS\":[\"E16\"],\r\n  \"OFICINAS\":[\"O3\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 17",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"CFGL850415HMNBGD17\",\r\n  \"NOMBRE\": \"CARLOS\",\r\n  \"APELLIDOS\": \"FLORES GARCÍA\",\r\n  \"EMAIL\": \"clientediecisiete@icloud.com\",\r\n  \"ENVIOS\":[\"E17\"],\r\n  \"OFICINAS\":[\"O2\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 18",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"MPCV920327HDFPST18\",\r\n  \"NOMBRE\": \"MARÍA\",\r\n  \"APELLIDOS\": \"PEREZ CASTILLO\",\r\n  \"EMAIL\": \"clientedieciocho@outlook.com\",\r\n  \"ENVIOS\":[\"E18\"],\r\n  \"OFICINAS\":[\"O1\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 19",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"JLPC921218HMNXMR19\",\r\n  \"NOMBRE\": \"JUAN LUIS\",\r\n  \"APELLIDOS\": \"PINEDA CRUZ\",\r\n  \"EMAIL\": \"clientediecinueve@gmail.com\",\r\n  \"OFICINAS\":[\"O4\"],\r\n  \"ENVIOS\":[\"E19\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 20",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"MTDC910509HDFRVR20\",\r\n  \"NOMBRE\": \"MARÍA TERESA\",\r\n  \"APELLIDOS\": \"DOMÍNGUEZ CASTRO\",\r\n  \"EMAIL\": \"clienteveinte@icloud.com\",\r\n  \"OFICINAS\":[\"O3\"],\r\n  \"ENVIOS\":[\"E20\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 21",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"ARLP880303HMNRFR21\",\r\n  \"NOMBRE\": \"ANA ROSA\",\r\n  \"APELLIDOS\": \"RAMÍREZ LÓPEZ\",\r\n  \"EMAIL\": \"clienteveintiuno@gmail.com\",\r\n  \"OFICINAS\":[\"O6\"],\r\n  \"ENVIOS\":[\"E21\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 22",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"JLCA960505HMNGRS22\",\r\n  \"NOMBRE\": \"JUAN LUIS\",\r\n  \"APELLIDOS\": \"CASTILLO ÁLVAREZ\",\r\n  \"EMAIL\": \"clienteveintidos@outlook.com\",\r\n  \"OFICINAS\":[\"O5\"],\r\n  \"ENVIOS\":[\"E22\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 23",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"RLGS950613HMNNSR23\",\r\n  \"NOMBRE\": \"ROBERTO\",\r\n  \"APELLIDOS\": \"LOZANO GÓMEZ\",\r\n  \"EMAIL\": \"clienteveintitres@gmail.com\",\r\n  \"OFICINAS\":[\"O3\"],\r\n  \"ENVIOS\":[\"E23\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 24",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"MGVC910617HMNXDS24\",\r\n  \"NOMBRE\": \"MÓNICA\",\r\n  \"APELLIDOS\": \"GONZÁLEZ VÁZQUEZ\",\r\n  \"EMAIL\": \"cli8enteveinticuatro@icloud.com\",\r\n  \"OFICINAS\":[\"O2\"],\r\n  \"ENVIOS\":[\"E24\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Cliente 25",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"CURP\": \"SPTM900414HMNVPS25\",\r\n  \"NOMBRE\": \"SOFÍA\",\r\n  \"APELLIDOS\": \"PÉREZ TORRES\",\r\n  \"EMAIL\": \"clienteveinticinco@gmail.com\",\r\n  \"OFICINAS\":[\"O6\"],\r\n  \"ENVIOS\":[\"E25\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						}
					]
				},
				{
					"name": "Oficinas",
					"item": [
						{
							"name": "Oficina 1",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"_id\": \"111111111111111111111111\",\r\n  \"ID\":\"O1\",\r\n  \"NOMBRE\": \"OFICINA CENTRAL\",\r\n  \"DIRECCION\": {\r\n    \"CALLE\": \"AVENIDA REVOLUCIÓN\",\r\n    \"NUMERO\": \"123\",\r\n    \"CIUDAD\": \"CIUDAD DE MÉXICO\",\r\n    \"CODIGO_POSTAL\": \"12345\"\r\n  },\r\n  \"TELEFONO\": \"+52 55 1234 5678\",\r\n  \"EMAIL\": \"OFICINACENTRALRVLUCION@gmail.com\",\r\n  \"CLIENTES\":[\r\n\t  \"SABC560626MHGRLR01\",\r\n\t  \"GAMA840204HJGSTC07\",\r\n\t  \"DACJ950317HMNRXR12\",\r\n\t  \"MPCV920327HDFPST18\",\r\n\t  \"RCMM871121HDFXHJ09\"],\r\n  \"ENVIOS\":[\r\n\t  \"E1\",\r\n\t  \"E7\",\r\n\t  \"E12\",\r\n\t  \"E18\",\r\n\t  \"E27\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/oficina/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"oficina",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Oficina 2",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"_id\": \"222222222222222222222222\",\r\n  \"ID\":\"O2\",\r\n  \"NOMBRE\": \"SUCURSAL NORTE\",\r\n  \"DIRECCION\": {\r\n    \"CALLE\": \"CALLE REFORMA\",\r\n    \"NUMERO\": \"456\",\r\n    \"CIUDAD\": \"MONTERREY\",\r\n    \"CODIGO_POSTAL\": \"54321\"\r\n  },\r\n  \"TELEFONO\": \"+52 81 9876 5432\",\r\n  \"EMAIL\": \"SUCURSALNTEMTY@outlook.com\",\r\n  \"CLIENTES\":[\r\n\t  \"GASM880805HJGMND04\",\r\n\t  \"CFGL850415HMNBGD17\",\r\n\t  \"MGVC910617HMNXDS24\"],\r\n  \"ENVIOS\":[\r\n\t  \"E4\",\r\n\t  \"E17\",\r\n\t  \"E24\",\r\n\t  \"E30\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/oficina/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"oficina",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Oficina 3",
							"request": {
								"auth": {
									"type": "inherit"
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"_id\": \"333333333333333333333333\",\r\n  \"ID\":\"O3\",\r\n  \"NOMBRE\": \"SUCURSAL SUR\",\r\n  \"DIRECCION\": {\r\n    \"CALLE\": \"AVENIDA JUÁREZ\",\r\n    \"NUMERO\": \"789\",\r\n    \"CIUDAD\": \"GUADALAJARA\",\r\n    \"CODIGO_POSTAL\": \"67890\"\r\n  },\r\n  \"TELEFONO\": \"+52 33 8765 4321\",\r\n  \"EMAIL\": \"SUCURSALSURGDL@icloud.com\",\r\n  \"CLIENTES\":[\r\n\t  \"FESP970726HDFXYZ02\",\r\n\t  \"CSGM980410HDFQPL05\",\r\n\t  \"LAJF960713HDFCNP08\",\r\n\t  \"SGLC881002HMNDLZ11\",\r\n\t  \"GJDL901113HDFRSM16\",\r\n\t  \"JLPC921218HMNXMR19\",\r\n\t  \"RLGS950613HMNNSR23\",\r\n\t  \"GASM880805HJGMND04\"],\r\n  \"ENVIOS\":[\r\n\t  \"E2\",\r\n\t  \"E5\",\r\n\t  \"E8\",\r\n\t  \"E11\",\r\n\t  \"E16\",\r\n\t  \"E20\",\r\n\t  \"E1\",\r\n\t  \"E29\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/oficina/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"oficina",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Oficina 4",
							"request": {
								"auth": {
									"type": "inherit"
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"_id\": \"444444444444444444444444\",\r\n  \"ID\":\"O4\",\r\n  \"NOMBRE\": \"SUCURSAL ESTE\",\r\n  \"DIRECCION\": {\r\n    \"CALLE\": \"CALLE MORELOS\",\r\n    \"NUMERO\": \"101\",\r\n    \"CIUDAD\": \"PUEBLA\",\r\n    \"CODIGO_POSTAL\": \"45678\"\r\n  },\r\n  \"TELEFONO\": \"+52 222 7654 3210\",\r\n  \"EMAIL\": \"SUCURSALPUEBLA@outlook.com\",\r\n  \"CLIENTES\":[\r\n\t  \"MPFA900915HMNKRC06\",\r\n\t  \"RJMP970801HMNXLR15\",\r\n\t  \"MTDC910509HDFRVR20\",\r\n\t  \"JLFR860220HMNRXX13\"],\r\n  \"ENVIOS\":[\r\n\t  \"E6\",\r\n\t  \"E15\",\r\n\t  \"E19\",\r\n\t  \"E26\",\r\n\t  \"E28\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/oficina/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"oficina",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Oficina 5",
							"request": {
								"auth": {
									"type": "inherit"
								},
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"_id\": \"555555555555555555555555\",\r\n  \"ID\":\"O5\",\r\n  \"NOMBRE\": \"SUCURSAL OESTE\",\r\n  \"DIRECCION\": {\r\n    \"CALLE\": \"CALLE HIDALGO\",\r\n    \"NUMERO\": \"202\",\r\n    \"CIUDAD\": \"GUADALAJARA\",\r\n    \"CODIGO_POSTAL\": \"78901\"\r\n  },\r\n  \"TELEFONO\": \"+52 33 6543 2109\",\r\n  \"EMAIL\": \"SUCURSALGDL@gmail.com\",\r\n  \"CLIENTES\":[\r\n\t  \"LMJR901010MHGNRS03\",\r\n\t  \"RCMM871121HDFXHJ09\",\r\n\t  \"LAGC931212HMNDSW14\",\r\n\t  \"JLCA960505HMNGRS22\"],\r\n  \"ENVIOS\":[\r\n\t  \"E3\",\r\n\t  \"E9\",\r\n\t  \"E14\",\r\n\t  \"E22\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/oficina/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"oficina",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Oficina 6",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"_id\": \"666666666666666666666666\",\r\n  \"ID\":\"O6\",\r\n  \"NOMBRE\": \"SUCURSAL CENTRAL\",\r\n  \"DIRECCION\": {\r\n    \"CALLE\": \"AVENIDA BENITO JUÁREZ\",\r\n    \"NUMERO\": \"303\",\r\n    \"CIUDAD\": \"TIJUANA\",\r\n    \"CODIGO_POSTAL\": \"23456\"\r\n  },\r\n  \"TELEFONO\": \"+52 664 5432 1098\",\r\n  \"EMAIL\": \"SUCURSALBJUARES@icloud.com\",\r\n  \"CLIENTES\":[\r\n\t  \"MOMG940330HMNXBN10\",\r\n\t  \"JLFR860220HMNRXX13\",\r\n\t  \"ARLP880303HMNRFR21\",\r\n\t  \"SPTM900414HMNVPS25\"],\r\n  \"ENVIOS\":[\r\n\t  \"E10\",\r\n\t  \"E13\",\r\n\t  \"E21\",\r\n\t  \"E25\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/oficina/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"oficina",
										""
									]
								}
							},
							"response": []
						}
					]
				},
				{
					"name": "Envios",
					"item": [
						{
							"name": "Envio 1",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E1\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-09\",\r\n  \"PESO\": \"2 KG\",\r\n  \"DIMENSIONES\": \"20X20X20 CM\",\r\n  \"COSTO_TOTAL\": \"$200.00\",\r\n  \"ESTATUS\": \"PENDIENTE\",\r\n  \"CLIENTE\": \"SABC560626MHGRLR01\",\r\n  \"ORIGEN\": \"O1\",\r\n  \"DESTINO\": \"O2\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO10\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 2",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E2\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-10\",\r\n  \"PESO\": \"5 KG\",\r\n  \"DIMENSIONES\": \"30X30X30 CM\",\r\n  \"COSTO_TOTAL\": \"$350.00\",\r\n  \"ESTATUS\": \"TRÁNSITO\",\r\n  \"CLIENTE\": \"FESP970726HDFXYZ02\",\r\n  \"ORIGEN\": \"O3\",\r\n  \"DESTINO\": \"O4\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO5\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 3",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E3\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-11\",\r\n  \"PESO\": \"3 KG\",\r\n  \"DIMENSIONES\": \"25X25X25 CM\",\r\n  \"COSTO_TOTAL\": \"$250.00\",\r\n  \"ESTATUS\": \"TRÁNSITO\",\r\n  \"CLIENTE\": \"LMJR901010MHGNRS03\",\r\n  \"ORIGEN\": \"O5\",\r\n  \"DESTINO\": \"O6\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO4\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 4",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E4\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-10\",\r\n  \"CLIENTE\": \"GASM880805HJGMND04\",\r\n  \"ORIGEN\": \"O2\",\r\n  \"DESTINO\": \"O1\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO1\",\r\n  \"PESO\": \"5 KG\",\r\n  \"DIMENSIONES\": \"30X30X30 CM\",\r\n  \"COSTO_TOTAL\": \"$350.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 5",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E5\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-11\",\r\n  \"CLIENTE\": \"CSGM980410HDFQPL05\",\r\n  \"ORIGEN\": \"03\",\r\n  \"DESTINO\": \"05\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO2\",\r\n  \"PESO\": \"3 KG\",\r\n  \"DIMENSIONES\": \"25X25X25 CM\",\r\n  \"COSTO_TOTAL\": \"$250.00\",\r\n  \"ESTATUS\": \"TRÁNSITO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 6",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E6\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-12\",\r\n  \"CLIENTE\": \"MPFA900915HMNKRC06\",\r\n  \"ORIGEN\": \"O4\",\r\n  \"DESTINO\": \"O3\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO3\",\r\n  \"PESO\": \"4 KG\",\r\n  \"DIMENSIONES\": \"35X35X35 CM\",\r\n  \"COSTO_TOTAL\": \"$300.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 7",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E7\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-13\",\r\n  \"CLIENTE\": \"GAMA840204HJGSTC07\",\r\n  \"ORIGEN\": \"O1\",\r\n  \"DESTINO\": \"O3\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO3\",\r\n  \"PESO\": \"1 KG\",\r\n  \"DIMENSIONES\": \"15X15X15 CM\",\r\n  \"COSTO_TOTAL\": \"$150.00\",\r\n  \"ESTATUS\": \"TRÁNSITO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 8",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E8\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-14\",\r\n  \"CLIENTE\": \"LAJF960713HDFCNP08\",\r\n  \"ORIGEN\": \"O3\",\r\n  \"DESTINO\": \"O6\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO4\",\r\n  \"PESO\": \"2.5 KG\",\r\n  \"DIMENSIONES\": \"22X22X22 CM\",\r\n  \"COSTO_TOTAL\": \"$275.00\",\r\n  \"ESTATUS\": \"ENTREGADO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 9",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E9\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-15\",\r\n  \"CLIENTE\": \"RCMM871121HDFXHJ09\",\r\n  \"ORIGEN\": \"O5\",\r\n  \"DESTINO\": \"O4\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO9\",\r\n  \"PESO\": \"3.2 KG\",\r\n  \"DIMENSIONES\": \"28X28X28 CM\",\r\n  \"COSTO_TOTAL\": \"$280.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 10",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E10\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-16\",\r\n  \"CLIENTE\": \"MOMG940330HMNXBN10\",\r\n  \"ORIGEN\": \"O6\",\r\n  \"DESTINO\": \"O3\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO1\",\r\n  \"PESO\": \"4.8 KG\",\r\n  \"DIMENSIONES\": \"32X32X32 CM\",\r\n  \"COSTO_TOTAL\": \"$420.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 11",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E11\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-17\",\r\n  \"CLIENTE\": \"SGLC881002HMNDLZ11\",\r\n  \"ORIGEN\": \"O3\",\r\n  \"DESTINO\": \"O2\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO2\",\r\n  \"PESO\": \"1.8 KG\",\r\n  \"DIMENSIONES\": \"18X18X18 CM\",\r\n  \"COSTO_TOTAL\": \"$200.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 12",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E12\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-18\",\r\n  \"CLIENTE\": \"DACJ950317HMNRXR12\",\r\n  \"ORIGEN\": \"O1\",\r\n  \"DESTINO\": \"O6\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO5\",\r\n  \"PESO\": \"3.5 KG\",\r\n  \"DIMENSIONES\": \"30X30X25 CM\",\r\n  \"COSTO_TOTAL\": \"$300.00\",\r\n  \"ESTATUS\": \"ENTREGADO\"\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 13",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E13\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-19\",\r\n  \"CLIENTE\": \"JLFR860220HMNRXX13\",\r\n  \"ORIGEN\": \"O6\",\r\n  \"DESTINO\": \"O3\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO8\",\r\n  \"PESO\": \"2.2 KG\",\r\n  \"DIMENSIONES\": \"22X22X20 CM\",\r\n  \"COSTO_TOTAL\": \"$220.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 14",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E14\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-20\",\r\n  \"CLIENTE\": \"LAGC931212HMNDSW14\",\r\n  \"ORIGEN\": \"O5\",\r\n  \"DESTINO\": \"O1\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO7\",\r\n  \"PESO\": \"1.5 KG\",\r\n  \"DIMENSIONES\": \"15X15X15 CM\",\r\n  \"COSTO_TOTAL\": \"$180.00\",\r\n  \"ESTATUS\": \"TRÁNSITO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 15",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E15\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-21\",\r\n  \"CLIENTE\": \"RJMP970801HMNXLR15\",\r\n  \"ORIGEN\": \"O4\",\r\n  \"DESTINO\": \"O3\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO7\",\r\n  \"PESO\": \"2.7 KG\",\r\n  \"DIMENSIONES\": \"25X25X25 CM\",\r\n  \"COSTO_TOTAL\": \"$250.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 16",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E16\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-22\",\r\n  \"CLIENTE\": \"GJDL901113HDFRSM16\",\r\n  \"ORIGEN\": \"O3\",\r\n  \"DESTINO\": \"O1\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO5\",\r\n  \"PESO\": \"3.8 KG\",\r\n  \"DIMENSIONES\": \"35X35X30 CM\",\r\n  \"COSTO_TOTAL\": \"$380.00\",\r\n  \"ESTATUS\": \"TRÁNSITO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 17",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\":\"E17\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-23\",\r\n  \"CLIENTE\": \"CFGL850415HMNBGD17\",\r\n  \"ORIGEN\": \"O2\",\r\n  \"DESTINO\": \"O5\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO3\",\r\n  \"PESO\": \"2.3 KG\",\r\n  \"DIMENSIONES\": \"23X23X23 CM\",\r\n  \"COSTO_TOTAL\": \"$230.00\",\r\n  \"ESTATUS\": \"TRÁNSITO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 18",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E18\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-24\",\r\n  \"CLIENTE\": \"MPCV920327HDFPST18\",\r\n  \"ORIGEN\": \"O1\",\r\n  \"DESTINO\": \"O6\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO7\",\r\n  \"PESO\": \"2.1 KG\",\r\n  \"DIMENSIONES\": \"21X21X21 CM\",\r\n  \"COSTO_TOTAL\": \"$210.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 19",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E19\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-25\",\r\n  \"CLIENTE\": \"MTDC910509HDFRVR20\",\r\n  \"ORIGEN\": \"O4\",\r\n  \"DESTINO\": \"O5\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO9\",\r\n  \"PESO\": \"4.5 KG\",\r\n  \"DIMENSIONES\": \"33X33X33 CM\",\r\n  \"COSTO_TOTAL\": \"$400.00\",\r\n  \"ESTATUS\": \"ENTREGADO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 20",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E20\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-26\",\r\n  \"CLIENTE\": \"JLPC921218HMNXMR19\",\r\n  \"ORIGEN\": \"O3\",\r\n  \"DESTINO\": \"O4\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO2\",\r\n  \"PESO\": \"2.9 KG\",\r\n  \"DIMENSIONES\": \"29X29X29 CM\",\r\n  \"COSTO_TOTAL\": \"$290.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 21",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E21\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-27\",\r\n  \"CLIENTE\": \"ARLP880303HMNRFR21\",\r\n  \"ORIGEN\": \"O6\",\r\n  \"DESTINO\": \"O3\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO4\",\r\n  \"PESO\": \"3.7 KG\",\r\n  \"DIMENSIONES\": \"31X31X31 CM\",\r\n  \"COSTO_TOTAL\": \"$320.00\",\r\n  \"ESTATUS\": \"ENTREGADO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 22",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E22\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-28\",\r\n  \"CLIENTE\": \"JLCA960505HMNGRS22\",\r\n  \"ORIGEN\": \"O5\",\r\n  \"DESTINO\": \"O1\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO6\",\r\n  \"PESO\": \"1.3 KG\",\r\n  \"DIMENSIONES\": \"17X17X17 CM\",\r\n  \"COSTO_TOTAL\": \"$130.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 23",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E23\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-29\",\r\n  \"CLIENTE\": \"RLGS950613HMNNSR23\",\r\n  \"ORIGEN\": \"O3\",\r\n  \"DESTINO\": \"O2\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO8\",\r\n  \"PESO\": \"2.3 KG\",\r\n  \"DIMENSIONES\": \"23X23X23 CM\",\r\n  \"COSTO_TOTAL\": \"$220.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 24",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E24\",\r\n  \"FECHA_DE_ENVIO\": \"2024-04-30\",\r\n  \"CLIENTE\": \"MGVC910617HMNXDS24\",\r\n  \"ORIGEN\": \"O2\",\r\n  \"DESTINO\": \"O6\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO10\",\r\n  \"PESO\": \"4.2 KG\",\r\n  \"DIMENSIONES\": \"32X32X32 CM\",\r\n  \"COSTO_TOTAL\": \"$350.00\",\r\n  \"ESTATUS\": \"TRÁNSITO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 25",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E25\",\r\n  \"FECHA_DE_ENVIO\": \"2024-05-01\",\r\n  \"CLIENTE\": \"SPTM900414HMNVPS25\",\r\n  \"ORIGEN\": \"O6\",\r\n  \"DESTINO\": \"O4\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO1\",\r\n  \"PESO\": \"3.6 KG\",\r\n  \"DIMENSIONES\": \"30X30X30 CM\",\r\n  \"COSTO_TOTAL\": \"$380.00\",\r\n  \"ESTATUS\": \"ENTREGADO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 26",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E26\",\r\n  \"FECHA_DE_ENVIO\": \"2024-05-02\",\r\n  \"CLIENTE\": \"JLFR860220HMNRXX13\",\r\n  \"ORIGEN\": \"O4\",\r\n  \"DESTINO\": \"O3\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO3\",\r\n  \"PESO\": \"2.8 KG\",\r\n  \"DIMENSIONES\": \"28X28X28 CM\",\r\n  \"COSTO_TOTAL\": \"$260.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 27",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E27\",\r\n  \"FECHA_DE_ENVIO\": \"2024-05-03\",\r\n  \"CLIENTE\": \"RCMM871121HDFXHJ09\",\r\n  \"ORIGEN\": \"O1\",\r\n  \"DESTINO\": \"O2\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO7\",\r\n  \"PESO\": \"3.1 KG\",\r\n  \"DIMENSIONES\": \"29X29X29 CM\",\r\n  \"COSTO_TOTAL\": \"$270.00\",\r\n  \"ESTATUS\": \"TRÁNSITO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 28",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E28\",\r\n  \"FECHA_DE_ENVIO\": \"2024-05-04\",\r\n  \"CLIENTE\": \"MPFA900915HMNKRC06\",\r\n  \"ORIGEN\": \"O4\",\r\n  \"DESTINO\": \"O1\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO5\",\r\n  \"PESO\": \"4.9 KG\",\r\n  \"DIMENSIONES\": \"35X35X35 CM\",\r\n  \"COSTO_TOTAL\": \"$420.00\",\r\n  \"ESTATUS\": \"PENDIENTE\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 29",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E29\",\r\n  \"FECHA_DE_ENVIO\": \"2024-05-05\",\r\n  \"CLIENTE\": \"GASM880805HJGMND04\",\r\n  \"ORIGEN\": \"O3\",\r\n  \"DESTINO\": \"O2\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO7\",\r\n  \"PESO\": \"1.7 KG\",\r\n  \"DIMENSIONES\": \"17X17X17 CM\",\r\n  \"COSTO_TOTAL\": \"$180.00\",\r\n  \"ESTATUS\": \"ENTREGADO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Envio 30",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"E30\",\r\n  \"FECHA_DE_ENVIO\": \"2024-05-06\",\r\n  \"CLIENTE\": \"GASM880805HJGMND04\",\r\n  \"ORIGEN\": \"O2\",\r\n  \"DESTINO\": \"O1\",\r\n  \"TIPO_DE_ENVIO\": \"TIPO10\",\r\n  \"PESO\": \"2.4 KG\",\r\n  \"DIMENSIONES\": \"24X24X24 CM\",\r\n  \"COSTO_TOTAL\": \"$240.00\",\r\n  \"ESTATUS\": \"TRÁNSITO\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						}
					]
				},
				{
					"name": "Tipos de envio",
					"item": [
						{
							"name": "Tipo 1",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"TIPO1\",\r\n  \"DESCRIPCION\": \"TERRESTRE\",\r\n  \"PRECIO_KM\": \"$1.50\",\r\n  \"TIEMPO_ENTREGA\": \"2 DÍAS\",\r\n  \"ENVIOS\":[\r\n\t\"E1\",\r\n\t\"E10\",\r\n\t\"E25\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/tipo-envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Tipo 2",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"TIPO2\",\r\n  \"DESCRIPCION\": \"AEREO\",\r\n  \"PRECIO_KM\": \"$3.00\",\r\n  \"TIEMPO_ENTREGA\": \"1 DÍA\",\r\n  \"ENVIOS\":[\r\n\t\"E5\",\r\n\t\"E11\",\r\n\t\"E20\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/tipo-envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Tipo 3",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"TIPO3\",\r\n  \"DESCRIPCION\": \"EXPRESS\",\r\n  \"PRECIO_KM\": \"$5.00\",\r\n  \"TIEMPO_ENTREGA\": \"4 HORAS\",\r\n  \"ENVIOS\":[\r\n\t\"E6\",\r\n\t\"E7\",\r\n\t\"E17\",\r\n\t\"E26\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/tipo-envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Tipo 4",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"TIPO4\",\r\n  \"DESCRIPCION\": \"TERRESTRE\",\r\n  \"PRECIO_KM\": \"$1.00\",\r\n  \"TIEMPO_ENTREGA\": \"5 DÍAS\",\r\n  \"ENVIOS\":[\r\n\t\"E3\",\r\n\t\"E8\",\r\n\t\"E21\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/tipo-envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Tipo 5",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"TIPO5\",\r\n  \"DESCRIPCION\": \"AEREO\",\r\n  \"PRECIO_KM\": \"$7.00\",\r\n  \"TIEMPO_ENTREGA\": \"1 HORA\",\r\n  \"ENVIOS\":[\r\n\t\"E2\",\r\n\t\"E12\",\r\n\t\"E16\",\r\n\t\"E28\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/tipo-envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Tipo 6",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"TIPO6\",\r\n  \"DESCRIPCION\": \"EXPRESS\",\r\n  \"PRECIO_KM\": \"$10.00\",\r\n  \"TIEMPO_ENTREGA\": \"30 MINUTOS\",\r\n  \"ENVIOS\":[\r\n\t\"E22\"\r\n  ]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/tipo-envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Tipo 7",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"TIPO7\",\r\n  \"DESCRIPCION\": \"TERRESTRE\",\r\n  \"PRECIO_KM\": \"$4.00\",\r\n  \"TIEMPO_ENTREGA\": \"3 DÍAS\",\r\n  \"ENVIOS\":[\r\n\t\"E14\",\r\n\t\"E15\",\r\n\t\"E18\",\r\n\t\"E27\",\r\n\t\"E29\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/tipo-envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Tipo 8",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"TIPO8\",\r\n  \"DESCRIPCION\": \"AEREO\",\r\n  \"PRECIO_KM\": \"$0.75\",\r\n  \"TIEMPO_ENTREGA\": \"1 DÍA\",\r\n  \"ENVIOS\":[\r\n\t  \"E13\",\r\n\t  \"E23\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/tipo-envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Tipo 9",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"TIPO9\",\r\n  \"DESCRIPCION\": \"EXPRESS\",\r\n  \"PRECIO_KM\": \"$2.50\",\r\n  \"TIEMPO_ENTREGA\": \"3 DÍAS\",\r\n  \"ENVIOS\":[\r\n\t  \"E9\",\r\n\t  \"E19\"]\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/tipo-envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Tipo 10",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n  \"ID\": \"TIPO10\",\r\n  \"DESCRIPCION\": \"TERRESTRE\",\r\n  \"PRECIO_KM\": \"$4.50\",\r\n  \"TIEMPO_ENTREGA\": \"12 HORAS\",\r\n  \"ENVIOS\":[\r\n\t  \"E1\",\r\n\t  \"E24\",\r\n\t  \"E30\"]\r\n}\r\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/tipo-envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										""
									]
								}
							},
							"response": []
						}
					]
				}
			]
		},
		{
			"name": "Querys",
			"item": [
				{
					"name": "Q1",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/query/oficinas/",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"query",
								"oficinas",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "Q2",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/query/oficinas/O2/envios",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"query",
								"oficinas",
								"O2",
								"envios"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q3",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/query/tipos-envio/TIPO10/envios",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"query",
								"tipos-envio",
								"TIPO10",
								"envios"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q4",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/query/clientes/GASM880805HJGMND04/envios",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"query",
								"clientes",
								"GASM880805HJGMND04",
								"envios"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q5",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/query/oficinas/O3/clientes",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"query",
								"oficinas",
								"O3",
								"clientes"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q6",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/query/envios/entregados",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"query",
								"envios",
								"entregados"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q7",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/query/envios/terrestre",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"query",
								"envios",
								"terrestre"
							]
						}
					},
					"response": []
				},
				{
					"name": "Q8",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:3000/api/query/oficinas/O1/envios/express",
							"host": [
								"localhost"
							],
							"port": "3000",
							"path": [
								"api",
								"query",
								"oficinas",
								"O1",
								"envios",
								"express"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "CRUD",
			"item": [
				{
					"name": "Cliente",
					"item": [
						{
							"name": "Create",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"CURP\": \"MAGG020623HNTRZDA9\",\n  \"NOMBRE\": \"GADYEL JOSUE\",\n  \"APELLIDOS\": \"MARTINEZ GUZMAN\",\n  \"EMAIL\": \"gadyelmtz@gmail.com\",\n  \"OFICINAS\":[\"O7\"],\n  \"ENVIOS\":[\"E31\"]\n}\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Read - ID",
							"request": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "localhost:3000/api/cliente/MAGG020623HNTRZDA9",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										"MAGG020623HNTRZDA9"
									]
								}
							},
							"response": []
						},
						{
							"name": "Read",
							"request": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "localhost:3000/api/cliente/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Update",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"CURP\": \"MAGG020623HNTRZDA9\",\n  \"NOMBRE\": \"GADYEL J\",\n  \"APELLIDOS\": \"MARTINEZ GUZMAN\",\n  \"EMAIL\": \"gadyelmtz@gmail.com\",\n  \"OFICINAS\":[\"O7\"],\n  \"ENVIOS\":[\"E31\"]\n}\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/cliente/MAGG020623HNTRZDA9",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										"MAGG020623HNTRZDA9"
									]
								}
							},
							"response": []
						},
						{
							"name": "Delete",
							"request": {
								"method": "DELETE",
								"header": [],
								"url": {
									"raw": "localhost:3000/api/cliente/MAGG020623HNTRZDA9",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"cliente",
										"MAGG020623HNTRZDA9"
									]
								}
							},
							"response": []
						}
					]
				},
				{
					"name": "Oficina",
					"item": [
						{
							"name": "Create",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"_id\": \"777777777777777777777777\",\n  \"ID\":\"O7\",\n  \"NOMBRE\": \"SUCURSAL NORTWEST\",\n  \"DIRECCION\": {\n    \"CALLE\": \"AVENIDA INSURGENTES\",\n    \"NUMERO\": \"400\",\n    \"CIUDAD\": \"TEPIC\",\n    \"CODIGO_POSTAL\": \"63000\"\n  },\n  \"TELEFONO\": \"+52 1324 43242 54343\",\n  \"EMAIL\": \"NORTHWEST@icloud.com\",\n  \"CLIENTES\":[\n\t  \"MAGG020623HNTRZDA9\"],\n  \"ENVIOS\":[\n\t  \"E31\"]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/oficina/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"oficina",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Read - ID",
							"request": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "localhost:3000/api/oficina/O7",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"oficina",
										"O7"
									]
								}
							},
							"response": []
						},
						{
							"name": "Read",
							"request": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "localhost:3000/api/oficina/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"oficina",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Update",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"_id\": \"777777777777777777777777\",\n  \"ID\":\"O7\",\n  \"NOMBRE\": \"SUCURSAL MODIFICADA\",\n  \"DIRECCION\": {\n    \"CALLE\": \"AVENIDA INSURGENTES\",\n    \"NUMERO\": \"400\",\n    \"CIUDAD\": \"TEPIC\",\n    \"CODIGO_POSTAL\": \"63000\"\n  },\n  \"TELEFONO\": \"+52 1324 43242 54343\",\n  \"EMAIL\": \"NORTHWEST@icloud.com\",\n  \"CLIENTES\":[\n\t  \"MAGG020623HNTRZDA9\"],\n  \"ENVIOS\":[\n\t  \"E31\"]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/oficina/O7",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"oficina",
										"O7"
									]
								}
							},
							"response": []
						},
						{
							"name": "Delete",
							"request": {
								"method": "DELETE",
								"header": [],
								"url": {
									"raw": "localhost:3000/api/oficina/O7",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"oficina",
										"O7"
									]
								}
							},
							"response": []
						}
					]
				},
				{
					"name": "Envios",
					"item": [
						{
							"name": "Create",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"ID\": \"E31\",\n  \"FECHA_DE_ENVIO\": \"2024-05-21\",\n  \"PESO\": \"300 KG\",\n  \"DIMENSIONES\": \"25X25X25 CM\",\n  \"COSTO_TOTAL\": \"$250.00\",\n  \"ESTATUS\": \"TRÁNSITO\",\n  \"CLIENTE\": \"MAGG020623HNTRZDA9\",\n  \"ORIGEN\": \"O1\",\n  \"DESTINO\": \"O2\",\n  \"TIPO_DE_ENVIO\": \"TIPO4\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Read - ID",
							"request": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "localhost:3000/api/envio/E31",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										"E31"
									]
								}
							},
							"response": []
						},
						{
							"name": "Read",
							"request": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "localhost:3000/api/envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Update",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"ID\": \"E31\",\n  \"FECHA_DE_ENVIO\": \"2024-05-21\",\n  \"PESO\": \"30 KG\",\n  \"DIMENSIONES\": \"25X25X25 CM\",\n  \"COSTO_TOTAL\": \"$2500.00\",\n  \"ESTATUS\": \"TRÁNSITO\",\n  \"CLIENTE\": \"MAGG020623HNTRZDA9\",\n  \"ORIGEN\": \"O1\",\n  \"DESTINO\": \"O2\",\n  \"TIPO_DE_ENVIO\": \"TIPO4\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/envio/E31",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										"E31"
									]
								}
							},
							"response": []
						},
						{
							"name": "Delete",
							"request": {
								"method": "DELETE",
								"header": [],
								"url": {
									"raw": "localhost:3000/api/envio/E31",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"envio",
										"E31"
									]
								}
							},
							"response": []
						}
					]
				},
				{
					"name": "Tipos de envio",
					"item": [
						{
							"name": "Create",
							"request": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"ID\": \"TIPO11\",\n  \"DESCRIPCION\": \"TERRESTRE\",\n  \"PRECIO_KM\": \"$10.50\",\n  \"TIEMPO_ENTREGA\": \"24 HORAS\",\n  \"ENVIOS\":[\n\t  \"E31\"]\n}\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/tipo-envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Read - ID",
							"request": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "localhost:3000/api/tipo-envio/TIPO11",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										"TIPO11"
									]
								}
							},
							"response": []
						},
						{
							"name": "Read",
							"request": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "localhost:3000/api/tipo-envio/",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										""
									]
								}
							},
							"response": []
						},
						{
							"name": "Update",
							"request": {
								"method": "PUT",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n  \"ID\": \"TIPO11\",\n  \"DESCRIPCION\": \"EXPRESS\",\n  \"PRECIO_KM\": \"$10.50\",\n  \"TIEMPO_ENTREGA\": \"26 HORAS\",\n  \"ENVIOS\":[\n\t  \"E31\"]\n}\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "localhost:3000/api/tipo-envio/TIPO11",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										"TIPO11"
									]
								}
							},
							"response": []
						},
						{
							"name": "Delete",
							"request": {
								"method": "DELETE",
								"header": [],
								"url": {
									"raw": "localhost:3000/api/tipo-envio/TIPO11",
									"host": [
										"localhost"
									],
									"port": "3000",
									"path": [
										"api",
										"tipo-envio",
										"TIPO11"
									]
								}
							},
							"response": []
						}
					]
				}
			]
		}
	]
}
```
