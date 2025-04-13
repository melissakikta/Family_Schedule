import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Layout, Row, Col } from 'antd';
import '../App.css';


// Destructure Ant Design components for cleaner use
const { Title, Paragraph } = Typography;
const { Content } = Layout;


//function to create the entry page
const Entry: React.FC = () => {
  return (
    <Layout className="home" style={{ minHeight: "100vh", padding: "40px", background: "var(--tertiary)" }}>
      <Content className="page-section" style={{ textAlign: "center", maxWidth: 800, margin: "auto" }}>
        <Title level={1} style={{ color: "var(--active-color)", fontFamily: "var(--font-header)" }}>Welcome to ByteShift!</Title>
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <Paragraph  style={{ color: "var(--secondary)", fontFamily: "var(--font-body)", fontSize: "1.75rem"}}>
              Struggling to keep track of important team updates? Losing links in endless email threads?
            </Paragraph>
            <Paragraph className="home" style={{ color: "var(--active-color)", fontFamily: "var(--font-header)"}}>
              Try <strong>ByteShift</strong>!
            </Paragraph>
            <Paragraph style={{ color: "var(--secondary)", fontFamily: "var(--font-body)", fontSize: "1.75rem"}}>
              ByteShift provides a dedicated space for your team to effortlessly share links, code snippets, and text. 
              Team members can react, comment, and collaborate seamlessly, ensuring smoother communication and better organization. 
              Say goodbye to scattered information and hello to streamlined teamwork!
            </Paragraph>
          </Col>
        </Row>

        <Row gutter={16} justify="center">
          <Col>
            <Link to="/signup">
              <Button type="primary" size="large" className="custom-menu-item" style={{ background: "var(--active-color)", color: "var(--tertiary)", fontSize: "2rem" }}>Sign Up</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/login">
              <Button type="primary" size="large" className="custom-menu-item" style={{ background: "var(--active-color)", color: "var(--tertiary)", fontSize: "2rem" }}>Login</Button>
            </Link>
          </Col>
        </Row>
      </Content>
    </Layout>
    );
  };

export default Entry;