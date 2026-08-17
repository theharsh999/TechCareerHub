// src/components/company/CompanyProfileCard.jsx

import { Building2, MapPin, Globe, Users, Briefcase, CheckCircle2 } from "lucide-react";
import Card from "../common/Card";

export default function CompanyProfileCard({ profile }) {
  if (!profile) return null;

  const stats = [
    { icon: Briefcase, label: "Active opportunities", value: profile.activeOpportunities },
    { icon: Users, label: "Total applicants", value: profile.totalApplicants },
    { icon: CheckCircle2, label: "Hired this season", value: profile.hiredThisSeason },
  ];

  return (
    <Card className="p-5">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
          {profile.logoInitials}
        </div>
        <div className="min-w-0">
          <h2 className="text-text-main font-semibold">{profile.name}</h2>
          <p className="text-sm text-text-muted">{profile.industry}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-text-main0">
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {profile.location}
            </span>
            <span className="flex items-center gap-1">
              <Globe size={12} /> {profile.website.replace("https://", "")}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-text-muted mt-4 leading-relaxed">{profile.about}</p>

      <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border-subtle">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-text-main0 text-xs">
              <s.icon size={12} />
              {s.label}
            </div>
            <span className="text-lg font-semibold text-text-main">{s.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
