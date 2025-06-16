import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import { authenticateToken } from './services/auth.js';
import { typeDefs, resolvers } from './schemas/index.js';
import dotenv from 'dotenv';
import express from 'express';
import db from './dbconfig/connection.js';
import cors from 'cors';

import type { Request, Response } from 'express';

dotenv.config();

const __dirname = path.resolve();

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const startApolloServer = async () => {
try {
		await server.start();
		await db();

		const PORT = process.env.PORT || 3001;
		const app = express();

		app.use(cors({
			origin: process.env.NODE_ENV === 'production'
			? false: ['http://localhost:3000', 'http//localhost:5173'],
			credentials: true,
		}));
		
		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());

		app.use('/graphql', expressMiddleware(server,{
			context: async ({ req, res }) => {
				const authContext = await authenticateToken({ req, res});
				return authContext;
			}
		}));

		// if we're in production, serve client/dist as static assets
		if (process.env.NODE_ENV === 'production') {
			app.use(express.static(path.join(__dirname, '../client/dist')));

			app.get('*', (_req: Request, res: Response) => {
				res.sendFile(path.join(__dirname, '../client/dist/index.html'));
			});
		}

		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
		});

} catch (error) {
		console.error ('Error starting Apollo Server:', error);
		process.exit(1);
	}
};

startApolloServer();