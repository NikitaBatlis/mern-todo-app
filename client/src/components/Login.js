import React from 'react';
import Button from 'react-bootstrap/Button';

export default function Index() {

    return(
      <div className="welcomeContainer">
          <div className="welcomeHeader">Welcome</div>
          <div className="welcomeSubtext">Please login with Google to proceed</div>
          <a href="http://localhost:3001/api/login">
            <Button variant="primary" size="lg" block >Login</Button>
          </a>
      </div>
    )
  }
