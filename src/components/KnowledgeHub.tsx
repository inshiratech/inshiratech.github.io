import { useState, useMemo, type ReactNode } from 'react';
import { BLOG_POSTS, FAQS } from '../data';
import { BlogPost } from '../types';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Search,
  ChevronDown,
  User,
  Calendar,
  Layers,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';

interface KnowledgeHubProps {
  onSelectArticle?: (slug: string | undefined) => void;
}

/* ============================================================================
   INLINE MARKDOWN RENDERER
   ----------------------------------------------------------------------------
   Article bodies in data.ts are authored in markdown. The renderer previously
   only handled block-level syntax (###, lists, tables), so inline markers were
   printed literally and readers saw raw "**" all over the page.

   This turns **bold** into <strong> and *italic* into <em>. Anything it does
   not recognise is emitted as plain text, so no markdown syntax ever reaches
   the screen.
   ========================================================================== */
function renderInline(text: string, keyPrefix: string) {
  const nodes: ReactNode[] = [];
  // Split on **bold** first, then *italic*, keeping the delimiters as groups.
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  parts.forEach((part, i) => {
    if (!part) return;
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    } else if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      nodes.push(
        <em key={`${keyPrefix}-i-${i}`} className="italic text-slate-200">
          {part.slice(1, -1)}
        </em>
      );
    } else {
      nodes.push(<span key={`${keyPrefix}-t-${i}`}>{part}</span>);
    }
  });

  return nodes;
}

export default function KnowledgeHub({ onSelectArticle }: KnowledgeHubProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  // Categories extraction
  const categories = useMemo(() => {
    const list = BLOG_POSTS.map((post) => post.category);
    return ['All', ...Array.from(new Set(list))];
  }, []);

  // Filtered Blog Posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleReadPost = (post: BlogPost) => {
    setReadingPost(post);
    if (onSelectArticle) {
      onSelectArticle(post.slug);
    }
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleBackToGrid = () => {
    setReadingPost(null);
    // Clear the article slug too, otherwise the article's title, description
    // and BlogPosting schema would stay applied to the Knowledge Hub index.
    if (onSelectArticle) {
      onSelectArticle(undefined);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div id="knowledge-hub-wrapper" className="space-y-12">
      
      {/* Top Knowledge Hub Interface Header */}
      <div id="knowledge-hub-header-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span className="font-mono text-[10px] text-teal-400 font-bold uppercase tracking-wider">Operational Academy</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-white tracking-tight">
            Industrial Decoupling & Decision Library
          </h3>
          <p className="font-sans text-xs text-slate-400 leading-relaxed">
            We reject marketing hype. Access rigorous, engineering-led guides mapping data logistics, PLC interfaces, causal analytics, and OEE math for mid-market manufacturing lines.
          </p>
        </div>

        {/* Real-time search */}
        <div className="lg:col-span-5 relative">
          <span className="absolute left-3.5 top-3.5 text-slate-500">
            <Search className="w-4.5 h-4.5" />
          </span>
          <input
            type="text"
            placeholder="Search guides (e.g., OEE, downtime, root cause)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-11 pr-4 font-sans text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>
      </div>

      {/* Main Area: Guide View or Cards List */}
      {readingPost ? (
        /* Expanded Article View with elegant markdown styling */
        <article id="expanded-article" className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <button
            onClick={handleBackToGrid}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white font-mono text-[10px] font-bold border border-slate-800 transition-colors"
          >
            ← Back to Library
          </button>

          <div className="space-y-4">
            <span className="px-3 py-1 rounded bg-teal-500/10 border border-teal-500/20 font-mono text-[9px] text-teal-400 uppercase font-bold">
              {readingPost.category}
            </span>
            <h1 className="font-display text-xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
              {readingPost.title}
            </h1>

            {/* Author Meta Row */}
            <div className="flex items-center gap-3.5 pt-2 pb-5 border-b border-slate-850">
              <img
                src={readingPost.author.avatar}
                alt={readingPost.author.name}
                className="w-10 h-10 rounded-full border border-slate-800 object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-display text-xs font-bold text-slate-200 block">
                  {readingPost.author.name}
                  {readingPost.author.credentials && (
                    <span className="font-mono text-[9px] text-teal-400 font-normal ml-1.5">
                      {readingPost.author.credentials}
                    </span>
                  )}
                </span>
                <span className="font-sans text-[10px] text-slate-500 block">{readingPost.author.role}</span>
              </div>
              <div className="ml-auto flex items-center gap-3 font-mono text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {readingPost.publishDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readingPost.readingTime}
                </span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed space-y-5 prose prose-invert max-w-none">
            {readingPost.content.split('\n\n').map((paragraph, pIdx) => {
              const block = paragraph.trim();
              if (!block) return null;

              // Horizontal rule. Previously rendered as a literal "---" line.
              if (/^-{3,}$/.test(block)) {
                return <hr key={pIdx} className="border-slate-850 my-8" />;
              }

              if (block.startsWith('###')) {
                return (
                  <h3 key={pIdx} className="font-display text-sm sm:text-base font-bold text-white pt-4 pb-1 uppercase tracking-wider block">
                    {renderInline(block.replace(/^#{1,6}\s*/, '').trim(), `h${pIdx}`)}
                  </h3>
                );
              }

              // Numbered list, e.g. "1. Contextual Data Orchestration: ..."
              if (/^\d+\.\s/.test(block)) {
                return (
                  <ol key={pIdx} className="list-decimal pl-5 space-y-1.5 marker:text-teal-400 marker:font-semibold">
                    {block.split('\n').map((li, liIdx) => (
                      <li key={liIdx}>
                        {renderInline(li.replace(/^\s*\d+\.\s*/, '').trim(), `o${pIdx}-${liIdx}`)}
                      </li>
                    ))}
                  </ol>
                );
              }

              // Bullet list. Must be checked AFTER bold, since a paragraph can
              // legitimately begin with "**". Only treat "* " or "- " as bullets.
              if (/^[*-]\s/.test(block)) {
                return (
                  <ul key={pIdx} className="list-disc pl-5 space-y-1.5 marker:text-teal-400">
                    {block.split('\n').map((li, liIdx) => (
                      <li key={liIdx}>
                        {renderInline(li.replace(/^\s*[*-]\s*/, '').trim(), `u${pIdx}-${liIdx}`)}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.trim().startsWith('|')) {
                // Table simple rendering
                const rows = paragraph.trim().split('\n').filter(r => r.length > 0);
                return (
                  <div key={pIdx} className="overflow-x-auto my-6 border border-slate-850 rounded-xl">
                    <table className="min-w-full divide-y divide-slate-850 text-left font-sans text-xs">
                      <tbody className="divide-y divide-slate-900 bg-slate-950">
                        {rows.map((row, rIdx) => {
                          const cells = row.split('|').filter(c => c.trim() !== '');
                          const isHeader = rIdx === 0;
                          const isSeparator = row.includes(':---') || row.includes('---');
                          if (isSeparator) return null;
                          return (
                            <tr key={rIdx} className={isHeader ? 'bg-slate-900 text-white font-semibold' : 'text-slate-300'}>
                              {cells.map((cell, cIdx) => (
                                <td key={cIdx} className="px-4 py-3 font-sans">
                                  {renderInline(cell.trim(), `c${pIdx}-${rIdx}-${cIdx}`)}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }
              return (
                <p key={pIdx} className="whitespace-pre-line">
                  {renderInline(block, `p${pIdx}`)}
                </p>
              );
            })}
          </div>

          {/* Quick Newsletter Sign-Up Anchor */}
          <div className="mt-8 pt-6 border-t border-slate-850 bg-slate-900/40 p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-display text-xs font-bold text-white block">Subscribe to SME Operations Intelligence Digest</span>
              <p className="font-sans text-[11px] text-slate-400">Receive 1 practical diagnostic playbook per month. Zero buzzwords, guaranteed.</p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="plant.manager@company.com"
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs placeholder-slate-600 focus:outline-none focus:border-teal-500"
              />
              <button
                onClick={() => alert('Thank you! You are subscribed to the Operations Digest.')}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono text-[10px] font-bold uppercase rounded-lg tracking-wide transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </article>
      ) : (
        /* Guides Library Grid layout */
        <div id="guides-grid-section" className="space-y-6">
          {/* Category Tabs */}
          <div id="category-tabs" className="flex flex-wrap gap-2 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-[10px] font-bold tracking-wide transition-all uppercase ${
                  selectedCategory === cat
                    ? 'bg-teal-500 text-slate-950'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/20 border border-slate-850 rounded-xl">
              <p className="font-sans text-xs text-slate-500">No guides matching your query in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  id={`article-card-${post.id}`}
                  className="bg-slate-950 border border-slate-850 rounded-xl p-5 hover:border-slate-700 transition-all hover:-translate-y-0.5 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[8.5px] text-teal-400 font-bold uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="font-mono text-[8.5px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>

                    <h4
                      onClick={() => handleReadPost(post)}
                      className="font-display text-sm font-bold text-white group-hover:text-teal-400 transition-colors cursor-pointer leading-snug"
                    >
                      {post.title}
                    </h4>

                    <p className="font-sans text-[11.5px] text-slate-400 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-900 mt-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full border border-slate-800 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="font-sans text-[10px] text-slate-300 font-semibold">{post.author.name}</span>
                    </div>

                    <button
                      onClick={() => handleReadPost(post)}
                      className="flex items-center gap-1 font-mono text-[9px] font-bold text-teal-400 group-hover:text-teal-300 uppercase tracking-wider"
                    >
                      Read Guide
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Accordion FAQs Panel */}
      <div id="faqs-panel" className="bg-slate-900/20 p-6 rounded-2xl border border-slate-800 space-y-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center gap-1 justify-center sm:justify-start">
            <HelpCircle className="w-4 h-4 text-teal-400" />
            <span className="font-mono text-[9px] text-teal-400 font-bold uppercase tracking-wider">Common Inquiries</span>
          </div>
          <h4 className="font-display text-lg font-bold text-white uppercase tracking-wider">Frequently Asked Questions</h4>
          <p className="font-sans text-xs text-slate-400 max-w-xl">
            SME plant engineers are naturally skeptical. We outline the mechanical, mathematical, and logistical truths here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                id={`faq-accordion-item-${index}`}
                className="bg-slate-950 rounded-xl border border-slate-850 p-4 transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-start text-left gap-3 focus:outline-none"
                >
                  <span className="font-display text-xs sm:text-sm font-bold text-white tracking-wide">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 mt-0.5 transition-transform shrink-0 ${
                    isOpen ? 'rotate-180 text-teal-400' : ''
                  }`} />
                </button>

                {isOpen && (
                  <p className="font-sans text-xs text-slate-400 leading-relaxed mt-2.5 pt-2.5 border-t border-slate-900">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
