import { Calendar, CheckCircle2, Building2, MapPin } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";

export default function DriveInviteCard({ drive }) {
  return (
    <Card className="bg-bg-card border border-primary/30 p-5 rounded-2xl relative overflow-hidden bg-gradient-to-r from-primary/5 via-transparent to-transparent">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <Building2 size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-semibold text-text-main">
                {drive?.title || "Zensoft SDE Campus Drive"}
              </h4>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <CheckCircle2 size={10} /> TPO Approved
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
              <MapPin size={12} /> Pune (Hybrid) • ₹35,000/mo
            </p>
          </div>
        </div>

        <Button variant="primary" className="text-xs px-4 py-2">
          Confirm Drive Slot
        </Button>
      </div>

      <div className="mt-4 pt-3 border-t border-border-subtle grid grid-cols-2 gap-4 text-xs">
        <div className="flex items-center gap-2 text-text-muted">
          <Calendar size={14} className="text-primary" />
          <span>PPT Slot: <strong className="text-text-main">10th Sept, 10:00 AM</strong></span>
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <Calendar size={14} className="text-primary" />
          <span>OA Window: <strong className="text-text-main">11th Sept, 02:00 PM</strong></span>
        </div>
      </div>
    </Card>
  );
}