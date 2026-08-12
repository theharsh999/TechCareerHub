import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  UserRound,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const menu = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Opportunities", icon: BriefcaseBusiness },
    { label: "Applications", icon: FileText },
    { label: "Profile", icon: UserRound },
    { label: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex w-64 min-h-[calc(100vh-4rem)] border-r border-slate-800 bg-[#0B0F19] p-4 flex-col">
      <nav className="space-y-1">
        {menu.map(({ label, icon: Icon }, index) => (
          <button
            key={label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
              index === 0
                ? "bg-indigo-500/10 text-indigo-400"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Icon size={19} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;