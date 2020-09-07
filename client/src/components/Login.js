import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

export default function Index() {

    function userLogin() {
        axios.get('/login', {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(res => console.log('Redirected to google login'))
        .catch(err => console.log(err))
      };

    return(
      <div className="welcomeContainer">
          <div className="welcomeHeader">Welcome</div>
          <div className="welcomeSubtext">Please login with Google to proceed</div>
          <Button variant="primary" size="lg" block onClick={userLogin}>Login</Button>
      </div>
    )
  }
