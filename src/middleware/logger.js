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
        time: new Date(),
        req: {
          method: req.method,
          url: req.originalUrl,
          body: req.body,
        },
        res: {
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
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
