// ─── MOCK DATA ─────────────────────────────────────────────────────────────────

export const MOCK_STATS = { activeJobs: 12, totalApplicants: 28, newApplications: 5 };

export const MOCK_JOBS = [
  { id: 1, title: "Senior Frontend Developer", department: "Engineering", location: "Remote",   status: "Active", applicants: 20 },
  { id: 2, title: "Product Manager",           department: "Product",     location: "Cairo",    status: "Active", applicants: 12 },
  { id: 3, title: "UI/UX Designer",            department: "Design",      location: "Beni Suf", status: "Active", applicants: 14 },
  { id: 4, title: "Backend Engineer",          department: "Engineering", location: "Cairo",    status: "Draft",  applicants: 0  },
  { id: 5, title: "Data Analyst",              department: "Analytics",   location: "Remote",   status: "Draft",  applicants: 0  },
];

export const MOCK_APPLICATIONS = [
  {
    id: 1, name: "Ahmed Samir",   job: "Senior Frontend Developer", status: "new",
    cvScore: 85, appliedOn: "2025-10-20", experience: "5 years",
    avatar: null,
    skills: ["React", "TypeScript", "CSS", "Next.js"],
  },
  {
    id: 2, name: "Mostafa Hosny", job: "Senior Frontend Developer", status: "shortlisted",
    cvScore: 85, appliedOn: "2025-10-20", experience: "5 years",
    avatar: null,
    skills: ["React", "TypeScript", "CSS", "Next.js"],
  },
  {
    id: 3, name: "Yasmeen Ali",   job: "UI/UX Designer",            status: "new",
    cvScore: 79, appliedOn: "2025-10-20", experience: "5 years",
    avatar: null,
    skills: ["React", "TypeScript", "CSS", "Next.js"],
  },
  {
    id: 4, name: "Omar Hassan",   job: "Backend Engineer",          status: "rejected",
    cvScore: 91, appliedOn: "2025-10-19", experience: "5 years",
    avatar: null,
    skills: ["React", "TypeScript", "CSS", "Next.js"],
  },
  {
    id: 5, name: "Sara Mahmoud",  job: "Product Manager",           status: "new",
    cvScore: 74, appliedOn: "2025-10-18", experience: "5 years",
    avatar: null,
    skills: ["React", "TypeScript", "CSS", "Next.js"],
  },
];