import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Search, Download, CheckCircle, XCircle, Loader2, Lock, ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Registration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  department: string | null;
  event_name: string;
  transaction_id: string;
  screenshot_url: string;
  payment_status: string;
  created_at: string;
}

const Admin = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEvent, setFilterEvent] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin", {
        body: { action: "list", password },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setRegistrations(data || []);
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin", {
        body: { action: "list", password },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setAuthenticated(true);
      setRegistrations(data || []);
    } catch {
      toast.error("Invalid password");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const { data, error } = await supabase.functions.invoke("admin", {
        body: { action: "update_status", password, id, payment_status: status },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, payment_status: status } : r))
      );
      toast.success(`Status updated to ${status}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to update");
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = useMemo(() => {
    return registrations.filter((r) => {
      const matchSearch =
        !searchQuery ||
        r.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.phone.includes(searchQuery);
      const matchEvent = !filterEvent || r.event_name === filterEvent;
      const matchStatus = !filterStatus || r.payment_status === filterStatus;
      return matchSearch && matchEvent && matchStatus;
    });
  }, [registrations, searchQuery, filterEvent, filterStatus]);

  const events = useMemo(() => [...new Set(registrations.map((r) => r.event_name))], [registrations]);

  const downloadCSV = () => {
    const headers = ["Name", "Email", "Phone", "Department", "Event", "Transaction ID", "Status", "Date"];
    const rows = filtered.map((r) => [
      r.full_name, r.email, r.phone, r.department || "", r.event_name,
      r.transaction_id, r.payment_status, new Date(r.created_at).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations_${Date.now()}.csv`;
    a.click();
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="glass-card rounded-2xl p-8 w-full max-w-sm space-y-6">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock size={24} className="text-primary" />
            </div>
            <h1 className="font-heading font-bold text-2xl gradient-text">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter admin password to continue</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-glow w-full px-6 py-3 rounded-xl text-primary-foreground font-semibold text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : "Login"}
          </button>
          <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={14} className="inline mr-1" /> Back to Home
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-heading font-bold text-2xl md:text-3xl gradient-text">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">{registrations.length} total registrations</p>
          </div>
          <div className="flex gap-2">
            <button onClick={fetchRegistrations} disabled={loading} className="px-4 py-2 rounded-lg bg-muted text-foreground text-sm hover:bg-muted/80 transition-colors">
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Refresh"}
            </button>
            <button onClick={downloadCSV} className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors flex items-center gap-1">
              <Download size={16} /> CSV
            </button>
            <Link to="/" className="px-4 py-2 rounded-lg bg-muted text-foreground text-sm hover:bg-muted/80 transition-colors">
              Home
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or phone..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <select
            value={filterEvent}
            onChange={(e) => setFilterEvent(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">All Events</option>
            {events.map((ev) => <option key={ev} value={ev}>{ev}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Email</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Phone</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden lg:table-cell">Dept</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Event</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Txn ID</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden lg:table-cell">Screenshot</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-10 text-muted-foreground">
                      {loading ? "Loading..." : "No registrations found."}
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">{r.full_name}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{r.email}</td>
                      <td className="px-4 py-3">{r.phone}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{r.department || "-"}</td>
                      <td className="px-4 py-3">{r.event_name}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{r.transaction_id}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <a href={r.screenshot_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                          View
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          r.payment_status === "Approved"
                            ? "bg-neon-green/10 text-neon-green"
                            : r.payment_status === "Rejected"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}>
                          {r.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {updatingId === r.id ? (
                            <Loader2 size={16} className="animate-spin text-muted-foreground" />
                          ) : (
                            <>
                              <button
                                onClick={() => updateStatus(r.id, "Approved")}
                                disabled={r.payment_status === "Approved"}
                                className="p-1.5 rounded-lg hover:bg-neon-green/10 text-neon-green disabled:opacity-30 transition-colors"
                                title="Approve"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() => updateStatus(r.id, "Rejected")}
                                disabled={r.payment_status === "Rejected"}
                                className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive disabled:opacity-30 transition-colors"
                                title="Reject"
                              >
                                <XCircle size={16} />
                              </button>
                              <a
                                href={`https://wa.me/91${r.phone}?text=${encodeURIComponent(`Hi ${r.full_name},\n\nRegarding your PRAGYAN 2026 registration for "${r.event_name}":\nPayment Status: ${r.payment_status}\nTransaction ID: ${r.transaction_id}\n\nThank you!`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg hover:bg-green-500/10 text-green-500 transition-colors"
                                title="WhatsApp"
                              >
                                <MessageCircle size={16} />
                              </a>
                              <a
                                href={`mailto:${r.email}?subject=${encodeURIComponent(`PRAGYAN 2026 - ${r.event_name} Registration`)}&body=${encodeURIComponent(`Hi ${r.full_name},\n\nRegarding your registration for "${r.event_name}":\nPayment Status: ${r.payment_status}\nTransaction ID: ${r.transaction_id}\n\nThank you!\nPRAGYAN 2026 Team`)}`}
                                className="p-1.5 rounded-lg hover:bg-blue-500/10 text-blue-500 transition-colors"
                                title="Email"
                              >
                                <Mail size={16} />
                              </a>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
