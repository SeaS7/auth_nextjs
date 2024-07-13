import { log } from "console";
import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI! )
        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log('Database connected');
        })
        connection.on('error', (err) => {
            console.log('Error connecting to the database',err);
            process.exit()
        })
    } catch (error) {
        console.log('Error connecting to the database: ', error);
    }
}