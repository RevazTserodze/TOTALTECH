import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";

const ContactWrapper = styled.div`
  padding: 50px 0;
  text-align: center;

  h1 {
    margin-bottom: 20px;
    font-size: 2.5rem;
  }

  p {
    margin-bottom: 50px;
    font-size: 1rem;
    color: #6c757d;
  }

  .contact-info {
    background: #343a40;
    color: #fff;
    padding: 30px;
    margin: 10px 0;
    border-radius: 5px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s forwards;
  }

  .contact-info:nth-child(1) {
    animation-delay: 0.1s;
  }

  .contact-info:nth-child(2) {
    animation-delay: 0.2s;
  }

  .contact-info:nth-child(3) {
    animation-delay: 0.3s;
  }

  .contact-info:nth-child(4) {
    animation-delay: 0.4s;
  }

  .contact-info:nth-child(5) {
    animation-delay: 0.5s;
  }

  .contact-info h4 {
    margin-bottom: 20px;
    font-size: 1.25rem;
  }

  .contact-info p {
    margin-bottom: 10px;
  }

  .contact-info a {
    color: #fff;
    text-decoration: none;
  }

  .contact-info a:hover {
    text-decoration: underline;
  }

  .contact-image {
    border-radius: 5px;
    width: 100%;
    height: auto;
    margin-top: 20px;
  }

  .map {
    width: 100%;
    height: 600px;
    margin-top: 20px;
    border-radius: 5px;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ContactWrapper>
      <Container>
        <h2>{t("Contact Us")}</h2>
        <p>
          {t(
            "We align leaders around a shared purpose and strategic story that catalyzes their business and brand to take action."
          )}
        </p>
        <Row>
          <Col
            md={7}
            sm={12}
            className="d-flex align-items-center justify-content-center"
          >
            <img
              src="./business-img.jpeg"
              alt={t("Contact")}
              className="contact-image"
            />
          </Col>
          <Col md={5}>
            <Row>
              <Col md={12} className="contact-info">
                <h4>{t("Business Hours")}</h4>
                <p>{t("Monday - Friday: 9:00 AM - 5:00 PM")}</p>
                <p>{t("Saturday: 10:00 AM - 2:00 PM")}</p>
                <p>{t("Sunday: Closed")}</p>
              </Col>
              <Col md={12} className="contact-info">
                <h4>{t("Contact Information")}</h4>
                <p>{t("Email: totaltech.companyinfo@gmail.com")}</p>
                <p>{t("Phone: 595850777")}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </ContactWrapper>
  );
};

export default Contact;
