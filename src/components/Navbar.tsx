import { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Activity, Menu, X, ArrowRight, Search, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  onSearchOpen: () => void;
}

export default function Navbar({ currentPage, setCurrentPage, onSearchOpen }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: PageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: PageId; label: string }[] = [
    { id: 'platform', label: 'Platform' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'industries', label: 'Industries' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'resources', label: 'Knowledge Hub' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header
      id="main-nav-header"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none px-3 sm:px-6 pt-3"
    >
      {/* Scroll Progress Bar at the top edge */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-50">
        <div
          id="scroll-progress-bar"
          className="h-full bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-300 transition-all duration-150 shadow-[0_0_10px_#00d1ff]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Glass Island Navbar */}
      <nav
        id="floating-glass-nav"
        className={`pointer-events-auto max-w-7xl mx-auto rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.8)] py-2 px-4 sm:px-6'
            : 'bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl py-2.5 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between h-12">
          
          {/* Brand Logo */}
          <div
            id="brand-logo-container"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-300 p-[1px] shadow-lg shadow-white/10 group-hover:scale-105 transition-transform duration-300 shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm rotate-45 flex items-center justify-center">
                  <div className="w-1 h-1 bg-black"></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-base font-extrabold text-white tracking-tight block leading-none group-hover:text-teal-300 transition-colors">
                INSHIRA
              </span>
              <span className="font-mono text-[8.5px] text-teal-400/90 tracking-widest leading-none mt-0.5 font-bold uppercase">
                Operational Intelligence
              </span>
            </div>
          </div>

          {/* Desktop Nav Links - Apple Segmented Style */}
          <div id="desktop-nav-menu" className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.06] backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white bg-white/15 border border-white/20 shadow-lg shadow-black/40'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Nav CTAs & Interactive Controls */}
          <div id="nav-actions-container" className="hidden lg:flex items-center gap-2">
            {/* Search Trigger */}
            <button
              id="search-trigger-btn"
              onClick={onSearchOpen}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-sans text-xs font-medium transition-all duration-200 cursor-pointer active:scale-95"
              title="Search Knowledge Base"
            >
              <Search className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-[11px] font-mono text-slate-400">⌘K</span>
            </button>

            <button
              id="contact-nav-btn"
              onClick={() => handleNavClick('contact')}
              className={`px-3.5 py-1.5 rounded-full font-sans text-xs font-semibold transition-all duration-200 cursor-pointer ${
                currentPage === 'contact'
                  ? 'text-white bg-white/15 border border-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Inquire
            </button>

            <button
              id="demo-nav-cta"
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-white via-slate-100 to-slate-200 hover:from-teal-300 hover:to-white text-black px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-md shadow-white/10 cursor-pointer"
            >
              <span>Book Audit</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div id="mobile-nav-controls" className="flex lg:hidden items-center gap-1.5">
            <button
              id="mobile-search-trigger"
              onClick={onSearchOpen}
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Nav Panel Dropdown */}
        {mobileMenuOpen && (
          <div id="mobile-nav-panel" className="lg:hidden mt-3 pt-3 border-t border-white/10 space-y-2 pb-2">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl font-sans text-xs font-semibold transition-all ${
                      isActive
                        ? 'text-white bg-white/15 border border-white/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                id="mobile-contact-nav-btn"
                onClick={() => handleNavClick('contact')}
                className="w-full text-center px-4 py-2 rounded-xl font-sans text-xs text-slate-300 hover:text-white font-semibold transition-colors"
              >
                Inquire
              </button>

              <button
                id="mobile-demo-nav-cta"
                onClick={() => handleNavClick('contact')}
                className="w-full text-center py-2.5 rounded-full bg-white text-black font-sans text-xs font-bold tracking-wide transition-all hover:bg-slate-200 active:scale-95"
              >
                Book Plant Audit
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

