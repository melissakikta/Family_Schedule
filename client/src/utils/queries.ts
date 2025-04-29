import { gql } from '@apollo/client';

export const QUERY_GET_ALL_USERS_ALL_DATA = gql`
  	query getUsersAllData {
		getUsersAllData {
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
`;

export const QUERY_GET_ME = gql`
  	query me {
    me {
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

export const QUERY_GET_USER = gql`
    query getUser($username: String!) {
    getUser(username: $username) {
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

export const QUERY_GET_EVENTS = gql`
  	query getEvents {
    getEvents {
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

