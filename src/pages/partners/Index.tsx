import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

const PartnersContainer = styled(Container)`
  margin-top: 7rem;
`;

const PartnerCard = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
  padding: 20px;
  transition: transform 0.3s ease-in-out, box-shadow 0.1s ease-in-out;

  img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const FilterButton = styled(motion.button)<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? "#007bff" : "#6c757d")};
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isActive ? "#0056b3" : "#5a6268")};
  }
`;

const containerVariants = {
  hidden: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -100,
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

interface Partner {
  id: number;
  name: string;
  logo: string;
  website: string;
  development: string;
}

const Partners: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [development, setDevelopment] = useState<string>("All");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const fetchPartners = useCallback(async () => {
    try {
      const response = await fetch("/car-app/companyPartners.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Partner[] = await response.json();
      setPartners(data);
      setFilteredPartners(data);
    } catch (error) {
      console.error("Failed to fetch partners:", error);
    }
  }, []);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  useEffect(() => {
    setFilteredPartners(
      development === "All"
        ? partners
        : partners.filter((partner) => partner.development === development)
    );
  }, [development, partners]);

  const handleFilterChange = (filter: string) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setDevelopment(filter);
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <PartnersContainer>
      <h1 className="text-center mb-4">Our Partners</h1>
      <div className="text-center mb-4">
        {["All", "Building", "IT"].map((filter) => (
          <FilterButton
            key={filter}
            isActive={development === filter}
            onClick={() => handleFilterChange(filter)}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {filter}
          </FilterButton>
        ))}
      </div>
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={handleAnimationComplete}
      >
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
            {filteredPartners.map((partner) => (
              <Col
                key={partner.id}
                xs={12}
                sm={8}
                md={6}
                lg={3}
                className="d-flex justify-content-center mb-4"
              >
                <PartnerCard
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.05, delay: partner.id * 0.05 }}
                >
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={partner.logo} alt={partner.name} />
                  </a>
                </PartnerCard>
              </Col>
            ))}
          </Row>
        </motion.div>
      </AnimatePresence>
    </PartnersContainer>
  );
};

export default Partners;
