const { default: mongoose } = require("mongoose");

exports.dbConnection = () => {
    const dbName = process.env.DBNAME
    const uri = `mongodb://localhost:27017/${dbName}`
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.connect(`${uri}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            connectTimeoutMS: 10000,
            bufferCommands: false, // Disable mongoose buffering
        });

        mongoose.connection
            // Reject if an error occurred when trying to connect to MongoDB
            .on("error", (error) => {
                console.error("Error: connection to DB failed");
                reject(error);
            })
            // Exit Process if there is no longer a Database Connection
            .on("close", () => {
                process.exit(1);
            })
            // Connected to DB
            .once("open", () => {
                const infos = mongoose.connections;
                resolve(`DB Connected on ${new Date()}`);
            });
    })


}