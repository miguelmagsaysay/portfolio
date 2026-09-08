import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ClientStrip from "@/components/ClientStrip";
import Services from "@/components/Services";
import Platforms from "@/components/Platforms";
import Process from "@/components/Process";
import WorkspaceImage from "@/components/WorkspaceImage";
import About from "@/components/About";
import GetStarted from "@/components/GetStarted";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <ClientStrip />
        <Services />
        <Platforms />
        <Process />
        <WorkspaceImage />
        <About />
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}
