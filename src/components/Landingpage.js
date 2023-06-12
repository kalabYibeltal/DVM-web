import ".././App.css";
import Home2 from "./landingPage/Home2"
import About from "./landingPage/About";
import Footer from "./landingPage/Footer";
import Navbar from "./landingPage/Navbar";
import Work from "./landingPage/Work";

function Landingpage() {
  return (
    <div className="App">
      <Home2 />
      <About />
      <Work />
      <Footer />
    </div>
  );
}

export default Landingpage;