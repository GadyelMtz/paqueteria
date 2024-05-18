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
