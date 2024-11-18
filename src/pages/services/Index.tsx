import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../multilanguage/i18";
import Loader from "../Accessories/Loader";

const ServicesContainer = styled(Container)`
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 0 15px;
`;

const CardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: #fff;
  padding: 20px;
  width: 100%;
  max-width: 320px;
  height: 340px;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    transition: transform 0.4s ease, opacity 0.4s ease;
  }

  &:hover img {
    transform: scale(1.1);
    opacity: 0.9;
  }
`;

const CardTitle = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 15px 0;
  color: #333;
`;

const CardPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 15px;
`;

const CardInfo = styled(motion.div)`
  text-align: center;
  font-size: 1rem;
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.85);
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.1);
  width: calc(100% - 20px);
  opacity: 0;
`;

const FilterButton = styled(motion.button)<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? "#007bff" : "#6c757d")};
  color: white;
  border: none;
  padding: 10px 18px;
  margin: 0 12px;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#0056b3" : "#5a6268")};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const containerVariants = {
  hidden: { opacity: 0, transition: { staggerChildren: 0.1 } },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: -150 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -150 },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.2 } },
};

type Development = "All" | "IT" | "Building";

interface Card {
  id: number;
  name: string;
  info: string;
  img: string;
  development: Development;
  price: string;
}

interface CardObject {
  cards: Card[];
}

type CardData = Record<string, CardObject>;

const Services: React.FC = () => {
  const { t } = useTranslation();
  const [cards, setCards] = useState<CardData>({});
  const [filteredCards, setFilteredCards] = useState<CardData>({});
  const [development, setDevelopment] = useState<Development>("All");
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReRendering, setIsReRendering] = useState(false);

  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("companyService.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: CardData = await response.json();
      setCards(data);
      setFilteredCards(data);
    } catch (error) {
      console.error("Failed to fetch cards:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  useEffect(() => {
    if (development !== "All") {
      setIsReRendering(true);
    }

    setFilteredCards(
      development === "All"
        ? cards
        : {
            ...cards,
            [i18n.language]: {
              cards: cards[i18n.language].cards.filter((card) => {
                return card.development === t(`Filters.${development}`);
              }),
            },
          }
    );

    const timer = setTimeout(() => {
      setIsReRendering(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [development, cards, t]);

  const handleFilterChange = (filter: Development) => {
    setDevelopment(filter);
  };

  const FILTERS: Development[] = ["All", "IT", "Building"];

  if (loading || isReRendering) {
    return <Loader />;
  }

  return (
    <ServicesContainer>
      <h1 className="text-center mb-4">{t("servicesTitle")}</h1>
      <div className="text-center mb-4">
        {FILTERS.map((filter) => (
          <FilterButton
            key={filter}
            isActive={development === filter}
            onClick={() => handleFilterChange(filter)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {t(`Filters.${filter}`)}
          </FilterButton>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={development}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          transition={{ duration: 0.2 }}
          layout
        >
          <Row className="justify-content-center">
            {filteredCards?.[i18n?.language]?.cards?.map((card) => (
              <Col
                key={card.id}
                xs={12}
                sm={8}
                md={6}
                lg={3}
                className="d-flex justify-content-center mb-4"
              >
                <CardContainer
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.05, delay: card.id * 0.08 }}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                >
                  <Link
                    to={`/service/${card.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img src={card.img} alt={card.name} />
                    <CardTitle>{card.name}</CardTitle>
                    <CardPrice>{card.price}</CardPrice>
                    <AnimatePresence>
                      {hoveredCardId === card.id && (
                        <CardInfo
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {card.info}
                        </CardInfo>
                      )}
                    </AnimatePresence>
                  </Link>
                </CardContainer>
              </Col>
            ))}
          </Row>
        </motion.div>
      </AnimatePresence>
    </ServicesContainer>
  );
};

export default Services;
