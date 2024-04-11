import Header from "../common/Header";
import Footer from "../common/Footer";
import { Carousel, Button, Container } from "react-bootstrap";
import Body from "../common/TopBanner";
import TopBanner from "../common/TopBanner";
import MainContent from "../common/MainContent";
import AdditionalSectionOne from "../common/AdditionalSectionOne";
import AdditionalSectionTwo from "../common/AdditionalSectionTwo";

export default function HomePage() {
  return (
    <div>
      <Header />
      <TopBanner />
      <MainContent />
      <AdditionalSectionOne />
      <AdditionalSectionTwo />
      <Footer />
    </div>

  );
}
