import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    //  remove ALL auth data
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // optional cleanup
    sessionStorage.clear();

    //  important: replace prevents back issue
    navigate("/login", { replace: true });
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Profile Page
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">

        <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>

        <h2 className="text-xl font-semibold">
          {user?.name}
        </h2>

        <p className="text-gray-500">
          {user?.email}
        </p>

        <p className="mt-2 text-sm text-green-600">
          Role: {user?.role}
        </p>

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;