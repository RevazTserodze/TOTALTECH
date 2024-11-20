import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "../../multilanguage/i18";
import Loader from "../Accessories/Loader";

interface Service {
  serviceImages: string[];
  id: number;
  name: string;
  img: string;
  info: string;
  development: string;
  details: string;
}

interface ServiceData {
  [key: string]: {
    cards: Service[];
  };
}

const Container = styled.div`
  margin-top: 150px;
  padding: 4px;
  max-width: 1200px;
`;

const ImageWrapper = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: -10px 10px 4px 18px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  color: #283593;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-family: "Roboto", sans-serif;
  color: #616161;
  margin-bottom: 16px;
`;

const Table = styled.div`
  width: 100%;
  margin-top: 16px;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableRow = styled.div`
  display: flex;
  padding: 8px 0;
`;

const Divider = styled.hr`
  margin: 16px 0;
  border: none;
  border-top: 1px solid #e0e0e0;
`;

const Button = styled.button`
  margin-top: 16px;
  padding: 12px 24px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  background-color: #5e35b1;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #4527a0;
  }
`;

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/companyService.json");
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data: ServiceData = await response.json();
      const services = data[i18n.language]?.cards || [];

      const currentService = services.find(
        (item) => item.id === parseInt(id || "", 10)
      );
      setService(currentService || null);
    } catch (error) {
      setError("Failed to fetch services");
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, i18n.language]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  if (loading) {
    return <Loader />;
  }

  if (error) return <div>{t("Failed to fetch accessories")}</div>;
  if (!service) return <div>{t("No accessories found")}</div>;

  return (
    <Container className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <ImageWrapper src={service.img} alt={service.name} />
        </div>

        <div className="col-12 col-md-6 col-lg-7">
          <Title>{service.name}</Title>
          <Description>{service.info}</Description>

          <Divider />

          <Table>
            <TableRow>
              <div style={{ flex: 1 }}>{t("Development")}</div>
              <div>{service.development}</div>
            </TableRow>
            <TableRow>
              <div style={{ flex: 1 }}></div>
              <div>{service.details}</div>
            </TableRow>
          </Table>

          <Divider />

          <Button onClick={() => setShowModal(true)}>{t("Make a call")}</Button>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <motion.div
              className="modal-content bg-white p-3 rounded-lg shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                maxWidth: "400px",
                width: "100%",
                border: "1px solid #ddd",
              }}
            >
              <p
                style={{ display: "flex", justifyContent: "center" }}
                className="h5 text-primary mb-4"
              >
                <a href="tel:595850777">+995 595 850 777</a>
              </p>
              <button
                className="btn btn-outline-danger w-100"
                onClick={() => setShowModal(false)}
              >
                {t("Close")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ServiceDetail;
