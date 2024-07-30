import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../css/home.css';
import '../css/login.css';
import '../css/statCard.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://01.kood.tech/api/auth/signin',
        {},
        {
          auth: {
            username,
            password,
          },
        }
      );
      localStorage.setItem('token', response.data);
      window.location.href = '/profile';
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container className="home-container">
      <Row className="header">
        <h1>🐥 GraphQL 🐥</h1>
      </Row>
      <Row className="login-container">
        <Col className="login">
          <h3>Log in</h3>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="stat-card stat-card-dark-gray">
              <div className="stat-title">User email or gitname</div>
              <input
                className="stat-info stat-card-dark-gray"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            <div className="stat-card stat-card-gray">
              <div className="stat-title">Password</div>
              <input
                className="stat-info stat-card-gray"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="***************"
              />
            </div>
            <div className="stat-card stat-card-purple">
              <button className="stat-info" type="submit">
                Continue
              </button>
            </div>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;