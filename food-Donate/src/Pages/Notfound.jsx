import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="mt-4 text-green-600 hover:underline">Go Home</Link>
    </div>
  );
}
export default NotFound;