import Header from "@/components/header";
import Footer from "@/components/footer";
import Horarios from "@/components/horarios";
import WeatherComponent from "@/components/weather";

export default function Home() {
  return (
    <div>
      <Header />
        <div>
          <div className="flex border-x-4">
            <Horarios />
            <WeatherComponent />
          </div>
        </div>
      <Footer />
    </div>
  );
}
