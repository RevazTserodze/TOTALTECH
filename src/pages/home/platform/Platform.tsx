import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChildPlatform from "./ChildPlatform";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface Button {
  id: number;
  name: { en: string; ge: string };
  img: string;
  imageUrl: string;
  description: { en: string; ge: string };
}

const Container = styled.div`
  padding: 20px;
  margin-top: 150px;
`;

const ButtonCard = styled.div<{
  isSelected: boolean;
  isDisabled: boolean;
}>`
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  border: ${(props) =>
    props.isSelected ? "2px solid black" : "2px solid transparent"};
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  text-align: center;
  flex: 1 1 auto;
  background: ${(props) => (props.isSelected ? "white" : "transparent")};
  transition: background 0.3s ease;

  &:hover {
    border-color: black;
  }
`;

const ButtonImage = styled.img`
  max-width: 100px;
  height: auto;
  margin-bottom: 10px;
`;

const buttons: Button[] = [
  {
    id: 1,
    name: { en: "Desktop App", ge: "დესკტოპ აპლიკაცია" },
    img: "./icons/desktop-development.png",
    imageUrl: "./icons/desktop-app.png",
    description: {
      en: "We provide powerful and user-friendly desktop applications designed to enhance productivity and streamline operations. Our solutions are crafted to fit seamlessly into your existing workflows.",
      ge: "ჩვენ ვუზრუნველყოფთ რომ თქვენი დეკტოპ აპლ;იკაცია იყოს მძლავრი და რაც შეძლება მარტივი რათა გაზარდოს პროდუქტიულობა და ოპოერაციების ხარისხი.",
    },
  },
  {
    id: 2,
    name: { en: "Web Development", ge: "ვებ განვითარება" },
    img: "./icons/Web-app.png",
    imageUrl: "./icons/web-development.png",
    description: {
      en: "Our team delivers innovative, scalable, and responsive web solutions tailored to your business goals. From design to deployment, we ensure a seamless experience for both you and your users.",
      ge: "ვებსაიტის შექმნა თქვენს ბიზნესზე მორგებული დიზაინითა და შესაძლებლობებით, იქნება ეს კომპლექსური თუ მარტივი ერთ გვერდიანი მოთხოვნა",
    },
  },
  {
    id: 3,
    name: { en: "Mobile App", ge: "მობილური აპლიკაცია" },
    img: "./icons/mobile-development.png",
    imageUrl: "./icons/mobile-app.png",
    description: {
      en: "We create engaging and reliable mobile applications that enhance your reach and user engagement. Our expertise ensures smooth functionality across platforms, helping your business connect with users on the go.",
      ge: "ჩვენ ვქმნით სანდო და მარტივ მოაბაილ აპლიკაციებს რაც ზრდის პროდუქტიულობასა და მომხმარებლების ჩართულობას",
    },
  },
];

const Platform: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedButton, setSelectedButton] = useState<Button | null>(
    buttons[0]
  );
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    setSelectedButton(buttons[0]);
  }, [i18n.language]);

  const handleCardClick = useCallback(
    (button: Button) => {
      if (!isAnimating) {
        setIsAnimating(true);
        setSelectedButton((prev) => (prev?.id === button.id ? null : button));
        setTimeout(() => setIsAnimating(false), 600);
      }
    },
    [isAnimating]
  );

  const currentLanguage = i18n.language as keyof Button["name"];

  return (
    <Container className="container">
      <div className="d-flex flex-wrap justify-content-center">
        {buttons.map((button) => (
          <ButtonCard
            key={button.id}
            onClick={() => handleCardClick(button)}
            isSelected={selectedButton?.id === button.id}
            isDisabled={isAnimating}
          >
            <ButtonImage
              src={button.img}
              alt={t(button.name[currentLanguage])}
              loading="lazy"
            />
          </ButtonCard>
        ))}
      </div>

      <AnimatePresence>
        {selectedButton && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChildPlatform key={selectedButton.id} output={selectedButton} />
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Platform;
