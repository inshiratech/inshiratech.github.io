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
   BLOCK MARKDOWN RENDERER
   ----------------------------------------------------------------------------
   Works line by line rather than per blank-line block. The article source
   frequently packs a heading, an intro sentence and its bullets into a single
   block with no blank lines between them, e.g.

     #### 2. The Lack of Economic Quantification
     When a machine goes down..., it does not translate that event into:
     * **The direct labor cost** of idle operators (£350)

   A block-level check only ever inspected the first line, so everything after
   it was swallowed into a heading or a paragraph and the raw markers leaked
   onto the page. Scanning per line keeps each construct intact.
   ========================================================================== */
function renderMarkdown(content: string): ReactNode[] {
  const lines = content.split('\n');
  const out: ReactNode[] = [];

  let buffer: string[] = [];
  let mode: 'text' | 'ul' | 'ol' | 'table' = 'text';

  const isBullet = (l: string) => /^\s*[*-]\s+/.test(l);
  const isNumbered = (l: string) => /^\s*\d+\.\s+/.test(l);
  const isHeading = (l: string) => /^\s*#{1,6}\s+/.test(l);
  const isRule = (l: string) => /^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(l);
  const isTable = (l: string) => /^\s*\|/.test(l);

  const flush = () => {
    if (!buffer.length) return;
    const items = buffer;
    const k = out.length;
    buffer = [];

    if (mode === 'ul') {
      out.push(
        <ul key={`ul-${k}`} className="list-disc pl-5 space-y-1.5 marker:text-teal-400">
          {items.map((li, i) => (
            <li key={i}>{renderInline(li.replace(/^\s*[*-]\s+/, '').trim(), `u${k}-${i}`)}</li>
          ))}
        </ul>
      );
    } else if (mode === 'ol') {
      out.push(
        <ol key={`ol-${k}`} className="list-decimal pl-5 space-y-1.5 marker:text-teal-400 marker:font-semibold">
          {items.map((li, i) => (
            <li key={i}>{renderInline(li.replace(/^\s*\d+\.\s+/, '').trim(), `o${k}-${i}`)}</li>
          ))}
        </ol>
      );
    } else if (mode === 'table') {
      const rows = items.filter((r) => r.trim() && !/^\s*\|[\s:|-]+\|?\s*$/.test(r));
      out.push(
        <div key={`tb-${k}`} className="overflow-x-auto my-6 border border-slate-850 rounded-xl">
          <table className="min-w-full divide-y divide-slate-850 text-left font-sans text-xs">
            <tbody className="divide-y divide-slate-900 bg-slate-950">
              {rows.map((row, rIdx) => {
                const cells = row.split('|').filter((c) => c.trim() !== '');
                const isHeader = rIdx === 0;
                return (
                  <tr key={rIdx} className={isHeader ? 'bg-slate-900 text-white font-semibold' : 'text-slate-300'}>
                    {cells.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 font-sans align-top">
                        {renderInline(cell.trim(), `c${k}-${rIdx}-${cIdx}`)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      const text = items.join('\n').trim();
      if (text) {
        out.push(
          <p key={`p-${k}`} className="whitespace-pre-line">
            {renderInline(text, `p${k}`)}
          </p>
        );
      }
    }
  };

  lines.forEach((line) => {
    if (isRule(line)) {
      flush();
      mode = 'text';
      out.push(<hr key={`hr-${out.length}`} className="border-slate-850 my-8" />);
      return;
    }

    if (isHeading(line)) {
      flush();
      mode = 'text';
      const level = (line.match(/^\s*(#{1,6})/) as RegExpMatchArray)[1].length;
      const text = line.replace(/^\s*#{1,6}\s+/, '').trim();
      const cls =
        level <= 3
          ? 'font-display text-sm sm:text-base font-bold text-white pt-4 pb-1 uppercase tracking-wider block'
          : 'font-display text-[13px] sm:text-sm font-bold text-slate-100 pt-3 pb-0.5 block';
      out.push(
        <h3 key={`h-${out.length}`} className={cls}>
          {renderInline(text, `h${out.length}`)}
        </h3>
      );
      return;
    }

    const next: typeof mode = isBullet(line)
      ? 'ul'
      : isNumbered(line)
        ? 'ol'
        : isTable(line)
          ? 'table'
          : 'text';

    // A blank line ends the current run.
    if (!line.trim()) {
      flush();
      mode = 'text';
      return;
    }

    if (next !== mode) {
      flush();
      mode = next;
    }
    buffer.push(line);
  });

  flush();
  return out;
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
  /* Split on **bold** first, then *italic*, keeping the delimiters as groups.
     The italic branch requires a non-space, non-asterisk character straight
     after the opening "*". Without that guard, a leftover bullet marker at the
     start of a line pairs with the opening "*" of the next **bold** run — the
     regex matches "* *" as italic-containing-a-space, and every emphasis marker
     after it shifts by one, littering the paragraph with stray asterisks. */
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^\s*][^*]*\*)/g);

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

            {/* Author Meta Row — supports co-written articles */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 pb-5 border-b border-slate-850">
              {[readingPost.author, ...(readingPost.coAuthors ?? [])].map((person, aIdx) => (
                <div key={aIdx} className="flex items-center gap-3">
                  <img
                    src={person.avatar}
                    alt={`${person.name}, ${person.role}`}
                    width={40}
                    height={40}
                    loading="lazy"
                    className="w-10 h-10 rounded-full border border-slate-800 object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="font-display text-xs font-bold text-slate-200 block">
                      {person.name}
                      {person.credentials && (
                        <span className="font-mono text-[9px] text-teal-400 font-normal ml-1.5">
                          {person.credentials}
                        </span>
                      )}
                    </span>
                    <span className="font-sans text-[10px] text-slate-500 block">{person.role}</span>
                  </div>
                </div>
              ))}
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
            {renderMarkdown(readingPost.content)}
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
                      {/* Overlapping avatars when an article is co-written */}
                      <div className="flex -space-x-2 shrink-0">
                        {[post.author, ...(post.coAuthors ?? [])].map((person, aIdx) => (
                          <img
                            key={aIdx}
                            src={person.avatar}
                            alt={person.name}
                            width={24}
                            height={24}
                            loading="lazy"
                            className="w-6 h-6 rounded-full border border-slate-800 object-cover bg-slate-900"
                            referrerPolicy="no-referrer"
                          />
                        ))}
                      </div>
                      <span className="font-sans text-[10px] text-slate-300 font-semibold">
                        {post.coAuthors?.length
                          ? `${post.author.name} & ${post.coAuthors.map((c) => c.name).join(' & ')}`
                          : post.author.name}
                      </span>
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
