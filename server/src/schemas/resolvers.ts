import { GraphQLError } from 'graphql';
import { signToken } from '../services/auth.js';
import { User, Event } from '../models/index.js';
import { Schema } from 'mongoose';


// Define types for the arguments
interface AddUserArgs {
    username: string;
    email: string;
    password: string;
}

interface LoginUserArgs {
    email: string;
    password: string;
}

interface AddEventArgs {
    username: string; // The username of the user who created the event, required to be automatically populated
    title: string; // The title of the event
    date: string; // The date of the event
    time: string; // The time of the event
    location: string //location of the event
}


const resolvers = {
    Query: {
        // single command that can display all user data containing all existing posts and comments as well. Essentially a full DB query
        getUsersAllData: async () => {
            return await User.find().populate('events');
        },

        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                return await User.findById(context.user._id).populate('events');
            }
            throw new GraphQLError('User not logged in');
        },

        getUser: async (_: any, { username }: { username: string }) => {
            return await User.findOne({ username }).populate('events');
        },
    
        // if we want different sorting algorithms create other custom getPosts resolvers, this should be the default of newest first
        getEvents: async () => {
            try {
                const events = await Event.find({}).lean();
                console.log('Raw events from DB:', events);
                
                // Check each event's time field specifically
                events.forEach((event, index) => {
                    console.log(`Event ${index}:`, {
                        _id: event._id,
                        title: event.title,
                        time: event.time,
                        timeType: typeof event.time,
                        timeIsNull: event.time === null,
                        timeIsUndefined: event.time === undefined,
                        allFields: Object.keys(event)
                    });
                });
                
                return events;
            } catch (error) {
                console.error('Database error:', error);
                throw new Error('Failed to fetch events');
            }
        },

    },

    Mutation: {
        addUser: async (_parent: any, { userInput}:{userInput:AddUserArgs}) => {
            const { username, email, password } = userInput;
            // Create a new user with the provided username, email, and password
            const user = await User.create({ username, email, password });
            // Sign a token with the user's information
            const token = signToken(user.username, user.email, user._id);
            // Return the token and the user
            return { token, user };
        },

        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            // Find a user with the provided email
            const user = await User.findOne({ email });

            // If no user is found, throw an GraphQLError
            if (!user || !(await user.isCorrectPassword(password))) {
                throw new GraphQLError('Incorrect email or password');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },

        addEvent: async (_parent: any, { eventInput }: { eventInput: AddEventArgs }) => {
            console.log("=== BACKEND DEBUG ===");
            console.log("Received eventInput:", JSON.stringify(eventInput, null, 2));
            
            const user = await User.findOne({ username: eventInput.username });
            console.log("Found user:", user ? `${user.username} (ID: ${user._id})` : "No user found");
        
            if (!user) {
                console.log("User not found error");
                throw new GraphQLError('User not found');
            }
        
            try {
                console.log("Attempting to create event...");
                const newEvent = await Event.create(eventInput);
                console.log("Created event successfully:", JSON.stringify(newEvent.toObject(), null, 2));
                
                console.log("Adding event to user's events array...");
                user.events.push(newEvent._id as Schema.Types.ObjectId);
                await user.save();
                console.log("User saved successfully. User now has", user.events.length, "events");
                
                console.log("Returning event:", JSON.stringify(newEvent.toObject(), null, 2));
                return newEvent;
            }
            catch (err) {
                console.error("=== ERROR CREATING EVENT ===");
                console.error("Error details:", err);
                throw new GraphQLError('Failed to create event');
            }
        },


        // addEvent: async (_parent: any, { eventInput }: { eventInput: AddEventArgs }) => {
        //     const user = await User.findOne({ username: eventInput.username });

        //     if (!user) throw new GraphQLError('User not found');

        //     try {
        //         const newEvent = await Event.create(eventInput);
        //         user.events.push(newEvent._id as Schema.Types.ObjectId);
        //         await user.save();
        //         return newEvent;
        //     }
        //     catch (err) {
        //         console.error(err);
        //         throw new GraphQLError('Failed to create event');
        //     }
        // },


        deleteEvent: async (_parent: any, { eventId }: { eventId: string }) => {
            const event = await Event.findById(eventId);
            if (!event) throw new GraphQLError('Event not found');

            await Event.deleteOne({ _id: eventId });

            await User.findByIdAndUpdate({ username: event.username }, { $pull: { event: eventId } });

            return await User.findOne({ username: event.username }).populate('events');
        },
        
        deleteUser: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                const user = await User.findByIdAndDelete(context.user._id);
                return user;
            }
            throw new GraphQLError('User not logged in');
        },

    },
    
    User: {
        events: async (parent: any) => {
            // Populate the events field with the user's events
            return await Event.find({ _id: { $in: parent.events } });
        },
    },
};

export default resolvers;