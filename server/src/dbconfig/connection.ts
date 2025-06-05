import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || '';

/* mongoose.connect(process.env.MONGODB_URI || ' */ 
/* mongodb://127.0.0.1:27017/ByteShift', {dbName: 'ByteShift'}); */

if (!MONGODB_URI) {
	throw new Error('MONGODB_URI is not defined in the environment variables.');
}

const db = async (): Promise<typeof mongoose.connection> => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log('Database connected.');
		
		mongoose.connection.on('connected', () => {
			console.log('Mongoose connected to database');
		});
		
		mongoose.connection.on('error', (err) => {
			console.error('Mongoose connection error:', err);
		});

		mongoose.connection.on('disconnected', () => {
			console.log('Mongoose disconnected from database');
		});

		return mongoose.connection;
		
	} catch (error) {
		console.error('Database connection error:', error);
		throw new Error('Database connection failed.');
	}
};

export default db;