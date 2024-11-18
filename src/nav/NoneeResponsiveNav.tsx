import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence for modal animation
import styled from "styled-components";
import NavElements from "./NavElements";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NavbarContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavItems = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center; /* Align items vertically */
`;

const NoneResponsiveNav = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ge" : "en";
    i18n.changeLanguage(newLanguage);
  };

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showModal, setShowModal] = useState(false); // State for controlling the modal visibility

  const controlNavbar = useCallback(() => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [controlNavbar]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <NavbarContainer
        style={{
          transform: showNavbar ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <NavGroup>
          <Link to="/">
            <img
              onClick={scrollToTop}
              style={{ width: "120px", cursor: "pointer" }}
              src="./icons/TOTALTECH Down.png"
              alt="nav-icon"
            />
          </Link>
          <NavElements />
        </NavGroup>
        <NavItems>
          <li style={{ marginTop: "-5px" }}>
            <a href="https://www.facebook.com/profile.php?id=61566252152735">
              <i className="fab fa-facebook-f" style={{ fontSize: "20px" }}></i>
            </a>
          </li>
          <li style={{ marginTop: "-5px" }}>
            <a href="https://www.instagram.com/totaltech.company/profilecard/?igsh=MXUyazF6bTduNGtx">
              <i className="fab fa-instagram" style={{ fontSize: "20px" }}></i>
            </a>
          </li>
          <li style={{ marginTop: "-5px" }}>
            <a href="https://www.tiktok.com/@totaltech.company">
              <i className="fab fa-tiktok" style={{ fontSize: "20px" }}></i>
            </a>
          </li>
          <li>
            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShowModal(true);
              }}
            >
              <img
                style={{ width: "25px", marginTop: "-10px" }}
                src="./icons/phone-icon.png"
                alt="modal-toggle"
              />
            </a>
          </li>
          <button
            style={{ marginTop: "-8px", cursor: "pointer" }}
            className={"btn btn-outline-primary"}
            onClick={toggleLanguage}
          >
            {i18n.language === "en" ? "ENG" : "GEO"}
          </button>
        </NavItems>
      </NavbarContainer>

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
                {i18n.language === "en" ? "Close" : "დახურვა"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NoneResponsiveNav;
