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
