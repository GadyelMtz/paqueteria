// /src/models/paqueteria.js
// Importar mongoose para definir esquema y modelo
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Definir el esquema de oficina
const oficinaSchema = new Schema(
  {
    // campo _id para tener un objectID
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },

    // campo id para diferenciar a las oficinas de tipo entero, unico y requerido
    ID: {
      type: String,
      required: true,
      unique: true,
    },

    // campo nombre para el nombre de la oficina, de tipo String y requerido
    NOMBRE: {
      type: String,
      required: true,
    },

    // campo direccion para el domicilio de la oficina, de tipo Map y requerido
    DIRECCION: {
      type: Map,
      required: true,
    },

    // campo telefono de la oficina, de tipo String y requerido
    TELEFONO: {
      type: String,
      required: true,
      unique: true,
    },

    // campo email para el correo electrónico de la oficina, de tipo String y requerido
    EMAIL: {
      type: String,
      required: true,
      unique: true,
    },

    // campo clientes para almacenar los clientes de la oficina, es un arreglo de Strings referenciando al modelo 'cliente'
    CLIENTES: [
      {
        type: String,
        ref: "Cliente",
      },
    ],

    // campo envios para almacenar los envios de la oficina, es un arreglo de Strings referenciando al modelo 'envio'
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
module.exports = mongoose.model('Oficina', oficinaSchema);
