import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import {
  Github, Mail, Phone, MapPin, ExternalLink, ChevronDown,
  Sparkles, Code2, Layers, Cpu, Menu, X
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { cn } from "./lib/utils";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Projects", "Experience", "Contact"];

const STATS = [
  { value: "5+", label: "Years Exp.", icon: Sparkles },
  { value: "100+", label: "Projects", icon: Layers },
  { value: "20+", label: "Technologies", icon: Code2 },
  { value: "B.Tech", label: "Degree", icon: Cpu },
];

const CATEGORY_COLORS = {
  Frontend: "#6EE7B7",
  Language: "#FCD34D",
  Styling: "#93C5FD",
  Backend: "#F9A8D4",
  Database: "#a78bfa",
  Platform: "#fb923c",
  Tool: "#67e8f9",
  "UI Library": "#e879f9",
  CMS: "#3b82f6",
};

const SKILLS = [
  { name: "React JS", pct: 90, cat: "Frontend" },
  { name: "JavaScript", pct: 88, cat: "Language" },
  { name: "HTML5", pct: 95, cat: "Frontend" },
  { name: "CSS3", pct: 90, cat: "Frontend" },
  { name: "Tailwind CSS", pct: 85, cat: "Styling" },
  { name: "Bootstrap 5", pct: 80, cat: "Styling" },
  { name: "Node JS", pct: 75, cat: "Backend" },
  { name: "Express JS", pct: 72, cat: "Backend" },
  { name: "MongoDB", pct: 70, cat: "Database" },
  { name: "Firebase", pct: 78, cat: "Platform" },
  { name: "Git", pct: 82, cat: "Tool" },
  { name: "Material UI", pct: 76, cat: "UI Library" },
  { name: "Wix", pct: 85, cat: "CMS" },
  { name: "WordPress", pct: 80, cat: "CMS" },
  { name: "Shopify", pct: 75, cat: "CMS" },
  { name: "Squarespace", pct: 70, cat: "CMS" },
];

const PROJECTS = [
  {
    name: "CraftiFY",
    icon: "🎨",
    color: "#6EE7B7",
    desc: "Platform to discover, share, and showcase art & craft items.",
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Firebase"],
    img: "https://placehold.co/600x380/0f172a/6EE7B7?text=CraftiFY",
    liveDemo: "https://craftify-art-store.web.app/",
    clientCode: "https://github.com/joysaha023/craftify-art-store-client-side",
    serverCode: "https://github.com/joysaha023/craftify-art-store-server-side",
  },
  {
    name: "HavenHQ",
    icon: "🏠",
    color: "#93C5FD",
    desc: "Real estate platform for residential homes, apartments, and vacation rentals with authentication.",
    tech: ["React JS", "Tailwind CSS", "Firebase", "Responsive"],
    img: "https://placehold.co/600x380/0f172a/93C5FD?text=HavenHQ",
    liveDemo: "https://real-estate-assignment-b4133.web.app/",
    clientCode: "https://github.com/joysaha023/real-estate-react-projects",
    serverCode: "https://github.com/joysaha023/real-estate-react-projects",
  },
  {
    name: "StoryVerse",
    icon: "🎬",
    color: "#F9A8D4",
    desc: "Movie lover's community hub for discovering films, writing blogs, and commenting.",
    tech: ["React JS", "Firebase", "Node.js", "Express.js", "MongoDB"],
    img: "https://placehold.co/600x380/0f172a/F9A8D4?text=StoryVerse",
    liveDemo: "https://storyverse-blogsite.web.app/",
    clientCode: "https://github.com/joysaha023/storyverse-client-side",
    serverCode: "https://github.com/joysaha023/storyverse-server-side",
  },
  {
    name: "TaskOrbit",
    icon: "🚀",
    color: "#FCD34D",
    desc: "Online micro-task marketplace where users complete tasks and earn money.",
    tech: ["React", "Node.js", "JWT", "Express.js", "MongoDB"],
    img: "https://placehold.co/600x380/0f172a/FCD34D?text=TaskOrbit",
    liveDemo: "https://taskorbit-19.web.app/",
    clientCode: "https://github.com/joysaha023/taskorbit-website-client-side",
    serverCode: "https://github.com/joysaha023/taskorbit-website-server-side",
  },
];

const TIMELINE = [
  {
    type: "Work",
    years: "2025 – Present",
    title: "Freelance Web Developer",
    org: "Fiverr",
  },

  {
    type: "Work",
    years: "2023 – 2025",
    title: "Web Developer",
    org: "BDCalling IT LTD",
  },
  {
    type: "Work",
    years: "2021 – 2022",
    title: "Trainee IT Engineer",
    org: "ThinkNEXT Pvt. Ltd.",
  },
  {
    type: "Education",
    years: "2019 – 2023",
    title: "B.Tech — Computer Science & Engineering",
    org: "Kurukshetra University, India",
  },
  {
    type: "Education",
    years: "2017 – 2019",
    title: "Higher Secondary — Science",
    org: "Akhaura Shahid Smriti Government College",
  },
];

const CONTACTS = [
  { icon: Mail, label: "Email", value: "joysahacse23@gmail.com", href: "mailto:joysahacse23@gmail.com" },
  { icon: Phone, label: "Phone", value: "+8801861490690", href: "https://wa.link/21hqh4" },
  { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh", href: "https://www.google.com/maps/search/Dhaka,+Bangladesh" },
  { icon: Github, label: "GitHub", value: "joysahacse23", href: "https://github.com/joysahacse23" },
];

const ROLES = ["Web Developer", "Frontend Developer", "CMS Expert", "Web Designer"];

// ─── Portfolio ────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const roleRef = useRef(null);
  const orb1Ref = useRef(null);

  // Load Syne font
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  // Scroll → header style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP: Header entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  // GSAP: Hero stagger + TextPlugin
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 });
      tl.fromTo(
        ".hero-item",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" }
      );

      // Recursive typewriter
      const typeNext = (index = 0) => {
        gsap.to(roleRef.current, {
          duration: ROLES[index].length * 0.1,
          text: ROLES[index],
          ease: "none",
          onComplete: () => {
            gsap.to(roleRef.current, {
              duration: ROLES[index].length * 0.05,
              text: "",
              ease: "none",
              delay: 2, // Wait before erasing
              onComplete: () => {
                typeNext((index + 1) % ROLES.length);
              }
            });
          }
        });
      };
      tl.call(typeNext, null, "-=0.2");

      // Floating orb GSAP yoyo
      gsap.to(orb1Ref.current, {
        y: -30,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // GSAP: ScrollTrigger sections
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sections fade-up
      gsap.utils.toArray(".section-animate").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Skill bars
      gsap.utils.toArray(".skill-bar-inner").forEach((bar) => {
        const pct = bar.dataset.pct;
        gsap.to(bar, {
          scaleX: parseFloat(pct) / 100,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      // Project cards
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#projects",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen" style={{ background: "#060b18", fontFamily: "'Syne', sans-serif" }}>
      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Radial blobs */}
      <div className="fixed top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(110,231,183,0.07) 0%, transparent 70%)" }} />
      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(147,197,253,0.07) 0%, transparent 70%)" }} />

      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl rounded-2xl px-6 py-3 transition-all duration-500",
          scrolled
            ? "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg"
            : "bg-transparent border border-transparent"
        )}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-xl font-black tracking-tight text-white">
            JOY<span style={{ color: "#6EE7B7" }}>.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-semibold"
              >
                {l}
              </button>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => scrollTo("Contact")}
              className="hidden md:inline-flex"
              style={{ background: "#6EE7B7", color: "#060b18", fontWeight: 700 }}
            >
              Hire Me
            </Button>
            <button
              className="md:hidden text-white/70 hover:text-white"
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            menuOpen ? "max-h-72 mt-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-3 pb-2">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className="text-left text-sm text-white/70 hover:text-white font-semibold py-1"
              >
                {l}
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => scrollTo("Contact")}
              className="mt-1 self-start"
              style={{ background: "#6EE7B7", color: "#060b18", fontWeight: 700 }}
            >
              Hire Me
            </Button>
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        {/* Floating orb top-right */}
        <div
          ref={orb1Ref}
          className="absolute top-24 right-8 md:right-24 w-48 h-48 md:w-72 md:h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(110,231,183,0.18) 0%, transparent 70%)", filter: "blur(2px)" }}
        />
        {/* Floating orb bottom-left */}
        <div
          className="float-b absolute bottom-32 left-4 md:left-20 w-32 h-32 md:w-52 md:h-52 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(147,197,253,0.13) 0%, transparent 70%)", filter: "blur(2px)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="hero-item text-sm font-semibold tracking-[0.25em] uppercase mb-6" style={{ color: "#6EE7B7" }}>
            👋 Hello, I&apos;m
          </p>

          <h1 className="hero-item font-black leading-none mb-4" style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}>
            <span className="text-white">Joy </span>
            <span className="text-gradient-mint">Saha</span>
          </h1>

          <div className="hero-item text-xl sm:text-2xl md:text-3xl font-bold mb-6" style={{ color: "#93C5FD" }}>
            <span className="opacity-40">{"<"} </span>
            <span ref={roleRef}></span>
            <span className="cursor-blinker">|</span>
            <span className="opacity-40"> {"/>"}</span>
          </div>

          <p className="hero-item text-white/60 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Motivated &amp; versatile developer with a passion for crafting clean, high-quality web experiences.
          </p>

          <div className="hero-item flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollTo("Projects")}
              style={{ background: "#6EE7B7", color: "#060b18", fontWeight: 700 }}
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("Contact")}
              style={{ borderColor: "rgba(110,231,183,0.4)", color: "#6EE7B7" }}
            >
              Contact Me
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest">
          <span>SCROLL</span>
          <ChevronDown size={18} className="bounce-slow" />
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionLabel number="01" label="About" />

          <div className="section-animate mt-10 grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-6">
                Building digital experiences{" "}
                <span className="text-gradient-mint">that matter</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                I&apos;m Joy Saha, a passionate Front-End Developer based in Brahmanbaria, Bangladesh.
                With a B.Tech in Computer Science &amp; Engineering and hands-on industry experience,
                I specialize in building performant, accessible, and visually stunning web interfaces.
              </p>
              <p className="text-white/60 leading-relaxed">
                From interactive React applications to full-stack MERN solutions, I love turning complex
                design ideas into clean, functional code. I constantly explore new technologies and frameworks
                to stay at the forefront of the web development world.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map(({ value, label, icon: Icon }) => (
                <Card key={label} className="card-glow border border-white/10 bg-white/5">
                  <CardContent className="p-5 flex flex-col gap-3">
                    <Icon size={22} style={{ color: "#6EE7B7" }} />
                    <div>
                      <p className="text-2xl sm:text-3xl font-black text-white">{value}</p>
                      <p className="text-sm text-white/50 mt-0.5">{label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────── */}
      <section id="skills" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionLabel number="02" label="Skills" />

          <div className="section-animate mt-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-12">
              Technical <span className="text-gradient-mint">Arsenal</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {SKILLS.map(({ name, pct, cat }) => {
                const color = CATEGORY_COLORS[cat] || "#6EE7B7";
                return (
                  <Card key={name} className="card-glow border border-white/10 bg-white/5">
                    <CardContent className="p-4 flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-sm text-white">{name}</span>
                        <span className="text-xs font-semibold" style={{ color }}>{pct}%</span>
                      </div>
                      <Badge
                        className="self-start text-[10px] px-2 py-0.5"
                        style={{ background: `${color}20`, color }}
                      >
                        {cat}
                      </Badge>
                      {/* Bar */}
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <div
                          className="skill-bar-inner h-full rounded-full"
                          data-pct={pct}
                          style={{ background: color, transformOrigin: "left center", transform: "scaleX(0)" }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────── */}
      <section id="projects" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionLabel number="03" label="Projects" />

          <div className="section-animate mt-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-12">
              Featured <span className="text-gradient-mint">Work</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {PROJECTS.map(({ name, icon, color, desc, tech, img, liveDemo, clientCode, serverCode }) => (
                <div
                  key={name}
                  className="project-card rounded-2xl border overflow-hidden flex flex-col"
                  style={{ borderColor: `${color}30`, background: "rgba(255,255,255,0.03)" }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-52 shrink-0">
                    <img
                      src={img}
                      alt={name}
                      className="project-img w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(6,11,24,0.95) 0%, transparent 60%)" }}
                    />
                    {/* Emoji badge */}
                    <span className="absolute top-3 left-3 text-2xl bg-black/40 backdrop-blur-sm rounded-xl px-2 py-1">
                      {icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-black mb-2" style={{ color }}>
                      {name}
                    </h3>
                    <p className="text-white/55 text-sm mb-4 leading-relaxed line-clamp-2">{desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tech.map((t) => (
                        <Badge
                          key={t}
                          className="text-[11px] px-2.5 py-0.5"
                          style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      <Button
                        size="sm"
                        asChild
                        className="w-full text-[10px] font-bold"
                        style={{ background: color, color: "#060b18" }}
                      >
                        <a href={liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                          <ExternalLink size={12} /> Live Demo
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="w-full text-[10px] font-bold"
                        style={{ borderColor: `${color}40`, color }}
                      >
                        <a href={clientCode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                          <Github size={12} /> Client
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="w-full text-[10px] font-bold"
                        style={{ borderColor: `${color}40`, color }}
                      >
                        <a href={serverCode} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                          <Github size={12} /> Server
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────── */}
      <section id="experience" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionLabel number="04" label="Experience" />

          <div className="section-animate mt-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-12">
              My <span className="text-gradient-mint">Journey</span>
            </h2>

            <div className="relative pl-8 border-l-2" style={{ borderColor: "rgba(110,231,183,0.2)" }}>
              {TIMELINE.map(({ type, years, title, org }, i) => {
                const isWork = type === "Work";
                const color = isWork ? "#6EE7B7" : "#93C5FD";
                return (
                  <div key={i} className="relative mb-10 last:mb-0">
                    {/* Dot */}
                    <div
                      className="absolute -left-[2.45rem] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: color, background: "#060b18" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                    </div>

                    <Card className="border border-white/10 bg-white/5 card-glow">
                      <CardContent className="p-5">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <Badge
                            className="text-xs px-2.5 py-0.5"
                            style={{ background: `${color}20`, color }}
                          >
                            {type}
                          </Badge>
                          <span className="text-xs text-white/40 font-semibold">{years}</span>
                        </div>
                        <h3 className="text-white font-bold text-base mb-1">{title}</h3>
                        <p className="text-white/50 text-sm">{org}</p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionLabel number="05" label="Contact" />

          <div className="section-animate mt-10 grid md:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                Let&apos;s build something{" "}
                <span className="text-gradient-pink">great together</span>
              </h2>
              <p className="text-white/55 leading-relaxed">
                I&apos;m currently open to new opportunities and exciting projects.
                Whether you have a question, a job offer, or just want to say hi —
                my inbox is always open!
              </p>
            </div>

            {/* Right */}
            <div className="grid gap-4">
              {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={label === "Email" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="contact-card flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 cursor-pointer"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(110,231,183,0.1)" }}
                  >
                    <Icon size={18} style={{ color: "#6EE7B7" }} />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 font-semibold uppercase tracking-wider">{label}</p>
                    <p className="text-sm text-white font-semibold">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center mb-8">
            {/* Left */}
            <div>
              <p className="text-2xl font-black text-white">
                JOY<span style={{ color: "#6EE7B7" }}>.</span>SAHA
              </p>
              <p className="text-sm text-white/40 mt-1">Web Developer</p>
            </div>

            {/* Center */}
            <div className="flex flex-wrap justify-start md:justify-center gap-6">
              {["About", "Skills", "Projects", "Contact"].map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l)}
                  className="text-sm text-white/50 hover:text-white transition-colors font-semibold"
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Right */}
            <p className="text-sm text-white/40 md:text-right">
              © {new Date().getFullYear()} — Crafted with <span style={{ color: "#F9A8D4" }}>♥</span> by Joy Saha
            </p>
          </div>

          {/* Gradient line */}
          <div className="gradient-line rounded-full" />
        </div>
      </footer>
    </div>
  );
}

// ─── Section Label Helper ─────────────────────────────────────────────────────
function SectionLabel({ number, label }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: "#6EE7B7" }}>
        {number} / {label}
      </span>
      <div className="flex-1 h-px" style={{ background: "rgba(110,231,183,0.2)" }} />
    </div>
  );
}
