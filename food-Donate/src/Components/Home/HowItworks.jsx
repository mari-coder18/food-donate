function HowItWorks(){
    return(

    

    
      <section className="bg-white py-24 px-6">

        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">

            <h2 className="text-4xl font-bold text-gray-800">
              How It Works
            </h2>

            <p className="text-gray-500 mt-4 text-lg">
              Simple steps to reduce food waste and help communities
            </p>

          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Card 1 */}
            <div
              className="
              bg-orange-50
              p-10
              rounded-3xl
              shadow-lg
              hover:-translate-y-2
              hover:shadow-2xl
              transition
              duration-300
              "
            >

              <div className="text-6xl mb-6">
                🍱
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Donate Food
              </h3>

              <p className="text-gray-600 leading-7">
                Share extra food from homes, restaurants,
                and events easily.
              </p>

            </div>

            {/* Card 2 */}
            <div
              className="
              bg-green-50
              p-10
              rounded-3xl
              shadow-lg
              hover:-translate-y-2
              hover:shadow-2xl
              transition
              duration-300
              "
            >

              <div className="text-6xl mb-6">
                📍
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Nearby Match
              </h3>

              <p className="text-gray-600 leading-7">
                NGOs and volunteers receive nearby food donation alerts.
              </p>

            </div>

            {/* Card 3 */}
            <div
              className="
              bg-blue-50
              p-10
              rounded-3xl
              shadow-lg
              hover:-translate-y-2
              hover:shadow-2xl
              transition
              duration-300
              "
            >

              <div className="text-6xl mb-6">
                🤝
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Help Communities
              </h3>

              <p className="text-gray-600 leading-7">
                Food reaches people who truly need support quickly.
              </p>

            </div>

          </div>

        </div>

      </section>

    


    )
    
}export default HowItWorks;