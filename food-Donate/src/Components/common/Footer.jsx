import { Link } from "react-router-dom";
import { FaGlobe, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  
  const quickLinks = [
    { name: "Home", to: "/" },
    { name: "NGOs", to: "/ngos" },
    { name: "Volunteers", to: "/register" },
    { name: "Contact", to: "/contact" },
  ];

  const services = [
    "Food Donation",
    "NGO Support",
    "Volunteer Help",
    "Community Programs",
  ];

  const socials = [
    { icon: <FaGlobe />, color: "hover:text-green-400", label: "Website" },
    { icon: <FaFacebook />, color: "hover:text-blue-500", label: "Facebook" },
    { icon: <FaInstagram />, color: "hover:text-pink-500", label: "Instagram" },
    { icon: <FaTwitter />, color: "hover:text-sky-400", label: "Twitter" },
  ];

  return (
    <footer className="bg-gray-950 text-white py-16 px-6 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-green-400 tracking-wide">
              FoodDonate
            </h2>
            <p className="text-gray-400 leading-7">
              Reducing food waste and helping communities through food donation and volunteer support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-gray-200">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-400">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="hover:text-green-400 transition duration-300 block w-fit">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-gray-200">
              Services
            </h3>
            <ul className="space-y-3 text-gray-400">
              {services.map((service, index) => (
                <li 
                  key={index} 
                  className="hover:text-green-400 transition duration-300 cursor-pointer block w-fit"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-5 text-gray-200">
              Contact Us
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-2">📍 Chennai, Tamil Nadu</li>
              <li className="flex items-center gap-2">📧 fooddonate@gmail.com</li>
              <li className="flex items-center gap-2">📞 +91 9369038543</li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2026 FoodDonate. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-6 text-xl text-gray-400">
            {socials.map((social, index) => (
              <span 
                key={index} 
                aria-label={social.label}
                className={`${social.color} transition duration-300 cursor-pointer transform hover:scale-110 block`}
              >
                {social.icon}
              </span>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;