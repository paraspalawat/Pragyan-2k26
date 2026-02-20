import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="section-padding border-t border-border">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
        <div>
          <h3 className="font-heading font-bold text-xl gradient-text mb-4">
            🎉 Pragyan 2K26
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Feel The Vibe. Live The Moment. The biggest college fest of Eshan College of Engineering.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Contact</h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> Eshan College of Engineering</p>
            <p className="flex items-center gap-2"><Phone size={16} className="text-primary" /> +91 81910 55623 (Paras Palawat)</p>
            <p className="flex items-center gap-2"><Phone size={16} className="text-primary" /> +91 70375 85619 (Netik Sharma)</p>
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 Pragyan | Eshan College of Engineering
      </div>
    </div>
  </footer>
);

export default Footer;
