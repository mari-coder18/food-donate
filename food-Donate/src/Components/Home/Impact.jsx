function Impact(){
    return(
        


<section className="bg-white py-24 px-6">

  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-16">

      <h2 className="text-4xl font-bold text-gray-800">
        Our Impact
      </h2>

      <p className="text-gray-500 mt-4 text-lg">
        Together we are reducing food waste and helping communities
      </p>

    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {/* Stat 1 */}
      <div
        className="
        bg-orange-50
        rounded-3xl
        p-10
        text-center
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition
        duration-300
        "
      >

        <div className="text-6xl mb-5">
          🍱
        </div>

        <h3 className="text-4xl font-bold text-orange-500 mb-3">
          10K+
        </h3>

        <p className="text-gray-600 text-lg">
          Meals Shared
        </p>

      </div>

      {/* Stat 2 */}
      <div
        className="
        bg-green-50
        rounded-3xl
        p-10
        text-center
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition
        duration-300
        "
      >

        <div className="text-6xl mb-5">
          🤝
        </div>

        <h3 className="text-4xl font-bold text-green-500 mb-3">
          50+
        </h3>

        <p className="text-gray-600 text-lg">
          NGO Partners
        </p>

      </div>

      {/* Stat 3 */}
      <div
        className="
        bg-blue-50
        rounded-3xl
        p-10
        text-center
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition
        duration-300
        "
      >

        <div className="text-6xl mb-5">
          🌍
        </div>

        <h3 className="text-4xl font-bold text-blue-500 mb-3">
          25+
        </h3>

        <p className="text-gray-600 text-lg">
          Cities Reached
        </p>

      </div>

      {/* Stat 4 */}
      <div
        className="
        bg-yellow-50
        rounded-3xl
        p-10
        text-center
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition
        duration-300
        "
      >

        <div className="text-6xl mb-5">
          ❤️
        </div>

        <h3 className="text-4xl font-bold text-red-500 mb-3">
          1000+
        </h3>

        <p className="text-gray-600 text-lg">
          Volunteers
        </p>

      </div>

    </div>

  </div>

</section>


    )
}
export default Impact;