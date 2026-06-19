import { useState, useEffect } from "react";
import { BagIcon, PlusIcon, TrendIcon, UsersIcon } from "../components/ui/Icons";
import JobRow from "../components/jobs/JobRow";
import AppRow from "../components/applications/AppRow";
import StatCard from "../components/ui/StatCard";
import { Navigate, useNavigate } from "react-router-dom";
import { apiDelete, apiGet } from "../services/api";
import toast from "react-hot-toast";

// ─── DASHBOARD PAGE ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [tab, setTab] = useState("Active");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const jobsData = dashboardData?.jobs || [];
  const filtered =
  tab === "All"
    ? jobsData
    : jobsData.filter((j) => j.status === tab.toLowerCase());


      useEffect(() => {
      const fetchDashboard = async () => {
        try {
          const res = await apiGet("/dashboard/stats");

          console.log("DASHBOARD DATA:", res);

          setDashboardData(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchDashboard();
    }, []);

    const handleDeleteJob = async (jobId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) return;

  try {
    await apiDelete(`/jobs/${jobId}`);

    setDashboardData((prev) => ({
      ...prev,
      jobs: prev.jobs.filter((job) => job.id !== jobId),
    }));

    toast.success("Job deleted successfully");

  } catch (err) {
    console.error(err);
    toast.error("Failed to delete job");
  }
};

    if (loading) {
      return <p className="p-6">Loading dashboard...</p>;
    }

  return (
    <div>
      <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <button
          onClick={() => navigate('/create-job')}
          className="flex items-center gap-2 bg-gradient-to-br from-teal-500 to-indigo-600 hover:opacity-90 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          <PlusIcon /> Create Job
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
  <StatCard
    label="Active Jobs"
    value={dashboardData?.totalActiveJobs || 0}
    Icon={BagIcon}
    bg="bg-blue-500"
  />

  <StatCard
    label="Total Applications"
    value={dashboardData?.totalApplications || 0}
    Icon={UsersIcon}
    bg="bg-purple-500"
  />

  <StatCard
    label="New Applications"
    value={dashboardData?.newApplications || 0}
    Icon={TrendIcon}
    bg="bg-green-500"
  />
</div>

      <div className="bg-white rounded-2xl border border-gray-100 px-4 sm:px-6 py-5 mb-5">
        <h3 className="text-base font-bold text-gray-800 mb-0.5">Jobs</h3>
        <p className="text-xs text-gray-400 mb-4">
          All job postings including title, department, location and status.
        </p>
        <div className="flex gap-6 border-b border-gray-100 mb-1 overflow-x-auto">
          {["Active", "Draft", "All"].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`cursor-pointer pb-2.5 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
                tab === t ? "text-blue-600 border-blue-600" : "text-gray-400 border-transparent hover:text-gray-600 "
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {filtered.map(job => (
          <JobRow
            key={job.id} job={job}
            onViewApplicants={(j) => navigate(`/candidates`)}
            onDelete={handleDeleteJob}
          />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 px-4 sm:px-6 py-5">
        <h3 className="text-base font-bold text-gray-800 mb-0.5">Recent Applications</h3>
        {console.log(dashboardData?.recentApplications)}
        <p className="text-xs text-gray-400 mb-4">
          Recent job applications with candidate information and CV scores.
        </p>
        {dashboardData?.recentApplications?.map((app) => (
          <AppRow key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
