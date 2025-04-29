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
						<Title level={3} style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', color: 'var(--active-color)'}}>{post.title}</Title>
						<Text style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem', color: 'var(--secondary)'}}>{post.username}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Text style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem', color: 'var(--active-color)', padding: '15px'}}>{post.content}</Text>
						{post.imgURL && <img src={post.imgURL} alt="Post Image" style={{ width: '100%', marginTop: '10px' }} />}
					</Col>
				</Row>
				<Row>
					<Col span={12}>
					<Button type="primary" onClick={() => updateLikes()} style={{ marginTop: '10px', marginRight: '10px', fontSize: '1rem' }}>
							Likes ({likes})
						</Button>
						<Button type="primary" onClick={updateDislikes} style={{ marginRight: '10px', fontSize: '1rem' }}>
							Dislikes ({dislikes})
						</Button>
					</Col>
				</Row>

				<CommentForm postId={post._id} />

				<div>
					{comments.map((comment) => (
						<Comment comment={comment} />
					))}
				</div>
			</Card>
		);
	}

	function generateCodePost() {
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
						<Title level={3} style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', color: 'var(--active-color)'}}>{post.title}</Title>
						<Text style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem', color: 'var(--secondary)'}}>{post.username}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Card
						style={{
							backgroundColor: 'var(--code)',
							color: 'white',
							fontFamily: 'monospace',
							fontSize: '1rem',
							padding: '10px',
							border: '1px solid var(--primary)',
							whiteSpace: 'pre-wrap',
						}}>

							<code style={{fontSize: '1rem', padding: '6px', fontFamily: 'monaco'}}>
								{post.content}
							</code>
						</Card>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
					<Button type="primary" onClick={() => updateLikes()} style={{ marginTop: '10px', marginRight: '10px', fontSize: '1rem' }}>
							Likes ({likes})
						</Button>
						<Button type="primary" onClick={updateDislikes} style={{ marginRight: '10px', fontSize: '1rem' }}>
							Dislikes ({dislikes})
						</Button>
					</Col>
				</Row>

				<CommentForm postId={post._id} />

				<div>
					{comments.map((comment) => (
						<Comment comment={comment} />
					))}
				</div>
			</Card>
		);
	}

	function generateLinkPost() {
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
						<Title level={3} style={{ fontFamily: 'var(--font-body)', fontSize: '2rem', color: 'var(--active-color)'}}>{post.title} </Title>
						<Text style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem', color: 'var(--secondary)'}}>{post.username}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={24}>
						<Typography.Link href={post.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem', color: 'var(--link)', padding: '15px'}}>
								{post.link}
						</Typography.Link>
					</Col>
				</Row>
				
				<Row>
					<Col span={24}>
						<Text style={{ fontFamily: 'var(--font-body)', fontSize: '1.5rem', color: 'var(--active-color)'}}>{post.content}</Text>
						<iframe src={post.link} title="user shared embedded link" style={{ width: '100%', height: '300px', marginTop: '10px' }}></iframe>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<Button type="primary" onClick={() => updateLikes()} style={{ marginTop: '10px', marginRight: '10px', fontSize: '1rem' }}>
							Likes ({likes})
						</Button>
						<Button type="primary" onClick={updateDislikes} style={{ marginRight: '10px', fontSize: '1rem' }}>
							Dislikes ({dislikes})
						</Button>
					</Col>
				</Row>

				<CommentForm postId={post._id} />

				<div>
					{comments.map((comment) => (
						<Comment comment={comment} />
					))}
				</div>
			</Card>
		);
	}

	// default post for testing has no working ID to query for comments
	if (post.title !== "test title") {
		useQuery(QUERY_GET_COMMENTS_FOR_POST, {
			variables: { postId: post._id },
			onCompleted: (data) => {
				setComments(data.getCommentsForPost.map((comments: CommentProps) => ({
					_id: comments._id,
					username: comments.username,
					content: comments.content,
					createdAt: comments.createdAt
				})));
			}
		});
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