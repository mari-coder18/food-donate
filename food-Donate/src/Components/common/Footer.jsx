import { Link } from "react-router-dom";

function Footer(){
    return(



<footer className="bg-gray-900 text-white py-16 px-6">

  <div className="max-w-7xl mx-auto">

    {/* Footer Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

      {/* Brand */}
      <div>

        <h2 className="text-3xl font-bold mb-4 text-green-400">
          FoodDonate
        </h2>

        <p className="text-gray-400 leading-7">
          Reducing food waste and helping communities
          through food donation and volunteer support.
        </p>

      </div>

      {/* Quick Links */}
      <div>

        <h3 className="text-2xl font-semibold mb-5">
          Quick Links
        </h3>

        <ul className="space-y-3 text-gray-400">

          <li>
            <Link to="/" className="hover:text-white transition duration-300">
              Home
            </Link>
          </li>

          <li>
            <Link to="/ngos" className="hover:text-white transition duration-300">
              NGOs
            </Link>
          </li>

          <li>
            <Link to="/register" className="hover:text-white transition duration-300">
              Volunteers
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-white transition duration-300">
              Contact
            </Link>
          </li>

        </ul>

      </div>

      {/* Services */}
      <div>

        <h3 className="text-2xl font-semibold mb-5">
          Services
        </h3>

        <ul className="space-y-3 text-gray-400">

          <li className="hover:text-white transition duration-300 cursor-pointer">
            Food Donation
          </li>

          <li className="hover:text-white transition duration-300 cursor-pointer">
            NGO Support
          </li>

          <li className="hover:text-white transition duration-300 cursor-pointer">
            Volunteer Help
          </li>

          <li className="hover:text-white transition duration-300 cursor-pointer">
            Community Programs
          </li>

        </ul>

      </div>

      {/* Contact */}
      <div>

        <h3 className="text-2xl font-semibold mb-5">
          Contact
        </h3>

        <ul className="space-y-4 text-gray-400">

          <li>
            📍 Chennai, Tamil Nadu
          </li>

          <li>
            📧 fooddonate@gmail.com
          </li>

          <li>
            📞 +91 9369038543
          </li>

        </ul>

      </div>

    </div>

    {/* Bottom Footer */}
    <div
      className="
      border-t
      border-gray-700
      mt-12
      pt-8
      flex
      flex-col
      md:flex-row
      justify-between
      items-center
      gap-4
      "
    >

      <p className="text-gray-500 text-center">
        © 2026 FoodDonate. All rights reserved.
      </p>

      {/* Social Icons */}
      <div className="flex gap-5 text-2xl">

        <span className="hover:text-green-400 transition duration-300 cursor-pointer">
          🌐
        </span>

        <span className="hover:text-blue-400 transition duration-300 cursor-pointer">
          📘
        </span>

        <span className="hover:text-pink-400 transition duration-300 cursor-pointer">
          📸
        </span>

        <span className="hover:text-sky-400 transition duration-300 cursor-pointer">
          🐦
        </span>

      </div>

    </div>

  </div>

</footer>
    )
}
export default Footer;