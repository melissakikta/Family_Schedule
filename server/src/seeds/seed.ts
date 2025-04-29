import mongoose from 'mongoose';
import { User, Event } from '../models/index.js'; // Adjust the import path as necessary
import seedData from './seedData.json' with { type: "json" };
import db from '../dbconfig/connection.js';
// import { IUser } from '../models/User.js';
import { IEvent } from '../models/Event.js';

const seedDatabase = async () => {
	await db();

	// Clear the database
	await User.deleteMany();
	await Event.deleteMany();

	// run users one at a time to hash passwords using pre hook
	for (const user of seedData.users) {
		const newUser = new User(user);
		await newUser.save();
	}
	const events: IEvent[] = await Event.insertMany(seedData.events);

	// Assign events to users
	const users = await User.find();
	//   randomly assign events to users
	for (const user of users) {
		const randomEvents = events.filter(event => event.username === user.username);
		user.events.push(...randomEvents.map(event => event._id as mongoose.Schema.Types.ObjectId));
		await user.save();
	}

	console.log('Database seeded!');
	mongoose.connection.close();
};

seedDatabase().catch(err => {
	console.error(err);
	mongoose.connection.close();
});