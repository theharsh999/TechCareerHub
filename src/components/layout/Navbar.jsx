import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 border-b border-slate-800 bg-[#0B0F19]/95 backdrop-blur flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-indigo-500 flex items-center justify-center font-bold">
          T
        </div>
        <span className="text-lg font-bold">TechCareerHub</span>
      </div>

      <div className="hidden md:flex items-center gap-2 w-80 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
        <Search size={18} className="text-slate-500" />
        <input
          placeholder="Search opportunities..."
          className="w-full bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-white">
          <Bell size={20} />
        </button>

        <div className="h-9 w-9 rounded-full bg-indigo-500 flex items-center justify-center font-semibold">
          H
        </div>
      </div>
    </header>
  );
};

export default Navbar;