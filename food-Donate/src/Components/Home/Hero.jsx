import Navbar from "../common/Navbar";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
    
      className="
      bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c')]
      bg-cover
      bg-center
      min-h-screen
      "
    >
      {/* Overlay */}
      <div
        className="
        min-h-screen
        bg-black/60
        "
      >
        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div
          className="
          flex
          items-center
          justify-center
          min-h-[90vh]
          px-5
          md:px-16
          "
        >
          <div
            className="
            w-full
            max-w-5xl
            text-white
            text-center
            md:text-left
            "
          >
            {/* Heading */}
            <h1
              className="
              text-3xl
              sm:text-4xl
              md:text-6xl
              font-bold
              leading-tight
              mb-5
              "
            >
              Reduce Food Waste

              <span className="block text-yellow-400">
                Feed Hungry People
              </span>
            </h1>

            {/* Description */}
            <p
              className="
              text-sm
              sm:text-base
              md:text-xl
              text-gray-200
              leading-7
              max-w-2xl
              mx-auto
              md:mx-0
              mb-8
              "
            >
              Donate extra food from homes,
              restaurants, and events to help
              people who truly need it.
            </p>

            {/* Buttons */}
            <div
              className="
              flex
              flex-col
              sm:flex-row
              justify-center
              md:justify-start
              items-center
              gap-4
              "
            >
              <Link
                to="/login"
                className="
                w-full
                sm:w-auto
                bg-green-500
                hover:bg-green-600
                px-8
                py-3
                rounded-xl
                font-semibold
                transition
                text-center
                "
              >
                🍱 Donate Food
              </Link>

              <Link
                to="/ngos"
                className="
                w-full
                sm:w-auto
                bg-white/10
                border
                border-white/30
                hover:bg-white/20
                px-8
                py-3
                rounded-xl
                font-semibold
                transition
                text-center
                "
              >
                🔍 Explore
              </Link>
            </div>

            {/* Stats */}
            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-3
              gap-5
              mt-12
              "
            >
              {/* Card 1 */}
              <div
                className="
                bg-white/10
                backdrop-blur-md
                p-5
                rounded-2xl
                "
              >
                <h2 className="text-3xl font-bold text-green-400">
                  1200+
                </h2>

                <p className="text-gray-200 mt-1">
                  Meals Shared
                </p>
              </div>

              {/* Card 2 */}
              <div
                className="
                bg-white/10
                backdrop-blur-md
                p-5
                rounded-2xl
                "
              >
                <h2 className="text-3xl font-bold text-orange-400">
                  50+
                </h2>

                <p className="text-gray-200 mt-1">
                  NGOs Connected
                </p>
              </div>

              {/* Card 3 */}
              <div
                className="
                bg-white/10
                backdrop-blur-md
                p-5
                rounded-2xl
                "
              >
                <h2 className="text-3xl font-bold text-blue-400">
                  10K+
                </h2>

                <p className="text-gray-200 mt-1">
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