function Test(){
    return(
        


<section className="bg-gray-50 py-24 px-6">

  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-16">

      <h2 className="text-4xl font-bold text-gray-800">
        What People Say
      </h2>

      <p className="text-gray-500 mt-4 text-lg">
        Communities and NGOs sharing their experience
      </p>

    </div>

    {/* Testimonials Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* Testimonial 1 */}
      <div
        className="
        bg-white
        p-10
        rounded-3xl
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition
        duration-300
        "
      >

        {/* User Image */}
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          className="
          w-20
          h-20
          rounded-full
          object-cover
          mb-6
          "
        />

        <p className="text-gray-600 leading-7 mb-6">
          “This platform helped us distribute meals quickly
          during difficult times. Very useful initiative.”
        </p>

        <h3 className="text-xl font-bold text-gray-800">
          Arjun Kumar
        </h3>

        <p className="text-green-500 font-medium">
          NGO Volunteer
        </p>

      </div>

      {/* Testimonial 2 */}
      <div
        className="
        bg-white
        p-10
        rounded-3xl
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition
        duration-300
        "
      >

        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="User"
          className="
          w-20
          h-20
          rounded-full
          object-cover
          mb-6
          "
        />

        <p className="text-gray-600 leading-7 mb-6">
          “Instead of wasting food after events,
          we now donate it easily through this platform.”
        </p>

        <h3 className="text-xl font-bold text-gray-800">
          Priya Sharma
        </h3>

        <p className="text-orange-500 font-medium">
          Food donor
        </p>

      </div>

      {/* Testimonial 3 */}
      <div
        className="
        bg-white
        p-10
        rounded-3xl
        shadow-lg
        hover:-translate-y-2
        hover:shadow-2xl
        transition
        duration-300
        "
      >

        <img
          src="https://randomuser.me/api/portraits/men/76.jpg"
          alt="User"
          className="
          w-20
          h-20
          rounded-full
          object-cover
          mb-6
          "
        />

        <p className="text-gray-600 leading-7 mb-6">
          “A wonderful platform connecting donors
          and communities in a simple way.”
        </p>

        <h3 className="text-xl font-bold text-gray-800">
          Rahul Verma
        </h3>

        <p className="text-blue-500 font-medium">
          Community Member
        </p>

      </div>

    </div>

  </div>

</section>


    )
}
export default Test;