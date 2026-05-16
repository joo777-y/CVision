import { BagIcon, CloseIcon, HomeIcon, LogoutIcon, UsersIcon } from "../ui/Icons";
import { useNavigate, useLocation } from "react-router-dom";

// ─── SIDEBAR ───────────────────────────────────────────────────────────────────
export default function Sidebar({onLogout, open, onClose,  user }) {
  const nav = [
  { path: "/dashboard", label: "Dashboard", Icon: HomeIcon },
  { path: "/create-job", label: "Create Job", Icon: BagIcon },
  { path: "/candidates", label: "Candidates", Icon: UsersIcon },
];
  const navigate = useNavigate();
  const location = useLocation();

  const displayName =
    user?.companyName ||
    user?.fullName ||
    "HR Manager";

  const content = (
    <aside className="w-48 h-full bg-[#2d3748] flex flex-col py-6 px-4">
      <p className="text-white font-bold text-base mb-7 px-1">TalentHub</p>

      <div className="flex items-center gap-2.5 mb-7 px-1">
        <div className="w-9 h-9 rounded-full bg-slate-500 flex items-center justify-center text-white text-sm font-bold shrink-0 border-2 border-slate-400">
          <span>
            {user?.firstName?.charAt(0)?.toUpperCase() || "H"}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold leading-tight truncate">{user?.companyName || user?.firstName || "HR Manager"}</p>
          <button
            onClick={onLogout}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 transition-colors mt-0.5 cursor-pointer"
          >
            <LogoutIcon /> logout
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5">
        {nav.map(({path, label, Icon }) => (
          <button 
            key={path}
            onClick={() =>{ navigate(path)
              onClose?.()
            }}
            
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm cursor-pointer font-medium text-left transition-all
              ${location.pathname === path
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-slate-700 hover:text-white"}`}
          >
            <Icon s={15} />{label}
          </button>
        ))}
      </nav>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex shrink-0 min-h-screen">
        {content}
      </div>

      {/* Mobile overlay */}
      <div
  className={`md:hidden fixed inset-0 z-50 flex transition-all duration-300 ${
    open ? "pointer-events-auto" : "pointer-events-none"
  }`}
>
  {/* Overlay */}
  <div
    onClick={onClose}
    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
      open ? "opacity-100" : "opacity-0"
    }`}
  />

      {/* Sidebar */}
      <div
        className={`relative z-10 h-full transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {content}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className={`absolute top-3 right-3 text-white z-20 transition-opacity duration-300 cursor-pointer bg-red-500 rounded-sm ${
          open ? "opacity-100" : "opacity-0"
        }`}
      >
        <CloseIcon />
      </button>
    </div>
        </>
  );
}