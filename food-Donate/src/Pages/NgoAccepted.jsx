import { useEffect, useState } from "react";
import { getDonations } from "../api/donationApi";

function NgoAccepted() {
  const [acceptedDonations, setAcceptedDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAcceptedDonations();
  }, []);

  const fetchAcceptedDonations = async () => {
    try {
      const res = await getDonations();

      const accepted = res.data.filter(
        (item) => item.status === "Accepted"
      );

      setAcceptedDonations(accepted);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Accepted Donations
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : acceptedDonations.length === 0 ? (
        <p>No Accepted Donations Found</p>
      ) : (
        acceptedDonations.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg p-5 mb-5"
          >
            <h2 className="text-2xl font-bold">
              {item.foodName}
            </h2>

            <p>Quantity: {item.quantity}</p>
            <p>Expiry: {item.expiry}</p>
            <p>Location: {item.location}</p>

            <p className="mt-2 font-semibold text-green-600">
              Status: {item.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default NgoAccepted;