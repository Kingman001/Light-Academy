import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { schoolConfig as school } from '../../config/school';
import { publicEnquiryService, PublicEnquiry } from '../../services/publicSiteService';

type Props = {
  onOpenAuth: (role: 'STUDENT' | 'STAFF') => void;
  onGoToPortal: (role?: 'STUDENT' | 'STAFF') => void;
};

const routeLinks = [
  ['/about', 'Our story'],
  ['/academics', 'Academics'],
  ['/admissions', 'Admissions'],
  ['/facilities', 'Facilities'],
  ['/student-life', 'Student life'],
  ['/news', 'News & events'],
  ['/gallery', 'Gallery'],
  ['/contact', 'Contact'],
] as const;

const pathFor = (slug: string) => slug === 'home' ? '/' : `/${slug}`;

function PageLink({ to, navigate, children, className = '', ...anchorProps }: { to: string; navigate: (path: string) => void; className?: string; key?: React.Key } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>) {
  return <a className={className} href={to} onClick={(event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(to);
  }} {...anchorProps}>{children}</a>;
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className={`section-heading${light ? ' section-heading-light' : ''}`}>
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {copy && <p>{copy}</p>}
  </div>;
}

function EnquiryForm({ kind, submitLabel, compact = false }: { kind: PublicEnquiry['kind']; submitLabel: string; compact?: boolean }) {
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    const values = new FormData(form);
    const enquiry: PublicEnquiry = {
      kind,
      name: String(values.get('name') ?? '').trim(),
      email: String(values.get('email') ?? '').trim(),
      phone: String(values.get('phone') ?? '').trim() || undefined,
      message: String(values.get('message') ?? '').trim() || undefined,
      program: String(values.get('program') ?? '').trim() || undefined,
      entryLevel: String(values.get('entryLevel') ?? '').trim() || undefined,
      date: String(values.get('date') ?? '').trim() || undefined,
      time: String(values.get('time') ?? '').trim() || undefined,
    };
    setBusy(true);
    setError('');
    try {
      const result = await publicEnquiryService.submit(enquiry);
      setMessage(result.message);
      setDone(true);
      if (result.status === 'sent') form.reset();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'We could not process this request. Please try again or contact the school.');
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  return <div className={`enquiry-card${compact ? ' enquiry-card-compact' : ''}`}>
    {done ? <div className="form-status" role="status" aria-live="polite">
      <span className="status-icon" aria-hidden="true">✓</span>
      <h3>{kind === 'tour' ? 'Tour request prepared' : kind === 'newsletter' ? 'Subscription request prepared' : 'Enquiry prepared'}</h3>
      <p>{message}</p>
      <button className="button button-outline" onClick={() => { setDone(false); setMessage(''); }}>Send another</button>
    </div> : <form onSubmit={handleSubmit}>
      <div className="form-intro">
        <span className="eyebrow">{kind === 'tour' ? 'Visit the campus' : kind === 'admissions' ? 'Start a conversation' : kind === 'newsletter' ? 'Stay in touch' : 'We are here to help'}</span>
        <h2>{kind === 'tour' ? 'Request a school tour' : kind === 'admissions' ? 'Enquire about admissions' : kind === 'newsletter' ? 'Join the school mailing list' : 'Send us a message'}</h2>
        <p>{kind === 'tour' ? 'Choose a preferred weekday and time. This is a request, not a confirmed booking.' : 'Share only the information needed for the school to respond. This demonstration form does not send or store information.'}</p>
      </div>
      <div className="form-grid">
        <label>Your name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required maxLength={100} /></label>
        <label>Email address <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        {kind !== 'newsletter' && <label>Phone number <span className="optional">(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} /></label>}
        {kind === 'admissions' && <>
          <label>Programme of interest <select name="program" defaultValue=""><option value="">Select a programme</option>{school.programs.map(program => <option key={program.id} value={program.name}>{program.name}</option>)}</select></label>
          <label>Intended entry level <input name="entryLevel" maxLength={80} /></label>
        </>}
        {kind === 'tour' && <>
          <label>Preferred date <select name="date" required defaultValue=""><option value="">Choose a weekday</option>{school.tourDates.map(date => <option key={date} value={date}>{new Date(`${date}T12:00:00`).toLocaleDateString(school.identity.language, { weekday: 'long', day: 'numeric', month: 'long' })}</option>)}</select></label>
          <label>Preferred time <select name="time" required defaultValue=""><option value="">Choose a time</option>{school.tourTimes.map(time => <option key={time} value={time}>{time}</option>)}</select></label>
        </>}
        {kind !== 'newsletter' && <label className="form-wide">{kind === 'tour' ? 'Anything we should know? (optional)' : 'Message'}<textarea name="message" rows={compact ? 3 : 4} maxLength={1500} required={kind !== 'tour'} /></label>}
      </div>
      {kind === 'newsletter' && <label className="consent-check"><input type="checkbox" required /> I agree to receive school updates. I can unsubscribe at any time.</label>}
      <button type="submit" className="button button-primary form-submit" disabled={busy}>{busy ? 'Preparing…' : submitLabel} <Arrow /></button>
      {error && <p className="form-error" role="alert">{error}</p>}
      <p className="form-note">Demonstration only: your details are not sent to or stored by the school. {school.contacts.email ? <>Contact the school at <a href={`mailto:${school.contacts.email}`}>{school.contacts.email}</a>.</> : <>Use the <a href="/contact">contact page</a> for verified contact details.</>}</p>
    </form>}
  </div>;
}

function Header({ path, navigate, onOpenAuth, onGoToPortal }: { path: string; navigate: (path: string) => void; onOpenAuth: Props['onOpenAuth']; onGoToPortal: Props['onGoToPortal'] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header">
    {school.announcement.enabled && <div className="announcement"><div className="site-container announcement-inner"><span>{school.announcement.message}</span><PageLink to="/admissions" navigate={navigate}>Explore admissions <Arrow /></PageLink></div></div>}
    <div className="site-container header-inner">
      <PageLink to="/" navigate={navigate} className="brand" aria-label={`${school.identity.name} home`}>
        <span className="brand-mark" aria-hidden="true">L</span>
        <span><strong>{school.identity.name}</strong><small>Learning with purpose</small></span>
      </PageLink>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>
      <nav className={`main-nav${menuOpen ? ' main-nav-open' : ''}`} id="primary-navigation" aria-label="Main navigation">
        {routeLinks.map(([href, label]) => {
          const active = path === href || path.startsWith(`${href}/`);
          return <PageLink key={href} to={href} navigate={(to) => { navigate(to); setMenuOpen(false); }} className={active ? 'active' : ''} aria-current={active ? 'page' : undefined}>{label}</PageLink>;
        })}
        {school.features.portalLinks && <button className="nav-portal" onClick={() => { onGoToPortal('STUDENT'); setMenuOpen(false); }}>Student portal</button>}
        {school.features.portalLinks && <button className="nav-portal" onClick={() => { onOpenAuth('STUDENT'); setMenuOpen(false); }}>Sign in</button>}
        {school.features.admissions && <PageLink to="/admissions" navigate={(to) => { navigate(to); setMenuOpen(false); }} className="button button-primary nav-cta">Enquire now <Arrow /></PageLink>}
      </nav>
    </div>
  </header>;
}

function Footer({ navigate, onGoToPortal }: { navigate: (path: string) => void; onGoToPortal: Props['onGoToPortal'] }) {
  return <footer className="site-footer">
    {school.features.newsletter && <div className="site-container footer-newsletter"><div><span className="eyebrow">From our community</span><h2>School news, thoughtfully shared.</h2></div><EnquiryForm kind="newsletter" submitLabel="Request updates" compact /> </div>}
    <div className="site-container footer-main">
      <div className="footer-brand"><PageLink to="/" navigate={navigate} className="brand brand-light"><span className="brand-mark" aria-hidden="true">L</span><span><strong>{school.identity.name}</strong><small>Learning with purpose</small></span></PageLink><p>{school.identity.tagline}</p><p className="template-disclaimer">Illustrative school template. Replace sample copy and contact details before publishing.</p></div>
      <div><h2>Explore</h2><ul>{routeLinks.slice(0, 5).map(([href, label]) => <li key={href}><PageLink to={href} navigate={navigate}>{label}</PageLink></li>)}</ul></div>
      <div><h2>Information</h2><ul>{routeLinks.slice(5).map(([href, label]) => <li key={href}><PageLink to={href} navigate={navigate}>{label}</PageLink></li>)}{school.policyPages.map(policy => <li key={policy.slug}><PageLink to={`/policies/${policy.slug}`} navigate={navigate}>{policy.title}</PageLink></li>)}<li><PageLink to="/faq" navigate={navigate}>Frequently asked questions</PageLink></li></ul></div>
      <div><h2>Get in touch</h2><address>{school.contacts.address}</address>{school.contacts.phone && <a href={`tel:${school.contacts.phone}`}>{school.contacts.phone}</a>}{school.contacts.email && <a href={`mailto:${school.contacts.email}`}>{school.contacts.email}</a>}{school.features.portalLinks && <button className="footer-portal" onClick={() => onGoToPortal('STAFF')}>Staff portal <Arrow /></button>}<p className="footer-hours">{school.contacts.openingHours}</p></div>
    </div>
    <div className="site-container footer-bottom"><span>© {new Date().getFullYear()} {school.identity.name}</span><span>Website template · Configure and verify content before launch</span></div>
  </footer>;
}

function HomePage({ navigate }: { navigate: (path: string) => void }) {
  return <>
    <section className="hero">
      <img className="hero-image" src={school.image} alt="Welcoming school environment" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="site-container hero-content"><span className="hero-kicker">A thoughtful start. A world of possibility.</span><h1>Where every learner can <em>become more.</em></h1><p>{school.identity.tagline} Discover a community built around curiosity, care and meaningful learning.</p><div className="hero-actions"><PageLink to="/admissions" navigate={navigate} className="button button-light">Explore admissions <Arrow /></PageLink><PageLink to="/about" navigate={navigate} className="hero-secondary">Get to know us <span aria-hidden="true">→</span></PageLink></div><p className="hero-note">Photography and sample copy are illustrative. Replace with school-approved content.</p></div>
      <div className="hero-caption">A place to learn, belong and grow.</div>
    </section>
    <section className="intro-section site-container"><div className="intro-label"><span className="eyebrow">A school for the whole person</span><span className="intro-index">01 — 04</span></div><div className="intro-copy"><h2>Education is more than what happens in a classroom.</h2><p>It is the confidence to ask, the patience to practise and the support to try again. At {school.identity.name}, our approach brings thoughtful teaching and a caring community together.</p><PageLink to="/about" navigate={navigate} className="text-link">Discover our approach <Arrow /></PageLink></div><img className="intro-image" src={school.facilities[0].image} alt={school.facilities[0].alt} loading="lazy" /></section>
    <section className="values-section"><div className="site-container"><SectionHeading eyebrow="How we help learners thrive" title="Grounded in what matters." copy="The details of a school's values should come from its community. Use these guiding principles as a starting point for your own story."/><div className="values-grid">{[
      ['01', 'Curiosity', 'We make space for questions, exploration and the delight of discovering something new.'],
      ['02', 'Belonging', 'Every learner deserves to be known, respected and encouraged to take part.'],
      ['03', 'Growth', 'We value progress, thoughtful challenge and the confidence to keep learning.'],
      ['04', 'Care', 'Trust grows through kindness, responsibility and strong relationships.'],
    ].map(([number, title, copy]) => <article className="value-card" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    <section className="program-section site-container"><SectionHeading eyebrow="Learning at every stage" title="A pathway that grows with them." copy="Explore the learning stages available at this school. Curriculum descriptions are intentionally left for school verification."/><div className="program-grid">{school.programs.map((program, index) => <PageLink key={program.id} to={`/academics/${program.id}`} navigate={navigate} className="program-card"><div className="program-image"><img src={program.image} alt="" loading="lazy" /><span>0{index + 1}</span></div><div className="program-body"><span className="eyebrow">{program.years}</span><h3>{program.name}</h3><p>{program.summary}</p><span className="text-link">Discover the programme <Arrow /></span></div></PageLink>)}</div><div className="center-link"><PageLink to="/academics" navigate={navigate} className="button button-outline">Explore our approach</PageLink></div></section>
    <section className="feature-section"><div className="site-container feature-grid"><div className="feature-image-wrap"><img src={school.facilities[1]?.image} alt="A quiet library space for reading and research" loading="lazy" /><span className="image-label">Room to wonder</span></div><div className="feature-copy"><span className="eyebrow">A place to feel at home</span><h2>Spaces that make learning feel possible.</h2><p>From calm corners for reading to open spaces for collaboration, the environment can shape how learners connect and create.</p><ul>{['A welcoming place to learn', 'Room for movement and creativity', 'People who support every step'].map(item => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul><PageLink to="/facilities" navigate={navigate} className="text-link">Explore the campus <Arrow /></PageLink></div></div></section>
    <section className="life-section site-container"><div className="life-copy"><span className="eyebrow">Beyond the timetable</span><h2>Learning to take part in the world.</h2><p>Clubs, creative projects, sport and service can help learners find their interests and build meaningful connections. Replace these examples with activities actually offered by your school.</p><PageLink to="/student-life" navigate={navigate} className="button button-primary">Discover student life <Arrow /></PageLink></div><div className="life-images"><img src={school.gallery[3].image} alt="Learners sharing an activity" loading="lazy" /><img src={school.gallery[4].image} alt="Art supplies in a creative learning space" loading="lazy" /></div></section>
    <section className="news-section"><div className="site-container"><div className="section-row"><SectionHeading eyebrow="Notes from our community" title="The latest from school." copy="Illustrative stories are provided to show how school news can be presented."/><PageLink to="/news" navigate={navigate} className="text-link">All news and events <Arrow /></PageLink></div><div className="news-grid">{school.articles.slice(0, 3).map(article => <PageLink key={article.slug} to={`/news/${article.slug}`} navigate={navigate} className="news-card"><img src={article.image} alt="" loading="lazy" /><div><span className="news-meta">{article.category} <span>·</span> {new Date(`${article.date}T12:00:00`).toLocaleDateString(school.identity.language, { day: 'numeric', month: 'long', year: 'numeric' })}</span><h3>{article.title}</h3><p>{article.summary}</p><span className="text-link">Read story <Arrow /></span></div></PageLink>)}</div></div></section>
    <section className="admissions-callout"><div className="site-container callout-inner"><div><span className="eyebrow">Your next chapter</span><h2>Come and see what learning can feel like.</h2><p>Ask a question, explore a programme or request a campus visit.</p></div><div className="callout-actions"><PageLink to="/admissions" navigate={navigate} className="button button-light">Admissions enquiries <Arrow /></PageLink><PageLink to="/contact" navigate={navigate} className="callout-link">Talk to the school <span aria-hidden="true">→</span></PageLink></div></div></section>
  </>;
}

function StandardPage({ title, eyebrow, copy, children }: { title: string; eyebrow: string; copy: string; children: React.ReactNode }) {
  return <><section className="page-hero"><div className="site-container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div></section>{children}</>;
}

function AboutPage({ navigate }: { navigate: (path: string) => void }) {
  return <StandardPage eyebrow="The story behind the school" title="A community with room to grow." copy="Every school has a story worth telling. Replace this starter content with your school's verified history, leadership and educational philosophy."><div className="site-container page-content"><div className="about-feature"><img src={school.image} alt="School environment" loading="lazy" /><div><span className="eyebrow">Our story</span><h2>Learning, shaped by people and purpose.</h2><p>{school.identity.name} is presented here as a reusable school website template. Add the school's founding story, milestones and local context here; confirm all dates and claims with authorised school representatives.</p><p>Share what the community values, what learners experience day to day and how families can take part.</p><PageLink to="/academics" navigate={navigate} className="text-link">Explore academics <Arrow /></PageLink></div></div><div className="mission-grid"><article><span className="eyebrow">Our mission</span><h2>Give every learner the support to discover their strengths.</h2><p>Replace with the school's approved mission statement.</p></article><article><span className="eyebrow">Our vision</span><h2>Build a future shaped by thoughtful, confident learners.</h2><p>Replace with the school's approved vision statement.</p></article></div><SectionHeading eyebrow="Leadership and safeguarding" title="Trust starts with clarity." copy="Add verified leadership names, roles and approved biographies only when supplied by the school. Publish safeguarding contacts and procedures only after approval by the safeguarding lead."/><div className="callout-inline"><p>Review and approve all school history, leadership and safeguarding information before publishing.</p><PageLink to="/policies/safeguarding" navigate={navigate} className="text-link">Read safeguarding information <Arrow /></PageLink></div></div></StandardPage>;
}

function AcademicsPage({ navigate, path }: { navigate: (path: string) => void; path: string }) {
  const detail = path.startsWith('/academics/') ? school.programs.find(program => program.id === path.split('/')[2]) : undefined;
  if (path.startsWith('/academics/') && !detail) return <StandardPage eyebrow="Learning pathways" title="Programme not found" copy="This programme may have moved or is not enabled for this school."><div className="site-container page-content"><PageLink to="/academics" navigate={navigate} className="text-link">View all programmes <Arrow /></PageLink></div></StandardPage>;
  if (detail) return <StandardPage eyebrow={detail.years} title={detail.name} copy={detail.summary}><div className="site-container page-content program-detail"><img src={detail.image} alt="" /><div><span className="eyebrow">Programme overview</span><h2>A considered next step in learning.</h2><p>{detail.summary}</p><h3>Curriculum and learning areas</h3><p>{detail.curriculum}</p><h3>Teaching and learning</h3><p>Add the school's verified teaching approach, intended learning outcomes, year levels, subjects, facilities and co-curricular opportunities.</p><PageLink to="/admissions" navigate={navigate} className="button button-primary">Ask about this programme <Arrow /></PageLink></div></div></StandardPage>;
  return <StandardPage eyebrow="Learning pathways" title="A thoughtful approach to learning." copy="Explore the programmes enabled for this school. Add age ranges, year levels, curriculum and outcomes only after they have been verified."><div className="site-container page-content"><div className="program-grid">{school.programs.map(program => <PageLink key={program.id} to={`/academics/${program.id}`} navigate={navigate} className="program-card"><div className="program-image"><img src={program.image} alt="" loading="lazy" /></div><div className="program-body"><span className="eyebrow">{program.years}</span><h3>{program.name}</h3><p>{program.summary}</p><span className="text-link">Programme details <Arrow /></span></div></PageLink>)}</div><div className="page-cta"><p>Not sure which programme is right? Our admissions enquiry form is a good place to start.</p><PageLink to="/admissions" navigate={navigate} className="button button-primary">Talk to admissions <Arrow /></PageLink></div></div></StandardPage>;
}

function AdmissionsPage() {
  return <StandardPage eyebrow="Admissions" title="Begin with a conversation." copy="We welcome questions from families exploring the next step. This sample admissions process must be reviewed and completed by the school before launch."><div className="site-container page-content admissions-layout"><div><SectionHeading eyebrow="A clear first step" title="What to expect."/><div className="steps">{[['01', 'Make an enquiry', 'Tell us which programme you are considering and how to reach you.'], ['02', 'Speak with the school', 'A school representative can explain current entry requirements and availability.'], ['03', 'Learn about next steps', 'The school will provide its approved application information and any assessment details.'], ['04', 'Plan a visit', 'Request a tour to explore the learning environment with the school.']].map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div><div className="note-panel"><h3>Information to confirm</h3><p>Entry requirements, required documents, assessment dates, application timelines and fees should be supplied by the school. This template does not make an application or reserve a place.</p></div></div><EnquiryForm kind="admissions" submitLabel="Prepare enquiry" /></div><div className="site-container page-content tour-section"><SectionHeading eyebrow="Visit us" title="See the school for yourself." copy="Choose a preferred weekday and time. A tour request is not a confirmed reservation."/><EnquiryForm kind="tour" submitLabel="Prepare tour request" /></div></StandardPage>;
}

function FacilitiesPage() {
  const facilities = school.facilities.filter(facility => facility.enabled);
  return <StandardPage eyebrow="Our environment" title="Space to explore, make and grow." copy="Explore the facilities configured for this school. Replace sample photography and descriptions with approved, current campus information."><div className="site-container page-content"><div className="facility-grid">{facilities.map((facility, index) => <article className="facility-card" key={facility.name}><img src={facility.image} alt={facility.alt} loading="lazy" /><div><span className="eyebrow">0{index + 1}</span><h2>{facility.name}</h2><p>{facility.summary}</p></div></article>)}</div>{facilities.length === 0 && <p className="empty-state">Facility information will be added soon.</p>}</div></StandardPage>;
}

function StudentLifePage() {
  return <StandardPage eyebrow="Beyond the classroom" title="Learning continues in every direction." copy="Student life is where learners explore interests, build friendships and find new ways to contribute. Adapt each example to reflect real activities at your school."><div className="site-container page-content"><div className="life-editorial"><div><span className="eyebrow">Discover what matters to you</span><h2>Room for every kind of talent.</h2><p>Creative arts, sports, clubs and community activities help learners practise skills that cannot be measured by a timetable alone. Share the school's approved clubs, events and leadership opportunities here.</p><p>Include a clear description of wellbeing, pastoral support and how families can raise a concern.</p></div><img src={school.gallery[3].image} alt={school.gallery[3].alt} loading="lazy" /></div><div className="life-list">{[['Clubs and societies', 'Add the clubs and societies currently offered.'], ['Sport and movement', 'Share the sports, physical education and recreational activities available.'], ['Arts and expression', 'Describe verified opportunities for music, drama, art and creative practice.'], ['Wellbeing and community', 'Explain pastoral care and community activities using approved school information.']].map(([title, copy]) => <article key={title}><span aria-hidden="true">↗</span><div><h2>{title}</h2><p>{copy}</p></div></article>)}</div></div></StandardPage>;
}

function NewsPage({ navigate, path }: { navigate: (path: string) => void; path: string }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const article = path.startsWith('/news/') ? school.articles.find(item => item.slug === path.split('/')[2]) : undefined;
  const categories = ['All', ...new Set(school.articles.map(item => item.category))];
  const filtered = school.articles.filter(item => (category === 'All' || category === item.category) && `${item.title} ${item.summary}`.toLowerCase().includes(search.toLowerCase()));
  if (path.startsWith('/news/') && article) return <StandardPage eyebrow={`${article.category} · ${article.date}`} title={article.title} copy={article.summary}><article className="site-container article-content"><img src={article.image} alt="" /><p>{article.body}</p><p className="template-disclaimer">Illustrative sample article. Replace with a school-approved story before publishing.</p><button className="button button-outline" onClick={() => { if (navigator.share) void navigator.share({ title: article.title, url: window.location.href }); else void navigator.clipboard?.writeText(window.location.href); }}>Share this story <Arrow /></button><div className="related-stories"><h2>More from our community</h2>{school.articles.filter(item => item.slug !== article.slug).slice(0, 2).map(item => <PageLink key={item.slug} to={`/news/${item.slug}`} navigate={navigate}>{item.title} <Arrow /></PageLink>)}</div></article></StandardPage>;
  if (path.startsWith('/news/') && !article) return <StandardPage eyebrow="News and events" title="Story not found" copy="This story may have moved."><div className="site-container page-content"><PageLink to="/news" navigate={navigate} className="text-link">Browse all stories <Arrow /></PageLink></div></StandardPage>;
  return <StandardPage eyebrow="Notes from our community" title="News, stories and school events." copy="A content-led space to share approved school updates, community stories and upcoming events. Sample stories are illustrative."><div className="site-container page-content"><div className="news-controls"><label className="search-label">Search stories<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Try a topic or keyword" /></label><div className="filter-list" aria-label="Filter by category">{categories.map(item => <button key={item} className={category === item ? 'filter-active' : ''} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}</div></div>{filtered.length ? <div className="news-grid">{filtered.map(item => <PageLink key={item.slug} to={`/news/${item.slug}`} navigate={navigate} className="news-card"><img src={item.image} alt="" loading="lazy" /><div><span className="news-meta">{item.category} <span>·</span> {new Date(`${item.date}T12:00:00`).toLocaleDateString(school.identity.language, { day: 'numeric', month: 'long', year: 'numeric' })}</span><h3>{item.title}</h3><p>{item.summary}</p><span className="text-link">Read story <Arrow /></span></div></PageLink>)}</div> : <p className="empty-state">No stories match that search. Try another word or category.</p>}<section className="events-section"><span className="eyebrow">On the school calendar</span><h2>Upcoming events</h2>{school.events.length ? <div className="event-list">{school.events.map(event => <article key={event.slug}><time dateTime={event.date}>{new Date(`${event.date}T12:00:00`).toLocaleDateString(school.identity.language, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</time><div><h3>{event.title}</h3><p>{event.summary}</p>{event.location && <span>{event.location}</span>}</div></article>)}</div> : <p className="empty-state">School events will be shared here when confirmed.</p>}</section></div></StandardPage>;
}

function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);
  const [category, setCategory] = useState('All');
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const items = school.gallery.filter(item => category === 'All' || item.category === category);
  const categories = ['All', ...new Set(school.gallery.map(item => item.category))];
  useEffect(() => {
    if (active === null) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (event.key === 'ArrowRight') setActive(current => current === null ? null : (current + 1) % items.length);
      if (event.key === 'ArrowLeft') setActive(current => current === null ? null : (current + items.length - 1) % items.length);
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); triggerRef.current?.focus(); previousFocus?.focus(); };
  }, [active, items.length]);
  return <StandardPage eyebrow="A glimpse of school life" title="Moments that make a community." copy="Replace these illustrative images with school-approved photographs. Obtain appropriate authorisation and complete a safeguarding review before publishing identifiable images of children."><div className="site-container page-content"><div className="filter-list" aria-label="Filter gallery">{categories.map(item => <button key={item} className={category === item ? 'filter-active' : ''} onClick={() => { setCategory(item); setActive(null); }} aria-pressed={category === item}>{item}</button>)}</div><div className="gallery-grid">{items.map((item, index) => <button className="gallery-item" key={`${item.image}-${item.category}`} onClick={event => { triggerRef.current = event.currentTarget; setActive(index); }} aria-label={`View image: ${item.alt}`}><img src={item.image} alt={item.alt} loading="lazy" onError={event => { event.currentTarget.hidden = true; }} /><span>{item.category}</span></button>)}</div></div>{active !== null && items[active] && <div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label="Image preview" tabIndex={-1} onClick={() => setActive(null)}><button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close image preview">×</button><button className="lightbox-prev" onClick={event => { event.stopPropagation(); setActive((active + items.length - 1) % items.length); }} aria-label="Previous image">←</button><figure onClick={event => event.stopPropagation()}><img src={items[active].image} alt={items[active].alt} /><figcaption>{items[active].alt}</figcaption></figure><button className="lightbox-next" onClick={event => { event.stopPropagation(); setActive((active + 1) % items.length); }} aria-label="Next image">→</button></div>}</StandardPage>;
}

function ContactPage() {
  return <StandardPage eyebrow="Contact" title="A good conversation starts here." copy="Reach the school with a question or enquiry. Confirm and replace all contact details before publishing."><div className="site-container page-content contact-layout"><div className="contact-details"><span className="eyebrow">School office</span><h2>We would be glad to hear from you.</h2><address>{school.contacts.address}</address>{school.contacts.phone ? <a href={`tel:${school.contacts.phone}`}>{school.contacts.phone}</a> : <p>School telephone: add verified number before launch</p>}{school.contacts.email ? <a href={`mailto:${school.contacts.email}`}>{school.contacts.email}</a> : <p>School email: add verified address before launch</p>}<p>{school.contacts.openingHours}</p>{school.features.whatsapp && school.contacts.whatsappNumber && <a className="button button-primary" href={`https://wa.me/${school.contacts.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">Message us on WhatsApp <Arrow /></a>}{school.features.mapEmbed && school.contacts.mapEmbedUrl && <iframe className="contact-map" title={`Map showing ${school.identity.name}`} src={school.contacts.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" sandbox="allow-scripts allow-same-origin" />}</div><EnquiryForm kind="contact" submitLabel="Prepare enquiry" /></div></StandardPage>;
}

function FaqPage() {
  const [search, setSearch] = useState('');
  const results = school.faqs.filter(item => `${item.question} ${item.answer} ${item.category}`.toLowerCase().includes(search.toLowerCase()));
  const categories = [...new Set(results.map(item => item.category))];
  return <StandardPage eyebrow="Helpful answers" title="Frequently asked questions." copy="Search for common information or get in touch with the school for details that are specific to your family."><div className="site-container page-content faq-content"><label className="search-label">Search questions<input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search admissions, fees, transport…" /></label>{categories.length ? categories.map(category => <section key={category}><h2>{category}</h2><div className="faq-list">{results.filter(item => item.category === category).map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></section>) : <p className="empty-state">No questions match your search.</p>}</div></StandardPage>;
}

function PolicyPage({ path }: { path: string }) {
  const policy = school.policyPages.find(item => item.slug === path.split('/')[2]);
  if (!policy) return <StandardPage eyebrow="School information" title="Policy not found" copy="This page may not be enabled for this school."><div className="site-container page-content"><p>Contact the school for its current policies.</p></div></StandardPage>;
  return <StandardPage eyebrow="School information" title={policy.title} copy="A starter template for school review. This page is not legal advice or a claim of compliance."><article className="site-container policy-content"><p>{policy.body}</p><p className="policy-warning">This starter policy must be completed and approved by the school's authorised representative before publication.</p><p>Last reviewed: add date</p></article></StandardPage>;
}

export function PublicSite({ onOpenAuth, onGoToPortal }: Props) {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/+$/, '') || '/');
  const navigate = (nextPath: string) => {
    if (nextPath === path) return;
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    const onPopState = () => { setPath(window.location.pathname.replace(/\/+$/, '') || '/'); window.scrollTo(0, 0); };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
  const pageTitle = useMemo(() => {
    if (path.startsWith('/policies/')) return school.policyPages.find(page => page.slug === path.split('/')[2])?.title ?? 'School policy';
    if (path.startsWith('/academics/')) return school.programs.find(program => program.id === path.split('/')[2])?.name ?? 'Programme';
    if (path.startsWith('/news/')) return school.articles.find(article => article.slug === path.split('/')[2])?.title ?? 'School news';
    return ({ '/': 'Home', '/about': 'About us', '/academics': 'Academics', '/admissions': 'Admissions', '/facilities': 'Facilities', '/student-life': 'Student life', '/news': 'News and events', '/gallery': 'Gallery', '/contact': 'Contact', '/faq': 'Frequently asked questions' } as Record<string, string>)[path] ?? 'Page not found';
  }, [path]);
  useEffect(() => {
    document.title = `${pageTitle} | ${school.identity.name}`;
    const description = `${pageTitle} at ${school.identity.name}. ${school.identity.tagline}`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.append(meta); }
    meta.content = description;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `${(school.identity.canonicalUrl || window.location.origin).replace(/\/$/, '')}${path}`;
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = `${pageTitle} | ${school.identity.name}`;
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = description;
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = `${(school.identity.canonicalUrl || window.location.origin).replace(/\/$/, '')}${path}`;
    const ogImage = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (ogImage) ogImage.content = school.image;
    const structuredData = document.getElementById('school-structured-data') ?? document.createElement('script');
    structuredData.id = 'school-structured-data';
    structuredData.setAttribute('type', 'application/ld+json');
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'School',
      name: school.identity.name,
      url: `${(school.identity.canonicalUrl || window.location.origin).replace(/\/$/, '')}${path}`,
      ...(school.contacts.email ? { email: school.contacts.email } : {}),
      ...(school.contacts.phone ? { telephone: school.contacts.phone } : {}),
      ...(school.contacts.address && !school.contacts.address.startsWith('Add your') ? { address: school.contacts.address } : {}),
    });
    document.head.append(structuredData);
  }, [path, pageTitle]);
  const content = () => {
    if (path === '/') return <HomePage navigate={navigate} />;
    if (path === '/about') return <AboutPage navigate={navigate} />;
    if (path === '/academics' || path.startsWith('/academics/')) return <AcademicsPage navigate={navigate} path={path} />;
    if (path === '/admissions') return school.features.admissions ? <AdmissionsPage /> : <StandardPage eyebrow="Admissions" title="Admissions information" copy="Contact the school for current admissions information."><div className="site-container page-content"><p>Online admissions enquiries are not enabled.</p></div></StandardPage>;
    if (path === '/facilities') return <FacilitiesPage />;
    if (path === '/student-life') return <StudentLifePage />;
    if (path === '/news' || path.startsWith('/news/')) return <NewsPage navigate={navigate} path={path} />;
    if (path === '/gallery') return school.features.gallery ? <GalleryPage /> : <StandardPage eyebrow="Gallery" title="Gallery" copy="Gallery is not enabled for this school."><div className="site-container page-content" /></StandardPage>;
    if (path === '/contact') return <ContactPage />;
    if (path === '/faq') return <FaqPage />;
    if (path.startsWith('/policies/')) return <PolicyPage path={path} />;
    return <StandardPage eyebrow="Not found" title="This page is not here." copy="The page may have moved or the address may be incorrect."><div className="site-container page-content"><PageLink to="/" navigate={navigate} className="button button-primary">Return to the home page</PageLink></div></StandardPage>;
  };
  return <div className="public-site" style={{ '--primary': school.theme.primary, '--primary-dark': school.theme.primaryDark, '--secondary': school.theme.secondary, '--background': school.theme.background, '--surface': school.theme.surface, '--accent': school.theme.accent, '--text': school.theme.text, '--muted': school.theme.muted, '--border': school.theme.border } as React.CSSProperties}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Header path={path} navigate={navigate} onOpenAuth={onOpenAuth} onGoToPortal={onGoToPortal} />
    <main id="main-content">{content()}</main>
    <Footer navigate={navigate} onGoToPortal={onGoToPortal} />
    {school.features.whatsapp && school.contacts.whatsappNumber && <a className="whatsapp-float" href={`https://wa.me/${school.contacts.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" aria-label={`Contact ${school.identity.name} on WhatsApp`}>Chat with us</a>}
    <button className="back-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
  </div>;
}
