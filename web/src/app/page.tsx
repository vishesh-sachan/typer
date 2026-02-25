import { Download } from "./components/download";
import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { HowItWorks } from "./components/how-it-works";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Download />
      <Footer />
    </main>
  );
}
