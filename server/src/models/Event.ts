import { Schema, model, Document } from 'mongoose';

export interface IEvent extends Document {
    username: string;
    title: string;
    date: string;
    location: string;
    time: string;
    createdAt: Date;
}

const eventSchema = new Schema<IEvent>(
    {
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Event = model<IEvent>('Event', eventSchema);

export default Event;