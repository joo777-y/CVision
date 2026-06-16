import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";

function InfoCard({ title, value, icon }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center gap-3 text-teal-600 mb-3">
        <span className="text-3xl">{icon}</span>
        <h4 className="font-medium text-gray-700">{title}</h4>
      </div>
      <p className="text-xl font-semibold text-gray-800">{value || "Not specified"}</p>
    </div>
  );
}

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await apiGet(`/jobs/${id}`);
        setJob(res.data.job);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-teal-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500">
        Job not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Elegant Header */}
      <header className="bg-gradient-to-br from-teal-600 via-indigo-600 to-indigo-700 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              {job.title}
            </h1>
            
            <p className="text-indigo-100 text-xl mb-6">
              {job.department || "Company"}
            </p>

            <div className="flex flex-wrap gap-6 text-indigo-100 text-lg">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>💼</span>
                <span>{job.jobType}</span>
              </div>
              {job.experience && (
                <div className="flex items-center gap-2">
                  <span>🧠</span>
                  <span>{job.experience} years experience</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 -mt-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
              
              {/* Apply Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => navigate("/job-application", { state: { job } })}
                  className="bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-600 hover:to-indigo-700 text-white px-8 py-3.5 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-lg"
                >
                  Apply Now
                  <span>→</span>
                </button>
              </div>

              <Section title="Job Description" content={job.description} />
              <Section title="Requirements" content={job.requirements} />
              <Section title="Responsibilities" content={job.responsibilities} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Job Information</h3>
              
              <div className="space-y-6">
                <InfoCard 
                  title="Salary Range" 
                  value={`${job.salaryRange?.min || "-"} - ${job.salaryRange?.max || "-"}`}
                  icon="💰" 
                />
                
                <InfoCard 
                  title="Job Type" 
                  value={job.jobType}
                  icon="📋" 
                />
                
                <InfoCard 
                  title="Location" 
                  value={job.location}
                  icon="📍" 
                />

                <InfoCard 
                  title="Experience Required" 
                  value={`${job.experience || 0} years`}
                  icon="⭐" 
                />
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 text-sm text-gray-600 text-center">
              Posted recently
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable Section Component
function Section({ title, content }) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-3">
        {title}
      </h3>
      <div className="text-[15.5px] leading-relaxed text-gray-600 whitespace-pre-line">
        {content || "Not provided"}
      </div>
    </div>
  );
}