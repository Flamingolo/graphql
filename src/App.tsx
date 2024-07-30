import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './assets/components/apolloClient';
import Home from './assets/components/home';
import Login from './assets/components/login';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/profile" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;