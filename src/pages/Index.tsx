import { Helmet } from "react-helmet-async";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import ParentsSection from "@/components/landing/ParentsSection";
import Gallery from "@/components/landing/Gallery";
import Team from "@/components/landing/Team";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";
import WhatsAppButton from "@/components/landing/WhatsAppButton";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Instituto Mundo de Dentro | Neuropsicologia e Psicologia Infantil em Teresina</title>
        <meta 
          name="description" 
          content="Instituto Mundo de Dentro: Avaliação neuropsicológica, neurofeedback, psicologia infantil e orientação parental em Teresina, Piauí. Cuidando do mundo interno de cada pessoa com ciência e acolhimento." 
        />
        <meta name="keywords" content="neuropsicologia, psicologia infantil, neurofeedback, avaliação neuropsicológica, TDAH, dislexia, Teresina, Piauí" />
        <link rel="canonical" href="https://mundodedentro.com.br" />
        <meta property="og:title" content="Instituto Mundo de Dentro | Neuropsicologia e Psicologia Infantil" />
        <meta property="og:description" content="Cuidando do mundo interno de cada pessoa com ciência, acolhimento e fé." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navbar />
        <main>
          <div id="hero">
            <Hero />
          </div>
          <About />
          <Services />
          <ParentsSection />
          <Gallery />
          <Team />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
