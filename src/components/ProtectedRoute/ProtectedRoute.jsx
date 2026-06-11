// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {

//   const token = localStorage.getItem("accessToken");

//   const storedUser = localStorage.getItem("user");

//   const user = storedUser ? JSON.parse(storedUser) : null;
  

//   if (!token) {
//     return <Navigate to="/login-page" replace />;
//   }

//   // HR مش متوافق عليه
//   if (user?.role === "hr" && !user?.isApproved) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//         <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
//           <h2 className="text-2xl font-bold text-red-500 mb-3">
//             Account Under Review
//           </h2>

//           <p className="text-gray-600">
//             Your HR account is waiting for admin approval.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return children;
// }
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("accessToken");

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

    useEffect(() => {
      const checkProfile = async () => {
        try {
          const data = await apiGet("/auth/profile");

          localStorage.setItem(
            "user",
            JSON.stringify(data.data.user)
          );

          setUser(data.data.user);
        } catch (err) {
          console.log(err);
        }
      };

      if (token) {
        checkProfile();

        const interval = setInterval(checkProfile, 5000);

        return () => clearInterval(interval);
      }
    }, [token]);

  if (!token) {
    return <Navigate to="/login-page" replace />;
  }

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