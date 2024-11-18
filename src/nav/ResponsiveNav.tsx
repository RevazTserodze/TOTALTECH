import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { t } from "i18next";
import i18n from "../multilanguage/i18";

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  to {
    transform: translateY(0);
    opacity: 1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

interface TogglerButtonProps {
  isNavVisible: boolean;
}

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #f5f5f5;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  transition: top 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NavIcon = styled.img`
  width: 90px;
  margin-left: -20px;
`;

const TogglerButton = styled.button<TogglerButtonProps>`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 10px;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 1300px) {
    display: block;
  }

  ${({ isNavVisible }) =>
    isNavVisible &&
    css`
      transform: rotate(90deg);
    `}
`;

const NavItems = styled.div<{ isVisible: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  position: absolute;
  top: 88px;
  left: 0;
  max-height: ${(props) => (props.isVisible ? "calc(100vh - 70px)" : "0")};
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transform: ${(props) =>
    props.isVisible ? "translateY(0)" : "translateY(-20px)"};
  overflow: hidden;
  animation: ${(props) =>
    props.isVisible
      ? css`
          ${slideIn} 0.3s ease-out forwards
        `
      : css`
          ${slideOut} 0.3s ease-in forwards
        `};
  transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  padding: 15px;
  display: block;
  transition: color 0.3s ease;

  &:hover {
    color: #555;
  }
`;

const NavItem = styled.div`
  @media (min-width: 1301px) {
    margin: 0 10px;
  }
`;

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

    if (isNavVisible) {
      setIsNavVisible(false);
      setTimeout(() => setIsButtonToggled(false), 300);
    } else {
      setIsNavVisible(true);
    }
  }, [isNavVisible]);

  const handleNavLinkClick = useCallback(() => {
    setIsNavVisible(false);
    setIsButtonToggled(false);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = currentLang === "en" ? "ge" : "en";
    i18n.changeLanguage(newLanguage);
    setCurrentLang(newLanguage);
  };

  useEffect(() => {
    if (!isNavVisible) {
      setIsButtonToggled(false);
    }
  }, [isNavVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar
        style={{
          top: scrollDir === "down" ? "-120px" : "0",
          boxShadow:
            scrollDir === "down"
              ? "0 2px 5px rgba(0, 0, 0, 0.2)"
              : "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Link to="/">
          <NavIcon
            onClick={scrollToTop}
            style={{ marginTop: "0px" }}
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
                src="./icons/phone-icon.png"
                alt=""
              />
            </a>
          </li>
          <li style={{ marginTop: "13px" }}>
            <TogglerButton
              style={{ marginTop: "-15px" }}
              onClick={toggleNav}
              isNavVisible={isButtonToggled}
              aria-label={isNavVisible ? "Close menu" : "Open menu"}
            >
              {isButtonToggled ? "×" : "☰"}
            </TogglerButton>
          </li>
        </ul>

        <NavItems isVisible={isNavVisible}>
          <NavItem>
            <NavLink to="/" onClick={handleNavLinkClick}>
              {t("Welcome to React")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/services" onClick={handleNavLinkClick}>
              {t("Services")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/accessories" onClick={handleNavLinkClick}>
              {t("Shop")}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact" onClick={handleNavLinkClick}>
              {t("Contact")}
            </NavLink>
          </NavItem>
          <button
            style={{
              cursor: "pointer",
              marginBottom: "20px",
            }}
            className={"btn btn-outline-primary"}
            onClick={toggleLanguage}
          >
            {currentLang === "en" ? "ENG" : "GEO"}
          </button>
        </NavItems>
      </Navbar>
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
