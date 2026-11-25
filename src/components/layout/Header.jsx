import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { name: "Home", href: "#home", view: "landing" },
  { name: "About", href: "#about", view: "about" },
  { name: "Scholarships", href: "#scholarships" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Governance", href: "#verification" },
  { name: "FAQ", href: "#faq", view: "faq" },
];

const LANGUAGE_OPTIONS = [
  { code: "EN", label: "English" },
  { code: "HI", label: "Hindi" },
  { code: "PA", label: "Punjabi" },
];

const FONT_SCALE_OPTIONS = [
  { scale: 90, label: "A-", title: "Smaller text" },
  { scale: 100, label: "A", title: "Default text size" },
  { scale: 110, label: "A+", title: "Larger text" },
];

function resolveViewFromHash() {
  if (typeof window === 'undefined') return 'landing';
  const hash = window.location.hash.toLowerCase();
  if (hash === '#about') return 'about';
  if (hash === '#faq' || hash === '#faq-page' || hash === '#help' || hash === '#help-center') {
    return 'faq';
  }
  return 'landing';
}

/**
 * Inverted Tabbed Header matching Framer LEROVA template:
 * - Hanging Logo Tab (left, rounded-br-[20px]), Links Tab (center, rounded-b-[22px]), and Action Tab (right, rounded-bl-[20px]).
 * - Animated show/hide behavior on scroll with Framer spring physics.
 * - Accessible ARIA listbox language switcher (EN / HI / PA) with zero native select elements.
 * - Framer-styled < 1024px island drawer with numbered rows and 44px+ touch targets.
 */
export default function Header({
  brandName = "CertiScholar",
  currentView,
  onLogin = () => {},
  onRegister = () => {},
  language = "EN",
  onLanguageChange = () => {},
  fontScale = 100,
  onFontScaleChange = () => {},
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [hashView, setHashView] = useState(resolveViewFromHash);

  const langMenuRef = useRef(null);
  const langButtonRef = useRef(null);

  const activeView = currentView || hashView;

  // Keep fallback hash view synced when currentView prop is omitted
  useEffect(() => {
    const syncHash = () => setHashView(resolveViewFromHash());
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  // Scroll detection for show/hide behavior
  useEffect(() => {
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0;

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsVisible(true);
        return;
      }

      const currentY = window.scrollY;

      if (currentY <= 20) {
        setIsVisible(true);
        setIsScrolled(false);
        lastY = currentY;
        return;
      }

      setIsScrolled(true);

      const diff = currentY - lastY;
      if (Math.abs(diff) < 6) return;

      if (diff > 0) {
        setIsVisible(false);
        setIsLangOpen(false);
      } else {
        setIsVisible(true);
      }

      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  // Close language popover on outside click or Escape
  useEffect(() => {
    if (!isLangOpen) return;

    const handleClickOutside = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsLangOpen(false);
        langButtonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isLangOpen]);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Automatically close mobile menu on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsLangOpen(false);

    if (href === '#about' || href === '#faq' || href === '#home' || href === '#workspace') {
      window.location.hash = href;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      window.location.hash = '#home';
      setTimeout(() => {
        const el = document.getElementById(targetId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }
  };

  const handleSelectLanguage = (code) => {
    onLanguageChange(code);
    setIsLangOpen(false);
    langButtonRef.current?.focus();
  };

  const handleLangOptionKeyDown = (e, idx) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % LANGUAGE_OPTIONS.length;
      langMenuRef.current?.querySelectorAll('[role="option"]')[next]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + LANGUAGE_OPTIONS.length) % LANGUAGE_OPTIONS.length;
      langMenuRef.current?.querySelectorAll('[role="option"]')[prev]?.focus();
    }
  };

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false);
    onLogin();
  };

  const handleRegisterClick = () => {
    setIsMobileMenuOpen(false);
    onRegister();
  };

  const islandSurface = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-[0_10px_30px_rgba(23,23,23,0.08)] border-[rgba(23,23,23,0.09)]'
    : 'bg-white shadow-[0_1px_3px_rgba(23,23,23,0.06)] border-[rgba(23,23,23,0.06)]';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible
            ? 'translate-y-0 opacity-100 filter-none'
            : '-translate-y-full opacity-0 pointer-events-none filter blur-xs'
        }`}
      >
        <div className="relative w-full flex items-start justify-between">
          {/* Left: Logo Tab (rounded-br-[20px], flush against top-left viewport edge) */}
          <div
            className={`rounded-br-[20px] px-4 sm:px-6 py-3 sm:py-3.5 pointer-events-auto flex items-center gap-2 sm:gap-2.5 border-b border-r transition-all duration-300 ${islandSurface}`}
          >
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer min-h-[32px]"
            >
              <div className="w-5 h-5 rounded-full border-2 border-[#171717] flex items-center justify-center shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#ff5a2b] group-hover:scale-125 transition-transform duration-300" />
              </div>
              <span className="tracking-[-0.045em] text-[15px] sm:text-[17px] font-semibold text-[#171717] font-['Manrope']">
                {brandName}
              </span>
            </a>
          </div>

          {/* Center: Links Tab (rounded-b-[22px], centered on desktop >= 1024px) */}
          <nav
            aria-label="Primary navigation"
            className={`hidden lg:flex items-center rounded-b-[22px] px-5 xl:px-7 py-2.5 pointer-events-auto gap-1 xl:gap-1.5 text-[13.5px] xl:text-[14.5px] font-medium font-['Manrope'] text-[#171717] border-b border-x transition-all duration-300 absolute left-1/2 -translate-x-1/2 top-0 ${islandSurface}`}
          >
            {NAV_LINKS.map((link) => {
              const isActive = Boolean(link.view && activeView === link.view);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  data-framer-page-link-current={isActive ? "true" : undefined}
                  aria-current={isActive ? "page" : undefined}
                  className={
                    isActive
                      ? "bg-[#e8e8eb] text-[#171717] px-3 xl:px-3.5 py-1.5 rounded-full tracking-[-0.02em] font-medium transition-colors whitespace-nowrap"
                      : "text-[#171717] hover:bg-[#f4f4f5] hover:text-black px-3 xl:px-3.5 py-1.5 rounded-full tracking-[-0.02em] transition-colors whitespace-nowrap"
                  }
                >
                  {link.name}
                </a>
              );
            })}

            <span className="text-[rgba(23,23,23,0.16)] px-1" aria-hidden="true">|</span>

            {/* Accessible ARIA Listbox Language Switcher + Font Scale */}
            <div className="flex items-center gap-1.5 text-[12px] text-[#52525b] font-sans">
              <div className="relative" ref={langMenuRef}>
                <button
                  ref={langButtonRef}
                  type="button"
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={isLangOpen}
                  aria-controls="header-lang-listbox"
                  aria-label={`Select language, current ${language}`}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[#171717] hover:bg-[#f4f4f5] font-semibold cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-[#171717]/20"
                >
                  <Globe className="w-3.5 h-3.5 text-[#52525b]" aria-hidden="true" />
                  <span>{language}</span>
                  <ChevronDown
                    className={`w-3 h-3 text-[#52525b] transition-transform duration-200 ${
                      isLangOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isLangOpen && (
                  <div
                    id="header-lang-listbox"
                    role="listbox"
                    aria-label="Language options"
                    className="absolute right-0 mt-2 w-36 bg-white rounded-[16px] border border-[rgba(23,23,23,0.09)] shadow-[0_16px_40px_-12px_rgba(23,23,23,0.18)] p-1.5 z-50"
                  >
                    {LANGUAGE_OPTIONS.map((opt, idx) => {
                      const isSelected = language === opt.code;
                      return (
                        <button
                          key={opt.code}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleSelectLanguage(opt.code)}
                          onKeyDown={(e) => handleLangOptionKeyDown(e, idx)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-[10px] text-xs font-medium cursor-pointer transition-colors text-left ${
                            isSelected
                              ? 'bg-[#e8e8eb] text-[#171717] font-semibold'
                              : 'text-[#52525b] hover:bg-[#f4f4f5] hover:text-[#171717]'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className="text-[11px] font-semibold text-[#171717]">{opt.code}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <span className="text-[rgba(23,23,23,0.2)]" aria-hidden="true">&middot;</span>

              <div className="flex items-center gap-0.5" role="group" aria-label="Text size">
                {FONT_SCALE_OPTIONS.map((f) => {
                  const isActiveScale = fontScale === f.scale;
                  return (
                    <button
                      key={f.scale}
                      type="button"
                      onClick={() => onFontScaleChange(f.scale)}
                      aria-pressed={isActiveScale}
                      title={f.title}
                      className={`px-1.5 py-1 rounded-full cursor-pointer transition-colors ${
                        isActiveScale
                          ? 'bg-[#e8e8eb] text-[#171717] font-bold'
                          : 'text-[#52525b] hover:bg-[#f4f4f5] hover:text-[#171717]'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Right: Action Tab (rounded-bl-[20px], flush against top-right viewport edge) */}
          <div
            className={`ml-auto rounded-bl-[20px] px-3 sm:px-5 py-2 sm:py-2.5 pointer-events-auto flex items-center gap-2 sm:gap-2.5 border-b border-l transition-all duration-300 ${islandSurface}`}
          >
            <button
              type="button"
              onClick={onLogin}
              className="hidden sm:inline-flex items-center justify-center text-xs font-semibold text-[#52525b] hover:text-[#171717] hover:bg-[#f4f4f5] px-3 py-2 rounded-full transition cursor-pointer font-['Manrope'] min-h-[38px]"
            >
              Login
            </button>

            <button
              type="button"
              onClick={onRegister}
              className="hidden sm:inline-flex group relative bg-[#171717] hover:bg-black text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 shadow-sm cursor-pointer overflow-hidden font-['Manrope'] shrink-0 items-center justify-center min-h-[38px]"
            >
              <span className="btn-roll">
                <span className="btn-roll-inner">
                  <span>Get Started</span>
                  <span>Get Started</span>
                </span>
              </span>
            </button>

            {/* Tablet / Mobile (< 1024px) Framer Dark Pill Menu / Close Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="lg:hidden inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-black text-white px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-colors cursor-pointer font-['Manrope'] min-h-[44px] min-w-[76px] shrink-0 focus:outline-none focus:ring-2 focus:ring-[#171717]/25"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  isMobileMenuOpen ? 'bg-[#ff5a2b]' : 'bg-white'
                }`}
                aria-hidden="true"
              />
              <span>{isMobileMenuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Island Drawer (< 1024px) */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        {/* Backdrop Overlay */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          aria-hidden="true"
        />

        {/* Top-Docked Framer Island Panel */}
        <div
          className={`relative w-full max-w-2xl mx-auto bg-white rounded-b-[22px] shadow-[0_24px_60px_-15px_rgba(23,23,23,0.22)] border-b border-x border-[rgba(23,23,23,0.09)] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
          }`}
        >
          {/* Drawer Header Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-center gap-2.5 min-h-[44px]"
            >
              <div className="w-5 h-5 rounded-full border-2 border-[#171717] flex items-center justify-center shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#ff5a2b]" />
              </div>
              <span className="tracking-[-0.045em] text-[16px] sm:text-[17px] font-semibold text-[#171717] font-['Manrope']">
                {brandName}
              </span>
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex items-center justify-center gap-2 bg-[#171717] hover:bg-black text-white px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-colors cursor-pointer font-['Manrope'] min-h-[44px] min-w-[76px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a2b]" aria-hidden="true" />
              <span>Close</span>
            </button>
          </div>

          {/* Drawer Body: Numbered Navigation Rows */}
          <nav
            aria-label="Mobile navigation links"
            className="px-4 sm:px-6 pb-4 max-h-[calc(100vh-140px)] overflow-y-auto"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((link, index) => {
                const isActive = Boolean(link.view && activeView === link.view);
                const rowNumber = `{ 0${index + 1} }`;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    data-framer-page-link-current={isActive ? "true" : undefined}
                    aria-current={isActive ? "page" : undefined}
                    style={{ borderTop: '1px solid rgba(23,23,23,0.09)' }}
                    className={`flex items-center justify-between px-3 py-3 min-h-[48px] text-[15px] font-medium font-['Manrope'] transition-colors group ${
                      isActive
                        ? 'bg-[#e8e8eb] text-[#171717] rounded-xl my-1'
                        : 'text-[#171717] hover:bg-[#f4f4f5]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-[12px] font-medium tracking-tight text-[#52525b] tabular-nums">
                        {rowNumber}
                      </span>
                      <span className="tracking-[-0.02em]">{link.name}</span>
                    </div>
                    <ArrowUpRight
                      className="w-4 h-4 text-[#52525b] group-hover:text-[#171717] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>

            {/* Accessible Language & Font-Scale Row */}
            <div
              style={{ borderTop: '1px solid rgba(23,23,23,0.09)' }}
              className="pt-3.5 pb-3 mt-1 flex flex-wrap items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#52525b]" aria-hidden="true" />
                <span className="text-xs text-[#52525b] font-semibold">Language:</span>
                <div
                  role="listbox"
                  aria-label="Select language"
                  className="flex items-center bg-[#f4f4f5] rounded-full p-1 gap-1"
                >
                  {LANGUAGE_OPTIONS.map((opt) => {
                    const isSelected = language === opt.code;
                    return (
                      <button
                        key={opt.code}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        aria-label={opt.label}
                        onClick={() => onLanguageChange(opt.code)}
                        className={`min-h-[44px] min-w-[44px] px-3 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#171717] text-white'
                            : 'text-[#52525b] hover:bg-[#e8e8eb] hover:text-[#171717]'
                        }`}
                      >
                        {opt.code}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#52525b] font-semibold">Text:</span>
                <div
                  role="group"
                  aria-label="Text size"
                  className="flex items-center bg-[#f4f4f5] rounded-full p-1 gap-1"
                >
                  {FONT_SCALE_OPTIONS.map((f) => {
                    const isActiveScale = fontScale === f.scale;
                    return (
                      <button
                        key={f.scale}
                        type="button"
                        onClick={() => onFontScaleChange(f.scale)}
                        aria-pressed={isActiveScale}
                        title={f.title}
                        className={`min-h-[44px] min-w-[44px] px-2.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                          isActiveScale
                            ? 'bg-[#171717] text-white'
                            : 'text-[#52525b] hover:bg-[#e8e8eb] hover:text-[#171717]'
                        }`}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Login & Get Started Actions */}
            <div
              style={{ borderTop: '1px solid rgba(23,23,23,0.09)' }}
              className="pt-3.5 flex flex-col sm:flex-row gap-2.5"
            >
              <button
                type="button"
                onClick={handleLoginClick}
                className="w-full sm:flex-1 min-h-[44px] py-2.5 px-5 rounded-full border border-[rgba(23,23,23,0.14)] text-[#171717] hover:bg-[#f4f4f5] font-semibold text-xs tracking-tight transition-colors font-['Manrope'] cursor-pointer flex items-center justify-center"
              >
                Login to Portal
              </button>
              <button
                type="button"
                onClick={handleRegisterClick}
                className="group relative w-full sm:flex-1 min-h-[44px] bg-[#171717] hover:bg-black text-white py-2.5 px-5 rounded-full text-xs font-semibold tracking-tight transition-colors shadow-sm cursor-pointer overflow-hidden font-['Manrope'] flex items-center justify-center"
              >
                <span className="btn-roll">
                  <span className="btn-roll-inner">
                    <span>Get Started &middot; Apply Now</span>
                    <span>Get Started &middot; Apply Now</span>
                  </span>
                </span>
              </button>
            </div>
          </nav>

          {/* Drawer Institutional Footer */}
          <div
            style={{ borderTop: '1px solid rgba(23,23,23,0.09)' }}
            className="px-5 sm:px-6 py-3 bg-[#f4f4f5] text-center"
          >
            <span className="text-[11px] text-[#52525b] font-medium tracking-tight">
              Lovely Professional University &middot; Institutional Scholarship Vault
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
