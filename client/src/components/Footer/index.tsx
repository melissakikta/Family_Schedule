import React from 'react';
import { Layout, Typography, Space } from 'antd';
import github from '../../assets/images/github.png';
import '../../App.css';

const { Footer } = Layout;
const { Text, Link } = Typography;

// Function to create the Footer
const FooterComponent: React.FC = () => {
  return (
    <Footer className="footer-container" 
    style={{ textAlign: 'center', backgroundColor: "var(--secondary)", color: "var(--primary)", padding: '0px', margin: '0', width: '100vw' }}>
      <Text style={{ color: 'var(--primary)', fontSize: '1.75rem', fontFamily: 'var(--font-header)' }}>
        Developed by:
      </Text>

        <Link className="footer-link" href="https://github.com/melissakikta" target="_blank" rel="noopener noreferrer"style={{color: 'var(--primary)', fontSize: '2rem', fontFamily: 'var(--font-body)'}}>
          <strong>Missy</strong>
          <img src={github} alt="github link" style={{ width: "40px", marginLeft: "5px", marginBottom: "5px" }}/>
        </Link>
    
    </Footer>
  );
};

export default FooterComponent;