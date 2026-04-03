import { useState, useEffect, useRef } from "react";
import profilePic from "./assets/profile_pic.jfif";
import logo from "./assets/logo.png";
import meowImg from "./assets/meow.jfif";
import cineImg from "./assets/cine.png";
import helpifyImg from "./assets/helpify.jfif";
import pageRepImg from "./assets/page_rep.jpg";
import jeepImg from "./assets/jeep.png";
import uiImg from "./assets/ui.png";
import mobileImg from "./assets/mobile.png";
import webImg from "./assets/web.png";
import dbImg from "./assets/db.png";


const CV_URL = "https://docs.google.com/document/d/1NEPiJ0U_SYSjBsjt2HSIYxrfL6rBuYAV2zZJm7uTXQI/edit?usp=sharing";
const GITHUB_URL = "https://github.com/ryukarien";
const LINKEDIN_URL = "https://www.linkedin.com/in/marielle-datu-549aa3328/";

const PROJECTS = [
  { image: meowImg, name: "Commeownity", year: "2024", desc: "Cat adoption website with browsing, adoption details, and a user-friendly navigation experience.", tech: ["Web", "UI", "API"], link: "https://github.com/ryukarien/commeownity.git", featured: false },
  { image: cineImg, name: "Cine/Score", year: "2025", desc: "Movie review platform with advanced filtering, ratings, and movie analytics.", tech: ["React", "API", "Design"], link: "https://github.com/ryukarien/Cine-Score.git", featured: false },
  { image: helpifyImg, name: "Helpify", year: "2025", desc: "AI customer support assistant with smart query routing and productivity automation.", tech: ["Python", "NLP", "Automation"], link: "https://github.com/seramoera/helpify-customer-support-assistant.git", featured: false },
  { image: pageRepImg, name: "Page Replacement Sim", year: "2025", desc: "Simulator for FIFO, LRU, and MRU page replacement algorithms with live stats.", tech: ["Python", "CS Theory"], link: "https://github.com/ryukarien/PAGE-REPLACEMENT-ALGORITHM.git", featured: false },
  { image: jeepImg, name: "Jeep Box Hero", year: "2025", desc: "Flutter/Dart adventure game with dialogue-driven quests and inventory systems.", tech: ["Flutter", "Dart", "GameDev"], link: "https://github.com/shokomori/JeepBoxHero.git", featured: true },
];

const EXPERTISE = [
  { icon: uiImg, label: "UI/UX Design", desc: "Clean, user-centered interfaces — from wireframes to polished, pixel-perfect designs." },
  { icon: webImg, label: "Web Development", desc: "Responsive web apps with HTML, CSS, JavaScript, and React. End-to-end builds." },
  { icon: mobileImg, label: "Mobile Development", desc: "Cross-platform mobile apps with Dart and Flutter for smooth, native experiences." },
  { icon: dbImg, label: "Database & Backend", desc: "SQL database design and optimization. Python scripting for automation and logic." },
];

const CERTS = [
  { label:"DataCamp", detail:"Intermediate Python" },
  { label:"Cisco", detail:"CCNA Introduction to Networks" },
  { label:"Cisco", detail:"Cyber Threat Management" },
  { label:"Cisco", detail:"Introduction to Data Science" },
  { label:"FreeCodeCamp", detail:"Relational Database" },
  { label:"FreeCodeCamp", detail:"Responsive Web Design" },
  { label:"IBM", detail:"AI Skills" },
  { label:"AWS", detail:"Cloud Foundation" },
];

const AWARDS = [
  { year:"2023–Present", label:"College Dean's Lister", detail:"Holy Angel University" },
  { year:"2023 1st Sem", label:"President's Lister", detail:"Holy Angel University" },
  { year:"2024–2025", label:"Vice Governor Staff", detail:"1st–2nd Semester College Student Council" },
  { year:"2023–2024", label:"Governor Staff", detail:"2nd Semester College Student Council" },
  { year:"2023–2026", label:"Member", detail:"Google Developer Group" },
  { year:"2023–2025", label:"Member", detail:"Multimedia Aficionados for Interested Artists (MAFIA)" },
  { year:"2023–2024", label:"Member", detail:"League of Outstanding Programmers (LOOP)" },
  { year:"2022–2023", label:"Secretary", detail:"Senior High School Supreme Student Council" },
  { year:"2021–2023", label:"With Highest Honors", detail:"Saint Catherine of Siena Academy"},
  { year:"2021–2023", label:"Gawad Gobernador Awardee", detail:"Saint Catherine of Siena Academy" },
  { year:"2021–2023", label:"Serviam Awardee & Best in Science", detail:"Saint Catherine of Siena Academy" },
  { year:"2017–2021", label:"Graduated with High Honors", detail:"Junior High School" },
];

function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Optional: observer.unobserve(entry.target); // Stop observing once it's visible
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={s.root}>
      <style>{globalCSS}</style>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={s.mobileMenu}>
          <button onClick={() => setMenuOpen(false)} style={s.closeBtn}>✕</button>
          {[["home","Home"],["about","About Me"],["projects","Projects"],["contact","Contact"]].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={s.mobileLink}>{label}</button>
          ))}
        </div>
      )}

      {/* ── NAV ── */}
      <nav style={{ ...s.nav, ...(scrolled ? s.navScrolled : {}) }}>
        <div style={s.logo}>
          <img src={logo} alt="Marielle logo" style={s.logoImage} />
        </div>
        <ul style={s.navLinks} className="nav-links">
          {[["home","Home"],["about","About Me"],["projects","Projects"],["contact","Contact"]].map(([id, label]) => (
            <li key={id}>
              <button onClick={() => scrollTo(id)} style={s.navLink} className="nav-btn">{label}</button>
            </li>
          ))}
        </ul>
        <div style={s.navRight}>
          <a href={CV_URL} target="_blank" rel="noopener noreferrer" style={s.btnGhost}>View CV ↗</a>
          <a href="https://www.linkedin.com/in/marielle-datu-549aa3328/" target="_blank" rel="noopener noreferrer" style={{ ...s.btnGhost, background: "#7c3aed", color: "#fff" }}>LinkedIn ↗</a>
          <button onClick={() => setMenuOpen(true)} style={s.hamburger} className="hamburger-btn">☰</button>
        </div>
      </nav>

      {/* ── HERO ── */}
<section id="home" style={s.heroSection}>
  <div style={s.orb1} />
  <div style={s.orb2} />

  <div style={s.heroInner} className="hero-responsive">
    {/* left */}
    <FadeIn>
      <div style={s.heroLeft} className="hero-left">
        <div style={s.eyebrow}>✦ BS Computer Science · Holy Angel University</div>
        <h1 style={s.heroTitle}>
          Hello, I'm<br />
          <span style={s.heroAccent}>Marielle Datu!</span>
        </h1>
        <p style={s.heroSub}>
          A passionate CS student who loves building things for the web and beyond —
          from sleek UI/UX designs to functional full-stack applications.
        </p>

        {/* BUTTONS WRAPPER */}
        <div style={s.heroBtnsWrapper}>
          <button onClick={() => scrollTo("projects")} style={s.btnPrimary} className="btn-primary-hover">View My Projects</button>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={s.btnDark} className="btn-center-hover">GitHub</a>
          <a href={CV_URL} target="_blank" rel="noopener noreferrer" style={s.btnOutline} className="hover-lift">Download CV ↗</a>
        </div>
      </div>
    </FadeIn>

    {/* right — image */}
    <FadeIn delay={200}>
      <div style={s.imgOuter} className="hero-image">
        <div style={s.profileCard} className="hover-lift">
          <img src={profilePic} alt="Marielle - profile" style={s.profileImg} />
          <div style={s.profileInfo}>
            <h3 style={s.profileName}>Marielle Datu</h3>
            <p style={s.profileRole}>Full-stack • UI/UX • Database</p>
            <div style={s.profileStats}>
              <span>20 y/o</span>
              <span>Open to Work</span>
              <span>8 Certifications</span>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  </div>
</section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ ...s.section, background:"#f5f3ff" }}>
        <div style={s.sectionInner}>
          <FadeIn>
            <div style={s.sectionLabel}>About Me</div>
            <h2 style={s.sectionTitle}>Who am <span style={s.titleAccent}>I?</span></h2>
          </FadeIn>

          <div style={s.aboutGrid} className="about-grid-mobile">
            <div style={s.aboutLeft}>
              <FadeIn delay={80}>
                <div style={s.whoContainer}>
        
                  <p style={s.aboutTextCentered}>
                    I am a 20-year-old Computer Science student with a positive attitude, a passion for problem-solving, and a strong commitment to continuous learning and growth. My academic background and hands-on project experience have helped me develop strong analytical skills and the ability to create effective solutions.
                  </p>
                  <p style={s.aboutTextCentered}>
                    I focus on designing innovative systems and enjoy taking on new challenges that push me to improve. I also value time management and collaboration, allowing me to work efficiently while continuously expanding my knowledge and skills.
                  </p>
                </div>

                <div style={s.contactBtns}>
                  <a href={CV_URL} target="_blank" rel="noopener noreferrer" style={s.btnPrimary} className="btn-primary-hover">Download CV</a>
                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={{ ...s.btnGhost, marginLeft:"0.8rem" }}>GitHub</a>
                  <a href="https://www.linkedin.com/in/marielle-datu-549aa3328/" target="_blank" rel="noopener noreferrer" style={{ ...s.btnGhost, marginLeft:"0.8rem" }}>LinkedIn</a>
                </div>

                <div style={s.subHeading}>Core Skills</div>
                <div style={s.coreSkillsRow}>
                  <span style={s.skillPill}>Web Developer</span>
                  <span style={s.skillPill}>UI/UX</span>
                  <span style={s.skillPill}>Database Mgmt</span>
                  <span style={s.skillPill}>Flutter/Dart</span>
                </div>
              </FadeIn>
            </div>

            <div>
              <FadeIn delay={120}>
                <div style={s.expertiseGrid2}>
                  {EXPERTISE.map((e, i) => (
                    <div key={i} style={s.expertiseCard} className="hover-lift">
                      <img src={e.icon} alt={e.label} style={s.expertIcon} />
                      <div>
                        <div style={s.expertLabel}>{e.label}</div>
                        <div style={s.expertDesc}>{e.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>

          <FadeIn delay={180}>
            <div style={s.awardsWrapper}>
              <div style={s.sideCard}>
                <div style={s.sideCardTitle}>🏆 Awards & Achievements</div>
                <div style={s.awardsList}>
                  {AWARDS.map((a, i) => (
                    <div key={i} style={s.awardItem}>
                      <div style={s.awardYear}>{a.year}</div>
                      <div style={s.awardLabel}>{a.label}</div>
                      <div style={s.awardDetail}>{a.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={s.sideCard}>
                <div style={s.sideCardTitle}>📜 Certifications</div>
                <div style={s.certsList}>
                  {CERTS.map((c, i) => (
                    <div key={i} style={s.certItem}>
                      <div style={s.certDot} />
                      <span><strong>{c.label}</strong> — {c.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={s.section}>
        <div style={s.sectionInner}>
          <FadeIn>
            <div style={s.sectionLabel}>Projects</div>
            <h2 style={s.sectionTitle}>Things I've <span style={s.titleAccent}>Built</span></h2>
            <p style={s.sectionSub}>Academic and personal projects spanning web, mobile, software, and games.</p>
          </FadeIn>

          <div style={s.projectsGrid} className="projects-grid-mobile">
            {PROJECTS.map((p, i) => (
              <FadeIn key={i} delay={i * 70}>
                <div style={s.projectCard} className="project-hover">
                  <img src={p.image} alt={p.name} style={s.projImage} />
                  <div style={s.projectContent}>
                    <div style={s.projTopRow}>
                      <span style={s.projYear}>{p.year}</span>
                      <span style={s.projTag}>{p.tech.join(" • ")}</span>
                    </div>
                    <h3 style={s.projName}>{p.name}</h3>
                    <p style={s.projDesc}>{p.desc}</p>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={s.projBtn} className="btn-primary-hover">Explore Repository</a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={s.githubBtn} className="hover-lift">
                🐙 &nbsp;View All Projects on GitHub
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ ...s.section, background:"#f5f3ff" }}>
        <div style={s.sectionInner}>
          <FadeIn>
            <div style={s.ctaBanner}>
              <div style={s.ctaLeft}>
                <div style={{ fontSize:"0.72rem", letterSpacing:"0.1em", textTransform:"uppercase", opacity:0.7, marginBottom:"0.5rem" }}>Let's Connect</div>
                <h2 style={s.ctaTitle}>Want to work together?</h2>
                <p style={s.ctaSub}>Open to internships, freelance work, and collaboration opportunities. Always happy to chat about tech, design, or new ideas.</p>
              </div>
              <div style={s.ctaLinks}>
                {[
                  ["Email","marielledatu0611@gmail.com","mailto:marielledatu0611@gmail.com"],
                  ["Phone","09991777947","tel:09991777947"],
                  ["LinkedIn","Marielle Datu",LINKEDIN_URL],
                  ["GitHub","ryukarien",GITHUB_URL],
                ].map(([label, val, href]) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={s.ctaCard} className="cta-card-hover">
                    <div>
                      <div style={s.ctaCardLabel}>{label}</div>
                      <div style={s.ctaCardVal}>{val}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <p>© 2025 <span style={{ color:"#a855f7" }}>Marielle L. Datu</span> · BS Computer Science · Holy Angel University · Pampanga, Philippines</p>
      </footer>
    </div>
  );
}

/* ─── STYLES ─── */
const s = {
 // Inside your const s = { ... }
root: { 
  fontFamily: "'Sora',sans-serif", 
  background: "#faf8ff", // This will now be the global background
  color: "#111827", 
  overflowX: "hidden", 
  minHeight: "100vh", // Ensures the background covers the full height
  width: "100%",      // Ensures it stretches horizontally
},

  nav:{
  position:"fixed",
  top:0,
  left:0,
  width:"100%",
  zIndex:1000,
  display:"flex",
  alignItems:"center",
  justifyContent:"space-between",
  padding:"0.45rem 3vw",
  minHeight:50,
  background:"linear-gradient(135deg,rgba(124,58,237,0.15),rgba(167,139,250,0.24))",
  backdropFilter:"blur(14px)",
  borderBottom:"1px solid rgba(139,92,246,0.3)",},

  navScrolled:{ boxShadow:"0 2px 20px rgba(139,92,246,0.1)" },
  logo:{ display:"flex", alignItems:"center", gap:"0.8rem", minHeight:54 },
  logoImage:{ width:72, height:72, objectFit:"contain" },
  logoText:{ display:"inline-block", fontSize:"1.2rem", fontWeight:700, color:"#6b21a8" },
  navLinks:{ display:"flex", gap:"1.2rem", listStyle:"none", margin:0, padding:0 },
  navLink:{ background:"none", border:"none", color:"#6b7280", fontSize:"0.87rem", fontWeight:500, cursor:"pointer", fontFamily:"'Sora',sans-serif", padding:0 },
  navRight:{ display:"flex", gap:"0.8rem", alignItems:"center" },
  profileCard:{ width:"min(340px,80vw)", borderRadius:24, border:"1px solid rgba(124,58,237,0.15)", background:"#fff", overflow:"hidden", boxShadow:"0 14px 30px rgba(124,58,237,0.12)", transition:"transform 0.3s ease, box-shadow 0.3s ease", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center" },
  profileImg:{ width:"100%", height:270, objectFit:"cover" },
  profileInfo:{ padding:"1.1rem 1rem 1.3rem" },
  profileName:{ color:"#1a0a2e", margin:"0.6rem 0 0.3rem", fontWeight:700, fontSize:"1.15rem" },
  profileRole:{ color:"#6b7280", fontSize:"0.85rem", margin:0 },
  profileStats:{ marginTop:"0.85rem", display:"flex", justifyContent:"center", gap:"0.55rem", flexWrap:"wrap", fontSize:"0.72rem", color:"#4b5563" },
  btnGhost:{ background:"none", border:"1.5px solid #7c3aed", color:"#7c3aed", padding:"0.42rem 1.1rem", borderRadius:999, fontSize:"0.82rem", fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", textDecoration:"none", display:"inline-block" },
 hamburger:{
  display:"none", // default hidden (desktop)
  background:"none",
  border:"none",
  fontSize:"1.6rem",
  cursor:"pointer",
  color:"#1a0a2e"
},
  heroSection:{
  padding:"7rem 5vw 4rem", // 👈 increase top padding
  minHeight:"90vh",
  display:"flex",
  alignItems:"center",
  position:"relative",
  overflow:"hidden"
},
  orb2:{ position:"absolute", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(168,85,247,0.07),transparent 70%)", bottom:"-80px", left:"-60px", pointerEvents:"none" },
  heroInner:{
  display:"grid",
  gridTemplateColumns:"1.1fr 0.9fr", // better balance
  gap:"3rem",
  alignItems:"center",
  width:"100%",
  maxWidth:"100%", // wider = fuller screen
  margin:"0 auto",
},
  heroLeft:{ textAlign: "left"},
  heroImage:{ display:"flex", justifyContent:"center", alignItems:"center", width:"100%" },
  eyebrow:{ display:"inline-flex", alignItems:"center", gap:"0.4rem", background:"#ede9fe", color:"#7c3aed", fontSize:"0.73rem", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", padding:"0.36rem 1rem", borderRadius:999, marginBottom:"1.4rem" },
  heroTitle:{ fontFamily:"'Instrument Serif',Georgia,serif", fontSize:"clamp(2.4rem,4.5vw,3.8rem)", lineHeight:1.1, color:"#1a0a2e", marginBottom:"1.2rem" },
  heroAccent:{ color:"#7c3aed", fontStyle:"italic" },
  heroSub:{ fontSize:"1rem", color:"#4b5563", lineHeight:1.75, marginBottom:"2rem", maxWidth:460 },
  heroBtns:{ display:"flex", gap:"0.8rem", flexWrap:"wrap", marginBottom:"1.8rem" },
  heroBtnsWrapper: {
  display: "flex",
  gap: "0.8rem",
  flexWrap: "wrap",
  justifyContent: "center",  // center all buttons
  alignItems: "center",
  marginBottom: "1.8rem"
},
  btnPrimary:{ background:"linear-gradient(135deg,#7c3aed,#a855f7)", color:"#fff", padding:"0.75rem 1.8rem", borderRadius:999, fontSize:"0.9rem", fontWeight:600, cursor:"pointer", border:"none", fontFamily:"'Sora',sans-serif", boxShadow:"0 4px 20px rgba(124,58,237,0.35)" },
  btnOutline:{ background:"#fff", color:"#7c3aed", padding:"0.72rem 1.6rem", borderRadius:999, fontSize:"0.9rem", fontWeight:600, border:"1.5px solid #a855f7", fontFamily:"'Sora',sans-serif", textDecoration:"none", display:"inline-block" },
  btnDark:{ background:"#1a0a2e", color:"#fff", padding:"0.72rem 1.6rem", borderRadius:999, fontSize:"0.9rem", fontWeight:600, border:"none", fontFamily:"'Sora',sans-serif", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"0.4rem" },
  trustRow:{ display:"flex", flexWrap:"wrap", gap:"0.5rem" },
  trustPill:{ background:"#fff", border:"1.5px solid rgba(139,92,246,0.18)", borderRadius:999, padding:"0.32rem 0.85rem", fontSize:"0.76rem", fontWeight:500, color:"#374151", display:"flex", alignItems:"center", gap:"0.4rem" },
  pillDot:{ width:6, height:6, borderRadius:"50%", background:"#7c3aed", display:"inline-block" },

  imgOuter:{ display:"flex", justifyContent:"center" },
  imgPlaceholder:{ width:"min(360px,80vw)", aspectRatio:"3/4", borderRadius:32, background:"linear-gradient(145deg,#ede9fe 0%,#ddd6fe 60%,#c4b5fd 100%)", border:"2.5px dashed rgba(124,58,237,0.25)", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" },
  imgInner:{ textAlign:"center" },
  imgIcon:{ fontSize:"3.5rem", marginBottom:"0.8rem" },
  imgLabel:{ fontSize:"0.95rem", fontWeight:600, color:"#6d28d9" },
  imgSub:{ fontSize:"0.75rem", color:"#9ca3af", marginTop:"0.3rem" },
  imgRing:{ position:"absolute", inset:-12, borderRadius:36, border:"1.5px solid rgba(124,58,237,0.12)", pointerEvents:"none" },

  section:{ padding:"5rem 0", background:"#f8f4ff" },
  sectionInner: {
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "0 3vw",
  width: "100%",
},
  sectionLabel:{ display:"inline-block", background:"#7c3aed", color:"#fff", fontSize:"0.72rem", fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", padding:"0.32rem 1rem", borderRadius:999, marginBottom:"0.8rem" },
  sectionTitle:{ fontFamily:"'Instrument Serif',Georgia,serif", fontSize:"clamp(1.8rem,3vw,2.6rem)", color:"#1a0a2e", lineHeight:1.2, marginBottom:"0.4rem" },
  titleAccent:{ color:"#9333ea", fontStyle:"italic" },
  sectionSub:{
  fontSize:"0.9rem",
  color:"#6b7280",
  maxWidth:480,
  lineHeight:1.7,
  margin:"0 auto 2.5rem",   // 👈 centers the block
  textAlign:"center"        // 👈 centers the text
},
  subHeading:{ fontSize:"0.76rem", fontWeight:700, letterSpacing:"0.09em", textTransform:"uppercase", color:"#7c3aed", marginBottom:"0.9rem" },

  aboutGrid:{ display:"grid", gridTemplateColumns:"1.1fr 0.9fr", gap:"3rem", marginTop:"2rem", alignItems:"start" },
  aboutLeft:{},
  whoContainer:{ background:"#f6efff", borderRadius:20, padding:"1.4rem", border:"1px solid rgba(124,58,237,0.2)", boxShadow:"inset 0 1px 0 rgba(255,255,255,0.5)" },
  whoTitle:{ textAlign:"center", fontSize:"1.8rem", color:"#5b21b6", fontWeight:800, marginBottom:"0.8rem" },
  aboutTextCentered:{ fontSize:"0.95rem", color:"#2f3c58", lineHeight:1.7, textAlign:"center", marginBottom:"0.9rem" },
  coreSkillsRow:{ display:"flex", gap:"0.7rem", flexWrap:"wrap", justifyContent:"center", marginTop:"1rem" },
  aboutCard:{ background:"#f3edff", borderRadius:18, border:"1px solid rgba(124,58,237,0.2)", padding:"1.6rem", boxShadow:"0 6px 18px rgba(124,58,237,0.08)" },
  contactBtns:{ marginTop:"1.2rem", display:"flex", gap:"0.7rem", flexWrap:"wrap", justifyContent:"center" },
  aboutText:{ fontSize:"0.95rem", color:"#374151", lineHeight:1.8 },
  expertiseGrid:{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.8rem" },
  expertiseGrid2:{ display:"grid", gridTemplateColumns:"1fr", gap:"0.75rem" },
  skillPill:{ background:"#ebe5ff", border:"1px solid #c4b5fd", color:"#5b21b6", fontSize:"0.72rem", fontWeight:600, padding:"0.28rem 0.78rem", borderRadius:999 },
  expertiseCard:{ background:"#fff", border:"1.5px solid rgba(139,92,246,0.1)", borderRadius:16, padding:"1.1rem", display:"flex", gap:"0.8rem", alignItems:"flex-start", cursor:"pointer", transition:"transform 0.25s, box-shadow 0.25s" },
  expertIcon:{ width:36, height:36, borderRadius:10, objectFit:"cover", flexShrink:0 },
  expertLabel:{ fontSize:"0.87rem", fontWeight:700, color:"#1a0a2e", marginBottom:"0.25rem" },
  expertDesc:{ fontSize:"0.78rem", color:"#6b7280", lineHeight:1.6 },
  techRow:{ display:"flex", flexWrap:"wrap", gap:"0.4rem" },
  techPill:{ background:"#ede9fe", border:"1px solid rgba(139,92,246,0.15)", color:"#6d28d9", fontSize:"0.74rem", fontWeight:500, padding:"0.25rem 0.75rem", borderRadius:999 },

  sideCard:{ background:"#fff", borderRadius:20, padding:"1.5rem", border:"1.5px solid rgba(139,92,246,0.1)", boxShadow:"0 2px 12px rgba(139,92,246,0.05)" },
  awardsWrapper:{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginTop:"1.6rem" },
  sideCardTitle:{ fontSize:"0.88rem", fontWeight:700, color:"#1a0a2e", marginBottom:"1.1rem" },
  awardsList:{ display:"flex", flexDirection:"column", gap:"0.9rem" },
  awardItem:{ borderLeft:"2.5px solid #a855f7", paddingLeft:"0.9rem" },
  awardYear:{ fontSize:"0.68rem", color:"#a855f7", fontWeight:600, letterSpacing:"0.05em", textTransform:"uppercase" },
  awardLabel:{ fontSize:"0.86rem", fontWeight:700, color:"#1a0a2e" },
  awardDetail:{ fontSize:"0.77rem", color:"#6b7280" },
  certsList:{ display:"flex", flexDirection:"column", gap:"0.6rem" },
  certItem:{ display:"flex", alignItems:"flex-start", gap:"0.6rem", fontSize:"0.82rem", color:"#374151", lineHeight:1.5 },
  certDot:{ width:7, height:7, borderRadius:"50%", background:"#7c3aed", flexShrink:0, marginTop:5 },

  projectsGrid:{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem", marginTop:"2rem" },
  projectCard:{ background:"#fff", border:"1.5px solid rgba(139,92,246,0.1)", borderRadius:22, overflow:"hidden", boxShadow:"0 8px 30px rgba(124,58,237,0.08)", cursor:"pointer", transition:"transform 0.3s, box-shadow 0.3s", display:"flex", flexDirection:"column" },
  projectCardHover:{ transform:"translateY(-3px)", boxShadow:"0 12px 36px rgba(124,58,237,0.2)" },
  projImage:{ width:"100%", height:190, objectFit:"cover", borderBottom:"1px solid rgba(139,92,246,0.2)" },
  projectContent:{ padding:"1rem 1.1rem 1.2rem", display:"flex", flexDirection:"column", gap:"0.8rem" },
  projTopRow:{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:"0.76rem", color:"#6b7280" },
  projTag:{ background:"rgba(124,58,237,0.08)", color:"#5b21b6", borderRadius:999, fontSize:"0.72rem", padding:"0.2rem 0.65rem" },
  projDesc:{ fontSize:"0.86rem", color:"#4b5563", lineHeight:1.6 },
  projBtn:{ display:"inline-block", marginTop:"auto", background:"#7c3aed", color:"#fff", padding:"0.6rem 1rem", borderRadius:999, fontSize:"0.78rem", textDecoration:"none", fontWeight:600 },

  projectFeatured:{ display:"none" },
  featuredBadge:{ display:"inline-block", background:"linear-gradient(135deg,#7c3aed,#a855f7)", color:"#fff", fontSize:"0.7rem", fontWeight:600, padding:"0.22rem 0.75rem", borderRadius:999 },
  githubBtn:{ display:"inline-flex", alignItems:"center", gap:"0.4rem", background:"#1a0a2e", color:"#fff", padding:"0.9rem 2.2rem", borderRadius:999, fontSize:"0.92rem", fontWeight:600, textDecoration:"none", fontFamily:"'Sora',sans-serif", boxShadow:"0 4px 16px rgba(26,10,46,0.15)" },
  ctaBanner: { background: "linear-gradient(135deg,#6b21a8,#7c3aed 50%,#c084fc)", borderRadius: 28, padding: "3rem 3.5rem", color: "#fff", display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" },
  ctaLeft:{},
  ctaTitle:{ fontFamily:"'Instrument Serif',Georgia,serif", fontSize:"2rem", fontStyle:"italic", marginBottom:"0.8rem" },
  ctaSub:{ fontSize:"0.9rem", opacity:0.85, lineHeight:1.75 },
  ctaLinks: { display: "grid", gridTemplateColumns: "repeat(4, minmax(150px, auto))", gap: "1.5rem", marginTop: "1.5rem", width: "100%", justifyItems: "center", alignItems: "center" },
  ctaCard: { background:"rgba(255,255,255,0.12)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:16, padding:"1rem 1.2rem", display:"flex", flexDirection:"column", alignItems:"center", gap:"0.4rem", textDecoration:"none", color:"#fff", transition:"all 0.3s ease" },
  ctaCardLabel: { fontSize:"0.68rem", opacity:0.7, textTransform:"uppercase", letterSpacing:"0.06em" },
  ctaCardVal: { fontSize:"0.82rem", fontWeight:600, textAlign:"center" },
  footer:{ background:"#1a0a2e", color:"rgba(255,255,255,0.5)", textAlign:"center", padding:"1.8rem", fontSize:"0.8rem" },
  mobileMenu:{ position:"fixed", inset:0, background:"rgba(26,10,46,0.97)", zIndex:200, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"2rem" },
  closeBtn:{ position:"absolute", top:"1.5rem", right:"5vw", background:"none", border:"none", color:"rgba(255,255,255,0.6)", fontSize:"1.6rem", cursor:"pointer" },
  mobileLink:{ background:"none", border:"none", color:"#fff", fontSize:"1.5rem", fontFamily:"'Instrument Serif',Georgia,serif", cursor:"pointer", fontStyle:"italic" },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
  
  *, *::before, *::after { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
  }
  
  html { scroll-behavior: smooth; }
  
  html, body, #root { 
    margin: 0 !important; 
    padding: 0 !important; 
    width: 100% !important;
    height: 100% !important;
    background-color: #faf8ff !important;
    overflow-x: hidden;
  }

  /* ──── SCROLL ANIMATIONS ──── */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* ──── HOVER EFFECTS ──── */
  .hover-lift { 
    transition: transform 0.25s ease, box-shadow 0.25s ease !important; 
  }
  .hover-lift:hover { 
    transform: translateY(-3px) !important; 
    box-shadow: 0 10px 24px rgba(124,58,237,0.14) !important; 
  }

  .nav-btn:hover { color: #7c3aed !important; }
  
  .hamburger-btn { display: none !important; }
  .nav-links { display: flex !important; }

  .hero-responsive { text-align: left; }
  .hero-left { width: 100%; }
  .hero-image { width: 100%; }

  .btn-primary-hover { 
    transition: transform 0.2s, box-shadow 0.2s !important; 
  }
  .btn-primary-hover:hover { 
    transform: translateY(-2px) !important; 
    box-shadow: 0 8px 28px rgba(124,58,237,0.45) !important; 
  }

  .project-hover { 
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease !important;
    animation: fadeInUp 0.6s ease both;
  }
  .project-hover:hover { 
    transform: translateY(-5px) !important; 
    border-color: #7c3aed !important; 
    box-shadow: 0 14px 32px rgba(124,58,237,0.16) !important; 
  }

  .cta-card-hover { 
    transition: all 0.3s ease !important;
    animation: fadeInUp 0.5s ease both;
  }
  .cta-card-hover:hover { 
    background: rgba(255,255,255,0.22) !important; 
    transform: translateY(-3px) !important; 
  }

  /* ──── DESKTOP LAYOUT ──── */
  @media (min-width: 901px) {
    .projects-grid-mobile { grid-template-columns: repeat(3, 1fr) !important; }
    .ctaLinks { grid-template-columns: repeat(4, minmax(150px, auto)) !important; }
    .about-grid-mobile { grid-template-columns: 1.1fr 0.9fr !important; }
  }

  /* ──── TABLET LAYOUT ──── */
  @media (max-width: 900px) and (min-width: 641px) {
    .nav-links { display: none !important; }
    .hamburger-btn { display: flex !important; }
    
    .hero-responsive { 
      display: grid !important;
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
    }
    .hero-left { order: 2 !important; text-align: center !important; }
    .hero-image { order: 1 !important; }
    
    .projects-grid-mobile { grid-template-columns: repeat(2, 1fr) !important; }
    .ctaLinks { grid-template-columns: repeat(2, 1fr) !important; gap: 1.2rem !important; }
    .about-grid-mobile { grid-template-columns: 1fr !important; }
    .awardsWrapper { grid-template-columns: 1fr !important; }
    
    .ctaBanner { padding: 2.5rem 2rem !important; gap: 1.5rem !important; }
  }

  /* ──── MOBILE LAYOUT ──── */
  @media (max-width: 640px) {
    .nav-links { display: none !important; }
    .hamburger-btn { display: flex !important; }
    
    .hero-responsive { 
      display: grid !important;
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important;
    }
    .hero-left { 
      order: 2 !important; 
      text-align: center !important; 
    }
    .hero-image { 
      order: 1 !important;
      display: flex !important;
      justify-content: center !important;
    }
    
    section { padding: 3rem 0 !important; }
    
    .sectionInner { padding: 0 4vw !important; }
    .heroSection { padding: 5rem 4vw 2rem !important; }
    
    .heroSection h1 { 
      font-size: clamp(1.8rem, 6vw, 2.5rem) !important; 
    }
    .heroSection p { 
      font-size: 0.95rem !important; 
      max-width: 100% !important; 
    }
    
    .heroBtnsWrapper { 
      flex-direction: column !important; 
      gap: 0.8rem !important; 
    }
    .heroBtnsWrapper a, 
    .heroBtnsWrapper button { 
      width: 100% !important; 
      max-width: none !important;
    }
    
    .projects-grid-mobile { 
      grid-template-columns: 1fr !important; 
      gap: 1rem !important;
    }
    
    .ctaLinks { 
      grid-template-columns: 1fr !important;
      gap: 1rem !important;
    }
    
    .ctaCard { 
      width: 100% !important;
      padding: 0.85rem 1rem !important;
    }
    
    .ctaBanner { 
      padding: 2rem 1.5rem !important; 
      gap: 1.2rem !important;
      border-radius: 20px !important;
    }
    
    .ctaLeft {
      text-align: center !important;
    }
    
    .about-grid-mobile { 
      grid-template-columns: 1fr !important;
      gap: 1.5rem !important; 
    }
    
    .awardsWrapper { 
      grid-template-columns: 1fr !important;
      gap: 1rem !important;
    }
    
    .sideCard {
      padding: 1.2rem !important;
    }
    
    .sectionTitle {
      font-size: clamp(1.6rem, 5vw, 2.2rem) !important;
    }
  }

  /* ──---- Accessibility ────── */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
