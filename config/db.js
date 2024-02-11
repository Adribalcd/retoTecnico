const mongoose = require('mongoose');

exports.connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error en la conexión a MongoDB: ${err.message}`);
        process.exit(1);
    }
}

exports.disconnect = () => mongoose.disconnect();