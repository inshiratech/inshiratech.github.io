import { useState, useEffect } from 'react';
import { PageId, BlogPost } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SeoGeoMetadata from './components/SeoGeoMetadata';
import HomePage from './pages/Home';
import PlatformPage from './pages/Platform';
import SolutionsPage from './pages/Solutions';
import IndustriesPage from './pages/Industries';
import CaseStudiesPage from './pages/CaseStudies';
import KnowledgeHub from './components/KnowledgeHub';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import LegalPage from './pages/Legal';
import { BLOG_POSTS } from './data';
import { Search, X, BookOpen, ArrowRight, Activity, HelpCircle } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | undefined>(undefined);

  /* ==========================================================================
     PATH ROUTER
     --------------------------------------------------------------------------
     Uses real paths (/case-studies) rather than hash fragments (#/case-studies).
     Search engines ignore fragments, so the previous hash router collapsed every
     view into the single URL "/" — no page could rank on its own. Real paths
     give each view its own indexable URL and canonical.

     GitHub Pages has no server-side rewrite, so deep links are handled by
     404.html, which bounces the request to "/?/path". The snippet in index.html
     restores the real path before React mounts. See public/404.html.
     ========================================================================== */
  const VALID_PAGES: PageId[] = [
    'home',
    'platform',
    'solutions',
    'industries',
    'case-studies',
    'resources',
    'about',
    'contact',
    'privacy',
    'terms',
  ];

  useEffect(() => {
    const resolve = () => {
      // Legacy #/slug links (previously published, possibly bookmarked or
      // indexed) are rewritten to the equivalent real path.
      const legacy = window.location.hash.replace(/^#\//, '');
      if (legacy && VALID_PAGES.includes(legacy as PageId)) {
        window.history.replaceState(null, '', legacy === 'home' ? '/' : `/${legacy}/`);
      }

      const slug = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (!slug) {
        setSelectedArticleSlug(undefined);
        return setCurrentPage('home');
      }

      /* Article permalinks: /resources/<article-slug>.
         Each Knowledge Hub article needs its own URL so it can be shared and
         so crawlers (LinkedIn, Google) have something to read — they do not
         run JavaScript, so an article held in React state alone is invisible
         to them and every share would show the generic site preview. */
      const articleMatch = slug.match(/^resources\/(.+)$/);
      if (articleMatch) {
        const post = BLOG_POSTS.find((p) => p.slug === articleMatch[1]);
        if (post) {
          setSelectedArticleSlug(post.slug);
          return setCurrentPage('resources');
        }
        // Unknown article slug: fall back to the hub rather than the homepage,
        // which is the closest useful page.
        setSelectedArticleSlug(undefined);
        return setCurrentPage('resources');
      }

      if (VALID_PAGES.includes(slug as PageId)) {
        setSelectedArticleSlug(undefined);
        return setCurrentPage(slug as PageId);
      }
      setSelectedArticleSlug(undefined);
      setCurrentPage('home');
    };

    window.addEventListener('popstate', resolve);
    resolve();
    return () => window.removeEventListener('popstate', resolve);
  }, []);

  const navigateToPage = (pageId: PageId) => {
    setCurrentPage(pageId);
    // Leaving the Knowledge Hub clears the open article, so its title,
    // description and BlogPosting schema do not leak onto the next page.
    if (pageId !== 'resources') {
      setSelectedArticleSlug(undefined);
    }
    // Trailing slash matches the canonical form; without it a refresh of the
    // copied address bar URL would take a 301 hop.
    window.history.pushState(null, '', pageId === 'home' ? '/' : `/${pageId}/`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Live filtered articles for Global Search
  const searchResults = searchQuery.trim() === ''
    ? []
    : BLOG_POSTS.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleSearchResultClick = (slug: string) => {
    setSelectedArticleSlug(slug);
    setSearchOpen(false);
    setSearchQuery('');
    setCurrentPage('resources');
    // Push the article's own permalink, not /resources — otherwise opening a
    // result from search would leave the address bar on the hub index and the
    // link would be unshareable.
    window.history.pushState(null, '', `/resources/${slug}/`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCtaClick = () => {
    navigateToPage('contact');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={navigateToPage} />;
      case 'platform':
        return <PlatformPage onCtaClick={handleCtaClick} />;
      case 'solutions':
        return <SolutionsPage onCtaClick={handleCtaClick} />;
      case 'industries':
        return <IndustriesPage onCtaClick={handleCtaClick} />;
      case 'case-studies':
        return <CaseStudiesPage onCtaClick={handleCtaClick} />;
      case 'resources':
        return (
          <KnowledgeHub
            openSlug={selectedArticleSlug}
            onSelectArticle={(slug) => setSelectedArticleSlug(slug)}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <LegalPage type="privacy" />;
      case 'terms':
        return <LegalPage type="terms" />;
      default:
        return <HomePage setCurrentPage={navigateToPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-teal-500 selection:text-slate-950 relative overflow-hidden">

      {/* Keyboard users can jump past the nav straight to page content. */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Background Atmosphere */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#0055ff] rounded-full blur-[160px] opacity-20 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#00d1ff] rounded-full blur-[140px] opacity-10 pointer-events-none z-0"></div>
      
      {/* Engineering Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* Search Engine & GEO Meta Tags Injector */}
      <SeoGeoMetadata pageId={currentPage} subTopic={selectedArticleSlug} />

      {/* Sticky Top Header Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={navigateToPage}
        onSearchOpen={() => setSearchOpen(true)}
      />

      {/* Main Routed Page Content wrapped in elegant grid container */}
      <main id="main-content" className="flex-grow pt-24 sm:pt-28 pb-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderPage()}
        </div>
      </main>

      {/* Corporate Enterprise Footer */}
      <Footer setCurrentPage={navigateToPage} />

      {/* Interactive Global Document Search Modal dialog */}
      {searchOpen && (
        <div id="search-modal-backdrop" className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-20">
          <div id="search-modal-container" className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col">
            
            {/* Search Input field */}
            <div className="p-4 border-b border-slate-850 flex items-center justify-between gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
              <label htmlFor="global-search-input" className="sr-only">
                Search resources, articles and guides
              </label>
              <input
                id="global-search-input"
                type="text"
                autoFocus
                placeholder="Search resources, articles, guides, and compliance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white font-sans text-sm focus:outline-none placeholder-slate-500"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
              >
                <X className="w-4.5 h-4.5" aria-hidden="true" />
              </button>
            </div>

            {/* Results or default categories list */}
            <div className="p-4 max-h-96 overflow-y-auto space-y-4">
              {searchQuery.trim() === '' ? (
                <div className="space-y-3">
                  <span className="font-mono text-[12px] text-slate-500 uppercase font-bold tracking-widest block">
                    Suggested Quick Links
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        navigateToPage('platform');
                        setSearchOpen(false);
                      }}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-left font-sans text-xs text-slate-300 hover:text-white hover:border-slate-800 transition-all flex items-center gap-2"
                    >
                      <Activity className="w-4 h-4 text-teal-400" />
                      Platform Suite
                    </button>
                    <button
                      onClick={() => {
                        navigateToPage('case-studies');
                        setSearchOpen(false);
                      }}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-left font-sans text-xs text-slate-300 hover:text-white hover:border-slate-800 transition-all flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-teal-400" />
                      SME Case Studies
                    </button>
                    <button
                      onClick={() => {
                        navigateToPage('solutions');
                        setSearchOpen(false);
                      }}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-left font-sans text-xs text-slate-300 hover:text-white hover:border-slate-800 transition-all flex items-center gap-2"
                    >
                      <HelpCircle className="w-4 h-4 text-teal-400" />
                      Role Solutions
                    </button>
                    <button
                      onClick={() => {
                        navigateToPage('contact');
                        setSearchOpen(false);
                      }}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-left font-sans text-xs text-slate-300 hover:text-white hover:border-slate-800 transition-all flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-teal-400" />
                      Book Audit Call
                    </button>
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-6">
                  <p className="font-sans text-xs text-slate-500">No guides matching your query in our knowledge base.</p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-wider block">
                    Matching Guides & Playbooks
                  </span>
                  <div className="space-y-2">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        onClick={() => handleSearchResultClick(result.slug)}
                        className="p-3 rounded-lg bg-slate-950 border border-slate-850 hover:border-slate-700 cursor-pointer transition-all flex justify-between items-center group"
                      >
                        <div>
                          <span className="font-display text-xs font-bold text-white block group-hover:text-teal-400 transition-colors">
                            {result.title}
                          </span>
                          <p className="font-sans text-[13px] text-slate-400 line-clamp-1 mt-0.5 leading-relaxed">
                            {result.excerpt}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Simple dynamic inline helper icon mapping
import { Mail } from 'lucide-react';
