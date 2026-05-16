import { useNavigate } from "react-router-dom";

// ─── ICONS ─────────────────────────────────────────────────────────────────────
const Ico = ({ size = 20, children, cls = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
    className={cls} style={{ flexShrink: 0 }}>
    {children}
  </svg>
);

const BagIcon      = ({ s = 20 }) => <Ico size={s}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></Ico>;
const UsersIcon    = ({ s = 20 }) => <Ico size={s}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></Ico>;
const StarIcon     = ({ s = 20 }) => <Ico size={s}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Ico>;
const ChartIcon    = ({ s = 20 }) => <Ico size={s}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></Ico>;
const ShieldIcon   = ({ s = 20 }) => <Ico size={s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Ico>;
const UploadIcon   = ({ s = 20 }) => <Ico size={s}><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></Ico>;
const CheckIcon    = ({ s = 20 }) => <Ico size={s}><polyline points="20 6 9 17 4 12"/></Ico>;
const ArrowRight   = ({ s = 16 }) => <Ico size={s}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></Ico>;
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwitterIcon  = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

// ─── NAV ───────────────────────────────────────────────────────────────────────
function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-indigo-100">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight text-indigo-950">CVision</span>
        <div className="flex items-center gap-3">
          <a href="#how" className="hidden sm:block text-sm text-slate-500 hover:text-indigo-700 transition-colors px-3 py-1.5 cursor-pointer">
            How it works
          </a>
          <a href="#features" className="hidden sm:block text-sm text-slate-500 hover:text-indigo-700 transition-colors px-3 py-1.5 cursor-pointer">
            Features
          </a>
          {!token ? (
  <button
    onClick={() => navigate('/login-page')}
    className="text-sm font-semibold text-slate-700 border border-slate-200 px-5 py-2 rounded-2xl hover:bg-slate-50 hover:border-indigo-300 transition-all duration-200 cursor-pointer"
  >
    Sign In
  </button>
) : (
  <div className="flex items-center gap-2">
    <button
      onClick={() => navigate('/dashboard')}
      className="text-sm font-semibold text-white bg-indigo-600 px-5 py-2 rounded-2xl hover:bg-indigo-700 transition-all duration-200 cursor-pointer"
    >
      Dashboard
    </button>

    <button
      onClick={() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        navigate("/");
      }}
      className="text-sm font-semibold text-red-500 border border-red-200 px-4 py-2 rounded-2xl hover:bg-red-50 transition-all duration-200 cursor-pointer"
    >
      Logout
        </button>
      </div>
    )}
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  return (
    <section className="pt-28 pb-24 px-5 bg-gradient-to-br from-indigo-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block bg-gradient-to-r from-teal-500 to-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase shadow-sm">
            We are Hiring
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 leading-tight mb-6 tracking-tighter">
            Smarter Hiring<br />Starts Here
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
            Streamline your recruitment process with AI-powered candidate scoring, automated CV ranking, and an all-in-one dashboard to help you find the perfect hire.
          </p>
          <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
            <button
              onClick={() => navigate('/apply-for-job')}
              className="bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white font-semibold px-8 py-3.5 rounded-2xl text-base transition-all duration-300 flex items-center gap-3 shadow-lg shadow-indigo-200 cursor-pointer"
            >
              Apply for Jobs <ArrowRight s={18} />
            </button>
            {!token ? (
              <button
                onClick={() => navigate('/login-page')}
                className="border-2 border-slate-300 text-slate-700 font-semibold px-8 py-3.5 rounded-2xl text-base hover:bg-white hover:border-indigo-400 transition-all duration-300 cursor-pointer"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => navigate('/dashboard')}
                className="border-2 border-indigo-300 text-indigo-700 font-semibold px-8 py-3.5 rounded-2xl text-base hover:bg-white hover:border-indigo-500 transition-all duration-300 cursor-pointer"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-br from-indigo-100 to-teal-100 rounded-3xl flex items-center justify-center border border-white shadow-xl">
            <div className="text-indigo-500 drop-shadow-sm">
              <BagIcon s={130} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { Icon: BagIcon,   title: "HR Creates a Job",    desc: "HR posts a new opening with requirements, responsibilities and salary range." },
    { Icon: UsersIcon, title: "Candidates Apply",    desc: "Job seekers browse listings and submit their applications with CVs." },
    { Icon: StarIcon,  title: "Automatic Scoring",   desc: "Our AI engine scores and ranks every CV against the job criteria instantly." },
  ];
  return (
    <section id="how" className="py-20 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">How it works</h2>
          <p className="text-slate-500">Three simple steps to find your perfect hire.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map(({ Icon, title, desc }, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4 group">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-50 to-teal-50 flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                <Icon s={32} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">{title}</h3>
              <p className="text-slate-500 text-[15px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── KEY FEATURES ──────────────────────────────────────────────────────────────
function KeyFeatures() {
  const features = [
    { Icon: StarIcon,   title: "Automated CV Scoring",       desc: "AI ranks candidates by skill match, experience, and education fit in seconds." },
    { Icon: ChartIcon,  title: "HR Dashboard Insights",      desc: "Real-time stats on active jobs, applicants, and pipeline stages at a glance." },
    { Icon: UsersIcon,  title: "Candidate Profiles & Tracking", desc: "Full candidate profiles with status tracking from new to hired." },
    { Icon: UploadIcon, title: "Easy & Secure Upload",        desc: "Candidates upload CVs securely. Supports PDF and Word formats." },
  ];
  return (
    <section id="features" className="py-20 px-5 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Key Features</h2>
          <p className="text-slate-500">Everything you need to hire smarter and faster.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map(({ Icon, title, desc }, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 px-7 py-8 flex gap-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                <Icon s={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
                <p className="text-slate-500 text-[15px] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY CHOOSE US ─────────────────────────────────────────────────────────────
function WhyChooseUs() {
  const points = [
    { title: "Reduce Hiring Time",    desc: "Cut your average time-to-hire by up to 60% with automated screening and instant CV scoring." },
    { title: "Objective Scoring",     desc: "Remove unconscious bias with data-driven candidate rankings based purely on qualifications." },
    { title: "Organized Pipeline",    desc: "Track every candidate from application to offer in one clean, intuitive dashboard." },
    { title: "Better Quality Hires",  desc: "AI-matched candidates mean better cultural and skill fit, reducing early turnover." },
  ];
  return (
    <section className="py-20 px-5 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Left */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Why Choose Our Platform?</h2>
          <div className="space-y-8">
            {points.map(({ title, desc }, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 flex items-center justify-center shrink-0 mt-1 text-white text-">
                  <CheckIcon s={16} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-800 mb-1.5">{title}</p>
                  <p className="text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — stat card */}
        <div className="flex-1 flex justify-center">
          <div className="bg-gradient-to-br from-indigo-600 to-teal-600 rounded-3xl px-12 py-14 text-center text-white w-full max-w-xs shadow-2xl">
            <p className="text-7xl font-bold mb-3">60%</p>
            <p className="text-lg font-medium opacity-95">
              Faster hiring<br />
              <span className="text-sm opacity-75 font-normal">Average time saved by our users</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TRUSTED BY ────────────────────────────────────────────────────────────────
function TrustedBy() {
  const companies = [
    { name: "HR Company",      Icon: ShieldIcon },
    { name: "Finance Corp",    Icon: ChartIcon  },
    { name: "Tech Company",    Icon: BagIcon    },
  ];
  return (
    <section className="py-20 px-5 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Trusted by HR Teams</h2>
        <p className="text-slate-500 mb-12">Hundreds of companies already streamlined their hiring with TalentHub.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {companies.map(({ name, Icon }, i) => (
            <div key={i} className="bg-white rounded-3xl border border-slate-100 px-8 py-10 flex flex-col items-center gap-4 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                <Icon s={28} />
              </div>
              <p className="text-lg font-semibold text-slate-700">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-10 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <p className="text-white font-bold text-2xl mb-4 tracking-tight">CVision</p>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Smarter hiring starts here. AI-powered recruitment for modern HR teams.
            </p>
            <div className="flex gap-3">
              {[LinkedInIcon, TwitterIcon, FacebookIcon].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-2xl bg-slate-900 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-white text-sm font-semibold mb-5">Product</p>
            <ul className="space-y-2.5 text-sm">
              {["Features", "How it Works", "Pricing", "Changelog"].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-white text-sm font-semibold mb-5">Company</p>
            <ul className="space-y-2.5 text-sm">
              {["About", "Blog", "Careers", "Contact"].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-white text-sm font-semibold mb-5">Legal</p>
            <ul className="space-y-2.5 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} CVision. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <Hero />
      <HowItWorks />
      <KeyFeatures />
      <WhyChooseUs />
      <TrustedBy />
      <Footer />
    </div>
  );
}