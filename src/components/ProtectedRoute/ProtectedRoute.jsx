import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const token = localStorage.getItem("accessToken");

  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!token) {
    return <Navigate to="/login-page" replace />;
  }

  // HR مش متوافق عليه
  if (user?.role === "hr" && !user?.isApproved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-3">
            Account Under Review
          </h2>

          <p className="text-gray-600">
            Your HR account is waiting for admin approval.
          </p>
        </div>
      </div>
    );
  }

  return children;
}