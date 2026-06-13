import { useState } from "react";
import { Link } from "react-router-dom"; 
import { publicNavlinks } from "../data/PublicNavlinks";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/50 backdrop-blur-xl z-50 border-b border-white/20">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-3xl font-extrabold text-orange-400 font-zen">
          FoodDonate
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8 items-center">
          {publicNavlinks.map((link) => (
            <Link
              key={link.id}
              to={link.path}
              className="text-white font-medium hover:text-orange-400 transition duration-300"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition duration-300 shadow-lg">
            Donate Food
          </Link>
        </div>

        {/* MOBILE HAMBURGER ICON */}
        <button className="md:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isOpen && (
        <div className="md:hidden bg-black/90 p-5 flex flex-col gap-4 text-center border-t border-gray-700">
          {publicNavlinks.map((link) => (
            <Link key={link.id} to={link.path} onClick={() => setIsOpen(false)} className="text-white font-medium text-lg">
              {link.name}
            </Link>
          ))}
          <Link to="/login" onClick={() => setIsOpen(false)} className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold mx-auto mt-2">
            Donate Food
          </Link>
        </div>
      )}

    </nav>
  );
};

export default Navbar;