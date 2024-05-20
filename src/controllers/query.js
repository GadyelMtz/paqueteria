// /src/controllers/query.js
// Importar los modelos necesarios
const Cliente = require("../models/cliente");
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
  
      res.status(200).json(resultado[0]); // Enviar el primer (y único) documento en el resultado
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Q5. Listar los clientes que han realizado envíos en una determinada oficina.
const Q5 = async (req, res) => {
    try {
      // Buscar la oficina en la base de datos
      const oficina = await Oficina.findOne({ ID: req.params.id}).select('ID NOMBRE DIRECCION TELEFONO EMAIL -_id');
      // Buscar los clientes que están en el envio
      const clientes = await Cliente.find({CURP: { $in : oficina.CLIENTE } }).select('CURP NOMBRE APELLIDOS EMAIL -_id');
        
      const oficinaObj = oficina.toObject();
      oficinaObj.CLIENTES = clientes;
  
      if (oficina.length === 0) {
        return res.status(404).json({ message: "No se encontró la oficina" });
      }
  
      res.status(200).json(oficinaObj);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Q6. Listar los envíos de todas las oficinas con estatus de entregado.
const Q6 = async (req, res) => {
    try {
      // Buscar todos los envios con ese estatus
      const envios = Envio.find( {ESTATUS: 'ENTREGADO'} ).select('-_id');
      
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
  

      res.status(200).json(enviosArray);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Q7. Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas.
const Q7 = async (req, res) => {
    try {
      const envios = await TipoEnvio.find({})

      res.status(200).json();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Q8. Listar los clientes y sus envíos que se han remitido por el servicio por el servicio express considerando una oficina
// en específico.
const Q8 = async (req, res) => {
    const { oficinaId } = req.params;
  
    try {
      const resultado = await Envio.aggregate([
        {
          $match: { "ORIGEN": oficinaId }
        },
        {
          $lookup: {
            from: 'TIPO',
            localField: 'TIPO_DE_ENVIO',
            foreignField: 'ID',
            as: 'TIPO_DE_ENVIO'
          }
        },
        {
          $unwind: "$TIPO_DE_ENVIO"
        },
        {
          $match: { "TIPO_DE_ENVIO.DESCRIPCION": "EXPRESS" }
        },
        {
          $lookup: {
            from: 'CLIENTE',
            localField: 'CLIENTE',
            foreignField: 'CURP',
            as: 'CLIENTE'
          }
        },
        {
          $unwind: "$CLIENTE"
        },
        {
          $group: {
            _id: "$CLIENTE.CURP",
            NOMBRE: { $first: "$CLIENTE.NOMBRE" },
            APELLIDOS: { $first: "$CLIENTE.APELLIDOS" },
            EMAIL: { $first: "$CLIENTE.EMAIL" },
            ENVIOS: {
              $push: {
                ID_ENVIO: "$ID",
                DESCRIPCION: "$TIPO_DE_ENVIO.DESCRIPCION",
                FECHA_DE_ENVIO: "$FECHA_DE_ENVIO",
                ORIGEN: "$ORIGEN",
                DESTINO: "$DESTINO",
                PESO: "$PESO",
                COSTO_TOTAL: "$COSTO_TOTAL",
                ESTATUS: "$ESTATUS"
              }
            }
          }
        }
      ]);
  
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

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
