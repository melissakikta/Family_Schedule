import React, { useState } from 'react';
import { Typography, Layout, Row, Col, Select } from 'antd';
const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;
import BlogPost from '../components/PostForms/blogPost';
import CodePost from '../components/PostForms/codePost';
import LinkPost from '../components/PostForms/linkPost';
const NewPost: React.FC = () => {
const [postType, setPostType] = useState<string>("blog");

const handlePostTypeChange = (value: string) => {
  setPostType(value);
}
    
    return (
       <Layout className="home" style={{ minHeight: "100vh", padding: '10px', background: "var(--tertiary)" }}>
         <Content style={{ textAlign: "center" }}>
           <Title level={1} style={{ color: "var(--active-color)", fontFamily: "var(--font-header)", fontSize: "4rem" }}>Welcome to ByteShift!</Title>    
           <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }} justify="center">
             <Col >
               <Paragraph style={{ color: "var(--secondary)", fontFamily: "var(--font-body)", fontSize: "1.75rem" }}>What would you like to post today?</Paragraph>
               <Select defaultValue="blog" 
               onChange={handlePostTypeChange} 
               style={{ width: 120, background: "var(--secondary)", color: "var(--primary)", fontSize: "2rem" }}
               >
                 <Option style={{fontSize: '2rem'}} value="blog">Blog</Option>
                 <Option style={{fontSize: '2rem'}} value="code">Code</Option>
                 <Option style={{fontSize: '2rem'}} value="link">Link</Option>
               </Select>
             </Col>
           </Row>

           <Row gutter={16} justify="center">
             {postType === "blog" && <BlogPost />}
             {postType === "code" && <CodePost />}
             {postType === "link" && <LinkPost />}
           </Row>
         </Content>
       </Layout>

    );
};

export default NewPost;