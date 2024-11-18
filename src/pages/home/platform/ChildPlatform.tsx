import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Button {
  id: number;
  name: { en: string; ge: string };
  imageUrl: string;
  description: { en: string; ge: string };
}

interface ChildPlatformProps {
  output: Button | null;
}

const Container = styled.div`
  margin-top: 40px;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #6d67e4;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageWrapper = styled(motion.div)`
  display: flex;
  overflow: hidden;
  border-radius: 8px;
  margin-right: 16px;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
`;

const TextWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 72px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-top: 16px;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 16px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 16px;
`;

const imageVariants = {
  hidden: { opacity: 0, sclale: 0, y: -50 },
  visible: { opacity: 1, sclale: 1, y: 0 },
};

const textVariants = {
  hidden: { opacity: 0, y: 120 },
  visible: { opacity: 1, y: 0 },
};

const ChildPlatform: React.FC<ChildPlatformProps> = ({ output }) => {
  const { i18n } = useTranslation();

  if (!output) return null;
  const currentLanguage = i18n.language as keyof Button["description"];

  return (
    <Container>
      <ContentWrapper>
        <ImageWrapper
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          transition={{ duration: 0.5 }}
        >
          <StyledImage src={output.imageUrl} alt={output.name.en} />
        </ImageWrapper>
        <TextWrapper
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ duration: 0.6 }}
        >
          <Title>{output.name[currentLanguage]}</Title>
          <Description>{output.description[currentLanguage]}</Description>
        </TextWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default ChildPlatform;
