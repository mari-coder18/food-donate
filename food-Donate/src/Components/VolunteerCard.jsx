function VolunteerCard({ volunteer, deleteVolunteer }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border hover:border-red-500">

      <h1 className="text-2xl font-bold">
        {volunteer?.name || "N/A"}
      </h1>

      <p className="mt-2 text-gray-600">✉️ {volunteer?.email || "N/A"}</p>

      <button
        onClick={() => deleteVolunteer(volunteer?.id)}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Delete
      </button>

    </div>
  );
}

export default VolunteerCard;