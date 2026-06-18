import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { publicNavlinks } from "../data/PublicNavlinks";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); 

  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-xl z-50 border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-3xl font-extrabold text-orange-400 select-none tracking-wide">
          FoodDonate
        </Link>

        {/* 💻 DESKTOP NAV LINKS */}
        <div className="hidden md:flex gap-8 items-center">
          {publicNavlinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className={`font-medium transition duration-300 ${
                location.pathname === link.path ? "text-orange-400" : "text-white hover:text-orange-400"
              }`} 
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300 shadow-md shadow-orange-500/20">
            Donate Food
          </Link>
        </div>

        {/* 📱 MOBILE HAMBURGER ICON */}
        <button 
          className="md:hidden text-white text-2xl focus:outline-none cursor-pointer" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* 📱 MOBILE MENU DROPDOWN */}
      <div className={`
        absolute top-full left-0 w-full bg-black/95 border-b border-gray-800 p-6 flex flex-col gap-4 text-center md:hidden transition-all duration-300 origin-top
        ${isOpen ? "opacity-100 scale-y-100 block" : "opacity-0 scale-y-0 hidden"}
      `}>
        {publicNavlinks.map((link) => (
          <Link 
            key={link.id} 
            to={link.path} 
            className={`font-medium text-lg block py-2 transition ${
              location.pathname === link.path ? "text-orange-400" : "text-white hover:text-orange-400"
            }`}
          >
            {link.name}
          </Link>
        ))}
        <Link to="/login" className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold w-full max-w-xs mx-auto mt-2 block shadow-lg">
          Donate Food
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;