import mongoose from 'mongoose';
import { User, Event } from '../models/index.js'; // Adjust the import path as necessary
import seedData from './seedData.json';
import db from '../dbconfig/connection.js';
import { IEvent } from '../models/Event.js';
//import { IUser } from '../models/User.js';


const seedDatabase = async () => {
	try {
		
		await db();
		
		// Clear the database
		await User.deleteMany();
		await Event.deleteMany();
		
		// run users one at a time to hash passwords using pre hook
		for (const user of seedData.users) {
			const newUser = new User(user);
			await newUser.save();
		}
		
		// Insert events
		const events:  IEvent[] = await Event.insertMany(seedData.events);
		
		// Assign events to users
		const users = await User.find();
		
		for (const user of users) {
			const randomEvents = events.filter(event => event.username === user.username);
			user.events.push(...randomEvents.map(post => post._id as mongoose.Schema.Types.ObjectId));
			
			await user.save();
		}
		
		console.log('Database seeded!');
		mongoose.connection.close();

	} catch (err) {
		console.error('Error seeding database:', err);
		mongoose.connection.close();
	}	
};

seedDatabase().catch(err => {
	console.error('Seed Error:', err);
	mongoose.connection.close();
});