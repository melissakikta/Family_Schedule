import React from 'react';
import { Typography } from 'antd';
import '../../App.css';

const { Title } = Typography;

//function to create the Header
const Header: React.FC = () => {
  return (
    <Title level={1} style={{color: "var(--secondary)", background: "var(--tertiary)", marginTop: "0px",padding: "5px", fontFamily: "var(--font-header)", fontSize: "5rem" }}>
      Family Schedule
    </Title>
  );
}

export default Header;