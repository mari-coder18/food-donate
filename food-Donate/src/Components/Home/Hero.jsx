import Navbar from "../common/Navbar";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="
      bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c')]
      bg-cover
      bg-center
      bg-no-repeat
      min-h-screen
      w-full
      relative
      "
    >
    
      <div className="min-h-screen bg-black/65 backdrop-blur-[2px] flex flex-col pt-16 pb-20 px-6 sm:px-10 md:px-16 justify-center items-center">
        
        {/* Navbar */}
        <Navbar />

        {/* Hero Content Container */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-start mt-10 md:mt-16">
          <div className="w-full max-w-4xl text-white text-center md:text-left">
            
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Reduce Food Waste
              <span className="block text-orange-400 mt-2">
                Feed Hungry People
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto md:mx-0 mb-8 font-medium">
              Donate extra food from homes, restaurants, and events to help people who truly need it.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
              <Link
                to="/login"
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 active:scale-95 px-8 py-3.5 rounded-xl font-bold transition-all duration-200 text-center shadow-lg shadow-green-500/20 tracking-wide cursor-pointer"
              >
                🍱 Donate Food
              </Link>

              <Link
                to="/ngos"
                className="w-full sm:w-auto bg-white/10 border border-white/20 hover:bg-white/20 active:scale-95 px-8 py-3.5 rounded-xl font-bold transition-all duration-200 text-center backdrop-blur-sm tracking-wide cursor-pointer"
              >
                🔍 Explore NGOs
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto md:mx-0">
              
              {/* Card 1 */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:bg-white/15 transition duration-300">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-green-400">
                  1200+
                </h2>
                <p className="text-gray-300 font-medium text-sm sm:text-base mt-1.5">
                  Meals Shared
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:bg-white/15 transition duration-300">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-orange-400">
                  50+
                </h2>
                <p className="text-gray-300 font-medium text-sm sm:text-base mt-1.5">
                  NGOs Connected
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white/10 border border-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:bg-white/15 transition duration-300">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-400">
                  10K+
                </h2>
                <p className="text-gray-300 font-medium text-sm sm:text-base mt-1.5">
                  People Helped
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;