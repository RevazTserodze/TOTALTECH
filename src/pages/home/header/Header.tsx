import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [showParagraph, setShowParagraph] = useState(false);

  const headerChars = useMemo(() => {
    const text = t("TOTALTECH");
    return text.split("").map((char, i) => ({
      char,
      delay: i * 0.2,
    }));
  }, [t]);

  const handleAnimationComplete = () => {
    setShowParagraph(true);
  };

  return (
    <div
      className="container-fluid p-5"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,123,255,0.9), rgba(0,198,255,0.9)), url('./background-pattern.png')",
        backgroundSize: "cover",
        paddingBottom: "8rem",
        borderBottomLeftRadius: "40% 10%",
        borderBottomRightRadius: "40% 10%",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        overflow: "hidden",
      }}
    >
      <div className="row text-center align-items-center">
        <div className="col-lg-7 col-md-12 mb-4 d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {headerChars.map(({ char, delay }, index) => (
              <motion.h1
                key={index}
                className="text-white"
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay,
                  type: "spring",
                  stiffness: 200,
                }}
                onAnimationComplete={() => {
                  if (index === headerChars.length - 1) {
                    handleAnimationComplete();
                  }
                }}
                style={{
                  fontWeight: "bold",
                  marginRight: char === " " ? "0.2rem" : "0",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "#ffffff",
                  textShadow: "1px 3px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                {char}
              </motion.h1>
            ))}
          </div>
          <motion.p
            className="text-white mt-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showParagraph ? 1 : 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontSize: "1.125rem",
              lineHeight: "1.8",
              maxWidth: "650px",
              textAlign: "center",
              color: "#f0f0f0",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
         </motion.p>
        </div>
        <div className="col-lg-5 col-md-12 d-flex justify-content-center">
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="img-fluid rounded"
            src="./header-photo.png"
            alt="about-header-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
