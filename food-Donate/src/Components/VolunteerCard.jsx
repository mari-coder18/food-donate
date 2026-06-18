function VolunteerCard({ volunteer, deleteVolunteer }) {
  
  
  const volunteerId = volunteer?.id || volunteer?._id;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:border-red-500 hover:shadow-xl transition duration-300 flex flex-col justify-between">
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 break-words">
          {volunteer?.name || "N/A"}
        </h2>
        <p className="mt-2 text-gray-600 break-all">
          ✉️ {volunteer?.email || "N/A"}
        </p>
      </div>

      <button
        onClick={() => volunteerId && deleteVolunteer(volunteerId)} 
        disabled={!volunteerId}
        className={`mt-5 font-medium px-4 py-2 rounded-lg w-full transition ${
          volunteerId 
            ? "bg-red-500 hover:bg-red-600 text-white cursor-pointer" 
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Delete Volunteer
      </button>

    </div>
  );
}

export default VolunteerCard;