import { useNavigate } from "react-router-dom";

function DonationList({
  // donations,
  donations= [],
  handleDelete,
  handleAccept,
}) {

  const navigate = useNavigate();
 

  
  const role = localStorage.getItem("role");

  return (

    <div className="bg-gray-100 min-h-screen p-5">

      {/* ================= HEADING ================= */}

      <h1 className="text-3xl font-bold mb-6 text-orange-600">
        Donation List
      </h1>

      {/* ================= EMPTY STATE ================= */}

      {donations.length === 0 ? (

        <div className="text-center mt-20">

          <h2 className="text-2xl text-gray-500 font-semibold">
            No Donations Found 😢
          </h2>

          <p className="text-gray-400 mt-2">
            Add some food donations to help people
          </p>

        </div>

      ) : (

        donations.map((item) => (

          <div
            key={item.id}
            className="
              bg-white
              rounded-lg
              shadow-md
              p-5
              mb-5
              hover:shadow-xl
              transition
            "
          >

            {/* ================= FOOD NAME ================= */}

            <h2 className="text-2xl font-bold text-gray-800">
              {item.foodName}
            </h2>

            {/* ================= DONATION DETAILS ================= */}

            <div className="mt-3 space-y-1 text-gray-700">

              <p>
                <span className="font-semibold">
                  Quantity:
                </span>{" "}
                {item.quantity}
              </p>

              <p>
                <span className="font-semibold">
                  Expiry:
                </span>{" "}
                {item.expiry}
              </p>

              <p>
                <span className="font-semibold">
                  Location:
                </span>{" "}
                {item.location}
              </p>

            </div>

            {/* ================= STATUS ================= */}

            <div className="mt-3">

              <p
                className={`font-semibold ${
                  item.status === "Available"
                    ? "text-green-600"
                    : item.status === "Requested"
                    ? "text-yellow-600"
                    : item.status === "Accepted"
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                Status : {item.status}
              </p>

            </div>

            {/* ================= BUTTONS ================= */}

            <div className="flex gap-3 mt-5 flex-wrap">

              {/* ================= EDIT BUTTON ================= */}
              {/* ONLY donor CAN EDIT */}

              {role === "donor" && (

                <button
                  onClick={() =>
                    navigate(
                      `/dashboard/add-donation/${item.id}`
                    )
                  }
                  className="
                    bg-green-500
                    hover:bg-green-600
                    text-white
                    px-4
                    py-2
                    rounded
                  "
                >
                  Edit
                </button>

              )}

              {/* ================= DELETE BUTTON ================= */}
              {/* ADMIN + donor */}

              {(role === "admin" || role === "donor") && (

                <button
                  onClick={() => handleDelete(item.id)}
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded
                  "
                >
                  Delete
                </button>

              )}

              {/* ================= ACCEPT BUTTON ================= */}
              {/* NGO + ADMIN */}

              {(role === "ngo" || role === "admin") && (

                <button
                  onClick={() =>
                    handleAccept(item.id, item.status)
                  }
                  disabled={item.status === "Accepted"}
                  className={`px-4 py-2 rounded text-white ${
                    item.status === "Accepted"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >

                  {item.status === "Available"
                    ? "Accept"
                    : item.status === "Requested"
                    ? "Requested"
                    : "Accepted"}

                </button>

              )}

            </div>

          </div>

        ))

      )}

    </div>

  );

}

export default DonationList;