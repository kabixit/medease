import Hero from "./Hero";
import './styles/Home.css'
import Navbar from "./Navbar";

function HomePage() {

  return (
    <div className="container">
      <Navbar/>
      <Hero/>
    </div>
  );
}

export default HomePage;