import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;