import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Input, Button, Typography, Card, Alert } from "antd"; 
import { LockOutlined } from '@ant-design/icons';
import { LOGIN_USER } from '../../utils/mutations';
import AuthService from '../../utils/auth';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [login, { error }] = useMutation(LOGIN_USER);
  const [loading, setloading] = useState(false);

  const handleFormSubmit = async (values: {email: string; password: string }) => {
    setloading(true);
    try {
      const { data } = await login({
        variables: { ...values },
      });

      AuthService.login(data.login.token);
    }
    catch (e) {
      console.error(e);
    } finally {
      setloading(false);
    }
  };

  
  return (
    <div style={{ display: 'flex', justifyContent: 'center',  }}>
      <Card style={{ 
        width: 400, 
        textAlign: 'center', 
        padding: '20px', 
        background: "var(--teriary)", 
        color: "var(--secondary)",
        border: "2px var(--quaternary)", // Lime border
        borderRadius: "10px", // Rounded corners
        boxShadow: "0 0 10px var(--quaternary)"
       }}>
        <Title level={2} style={{ color: "var(--active-color)", fontFamily: "var(--font-header)", fontSize: "2.5rem" }}>Login</Title>

        {error && <Alert message="Incorrect username and/or password, please try again." type="error" showIcon style={{ marginBottom: 16, background: "white", color: "var(--warning)" }} />}
        
        <Form
          form={form}
          layout="vertical"
          name="login"
          onFinish={handleFormSubmit}
          style={{ maxWidth: 400, margin: '0 auto', fontFamily: "var(--font-body)", color: "var(--secondary)" }}
          autoComplete="off"
        >
          {/* Username Input */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            style={{ marginBottom: '1rem', color: "var(--secondary)" }}
          >
            <Input prefix={<LockOutlined />} placeholder="Email" />
          </Form.Item>

          {/* Password Input */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style={{ marginBottom: '1rem' }}
            >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

          {/* Submit Button */}
          <Form.Item>
              <Button type="primary" htmlType="submit"  className="custom-menu-item" style={{fontSize: "1.5rem" }} block loading={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              {error && (
                <div>
                  <p className="error-text" style={{ color: 'var(--warning)', fontSize: '1rem' }}>The provided credentials are incorrect.</p>
                </div>
              )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;