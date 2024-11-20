import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { t } from "i18next";
import i18n from "../multilanguage/i18";

const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState("up");
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > lastScrollTop) {
        setScrollDir("down");
      } else {
        setScrollDir("up");
      }

      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  return scrollDir;
};

const ResponsiveNav = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isButtonToggled, setIsButtonToggled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const scrollDir = useScrollDirection();

  const toggleNav = useCallback(() => {
    setIsButtonToggled((prev) => !prev);
    setIsNavVisible((prev) => !prev);
  }, []);

  const handleNavLinkClick = useCallback(() => {
    setIsNavVisible(false);
    setIsButtonToggled(false);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLang === "en" ? "ge" : "en";
    i18n.changeLanguage(newLanguage);
    setCurrentLang(newLanguage);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { text: "Welcome to React", to: "/" },
    { text: "Services", to: "/services" },
    { text: "Shop", to: "/accessories" },
    { text: "Contact", to: "/contact" },
  ];

  return (
    <>
      <motion.nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          background: "#f5f5f5",
          position: "fixed",
          width: "100%",
          top: scrollDir === "down" ? "-120px" : "0",
          left: "0",
          zIndex: 1,
          boxShadow:
            scrollDir === "down"
              ? "0 2px 5px rgba(0, 0, 0, 0.2)"
              : "0 4px 8px rgba(0, 0, 0, 0.3)",
          transition: "top 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        }}
      >
        <Link to="/">
          <img
            onClick={scrollToTop}
            style={{ width: "90px", marginLeft: "-20px" }}
            src="./icons/TOTALTECH Down.png"
            alt="nav-icon"
          />
        </Link>

        <ul
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            listStyleType: "none",
            marginTop: "10px",
            gap: "15px",
          }}
        >
          <li>
            <a onClick={() => setShowModal(true)}>
              <img
                style={{ width: "24px" }}
                src="/icons/phone-icon.png"
                alt=""
              />
            </a>
          </li>
          <li style={{ marginTop: "13px" }}>
            <motion.button
              onClick={toggleNav}
              aria-label={isNavVisible ? "Close menu" : "Open menu"}
              style={{
                display: "block",
                background: "none",
                border: "none",
                fontSize: "30px",
                cursor: "pointer",
                padding: "10px",
                marginTop: "-10px",
              }}
              animate={{
                rotate: isButtonToggled ? 90 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {isButtonToggled ? "×" : "☰"}
            </motion.button>
          </li>
        </ul>

        <AnimatePresence>
          {isNavVisible && (
            <motion.div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                background: "#fff",
                position: "absolute",
                top: "88px",
                left: 0,
                zIndex: 2,
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{ maxHeight: "calc(100vh - 70px)", opacity: 1 }}
              exit={{ maxHeight: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.text}
                  style={{
                    padding: "15px",
                    textAlign: "center",
                  }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={link.to}
                    style={{
                      color: "#333",
                      textDecoration: "none",
                      fontSize: "16px",
                    }}
                    onClick={handleNavLinkClick}
                  >
                    {t(link.text)}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                style={{
                  cursor: "pointer",
                  marginBottom: "20px",
                  alignSelf: "center",
                }}
                className={"btn btn-outline-primary"}
                onClick={toggleLanguage}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {currentLang === "en" ? "ENG" : "GEO"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

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
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                width: "70%",
                maxWidth: "600px",
                zIndex: 5,
              }}
            >
              <a href="tel:595850777">+995 595 850 777</a>
              <button
                className="btn btn-danger"
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setShowModal(false)}
              >
                {t("Close")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResponsiveNav;
