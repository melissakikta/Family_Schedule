import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Typography, Card, Row, Col } from 'antd';

import type Event from '../../interfaces/Event';

import AuthService from '../../utils/auth';

const { Title, Text } = Typography;

const Schedule: React.FC<{ event: Event }> = ({ event }) => {

	function loggedUser() {
		// return user from local storage
		const user = AuthService.getProfile();
		return user._id;
	}


	function generateEvent() {
		return (
			<Card className="custom-menu-item" 
				style={{ 
					marginBottom: '20px', 
					fontFamily: 'var(--font-body)', 
					fontSize: '1.5rem', 
					backgroundColor: 'var(--tertiary)',
					border: "2px var(--quaternary)", // Lime border
        	borderRadius: "10px", // Rounded corners
       	 	boxShadow: "0 0 10px var(--quaternary)" }}>
				<Row>
					<Col span={24}>
						<Title level={3} style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', color: 'var(--active-color)'}}>{event.title}</Title>
						<Text style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem', color: 'var(--secondary)'}}>{event.username}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Text style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem', color: 'var(--active-color)', padding: '15px'}}>{event.date} {event.time} {event.location}</Text>
					</Col>
				</Row>
			</Card>
		);
	}


	const typeOfEvent = event.type;
	if (!event) return <div>No post to display</div>;
	if (typeOfEvent === "event") {
		return generateEvent();
	} else {
		return <div>Unknown post type</div>;
	}
};

export default Schedule;