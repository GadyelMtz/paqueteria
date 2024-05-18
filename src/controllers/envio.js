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
    const envios = await Envio.find();
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
    const envio = await Envio.findOne({ ID: req.params.id});

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
      return res.status(404).json({ message: "No se encontró la oficina" });
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
