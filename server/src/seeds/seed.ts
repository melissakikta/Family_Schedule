import mongoose from 'mongoose';
import { User, Event } from '../models/index.js'; // Adjust the import path as necessary
import seedData from './seedData.js'; // Ensure the JSON file is correctly formatted
import db from '../dbconfig/connection.js';
import { IEvent } from '../models/Event.js';
//import { IUser } from '../models/User.js';


const seedDatabase = async () => {
	try {
		
		await db();
		
		// Clear the database
		await User.deleteMany();
		await Event.deleteMany();
		
		console.log('Database cleared');

		// run users one at a time to hash passwords using pre hook
		console.log('Creating users...');
		for (const user of seedData.users) {
			const newUser = new User(user);
			await newUser.save();
		}
		console.log(`Created ${seedData.users.length} users`);

		// Insert events
		console.log('Creating events...');
		const events:  IEvent[] = await Event.insertMany(seedData.events);
		console.log(`Created ${events.length} events`);

		// Assign events to users
		console.log('Assigning events to users...');
		const users = await User.find();
		
		for (const user of users) {
			//find events that belong to the user
			const userEvents = events.filter(event => event.username === user.username);
			//add only the objectIds ti tge user' events array
			user.events = userEvents.map(event => event._id as mongoose.Schema.Types.ObjectId);
			
			await user.save();
			console.log(`Assigned ${userEvents.length} events to user ${user.username}`);
		}
		
		console.log('Database seeded!');
		await mongoose.connection.close();

	} catch (err) {
		console.error('Error seeding database:', err);
		mongoose.connection.close();
		process.exit(1);
	}	
};

seedDatabase().catch(err => {
	console.error('Seed Error:', err);
	mongoose.connection.close();
	process.exit(1);
});