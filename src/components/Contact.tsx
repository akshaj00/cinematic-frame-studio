import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MessageCircle, ArrowUpRight, Copy, Check } from "lucide-react";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full py-24 md:py-36 px-6 md:px-12 lg:px-20 relative"
    >
      <div className="max-w-4xl">
        {/* Section title */}
        <div className="mb-12 pb-6 border-b border-white/10">
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground block mb-2 font-mono">
            Get In Touch
          </span>
          <h2
            className={`font-display text-4xl md:text-6xl lg:text-7xl tracking-wider text-foreground transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            LET'S WORK TOGETHER
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground font-light max-w-xl">
            Have a project in mind, need high-retention reel edits, or want cinematic color grading?
            Reach out directly.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Email Card */}
          <div className="p-6 rounded-2xl bg-card/40 border border-white/10 backdrop-blur-md hover:border-white/25 transition-all duration-300 group shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <button
                onClick={() => handleCopy("sidharthnandhu801@gmail.com", "email")}
                className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 transition-colors"
                title="Copy email address"
              >
                {copied === "email" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <span className="text-xs uppercase tracking-wider font-mono text-muted-foreground block mb-1">
              Email
            </span>
            <a
              href="mailto:sidharthnandhu801@gmail.com"
              className="text-lg md:text-xl font-medium text-foreground hover:text-amber-300 transition-colors break-all flex items-center gap-1.5 group-hover:translate-x-1 duration-300"
            >
              <span>sidharthnandhu801@gmail.com</span>
              <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 flex-shrink-0" />
            </a>
          </div>

          {/* Phone & WhatsApp Card */}
          <div className="p-6 rounded-2xl bg-card/40 border border-white/10 backdrop-blur-md hover:border-white/25 transition-all duration-300 group shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <button
                onClick={() => handleCopy("+919061380911", "phone")}
                className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 transition-colors"
                title="Copy phone number"
              >
                {copied === "phone" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <span className="text-xs uppercase tracking-wider font-mono text-muted-foreground block mb-1">
              Phone & WhatsApp
            </span>
            <div className="flex flex-wrap items-center gap-4 mt-1">
              <a
                href="tel:+919061380911"
                className="text-lg md:text-xl font-medium text-foreground hover:text-amber-300 transition-colors flex items-center gap-1.5 group-hover:translate-x-1 duration-300"
              >
                <span>+91 9061380911</span>
                <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100" />
              </a>

              <a
                href="https://wa.me/919061380911"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
