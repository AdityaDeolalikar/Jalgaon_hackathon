import Navbar from "./components/Navbar";
import FeatureCards from "./components/FeatureCards";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <FeatureCards />
      </main>
    </div>
  );
}
