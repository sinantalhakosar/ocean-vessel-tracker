import mongoose from 'mongoose';

let database: mongoose.Connection;

export const connect = () => {

    const url = "mongodb+srv://ocean_user:1234@cluster0.bfcxb.mongodb.net/OceanDB?retryWrites=true&w=majority";

    if (database) {
        return;
    }
    
    mongoose.connect(url, {
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

export const disconnect = () => {
    
    if (!database) {
      return;
    }
    
    mongoose.disconnect();

    database.once("close", async () => {
        console.log("Diconnected  to database");
    });

};