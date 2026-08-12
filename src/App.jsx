import DashboardLayout from "./components/layout/DashboardLayout";
import Card from "./components/common/Card";
import Badge from "./components/common/Badge";

function App() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Good evening, Harsh 👋</h1>
          <p className="text-slate-400 mt-2">
            Find opportunities that match your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Card>
            <p className="text-slate-400 text-sm">Recommended</p>
            <p className="text-3xl font-bold mt-2">24</p>
          </Card>

          <Card>
            <p className="text-slate-400 text-sm">Applications</p>
            <p className="text-3xl font-bold mt-2">8</p>
          </Card>

          <Card>
            <p className="text-slate-400 text-sm">Profile Match</p>
            <p className="text-3xl font-bold mt-2">87%</p>
            <Badge variant="success">Strong Profile</Badge>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default App;