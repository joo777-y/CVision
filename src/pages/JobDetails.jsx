import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

      <p className="text-sm text-gray-600 whitespace-pre-line">
        {children || "Not provided"}
      </p>
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
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        Job not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-br from-teal-500 to-indigo-600 py-10">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-white text-2xl font-bold">{job.title}</h1>

          <p className="text-blue-100 mt-2">{job.department || "Company"}</p>

          <div className="flex gap-5 mt-4 text-sm text-white">
            <span>📍 {job.location}</span>

            <span>💼 {job.jobType}</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-sm text-gray-400">Posted recently</p>
            </div>

            <button
              onClick={() =>
                navigate("/job-application", {
                  state: { job },
                })
              }
              className="bg-gradient-to-br from-teal-500 to-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90"
            >
              Apply Now
            </button>
          </div>

          <Section title="Job Description">{job.description}</Section>

          <Section title="Requirements">{job.requirements}</Section>

          <Section title="Responsibilities">{job.responsibilities}</Section>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <h3 className="font-semibold text-gray-800">Experience</h3>

              <p className="text-sm text-gray-600">
                {job.experience || 0} years
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800">Salary</h3>

              <p className="text-sm text-gray-600">
                {job.salaryRange?.min || "-"}-{job.salaryRange?.max || "-"}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
