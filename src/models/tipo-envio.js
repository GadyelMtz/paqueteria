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
