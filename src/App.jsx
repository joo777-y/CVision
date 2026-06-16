import { MOCK_STATS, MOCK_JOBS, MOCK_APPLICATIONS } from "./data/mockData";
import DashboardPage from "./pages/DashboardPage.jsx";
import CreateJobPage from "./pages/CreateJobPage.jsx";
import CandidatesPage from "./pages/CandidatesPage.jsx";
import { Routes, Route } from "react-router-dom";
import { useApp } from "./context/AppContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import JobBoard from "./pages/applyForJobPage.jsx";
import LoginPage from "./pages/Loginpage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import ApplyPage from "./pages/jobApplication.jsx";
import ScrollToTop from "./components/ui/scrollToTop.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Page from "./pages/Page.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/NewPassword.jsx";
import VerifyResetCode from "./pages/VerifyResetCode.jsx";
import NewPassword from "./pages/NewPassword.jsx";

// ─── API CONFIG ────────────────────────────────────────────────────────────────
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000/api";
const WS_URL = import.meta.env?.VITE_WS_URL || "ws://localhost:5000/ws";

// ─── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {

  const stats = MOCK_STATS;
  const jobs  = MOCK_JOBS;
  const apps  = MOCK_APPLICATIONS;

  const { logout } = useApp();
  

  return (
    <div className="flex min-h-screen bg-[#edf2f7] font-sans">

      <div className="flex w-full ">
        <main className="flex-1 overflow-y-auto min-w-0">
          <ScrollToTop/>
          <Routes>
            <Route path="*" element={<p className="text-center mt-72">
              Ooops, Page Not Found <br/>Error 404 <br/><b>Something Went Wrong !</b>
            </p>} />
          <Route path="/" element={<HomePage />}/>
          <Route path="/apply-for-job" element={<JobBoard />}/>
          <Route path="/login-page" element={<LoginPage />}/>
          <Route path="/sign-up-page" element={<SignUpPage />}/>
          <Route path="/job-application" element={<ApplyPage />}/>
          <Route path="/verify-otp" element={<Page />} />
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/reset-password" element={<ResetPassword />}/>
          <Route path="/verify-code" element={<VerifyResetCode />}/>
          <Route path="/reset-password" element={<NewPassword />}/>


          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout onLogout={logout} />
              </ProtectedRoute>
            }>
          <Route
            path="/dashboard"
            element={
              <DashboardPage
                stats={stats}
                jobs={jobs}
                applications={apps}
              />
            }
          />

          <Route
            path="/create-job"
            element={<CreateJobPage />}
          />

          <Route
            path="/candidates"
            element={<CandidatesPage />}
          />
        </Route>

        </Routes>
        </main>
      </div>
    </div>
  );
}