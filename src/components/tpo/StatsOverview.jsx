// src/components/tpo/StatsOverview.jsx

import { Users, FileText, GraduationCap, Building2 } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsOverview({ stats }) {
  if (!stats) return null;

  const cards = [
    {
      icon: Users,
      label: "Total Students",
      value: stats.totalStudents,
      hint: "Registered on platform",
    },
    {
      icon: FileText,
      label: "Active Applications",
      value: stats.activeApplications,
      hint: "Across all drives",
    },
    {
      icon: GraduationCap,
      label: "Students Placed",
      value: stats.studentsPlaced,
      hint: `${stats.placementRate}% placement rate`,
      trend: "up",
      trendValue: `${stats.placementRate}% placed`,
    },
    {
      icon: Building2,
      label: "Active Drives",
      value: stats.activeDrives,
      hint: `Avg. package ${stats.avgPackage}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}
