import mongoose from 'mongoose';

let database: mongoose.Connection;

/**
 * Database connection configurations
 * Connect MongoDB atlas by provided URI from .env file in root folder of BE project
 */
export const connect = () => {

    const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI! ?? '';

    if (database) {
        return;
    }
    
    mongoose.connect(DB_CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    
    database = mongoose.connection;

    database.once("open", async () => {
        console.log("Connected to database");
    });

    database.on("connected", async () => {
        console.log("Connected to DB Cluster");
    });
      
    database.on("error", () => {
        console.log("Error connecting to database");
    });

};

/**
 * Disconnect MongoDB atlas
 */
export const disconnect = () => {
    
    if (!database) {
      return;
    }
    
    mongoose.disconnect();

    database.once("close", async () => {
        console.log("Diconnected  to database");
    });

};