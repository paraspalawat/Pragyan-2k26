import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

const ALL_EVENTS = [
  { name: "100m Race (Boys & Girls)", fee: "₹50" },
  { name: "200m Race (Boys & Girls)", fee: "₹50" },
  { name: "400m Race", fee: "₹50" },
  { name: "Relay 4×100", fee: "₹200" },
  { name: "Kabaddi", fee: "₹400" },
  { name: "Volleyball", fee: "₹400" },
  { name: "Tug of War (Boys & Girls)", fee: "₹400" },
  { name: "Disc Throw", fee: "₹50" },
  { name: "Coding Battle", fee: "₹50" },
  { name: "Stage Play", fee: "₹50/member" },
  { name: "Open Mic", fee: "₹50" },
  { name: "Solo Singing", fee: "₹50" },
  { name: "Solo Dance", fee: "₹50" },
  { name: "Fashion Show", fee: "₹50" },
  { name: "Group Singing", fee: "₹50/member" },
  { name: "Group Dance", fee: "₹50/member" },
  { name: "Poster Making", fee: "₹50" },
  { name: "Mehendi Competition", fee: "₹50" },
];

interface RegistrationFormProps {
  defaultEvent?: string;
  onSuccess?: () => void;
}

const RegistrationForm = ({ defaultEvent, onSuccess }: RegistrationFormProps) => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
    event_name: defaultEvent || "",
    transaction_id: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(f.type)) {
      toast.error("Only JPG, JPEG, PNG files are allowed.");
      e.target.value = "";
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB.");
      e.target.value = "";
      return;
    }
    setFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload a payment screenshot.");
      return;
    }
    setLoading(true);

    try {
      // Upload screenshot
      const ext = file.name.split(".").pop();
      const filePath = `${Date.now()}_${form.phone}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("payments")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("payments")
        .getPublicUrl(filePath);

      // Insert registration
      const { error: insertError } = await supabase.from("registrations").insert({
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        department: form.department || null,
        event_name: form.event_name,
        transaction_id: form.transaction_id,
        screenshot_url: urlData.publicUrl,
        payment_status: "Pending",
      });

      if (insertError) {
        if (insertError.code === "23505") {
          toast.error("You have already registered for this event with this phone number.");
        } else {
          throw insertError;
        }
        return;
      }

      toast.success("Registration submitted successfully! 🎉");
      setForm({ full_name: "", email: "", phone: "", gender: "", department: "", event_name: defaultEvent || "", transaction_id: "" });
      setFile(null);
      onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <input name="full_name" value={form.full_name} onChange={handleChange} required placeholder="Full Name *" className={inputClass} />
      <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email *" className={inputClass} />
      <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone Number *" pattern="[0-9]{10}" title="Enter 10-digit phone number" className={inputClass} />
      <select name="gender" value={form.gender} onChange={handleChange} required className={inputClass}>
        <option value="">Select Gender *</option>
        <option value="Boys">Boys</option>
        <option value="Girls">Girls</option>
        <option value="Other">Other</option>
      </select>
      <input name="department" value={form.department} onChange={handleChange} placeholder="Department (optional)" className={inputClass} />
      <select name="event_name" value={form.event_name} onChange={handleChange} required className={inputClass}>
        <option value="">Select Event *</option>
        {ALL_EVENTS.map((ev) => (
          <option key={ev.name} value={ev.name}>{ev.name} — {ev.fee}</option>
        ))}
      </select>
      <input name="transaction_id" value={form.transaction_id} onChange={handleChange} required placeholder="Transaction ID *" className={inputClass} />
      
      <div>
        <label className="block text-sm text-muted-foreground mb-2">Payment Screenshot * (JPG/PNG, max 5MB)</label>
        <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50 border border-border cursor-pointer hover:border-primary/50 transition-all">
          <Upload size={18} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{file ? file.name : "Choose file..."}</span>
          <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-glow w-full px-6 py-3 rounded-xl text-primary-foreground font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Registration"
        )}
      </button>
    </form>
  );
};

export default RegistrationForm;
