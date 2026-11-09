"use client";

import { useEffect, useRef, useState } from "react";

const photo = (id: string, width = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const images = {
 hero: photo("photo-1600607687920-4e2a09cf159d", 2400),
 house: photo("photo-1600596542815-ffad4c1539a9"),
 interior: photo("photo-1600210492486-724fe5c67fb0"),
 detail: photo("photo-1600607687939-ce8a6c25118c"),
 retreat: photo("photo-1600047509782-20d39509f26d", 2400),
};
const works = [
 { title: "Project 01 — Design", type: "Architectural visualization", image: "./works/1./design.png", place: "The vision for a contemporary residence.", year: "Design" },
 { title: "Project 01 — Reality", type: "Construction in progress", image: "./works/1./reality.png", place: "The same vision, taking shape on site.", year: "In progress" },
 { title: "The Garden Retreat", type: "Architecture & interiors", image: images.retreat, place: "An open conversation with nature.", year: "2025" },
];
export default function Home() {
 const [menu, setMenu] = useState(false);
 const [active, setActive] = useState(0);
 const [stage, setStage] = useState(0);
 const [service, setService] = useState<number | null>(null);
 const [project, setProject] = useState<number | null>(null);
 const [contact, setContact] = useState(false);
 const dialog = useRef<HTMLDialogElement>(null);
 useEffect(() => {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame = 0;
  const update = () => { frame = 0; document.documentElement.style.setProperty("--scroll", `${Math.min(window.scrollY, 1100)}px`); document.querySelector("header")?.classList.toggle("scrolled", window.scrollY > 50); };
  const scroll = () => { if (!reduced.matches && !frame) frame = requestAnimationFrame(update); };
  window.addEventListener("scroll", scroll, { passive: true }); update();
  return () => { observer.disconnect(); window.removeEventListener("scroll", scroll); cancelAnimationFrame(frame); };
 }, []);
 useEffect(() => { if (project !== null || contact) dialog.current?.showModal(); else dialog.current?.close(); }, [project, contact]);
 useEffect(() => { document.body.style.overflow = menu || project !== null || contact ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menu, project, contact]);
 const close = () => { setProject(null); setContact(false); };
 return <>
  <header>
   <a className="logo" href="#home" aria-label="Aman the Architect home">aman<span>.</span><small>the architect</small></a>
   <nav className={menu ? "open" : ""} aria-label="Main navigation">{["Projects", "Studio", "Expertise", "Journal", "Contact"].map(item => <a href={`#${item.toLowerCase()}`} key={item} onClick={() => setMenu(false)}>{item}</a>)}</nav>
   <button className="menu-toggle" aria-expanded={menu} aria-label={menu ? "Close menu" : "Open menu"} onClick={() => setMenu(!menu)}>{menu ? "Close −" : "Menu +"}</button>
  </header>
  <main>
   <section id="home" className="hero">
    <div className="hero-image"><img src={images.hero} alt="Sunlit contemporary residence with natural stone, glass, and warm timber" fetchPriority="high" /></div>
    <div className="hero-shade" />
    <div className="hero-top"><span>Architecture & interiors</span><span>Aman the Architect</span></div>
    <h1><span>Where Imagination</span><span>Takes <em>Shape</em></span></h1>
    <div className="hero-bottom"><a href="#projects" className="circle-link"><span className="circle">↓</span>Explore our work</a><div className="hero-caption">The art of living well.<span>By design.</span></div></div>
    <div className="hero-wordmark" aria-hidden="true">aman<span>.</span></div>
   </section>
   <section id="projects" className="projects section-pad">
    <div className="section-heading reveal"><h2>Selected <em>work.</em></h2><span className="small-label">From imagination to reality.</span></div>
    <article className="project-story reveal">
     <div className="stage-viewer">
      <button className="stage-image-button" onClick={() => setProject(stage)} aria-label="Enlarge current project image">
       {works.slice(0,2).map((work,i) => <img key={work.image} src={work.image} alt={work.title} className={stage === i ? "stage-image is-active" : "stage-image"} aria-hidden={stage !== i} loading="lazy"/>)}
       <span className="stage-enlarge" aria-hidden="true">↗</span>
      </button>
      <div className="stage-controls" role="group" aria-label="Project stages">
       {["Design", "Ongoing"].map((label,i) => <button key={label} aria-pressed={stage === i} onClick={() => setStage(i)}><span>{i+1}</span>{label}</button>)}
      </div>
     </div>
     <div className="project-caption"><div><h3>Project 01</h3><span>Residential architecture</span></div><span className="stage-status" aria-live="polite">{stage === 0 ? "Design visualization" : "Reality · Construction in progress"}</span></div>
    </article>
    <div className="project-note"><span>One vision. Taking shape.</span><a href="#selected" className="text-link">More spaces <span>↗</span></a></div>
   </section>
   <section id="studio" className="studio section-pad">
    <div className="studio-top reveal"><span className="eyebrow">The studio</span><h2>Less, but<br/><em>more meaningful.</em></h2></div>
    <div className="studio-bottom"><div className="studio-picture image-wrap reveal"><img src={images.detail} alt="Architectural detail in warm natural materials" loading="lazy"/></div><div className="studio-copy reveal"><div className="architect-profile"><img src="./portfolio%20image.png" alt="Aman, the architect" width="76" height="76" loading="lazy"/><div><span>Aman</span><small>The architect</small></div></div><div className="architect-bio"><p className="profile-role">Senior Managing Director<br/><span>ATTIC Designers</span></p><dl><div><dt>Practice</dt><dd>Freelance Architect</dd></div><div><dt>Teaching</dt><dd>Teaching Assistant, Manmohan Memorial Polytechnic</dd></div><div><dt>Previously</dt><dd>ERC, Purwanchal Campus, Dharan</dd></div><div><dt>Education</dt><dd>IOE, Purwanchal Engineering Campus, Dharan</dd></div><div><dt>Based in</dt><dd>Urlabari, Morang</dd></div></dl></div><p>We believe the most beautiful spaces are the ones that make you feel something.</p><p className="secondary">A considered approach to architecture and interiors. Rooted in place, shaped by people, and made for life.</p><a href="#expertise" className="text-link">Our approach <span>↘</span></a></div></div>
   </section>
   <section id="expertise" className="expertise section-pad"><div className="section-heading reveal"><span className="eyebrow">What we do</span><span className="small-label">From the first sketch to the final detail.</span></div>
    {[["Architecture","Thoughtful buildings that balance form, light, and the rhythms of everyday life."],["Interior design","Tactile materials, quiet palettes, and spaces that feel distinctly yours."],["Urban planning","Connected places designed with communities and their future in mind."],["Spatial consultation","A fresh perspective on the possibilities of your space."]].map(([title, text], i) => <div className="service reveal" key={title}><button aria-expanded={service === i} aria-controls={`service-${i}`} onClick={() => setService(service === i ? null : i)}><span className="service-number">0{i+1}</span><h3>{title}</h3><span className="service-icon">{service === i ? "−" : "+"}</span></button><div className={`service-description ${service === i ? "expanded" : ""}`} id={`service-${i}`}><p>{text}</p></div></div>)}
   </section>
   <section id="selected" className="selected"><div className="selected-header"><span className="eyebrow">In focus</span><span>Spaces to slow down.</span></div><div className="gallery">{works.map((work,i) => <img src={work.image} key={work.title} alt={work.title} className={active === i ? "active" : ""} loading="lazy"/>)}<div className="gallery-shade"/><div className="gallery-copy" key={active}><span>{works[active].type}</span><h2>{works[active].title}</h2><p>{works[active].place}</p></div><div className="gallery-controls"><span>0{active+1} <span className="muted">/ 03</span></span><button onClick={() => setActive((active+2)%3)} aria-label="Previous project">←</button><button onClick={() => setActive((active+1)%3)} aria-label="Next project">→</button></div></div></section>
   <section id="journal" className="journal section-pad"><span className="eyebrow reveal">A studio note</span><div className="reveal"><h2>Good design is felt.<br/><em>Not just seen.</em></h2><p>On light, material, and the little things that make a space.</p></div><span className="journal-mark" aria-hidden="true">a.</span></section>
   <section id="contact" className="contact section-pad"><div className="contact-top reveal"><span className="eyebrow">Have something in mind?</span><span className="availability"><i/> Let's start a conversation</span></div><button className="contact-cta reveal" onClick={() => setContact(true)}><h2>Let’s create<br/>something <em>timeless.</em></h2><span>↗</span></button><div className="contact-bottom"><span>Architecture. Interiors. Possibilities.</span><button className="text-link" onClick={() => setContact(true)}>Get in touch <span>↗</span></button></div></section>
  </main>
  <footer><a className="logo" href="#home" aria-label="Aman the Architect home">aman<span>.</span><small>the architect</small></a><span>© {new Date().getFullYear()} Aman the Architect</span><span className="footer-note">Portfolio concept · Details to follow</span><a href="#home">Back to top ↑</a></footer>
  <dialog ref={dialog} onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }}><button className="dialog-close" onClick={close} aria-label="Close dialog">Close ×</button>{project !== null && <><img className="dialog-image" src={works[project].image} alt={works[project].title}/><div className="dialog-copy"><span className="eyebrow">{works[project].type} · {works[project].year}</span><h2>{works[project].title}</h2><p>{works[project].place}</p><small>{project < 2 ? "Project 01 · Design and construction progress." : "Illustrative project. Full story and project details coming soon."}</small></div></>}{contact && <div className="dialog-copy contact-dialog"><span className="eyebrow">A new beginning</span><h2>Every space starts<br/>with a <em>conversation.</em></h2><p>Studio contact details are coming soon.</p><p className="secondary">This is the first look at our portfolio. We’re making room for what comes next.</p><button className="text-link" onClick={close}>Back to the studio ↗</button></div>}</dialog>
 </>;
}
