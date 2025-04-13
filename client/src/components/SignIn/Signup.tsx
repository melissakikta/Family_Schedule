import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Form, Input, Button, Card, Typography, Alert } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { ADD_USER } from '../../utils/mutations';
import AuthService from '../../utils/auth';

const { Title, Text } = Typography;

const Signup: React.FC = () => {

  const [form] = Form.useForm();
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [loading, setloading] = useState<boolean>(false);

  const handleFormSubmit = async (values: { username: string; email: string; password: string }) => {
    setloading(true);
    
    try {
      // when signing up we'll create the user then automatically sign them in
      const { data } = await addUser({
        variables: { userInput: { ...values } },
      });

      AuthService.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    } finally {
      setloading(false);
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <Card style={{ 
        width: 400, 
        textAlign: 'center', 
        padding: '20px', 
        background: "var(--teriary)", 
        color: "var(--secondary)",
        border: "2px var(--quaternary)", // Lime border
        borderRadius: "10px", // Rounded corners
        boxShadow: "0 0 10px var(--quaternary)" }}>
        <Title level={2} style={{ color: "var(--active-color)", fontFamily: "var(--font-header)", fontSize: "2.5rem" }}>Sign Up</Title>

        {data ? (
          <Text type="success">
            Your login was successful. Click <Link to="/collection">here</Link> to see your team's posts.
          </Text>
        ) : (
          
          <Form
            form={form}
            layout="vertical"
            name="signup"
            onFinish={handleFormSubmit}
            style={{ maxWidth: 400, margin: '0 auto', fontFamily: "var(--font-body)" }}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!'},]}
              style={{ marginBottom: '1rem' }}
              >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email address.' },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit"  className="custom-menu-item" style={{fontSize: "1.5rem" }} block loading={loading}>
               {loading ? "Signing up..." : "Sign Up"}
              </Button>
            </Form.Item>
          </Form>
         )}

        {error && <Alert message={error.message} type="error" showIcon style={{ marginTop: 16, background: "white", color: "var(--warning)" }} />}
      </Card>
    </div>
  );  

};

export default Signup;
