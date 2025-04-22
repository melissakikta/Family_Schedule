const typeDefs = `#graphql
  	type User {
    	_id: ID!
    	username: String!
    	email: String!
    	password: String!
    	event: [Event]
  	}

	type Event {
		_id: ID!
		username: String!
		title: String!
		date: String!
		location: String!
		createdAt: String
	}

	type Auth {
		token: ID!
		user: User
	}

	input AddUserInput {
		username: String!
		email: String!
		password: String!
	}

	input AddEventInput {
		username: String!
		title: String!
		date: String!
		location: String!
	}

  type Query {
		getUsersAllData: [User]
		#getUsers: [User]
		me: User
		# getUser(username: String!): User
		getEvents: [Event]
  	}

  	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(userInput: AddUserInput!): Auth
		addEvent(eventInput: AddEventInput!): Event
		deleteUser: User
		deleteEvent(eventId: ID!): User
  	}
`;

export default typeDefs;