import { useEffect, useState } from "react";
import { getPublicStats } from "../../api/donationApi";

function Impact() {
  const [stats, setStats] = useState({
    meals: 120, 
    ngos: 5,
    cities: 3,
    volunteers: 12
  });

  useEffect(() => {
    fetchLiveStats();
  }, []);

  const fetchLiveStats = async () => {
    try {
      const res = await getPublicStats(); 
      
      if (res.data && res.data.success) {
        setStats({
          meals: res.data.totalMeals || 120,
          ngos: res.data.totalNgos || 5,
          cities: res.data.totalCities || 3,
          volunteers: res.data.totalVolunteers || 12
        });
      }
    } catch (err) {
      console.log("Error fetching impact stats da, showing default counts:", err.message);
    }
  };

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">
            Our Impact
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            Together we are reducing food waste and helping communities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-orange-50 rounded-3xl p-10 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300 border border-orange-100/50">
            <div className="text-6xl mb-5 select-none">🍱</div>
            <h3 className="text-4xl font-bold text-orange-500 mb-3">
              {stats.meals}+
            </h3>
            <p className="text-gray-600 text-lg font-medium">Meals Shared</p>
          </div>

          <div className="bg-green-50 rounded-3xl p-10 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300 border border-green-100/50">
            <div className="text-6xl mb-5 select-none">🤝</div>
            <h3 className="text-4xl font-bold text-green-500 mb-3">
              {stats.ngos}+
            </h3>
            <p className="text-gray-600 text-lg font-medium">NGO Partners</p>
          </div>

          <div className="bg-blue-50 rounded-3xl p-10 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300 border border-blue-100/50">
            <div className="text-6xl mb-5 select-none">🌍</div>
            <h3 className="text-4xl font-bold text-blue-500 mb-3">
              {stats.cities}+
            </h3>
            <p className="text-gray-600 text-lg font-medium">Cities Reached</p>
          </div>

          <div className="bg-yellow-50 rounded-3xl p-10 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300 border border-yellow-100/50">
            <div className="text-6xl mb-5 select-none">❤️</div>
            <h3 className="text-4xl font-bold text-red-500 mb-3">
              {stats.volunteers}+
            </h3>
            <p className="text-gray-600 text-lg font-medium">Volunteers</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Impact;