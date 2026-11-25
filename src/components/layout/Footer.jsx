import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Authentic Framer LEROVA Luxury Footer:
 * Encapsulated in a rounded-[28px] white card inside #eeeef0 root padding
 * with 1px solid rgba(23,23,23,0.09) hairline border, 34px Manrope brandmark,
 * WCAG 2.2 AA contrast, and LPU institutional pilot baseline attribution.
 */
export default function Footer({
  brandName = "CertiScholar",
  onNavigateHome,
  onNavigateLogin,
  onNavigateRegister,
  onExploreClick,
  onLoginClick,
  onRegisterClick,
  onOpenPrivacy = () => {},
  onOpenTerms = () => {},
  onOpenAccessibility = () => {},
}) {
  const handleHome =
    onNavigateHome ??
    onExploreClick ??
    (() => {
      window.location.hash = '#home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

  const handleLogin = onNavigateLogin ?? onLoginClick ?? (() => {});
  const handleRegister = onNavigateRegister ?? onRegisterClick ?? (() => {});

  const handleFooterLinkClick = (e, href) => {
    e.preventDefault();
    if (href === '#home' || href === '#about' || href === '#faq') {
      window.location.hash = href;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#home';
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  };

  return (
    <footer className="w-full bg-[#eeeef0] px-3 sm:px-4 py-4 sm:py-6">
      <div
        style={{ border: '1px solid rgba(23,23,23,0.09)' }}
        className="max-w-[1400px] mx-auto bg-white rounded-[28px] shadow-[0_1px_2px_rgba(23,23,23,0.05)] p-8 sm:p-14 space-y-12 sm:space-y-14"
      >
        {/* Main Grid: Left Brand Column + Right 3 Link Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <button
              type="button"
              onClick={handleHome}
              className="inline-flex items-center gap-3 cursor-pointer group text-left focus:outline-none focus:ring-2 focus:ring-[#171717]/20 rounded-full pr-2"
            >
              <div className="w-9 h-9 rounded-full border-[3px] border-[#171717] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5a2b] transition-transform group-hover:scale-125" />
              </div>
              <span className="font-['Manrope'] font-medium text-[30px] sm:text-[34px] tracking-[-0.045em] text-[#171717] leading-none">
                {brandName}
              </span>
            </button>

            <p className="text-[15px] font-normal text-[#171717] leading-relaxed max-w-sm font-['Manrope']">
              A clear way to verify student documents and administer institutional scholarships.
            </p>
            <p className="text-[13px] text-[#52525b] leading-relaxed max-w-sm font-['Manrope']">
              Institutional pilot baseline built for Lovely Professional University under CS-SRS-002 v3.2.
            </p>

            {/* Follow Us Social Icon Buttons */}
            <div className="space-y-3 pt-1">
              <span className="text-[13px] font-semibold text-[#171717] block font-['Manrope']">
                Follow us
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  style={{ border: '1px solid rgba(23,23,23,0.09)' }}
                  className="w-11 h-11 rounded-full bg-[#f4f4f5] hover:bg-[#171717] hover:text-white flex items-center justify-center text-[#171717] transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  style={{ border: '1px solid rgba(23,23,23,0.09)' }}
                  className="w-11 h-11 rounded-full bg-[#f4f4f5] hover:bg-[#171717] hover:text-white flex items-center justify-center text-[#171717] transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  title="YouTube"
                  style={{ border: '1px solid rgba(23,23,23,0.09)' }}
                  className="w-11 h-11 rounded-full bg-[#f4f4f5] hover:bg-[#171717] hover:text-white flex items-center justify-center text-[#171717] transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Links Columns (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Column 1: Explore */}
            <div className="space-y-4">
              <h2 className="text-[#171717] font-semibold text-[15px] font-['Manrope']">
                Explore
              </h2>
              <ul className="space-y-3 text-[14px] text-[#52525b] font-['Manrope']">
                <li>
                  <a
                    href="#home"
                    onClick={(e) => handleFooterLinkClick(e, '#home')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleFooterLinkClick(e, '#about')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#scholarships"
                    onClick={(e) => handleFooterLinkClick(e, '#scholarships')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    All Scholarships
                  </a>
                </li>
                <li>
                  <a
                    href="#verification"
                    onClick={(e) => handleFooterLinkClick(e, '#verification')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    Verification Quorum
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    onClick={(e) => handleFooterLinkClick(e, '#how-it-works')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    How It Works
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div className="space-y-4">
              <h2 className="text-[#171717] font-semibold text-[15px] font-['Manrope']">
                Resources
              </h2>
              <ul className="space-y-3 text-[14px] text-[#52525b] font-['Manrope']">
                <li>
                  <a
                    href="#resources"
                    onClick={(e) => handleFooterLinkClick(e, '#resources')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    Guides &amp; Articles
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => handleFooterLinkClick(e, '#faq')}
                    className="hover:text-[#171717] transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@certischolar.org"
                    className="hover:text-[#171717] transition-colors"
                  >
                    Institutional Contact
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="hover:text-[#171717] transition-colors inline-flex items-center gap-1 cursor-pointer text-left"
                  >
                    <span>Student Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#5f5f66]" aria-hidden="true" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="hover:text-[#171717] transition-colors inline-flex items-center gap-1 cursor-pointer text-left"
                  >
                    <span>Create Passport</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#5f5f66]" aria-hidden="true" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Follow Us */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h2 className="text-[#171717] font-semibold text-[15px] font-['Manrope']">
                Follow Us
              </h2>
              <ul className="space-y-3 text-[14px] text-[#52525b] font-['Manrope']">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#171717] transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#171717] transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#171717] transition-colors"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div
          style={{ borderTop: '1px solid rgba(23,23,23,0.09)' }}
          className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[13px] text-[#52525b] font-['Manrope']"
        >
          <div className="space-y-1">
            <p className="text-[#171717] font-medium">
              &copy; {CURRENT_YEAR} CertiScholar. All rights reserved.
            </p>
            <p className="text-[12.5px] text-[#5f5f66]">
              LPU Institutional Pilot Baseline: CS-SRS-002 v3.2, DPDP Act 2023 aligned, subject to university governance approval.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-[#171717] transition-colors cursor-pointer py-1"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={onOpenTerms}
              className="hover:text-[#171717] transition-colors cursor-pointer py-1"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={onOpenAccessibility}
              className="hover:text-[#171717] transition-colors cursor-pointer py-1"
            >
              Accessibility
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
