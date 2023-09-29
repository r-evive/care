import mongoose, { ConnectOptions, Connection } from 'mongoose';

async function connectDatabase() {
    if (global.mongoose && global.mongoose.connection) {
        console.log('Using existing mongoose connection');
        return global.mongoose.connection;
    }


    const options: ConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    } as ConnectOptions;

    const connection = mongoose.connect(String(process.env.MONGODB_URI), options).then((mongoose) => mongoose);
    console.log('Creating new mongoose connection');

    global.mongoose = {
        connection: await connection,
        promise: connection
    };

    return await connection;
}

export default connectDatabase;