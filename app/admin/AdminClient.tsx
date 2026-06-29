"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminClient() {
  const [adminKey, setAdminKey] = useState("");
  const [selectedTab, setSelectedTab] = useState<"apps" | "stats" | "logs">("stats");

  // Only call Convex queries AFTER adminKey provided (prevents build prerender issues with stubs)
  const hasKey = !!adminKey && adminKey.length > 4;

  const stats = useQuery(api.admin.getDashboardStats, hasKey ? { adminKey } : "skip");
  const apps = useQuery(api.admin.listAllApplicationsWithUsers, hasKey ? { adminKey } : "skip") || [];
  const logs = useQuery(api.admin.getAuditLogs, hasKey ? { adminKey } : "skip") || [];

  const updateStatus = useMutation(api.applications.updateApplicationStatus);
  const overrideScore = useMutation(api.applications.overrideQualificationScore);

  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});

  if (!adminKey) {
    return (
      <Card className="p-8 w-full max-w-sm bg-[#132A4A] border-[#C5A46E]/30 text-white">
        <div className="text-[#C5A46E] text-sm tracking-[2px]">THE GRACE NETWORK — ADMIN</div>
        <h1 className="text-2xl mt-2">Enter Admin Key</h1>
        <Input
          type="password"
          placeholder="ADMIN_DASHBOARD_KEY"
          className="mt-4 bg-black/30 border-white/20 text-white"
          onKeyDown={(e) => e.key === "Enter" && setAdminKey((e.target as HTMLInputElement).value)}
        />
        <p className="text-xs mt-3 text-white/60">Key only in this tab.</p>
      </Card>
    );
  }

  const handleStatusChange = async (appId: string, status: any) => {
    try {
      await updateStatus({ applicationId: appId as any, status, adminEmail: "admin@thegracenetwork.ai" });
      toast.success("Status updated");
    } catch (e: any) { toast.error(e.message); }
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {(["stats", "apps", "logs"] as const).map((t) => (
          <Button key={t} variant={selectedTab === t ? "default" : "outline"} onClick={() => setSelectedTab(t)} className="rounded-full capitalize">{t}</Button>
        ))}
        <Button variant="ghost" onClick={() => setAdminKey("")} className="ml-auto">Logout</Button>
      </div>

      {selectedTab === "stats" && stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["Total Users", stats.totalUsers],
            ["Workshop Attendees", stats.workshopAttendees],
            ["Accelerator Paid", stats.acceleratorPaid],
            ["Total Revenue (CAD)", `$${stats.totalRevenue}`],
          ].map(([label, val]) => (
            <Card key={String(label)} className="p-6 card-premium">
              <div className="text-xs uppercase tracking-widest">{label}</div>
              <div className="text-4xl font-semibold tracking-tighter mt-2">{val}</div>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "apps" && (
        <div className="space-y-3">
          {apps.length === 0 && <div>Enter valid admin key to load applications.</div>}
          {apps.map((app: any) => (
            <Card key={app._id} className="p-5 card-premium flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="font-medium">{app.user?.email} • {app.type}</div>
                <div className="text-sm text-[#6B7280]">Score: {app.qualificationScore} — Status: <span className="font-semibold uppercase">{app.status}</span></div>
              </div>
              <div>
                <select className="border rounded p-2 text-sm" value={app.status} onChange={(e) => handleStatusChange(app._id, e.target.value)}>
                  {["submitted", "reviewing", "approved", "rejected", "waitlist"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedTab === "logs" && (
        <div className="font-mono text-xs bg-black text-[#C5A46E] p-6 rounded-xl max-h-[480px] overflow-auto space-y-2">
          {logs.length === 0 && "No logs"}
          {logs.map((log: any, i: number) => (
            <div key={i}>{new Date(log.createdAt).toISOString()} — {log.event}</div>
          ))}
        </div>
      )}
    </div>
  );
}
