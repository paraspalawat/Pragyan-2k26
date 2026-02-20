import { useRef, useState } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { ClipboardList, CreditCard, CheckCircle, ChevronDown, QrCode, Copy } from "lucide-react";
import { toast } from "sonner";
import RegistrationForm from "./RegistrationForm";

const steps = [
  { icon: ClipboardList, text: "Registration fees vary per event. Check event cards for details." },
  { icon: CreditCard, text: "Payment details will be shared. Upload screenshot after payment." },
  { icon: CheckCircle, text: "Fill the form below and submit your registration!" },
];

const RegistrationInfo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showForm, setShowForm] = useState(false);

  return (
    <section id="register" className="section-padding" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold gradient-text mb-3">
            How to Register
          </h2>
          <p className="text-muted-foreground">Quick, easy, and affordable.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass-card rounded-xl p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <s.icon size={20} className="text-primary" />
              </div>
              <p className="text-foreground/80 text-sm">{s.text}</p>
            </motion.div>
          ))}
        </div>

        {/* UPI Payment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-2xl p-6 md:p-8 mb-10"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-48 h-48 bg-white rounded-xl p-2 flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=paras.palawat@ptyes&pn=PRAGYAN%202026&cu=INR`}
                  alt="UPI QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground">Scan to Pay</p>
            </div>
            <div className="flex-1 text-center md:text-left space-y-3">
              <h3 className="font-heading font-bold text-xl gradient-text flex items-center justify-center md:justify-start gap-2">
                <QrCode size={22} className="text-primary" /> Pay via UPI
              </h3>
              <p className="text-foreground/80 text-sm">
                Scan the QR code or use the UPI ID below to pay the registration fee.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <code className="px-3 py-1.5 rounded-lg bg-muted text-foreground text-sm font-mono">
                  paras.palawat@ptyes
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("paras.palawat@ptyes");
                    toast.success("UPI ID copied!");
                  }}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  title="Copy UPI ID"
                >
                  <Copy size={16} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                After payment, take a screenshot and upload it in the registration form below.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-glow px-10 py-4 rounded-xl text-primary-foreground font-semibold text-lg inline-flex items-center gap-2"
          >
            👉 Register for Your Event Now
            <ChevronDown size={20} className={`transition-transform ${showForm ? "rotate-180" : ""}`} />
          </button>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-10"
            >
              <div className="glass-card rounded-2xl p-6 md:p-8">
                <h3 className="font-heading font-bold text-xl text-center gradient-text mb-6">Registration Form</h3>
                <RegistrationForm onSuccess={() => setShowForm(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RegistrationInfo;
