import { Route, Routes } from "react-router-dom";
import Footer from "./footer";
import Nav from "./nav";
import ScrollToTop from "./location/StarOfPage";
import Home from "./pages/home/Home";
import Services from "./pages/services/Index";
import Contact from "./pages/contact/Index";
import NotFound from "./error/NotFound";
import Accessories from "./pages/Accessories/Accessories";
import ServiceDetails from "./pages/services/ServiceDetails";
import AccessoriesDetail from "./pages/Accessories/AccessoriesDetails";
import { AccessoriesProvider } from "./context/useAccessories";


function App() {
  return (
    <>
      <AccessoriesProvider>
        <Nav />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/accessories/:id" element={<AccessoriesDetail />} />
        </Routes>
        <Footer />
      </AccessoriesProvider>
    </>
  );
}

export default App;
