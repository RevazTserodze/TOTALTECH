import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { t } from "i18next";

interface Accessory {
  id: number;
  name: string;
  img: string;
  info: string;
  details: string;
  price: number;
  gallery: string[];
}

interface CardObject {
  cards: Accessory[];
}

type AccessoriesType = Record<string, CardObject>;

const fetchAccessories = async (): Promise<AccessoriesType> => {
  const response = await axios.get("/companyAccessories.json");
  return response.data;
};

const AccessoriesDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const accessoryId = parseInt(id || "0", 10);
  const { i18n } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const {
    data: accessories,
    isLoading,
    error,
  } = useQuery<AccessoriesType, Error>({
    queryKey: ["accessories"],
    queryFn: fetchAccessories,
  });

  const accessory = accessories
    ? accessories[i18n.language]?.cards?.find((item) => item.id === accessoryId)
    : undefined;

  if (isLoading) return <Loader />;
  if (error)
    return <div className="alert alert-danger">Error loading accessories</div>;
  if (!accessory)
    return <div className="alert alert-warning">Accessory not found</div>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-lg p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 mb-4 text-center">
            <div className="position-relative">
              <img
                src={accessory.img}
                alt={accessory.name}
                className="img-fluid"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <h3 className="mb-3 font-weight-bold">{accessory.name}</h3>
            <p className="text-muted mb-3">{accessory.info}</p>
            <hr />

            <div className="d-flex justify-content-between mb-3">
              <span className="h4 font-weight-bold text-primary">
                {t("Price")}:
                <span style={{ marginLeft: "5px" }}>
                  {Math.round(
                    (accessory.price - (accessory.price * 23) / 100) * 2.7
                  )}
                </span>
                <span style={{ marginLeft: "5px" }}>{t("GEL")}</span>
              </span>
            </div>

            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <th style={{ backgroundColor: "#0D92F4", color: "white" }}>
                    Description
                  </th>
                  <td>{accessory.details}</td>
                </tr>
              </tbody>
            </table>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="btn btn-primary btn-lg w-100 shadow-lg"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-phone"></i> {t("Call Now")}
              </button>
            </div>
          </div>
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
    </div>
  );
};

export default AccessoriesDetails;
