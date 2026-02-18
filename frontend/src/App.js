import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from './components/ui/sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Opportunity from './pages/Opportunity';
import Technology from './pages/Technology';
import Roadmap from './pages/Roadmap';
import Governance from './pages/Governance';
import Investors from './pages/Investors';
import Contact from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/opportunity" element={<Opportunity />} />
            <Route path="/technology" element={<Technology />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
