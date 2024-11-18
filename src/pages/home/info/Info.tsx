import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";

interface Card {
  title: { en: string; ge: string };
  description: { en: string; ge: string };
  icon: string;
  color: string;
  id: number;
}

const cardData: Card[] = [
  {
    id: 1,
    title: { en: "Restaurant", ge: "რესტორანი" },
    description: {
      en: "We offer advanced security cameras for essential area monitoring and fire protection systems tailored to restaurant environments. From kitchen to dining area, our solutions help safeguard your property, staff, and guests with reliable fire safety measures.",
      ge: "ჩვენ გთავაზობთ მოწინავე უსაფრთხოების კამერებს ძირითადი უბნების მონიტორინგისთვის.ასევე სერვისებში გვაქვს ხანძარსაწინააღმდეგო და საგანგებო რეაგირების სისტემები, რომლებიც მორგებულია რესტორნის გარემოს უნიკალურ საჭიროებებზე. სამზარეულოდან სასადილო ზონებამდე, ჩვენი გადაწყვეტილებები დაგეხმარებათ დაიცვათ თქვენი ქონება, პერსონალი და სტუმრები სანდო ხანძარსაწინააღმდეგო ზომებით.",
    },
    icon: "bi-house-door",
    color: "#f0a500",
  },
  {
    id: 2,
    title: { en: "Mall", ge: "მოლები" },
    description: {
      en: "With advanced surveillance systems, you can monitor all areas of a shopping mall, from entrances and parking lots to food courts and individual stores. We also offer specialized anti-theft systems for stores to reduce losses. Parking can be a major concern in busy malls, so we provide automated parking management systems to simplify and streamline the process. Our barriers, ticketing system, and parking control help ease traffic flow and reduce wait times, ensuring a positive visitor experience.",
      ge: "სათვალთვალო სისტემებით, ჩვენ დაგეხმარებით ტერიტორის 24/7 ზე მეთვალყურეობის გამარტივებაშიხელმისაწვდომობის კონტროლი სამთავრობო შენობებისთვის ყურადღების გამახვილების კიდევ ერთი მთავარი სფეროა, სადაც მხოლოდ უფლებამოსილ პერსონალს უნდა ჰქონდეს შესვლა კონკრეტულ ადგილებში. ჩვენ გთავაზობთ წვდომის მართვის მორგებულ სისტემებს, მათ შორის უსაფრთხო შესვლის წერტილებს, საკვანძო ბარათს ან ბიომეტრიულ წვდომას და ვიზიტორთა თვალთვალის საშუალებას, რაც საშუალებას გაძლევთ გააკონტროლოთ ვის შეუძლია შევიდეს დაცულ ადგილას.",
    },
    icon: "bi-house-door",
    color: "#f0a500",
  },
  {
    id: 3,
    title: { en: "Govermental", ge: "სამთავრობო შენობები" },
    description: {
      en: "With advanced surveillance systems, we help monitor entrances, corridors, parking lots, and key areas. We offer customized access control systems, including secure entry points, key cards, or biometric access, along with visitor tracking to control who can enter secure areas. In emergencies, our fire and evacuation systems are designed to protect everyone. Our solutions include smoke detectors, fire alarms, emergency lighting, and clear exit planning to ensure quick response and safe evacuation",
      ge: "მოწინავე სათვალთვალო სისტემებით, ჩვენ დაგეხმარებით სადარბაზოების, დერეფნების, ავტოსადგომების და ძირითადი უბნების მონიტორინგში. ჩვენ გთავაზობთ წვდომის მართვის მორგებულ სისტემებს, მათ შორის უსაფრთხო შესვლის წერტილებს, საკვანძო ბარათს ან ბიომეტრიულ წვდომას და ვიზიტორთა თვალთვალის საშუალებას, რაც საშუალებას გაძლევთ გააკონტროლოთ ვის შეუძლია შევიდეს დაცულ ადგილას.საგანგებო სიტუაციის შემთხვევაში, ჩვენი ხანძარსაწინააღმდეგო და ევაკუაციის სისტემები შექმნილია იმისთვის, რომ ყველა ადამიანი იყოს დაცული. ჩვენი გადაწყვეტილებები მოიცავს კვამლის დეტექტორებს, ხანძარსაწინააღმდეგო სიგნალიზაციას, საგანგებო განათებას და გასასვლელის მკაფიო დაგეგმვას სწრაფი რეაგირებისა და უსაფრთხო ევაკუაციის უზრუნველსაყოფად.",
    },
    icon: "bi-house-door",
    color: "#f0a500",
  },
  {
    id: 4,
    title: { en: "Hospital", ge: "საავადმყოფო" },
    description: {
      en: "We offer advanced surveillance systems to monitor hospital areas 24/7. Our access control systems help protect sensitive areas, such as patient record rooms, operating rooms, and staff-only spaces. We provide secure entry points with key cards, biometric access, or PIN codes to ensure that only authorized personnel can enter these areas.",
      ge: "ჩვენ გთავაზობთ მოწინავე სათვალთვალო სისტემებს, რაც ეხმარება საავადმყოფოს ტერიტორიების მონიტორინგს 24/7.ჩვენი წვდომის კონტროლის სისტემები დაგეხმარებათ მგრძნობიარე ადგილების დაცვაში, როგორიცაა პაციენტების ჩანაწერების ოთახები, საოპერაციო ოთახები და მხოლოდ პერსონალისთვის განკუთვნილი ადგილები. ჩვენ გთავაზობთ უსაფრთხო შესვლის წერტილებს საკვანძო ბარათებით, ბიომეტრიული წვდომით ან PIN კოდებით, რათა უზრუნველვყოთ, რომ მხოლოდ უფლებამოსილ პერსონალს შეუძლია ამ სივრცეებში შესვლა.",
    },
    icon: "bi-house-door",
    color: "#f0a500",
  },
  {
    id: 5,
    title: { en: "Construction Site", ge: "მშენებარე შენობები" },
    description: {
      en: "Our advanced surveillance systems provide continuous monitoring across the entire site. Whether it's tracking construction equipment, monitoring entry points, or overseeing the area, our high-quality cameras offer clear visibility of all activities. Access control is another important aspect. Our systems allow you to manage who enters the site and when. With smart access control solutions, such as cards, biometric records, or secure PIN codes, you can ensure that only authorized personnel are allowed on-site. Our services also include integrated fire protection systems, such as smoke detectors, alarms, and more.",
      ge: "ჩვენი მოწინავე სათვალთვალო სისტემები უზრუნველყოფს უწყვეტ მონიტორინგს მთელ ადგილზე.  იქნება ეს სამშენებლო აღჭურვილობის თვალყურის დევნება, შესვლის პუნქტების მონიტორინგი თუ ტერიტორიის ზედამხედველობა, ჩვენი მაღალი ხარისხის კამერები გაძლევენ ნათელ ხედვას ყველა აქტივობაზე. წვდომის კონტროლი კიდევ ერთი მნიშვნელოვანი ასპექტია. ჩვენი სისტემები საშუალებას გაძლევთ მართოთ ვინ და რა დროს შემოდის ტერიტორიაზე. წვდომის კონტროლის ჭკვიანი გადაწყვეტილებებით, როგორიცაა ბარათები, ბიომეტრიული ჩანაწერი ან უსაფრთხო PIN კოდები, შეგიძლიათ უზრუნველყოთ, რომ მხოლოდ ავტორიზებული პერსონალი დაიშვება ადგილზე ჩვენი სერვისები ასევე მოიცავს ხანძარსაწინააღმდეგო ინტეგრირებულ სისტემებს, როგორიცაა კვამლის დეტექტორები, სიგნალიზაცია და სხვა.",
    },
    icon: "bi-house-door",
    color: "#f0a500",
  },
  {
    id: 6,
    title: { en: "Residental Building", ge: "საცხოვრებელი შენობები" },
    description: {
      en: "Our security systems are tailored to protect the entire building. In emergencies, we provide smoke detectors, fire alarms, and emergency exits to ensure the safety of all residents and enable quick evacuation if necessary. Additionally, we offer integrated systems for managing other aspects of the building, such as parking management, lighting control, and energy efficiency.",
      ge: "ჩვენი უსაფრთხოების სისტემები მორგებულია მთელი შენობის დასაცავად.  საგანგებო სიტუაციების შემთხვევაში, ჩვენ კვამლის დეტექტორებს, ხანძარსაწინააღმდეგო სიგნალიზაციას და გადაუდებელი გასასვლელებს, რათა უზრუნველყოფილ იქნას ყველა მაცხოვრებლის უსაფრთხოება და საჭიროების შემთხვევაში სწრაფად ევაკუაცია.გარდა ამისა, ჩვენ ვთავაზობთ ინტეგრირებულ სისტემებს შენობის სხვა ასპექტების მართვისთვის, როგორიცაა პარკინგის მართვა, განათების კონტროლი და ენერგოეფექტურობა.",
    },
    icon: "bi-house-door",
    color: "#f0a500",
  },
  {
    id: 7,
    title: { en: "Hotel", ge: "სასტუმრო" },
    description: {
      en: "Our advanced surveillance systems ensure monitoring of all areas of your hotel. With our systems, guests can securely access their rooms and other hotel facilities using mobile apps or RFID cards. This eliminates the need for physical keys, reduces the risk of lost or stolen keys, and enhances guest comfort. Additionally, you can control access to restricted areas, such as staff rooms, storage, and technical rooms, ensuring that only authorized personnel can enter these spaces.",
      ge: "ჩვენი მოწინავე სათვალთვალო სისტემები უზრუნველყოფენ თქვენი სასტუმროს ყველა ზონის მონიტორინგს.ჩვენი სისტემებით, სტუმრებს შეუძლიათ გამოიყენონ მობილური აპლიკაციები ან RFID ბარათები თავიანთ ოთახებსა და სასტუმროს სხვა ობიექტებზე უსაფრთხოდ წვდომისთვის. ეს სისტემა გამორიცხავს ფიზიკური გასაღებების საჭიროებას, ამცირებს დაკარგული ან მოპარული გასაღებების რისკს და ზრდის სტუმრების კომფორტს. გარდა ამისა, თქვენ შეგიძლიათ აკონტროლოთ წვდომა შეზღუდულ ადგილებში, როგორიცაა თანამშრომლების ოთახები, საცავი და ტექნიკური ოთახები, იმის უზრუნველსაყოფად, რომ მხოლოდ ავტორიზებული პერსონალი შეძლებს ამ სივრცეებში შესვლას.",
    },
    icon: "bi-house-door",
    color: "#f0a500",
  },
  {
    id: 8,
    title: { en: "Fitness", ge: "ფიტნესი" },
    description: {
      en: "Our security cameras provide monitoring of every corner of your fitness center. Access control is essential, especially for restricted areas such as changing rooms, staff offices, and private training zones. Our access solutions ensure continuous control through cards, biometric records, or mobile app access, ensuring only authorized individuals can access certain areas. Our fire protection systems, including smoke detectors, fire alarms, and exits, ensure your facility is prepared for any emergency situation.",
      ge: "ჩვენი უსაფრთხოების კამერები უზრუნველყოფს თქვენი ფიტნეს ცენტრის ყველა კუთხის მონიტორინგს. წვდომის კონტროლი აუცილებელია ფიტნეს ცენტრებში, განსაკუთრებით მაშინ, როდესაც საქმე ეხება შეზღუდულ ზონებს, როგორიცაა გასახდელები, პერსონალის ოფისები და კერძო სასწავლო ზონები. ჩვენი წვდომის გადაწყვეტილებები უზრუნველყოფს უწყვეტ კონტროლს ბარათებით, ბიომეტრიული ჩანაწერით ან მობილური აპლიკაციის წვდომით. ეს უზრუნველყოფს, რომ მხოლოდ უფლებამოსილ პირებს შეუძლიათ წვდომა გარკვეულ ტერიტორიაზე.ჩვენი ხანძარსაწინააღმდეგო სისტემები, მათ შორის კვამლის დეტექტორები, ხანძარსაწინააღმდეგო სიგნალიზაცია და  გასასვლელები, უზრუნველყოფს თქვენი დაწესებულების მზადყოფნას ნებისმიერი საგანგებო სიტუაციისთვის.",
    },
    icon: "bi-house-door",
    color: "#f0a500",
  },
  {
    id: 9,
    title: { en: "Schools And Universities", ge: "სკოლები და უნივერსიტეტები" },
    description: {
      en: "Our surveillance systems help monitor key areas of the campus, from entrances and hallways to classrooms, cafeterias, and outdoor spaces. In emergencies, safety is another major focus for educational institutions. Our fire and emergency response systems ensure the quick and safe evacuation of students and staff in case of fire or other emergencies, with smoke detectors, fire alarms, emergency lighting, and exit signs.",
      ge: "ჩვენი სათვალთვალო სისტემები ეხმარება კამპუსის საკვანძო უბნების მონიტორინგში, შესასვლელებიდან და დერეფნებიდან საკლასო ოთახებამდე, კაფეტერიებსა და გარე სივრცეებამდე. საგანგებო სიტუაციების დროს უსაფრთხოება საგანმანათლებლო დაწესებულებების კიდევ ერთი მთავარი აქცენტია. ჩვენი ხანძარსაწინააღმდეგო და საგანგებო რეაგირების სისტემები უზრუნველყოფს სტუდენტებისა და პერსონალის ევაკუაციას სწრაფად და უსაფრთხოდ ხანძრის ან სხვა საგანგებო სიტუაციის შემთხვევაში. კვამლის დეტექტორებით, ხანძარსაწინააღმდეგო სიგნალიზაცია, საგანგებო განათება და გასასვლელი ნიშნები.",
    },
    icon: "bi-house-door",
    color: "#f0a500",
  },
];

const Info: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isInfo, setIsInfo] = useState<{ [key: number]: boolean }>({});
  const { t, i18n } = useTranslation();

  const handleMouseEnter = (id: number): void => {
    setHoveredCard(id);
  };

  const handleMouseLeave = (): void => {
    setHoveredCard(null);
  };

  const toggleInfo = (id: number) => {
    setIsInfo((prevInfo) => ({
      ...prevInfo,
      [id]: !prevInfo[id],
    }));
  };

  const getHoverStyle = (id: number, color: string): React.CSSProperties => ({
    ...(hoveredCard === id
      ? {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          backgroundColor: color,
          color: "#fff",
        }
      : {
          backgroundColor: "#fff",
          color: "#000",
        }),
    transition:
      "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease",
  });

  const currentLanguage = i18n.language as keyof Card["title"];

  return (
    <div className="container mt-5">
      <div className="row">
        {cardData.map((card) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={card.id}>
            <motion.div
              onMouseEnter={() => handleMouseEnter(card.id)}
              onMouseLeave={handleMouseLeave}
              style={getHoverStyle(card.id, card.color)}
              className="p-4 rounded shadow-lg text-center"
              initial={{ opacity: 0, y: card.id % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: card.id * 0.2 }}
            >
              <div
                onClick={() => toggleInfo(card.id)}
                style={{ cursor: "pointer" }}
              >
                <h5 className="card-title mt-3">
                  {t(card.title[currentLanguage])}
                </h5>
                <AnimatePresence>
                  {isInfo[card.id] && (
                    <motion.h6
                      initial={{ height: 0, opacity: 0, }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: "hidden" }}
                      transition={{ duration: 0.15 }}
                      className="card-title mt-3"
                      whileInView="visible"
                    >
                      {t(card.description[currentLanguage])}
                    </motion.h6>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
