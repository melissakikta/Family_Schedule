import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Typography, Card, Row, Col } from 'antd';

import type PostType from '../../interfaces/Post';
import type CommentProps from '../../interfaces/Comment';

import CommentForm from '../Comment/CommentForm';
import Comment from '../Comment/Comment';
import AuthService from '../../utils/auth';


import { QUERY_GET_COMMENTS_FOR_POST } from '../../utils/queries';
import { LIKE_POST, DISLIKE_POST, ADD_TO_LIKED_POSTS, ADD_TO_DISLIKED_POSTS } from '../../utils/mutations';

const { Title, Text } = Typography;

const Schedule: React.FC<{ post: PostType }> = ({ post }) => {
	// query for comments, likes, and dislikes and store in state
	const [comments, setComments] = useState<CommentProps[]>([]);

	const [likes, setLikes] = useState<number>(post.likes || 0);
	const [dislikes, setDislikes] = useState<number>(post.dislikes || 0);

	function loggedUser() {
		// return user from local storage
		const user = AuthService.getProfile();
		return user._id;
	}

	// Use mutations with refetchQueries
	const [addLike] = useMutation(LIKE_POST, {
		variables: { postId: post._id },
		refetchQueries: [{ query: QUERY_GET_COMMENTS_FOR_POST, variables: { postId: post._id } }],
	});

	const [addDislike] = useMutation(DISLIKE_POST, {
		variables: { postId: post._id },
		refetchQueries: [{ query: QUERY_GET_COMMENTS_FOR_POST, variables: { postId: post._id } }],
	});

	const [addToLikedPosts] = useMutation(ADD_TO_LIKED_POSTS);
	const [addToDislikedPosts] = useMutation(ADD_TO_DISLIKED_POSTS);

	//function to update likes count
	async function updateLikes() {
		try{
			const { data } = await addLike({variables: { postId: post._id }});

			if (data?.likePost) {
				setLikes(data.likePost.likes);
				await addToLikedPosts({variables: { postId: post._id, userId: loggedUser() } });
			}
		} catch (error) {
			console.error("Error updating likes:", error);
		}
	}

	//function to update dislikes count
	async function updateDislikes() {
		try{
			const { data } = await addDislike({variables: { postId: post._id }});

			if (data?.dislikePost) {
				setDislikes(data.dislikePost.dislikes);
				await addToDislikedPosts({variables: { postId: post._id, userId: loggedUser() } });
			}
		} catch (error) {
			console.error("Error updating dislikes:", error);
		}
	}
	
	//fetch comments
	const { data } = useQuery(QUERY_GET_COMMENTS_FOR_POST, {
		variables: { postId: post._id },
		skip: post.title === "test title",
	});

	useEffect(() => {
		if (data && data.getCommentsForPost) {
			setComments(
				data.getCommentsForPost.map((comments: CommentProps) => ({
					_id: comments._id,
					username: comments.username,
					content: comments.content,
					createdAt: comments.createdAt
				}))
			);
		}
	}, [data]);

	function generateBlogPost() {
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

	const typeOfPost = post.type;
	if (!post) return <div>No post to display</div>;
	if (typeOfPost === "blog") {
		return generateBlogPost();
	} else if (typeOfPost === "code") {
		return generateCodePost();
	} else if (typeOfPost === "link") {
		return generateLinkPost();
	} else {
		return <div>Unknown post type</div>;
	}
};

export default Schedule;