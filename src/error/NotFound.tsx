import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 8rem;
  font-weight: bold;
  color: #343a40;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Message = styled.p`
  font-size: 1.25rem;
  color: #495057;
  margin: 1rem 0 2rem;
  line-height: 1.6;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004085;
    transform: translateY(0);
  }
`;

const NotFound: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <Title>404</Title>
      <Message>{t('Sorry, the page you are looking for does not exist.')}</Message>
      <Button onClick={handleGoHome}>{t('Go to Home')}</Button>
    </Container>
  );
};

export default NotFound;
