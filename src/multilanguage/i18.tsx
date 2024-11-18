import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Home",
      Services: "Services",
      "About Us": "About Us",
      Partners: "Partners",
      Contact: "Contact",
      "Sorry, the page you are looking for does not exist.":
        "Sorry, the page you are looking for does not exist.",
      "Go to Home": "Go to Home",
      Company: "Company",
      "Leading the industry with innovative tech solutions and exceptional service.":
        "Leading the industry with innovative tech solutions and exceptional service.",
      "Offering web development, app creation, SEO, consulting, and more.":
        "Offering web development, app creation, SEO, consulting, and more.",
      "Connect with us on social media for updates and news.":
        "Connect with us on social media for updates and news.",
      "Your Company": "Your Company",
      "All rights reserved.": "All rights reserved.",
      "Phone Numbers": "Phone Numbers",
      "Business Hours": "Business Hours",
      "Social Media": "Social Media",
      "888-333-111": "888-333-111",
      "24/7": "24/7",
      Email: "Email",
      Phone: "Phone",
      Address: "Address",
      "Destination Location": "Destination Location",
      "Footer Text": "This is the footer section of the website.",
      "Contact Us": "Contact Us",
      "Follow Us": "Follow Us",
      "Get in touch with us through our contact form or social media.":
        "Get in touch with us through our contact form or social media.",
      "We look forward to hearing from you!":
        "We look forward to hearing from you!",
      "Send Message": "Send Message",
      "Your Name": "Your Name",
      "Your Email": "Your Email",
      "Your Message": "Your Message",
      Submit: "Submit",
      Filters: {
        All: "All",
        IT: "IT",
        Building: "Building",
      },
      "We align leaders around a shared purpose and strategic story that catalyzes their business and brand to take action.":
        "We align leaders around a shared purpose and strategic story that catalyzes their business and brand to take action.",
      "Contact Information": "Contact Information",
      "Monday - Friday: 9:00 AM - 5:00 PM":
        "Monday - Friday: 9:00 AM - 5:00 PM",
      "Saturday: 10:00 AM - 2:00 PM": "Saturday: 10:00 AM - 2:00 PM",
      "Sunday: Closed": "Sunday: Closed",
      "Email: info@company.com": "Email: info@company.com",
      "Phone: +1 234 567 890": "Phone: +1 234 567 890",
      "Address: 123 Business St, City, Country":
        "Address: 123 Business St, City, Country",
      "Our Location": "Our Location",
      Shop: "Shop",
      "Make a call": "Make a call",
      "Filter Products": "Filter Products",
      "Product Name": "Product Name",
      "Price Range": "Price Range",
      Options: "Options",
      "Apply Filters": "Apply Filters",
      "View Details": "View Details",
      Close: "Close",
      "Call Now": "Call Now",
      "Phone: 595850777": "Phone: 595850777",
      "Email: totaltech.companyinfo@gmail.com":
        "Email: totaltech.companyinfo@gmail.com",
    Price: "Price",
      GEL: "GEL",
    },
  },
  ge: {
    translation: {
      "Welcome to React": "მთავარი",
      Services: "სერვისები",
      "About Us": "ჩვენ შესახებ",
      Partners: "პარტნიორები",
      Contact: "კონტაქტი",
      "Sorry, the page you are looking for does not exist.":
        "ბოდიშით, გვერდი, რომელსაც ეძებთ, არ არსებობს.",
      "Go to Home": "მთავარ გვერდზე გადაყვანა",
      Company: "კომპანია",
      "Leading the industry with innovative tech solutions and exceptional service.":
        "ინდუსტრიის ლიდერი ინოვაციური ტექნოლოგიური გადაწყვეტილებებითა და გამოჩენილი მომსახურებით.",
      "Offering web development, app creation, SEO, consulting, and more.":
        "ვაწვდეთ ვებსაიტების განვითარების, აპლიკაციების შექმნის, SEO-ს, კონსულტაციების და სხვა მომსახურებას.",
      "Connect with us on social media for updates and news.":
        "ტვალყური გვადევნეთ სოციალურ ქსელებზე",
      "Your Company": "Your Company",
      "All rights reserved.": "All rights reserved.",
      "Phone Numbers": "ტელეფონის ნომრები",
      "Business Hours": "სამუშაო საათები",
      "Social Media": "სოციალური ქსელები",
      "888-333-111": "888-333-111",
      "24/7": "24/7",
      Email: "ელ. ფოსტა",
      Phone: "ტელეფონი",
      Address: "მისამართი",
      "Destination Location": "სამიზნე ადგილია",
      "Footer Text": "ეს არის ვებსაიტის ფეხსაცმლის ნაწილი.",
      "Contact Us": "დაგვიკავშირდით",
      "Follow Us": "გამოგვყევით",
      "Get in touch with us through our contact form or social media.":
        "დაგვიკავშირდით ჩვენს საკონტაქტო ფორმას ან სოციალური ქსელების მეშვეობით.",
      "We look forward to hearing from you!": "გვსურს გაგვიგო თქვენგან!",
      "Send Message": "შეტყობინების გაგზავნა",
      "Your Name": "თქვენი სახელი",
      "Your Email": "თქვენი ელ. ფოსტა",
      "Your Message": "თქვენი შეტყობინება",
      Submit: "გაგზავნა",
      Filters: {
        All: "ყველა",
        IT: "IT",
        Building: "მშენებლობა",
      },
      "We align leaders around a shared purpose and strategic story that catalyzes their business and brand to take action.":
        "ჩვენ გაწვდეთ ლიდერებს საერთო მიზნისა და სტრატეგიული ისტორიის გარშემო, რაც მათ ბიზნესსა და ბრენდს აქტიური მოქმედებისკენ აიძულებს.",
      "Contact Information": "კონტაქტის ინფორმაცია",
      "Monday - Friday: 9:00 AM - 5:00 PM":
        "ორშაბათი - პარასკევი: 9:00 AM - 5:00 PM",
      "Saturday: 10:00 AM - 2:00 PM": "შაბათი: 10:00 AM - 2:00 PM",
      "Sunday: Closed": "კვირა: დახურული",
      "Email: info@company.com": "ელ. ფოსტა: info@company.com",
      "Phone: +1 234 567 890": "ტელეფონი: +1 234 567 890",
      "Address: 123 Business St, City, Country":
        "მისამართი: 123 Business St, ქალაქი, ქვეყანა",
      "Our Location": "ჩვენი ადგილმდებარეობა",
      Shop: "მაღაზია",
      "Make a call": "დარეკვა",
      "Filter Products": "ფილტრი",
      "Product Name": "სახელი",
      "Price Range": "ფასი",
      Options: "ოფცია",
      "Apply Filters": "გაფილტვრა",
      "View Details": "დეტალების ნახვა",
      Close: "დახურვა",
      "Call Now": "დარეკვა",
      "Phone: 595850777": "ნომერი: 595850777",
      "Email: totaltech.companyinfo@gmail.com":
        "მეილი: totaltech.companyinfo@gmail.com",
      Price: "ფასი",
      GEL: "₾",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
