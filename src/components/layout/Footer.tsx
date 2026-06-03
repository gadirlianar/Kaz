/* ============================================================
   Footer — Site-wide footer
   Contact info, quick links, social media, and legal.
   All content in Kazakh.
   ============================================================ */

import Link from "next/link";
import {
  Plane,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Camera,
  Send,
  MessageCircle,
} from "lucide-react";

/**
 * Full-width footer with four columns:
 * 1. Brand info + description
 * 2. Tourism quick links
 * 3. Education quick links
 * 4. Contact information
 */
export default function Footer() {
  return (
    <footer className="relative bg-background-secondary border-t border-glass-border">
      {/* Decorative gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* ── Column 1: Brand ── */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-kais-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Aysanii</h3>
                <p className="text-xs text-foreground-muted">
                  Sky Eagle & Kais Exchange
                </p>
              </div>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed mb-6">
              Туризм мен білім беру саласында сізге сенімді серіктес. Ішкі және
              халықаралық турлар, шетелде оқу мүмкіндіктері — барлығы бір
              платформада.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-glass-bg border border-glass-border flex items-center justify-center text-foreground-muted hover:text-pink-400 hover:border-pink-400/30 transition-all duration-300"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-glass-bg border border-glass-border flex items-center justify-center text-foreground-muted hover:text-sky-400 hover:border-sky-400/30 transition-all duration-300"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-glass-bg border border-glass-border flex items-center justify-center text-foreground-muted hover:text-green-400 hover:border-green-400/30 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ── Column 2: Tourism Links ── */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
              <Plane className="w-4 h-4 text-sky-400" />
              Sky Eagle — Туризм
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Ішкі турлар", href: "/tourism?type=ішкі" },
                { label: "Халықаралық турлар", href: "/tourism?type=халықаралық" },
                { label: "Әуе билеттері", href: "/tourism?category=билет" },
                { label: "Қонақ үйлер", href: "/tourism?category=қонақ+үй" },
                { label: "Трансфер қызметі", href: "/tourism?category=трансфер" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted hover:text-sky-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Education Links ── */}
          <div>
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
              <GraduationCap className="w-4 h-4 text-kais-400" />
              Kais Exchange — Білім
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Малайзия университеттері", href: "/education?country=Малайзия" },
                { label: "Италия университеттері", href: "/education?country=Италия" },
                { label: "Құжаттарды дайындау", href: "/education#process" },
                { label: "Виза қолдауы", href: "/education#process" },
                { label: "Стипендия мүмкіндіктері", href: "/education" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted hover:text-kais-400 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact ── */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Байланыс
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+77001234567"
                  className="flex items-start gap-3 text-sm text-foreground-muted hover:text-foreground transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 text-sky-400 group-hover:text-sky-300" />
                  <div>
                    <p className="font-medium text-foreground">+7 700 123 45 67</p>
                    <p className="text-xs">Дүйсенбі – Жұма, 09:00 – 18:00</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@aysanii.kz"
                  className="flex items-start gap-3 text-sm text-foreground-muted hover:text-foreground transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 text-kais-400 group-hover:text-kais-300" />
                  <div>
                    <p className="font-medium text-foreground">info@aysanii.kz</p>
                    <p className="text-xs">Кез-келген сұрағыңызды жіберіңіз</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-foreground-muted">
                  <MapPin className="w-4 h-4 mt-0.5 text-gold-500" />
                  <div>
                    <p className="font-medium text-foreground">Алматы қ.</p>
                    <p className="text-xs">Абай даңғылы, 52, 3-қабат</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-12 pt-8 border-t border-glass-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground-muted">
            © {new Date().getFullYear()} Aysanii. Барлық құқықтар қорғалған.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-foreground-muted hover:text-foreground transition-colors"
            >
              Құпиялылық саясаты
            </Link>
            <Link
              href="/terms"
              className="text-xs text-foreground-muted hover:text-foreground transition-colors"
            >
              Пайдалану шарттары
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
