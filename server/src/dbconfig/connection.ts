import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';

/* mongoose.connect(process.env.MONGODB_URI || ' */ 
/* mongodb://127.0.0.1:27017/ByteShift', {dbName: 'ByteShift'}); */

if (!MONGODB_URI) {
	throw new Error('MONGODB_URI is not defined in the environment variables.');
}

let isConnected = false;

const db = async (): Promise<typeof mongoose.connection> => {
	if (isConnected) {
		console.log('MongoDB is already connected.');
		return mongoose.connection;
	}

	try {
		const conn = await mongoose.connect(MONGODB_URI, {
			bufferCommands: false,
		});

		isConnected = true;
			console.log(`Mongoose Connected: ${conn.connection.host}`);
		
			mongoose.connection.on('connected', () => {
			console.log('Mongoose connected to database');
		});
		
		mongoose.connection.on('error', (err) => {
			console.error('Mongoose connection error:', err);
			isConnected = false;
		});
		
		mongoose.connection.on('disconnected', () => {
			console.log('Mongoose disconnected from database');
			isConnected = false;
		});

		process.on('SIGINT', async () => {
			await mongoose.connection.close();
			console.log('Mongoose connection closed due to app termination');
			process.exit(0);
		});

		return mongoose.connection;
	}
	catch (error) {
		console.error('MongoDB connection error:', error);
		isConnected = false;
		throw new Error('Database connection failed.');
}

};


export default db;