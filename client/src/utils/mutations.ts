import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			user {
				_id
				username
			}
			token
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($userInput: AddUserInput!) {
		addUser(userInput: $userInput) {
			user {
				_id
				username
			}
			token
		}
	}
`;

export const ADD_EVENT = gql`
	mutation addEvent($eventInput: AddEventInput!) {
		addEvent(eventInput: $eventInput) {
			_id
			username
			title
      date
      time
      location
      createdAt
		}
	}
`;

export const DELETE_USER = gql`
  mutation deleteUser { 
    deleteUser {
      _id
      username
      email
      event {
        _id
        title
        date
        time
        location
        createdAt
      }
    }
  }
`;

export const DELETE_EVENT = gql`
	mutation deleteEvent($eventId: ID!) {
		deleteEvent(eventId: $eventId) {
			_id
			username
			title
      date
      time
      location
      createdAt
		}
	}
`;
