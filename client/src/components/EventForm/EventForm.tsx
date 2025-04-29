import React from 'react';
import { Form, Input, Button, Typography, Space, message } from "antd";
import { useMutation } from '@apollo/client';
import { ADD_EVENT } from '../../utils/mutations';
import AuthService from '../../utils/auth';

const { Title } = Typography;
const { TextArea } = Input;

const EventForm: React.FC = () => {
	const [form] = Form.useForm(); //Ant Design form instance
	//GraphQL Mutation Hook
	const [addEvent, { loading }] = useMutation(ADD_EVENT);

	//Get current user
	const user = AuthService.loggedIn() ? AuthService.getProfile().username : null;

	//Handle form submission
	const handleSumbit = async (values: { title: string; date: string; time: string; location: string }) => {

		//Check if user is logged in
		if (!user) {
			message.error("You must be logged in to create an event.");
			return;
		}

		if (!values.title || !values.date || !values.time || !values.location) {
			message.error("Please enter a title and event content.");
			return;
		}

		try {
			await addEvent({
				variables: {
					eventInput: {
						username: user,
						title: values.title,
            date: values.date,
            time: values.time,
            location: values.location,
					},
				},
			});
			message.success("Event added successfully!");
			form.resetFields();
		} catch (error) {
			message.error("Failed to submit event. Please try again.");
			console.error("Error submitting event:", error);
		}
	};

	return (
		<div style={{ margin: "0 auto", padding: "20px" }}>
			<Title level={3} style={{ textAlign: "center", fontFamily: "var(--font-header)", fontSize: "2.5rem", color: "var(--active-color)" }}>
				Share an Event
			</Title>

			<Form
				//form={Form}
				layout="vertical"
				onFinish={handleSumbit}
				style={{
					padding: "20px", // Padding for better spacing
					backgroundColor: "var(--tertiary)", // Ensure background color
					color: "var(--primary)", // Ensure text color
					fontFamily: "var(--font-body)",
					fontSize: "1.5rem",
					border: "2px var(--quaternary)", // Lime border
        	borderRadius: "10px", // Rounded corners
       	 	boxShadow: "0 0 10px var(--quaternary)" // Optional shadow for a modern look
				}}
			>
				{/* Title */}
				<Form.Item
					label={<span style={{ color: "var(--secondary)" }}>Title</span>}
					name="title"
					rules={[{ required: true, message: "Please enter a title." }]}
				>
					<Input placeholder="Enter an event title here" />
				</Form.Item>

				{/* date */}
				<Form.Item
					label={<span style={{ color: "var(--secondary)" }}>Blog Content</span>}
					name="date"
					rules={[
						{ required: true, message: "Please enter date here." }]}
				>
					<TextArea rows={10} placeholder="MM/DD/YYYY" />
				</Form.Item>

				{/* Time */}
				<Form.Item
					label={<span style={{ color: "var(--secondary)" }}>Image URL (Optional)</span>}
					name="time">
					<Input placeholder="Enter a time" />
				</Form.Item>

        {/* Location */}
        <Form.Item
					label={<span style={{ color: "var(--secondary)" }}>Image URL (Optional)</span>}
					name="location">
					<Input placeholder="Enter a location" />
				</Form.Item>
        
				{/* Submit Button */}
				<Form.Item>
					<Space>
						<Button
							type="primary"
							htmlType="submit"
							className="custom-menu-item"
							loading={loading}
						>
							{loading ? "Submitting..." : "Submit Link"}
						</Button>
						<Button
							type="primary"
							htmlType="reset"
							onClick={() => form.resetFields()}
							className="custom-menu-item"
						>
							Reset
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</div>
	);
};

export default EventForm;