import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Compass, 
  Leaf, 
  Cpu, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Layers, 
  Activity, 
  HeartHandshake,
  MapPin,
  Play,
  Pause,
  Clock,
  Scissors,
  Wrench,
  Gauge
} from 'lucide-react';
import './AboutPage.scss';

export const AboutPage: React.FC = () => {
  // ----------------------------------------------------
  // 1. BRAND TIMELINE JOURNEY STATE (2018 - 2026)
  // ----------------------------------------------------
  const [activeMilestone, setActiveMilestone] = useState(0);

  const milestones = [
    {
      year: '2018',
      phase: 'THE GENESIS',
      title: 'The Broken Strap & The First Blueprints',
      desc: 'Founded in a modest industrial design studio in Bengaluru by two structural architects frustrated with fragile, spine-compressing student backpacks and flimsy laptop sleeves. The first 100 prototypes were hand-cut and stress-tested on local public transit.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      tag: 'Hand-Drafted Prototypes',
      stat: '100 Units Crafted',
      statSub: 'Tested across 15,000 km of daily commuter travel'
    },
    {
      year: '2020',
      phase: 'BIOMECHANICS RESEARCH',
      title: 'Spinal Health Lab & The S-Curve System',
      desc: 'Partnered with orthopedic spine specialists to map gravitational pressure points on developing teenage and adult spines. Developed our proprietary S-Curve EVA shoulder suspension that displaces 65% of pack weight onto the pelvis.',
      image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=900&q=80',
      tag: 'Orthopedic Endorsement',
      stat: '65% Pressure Relief',
      statSub: 'Clinically tested reduction in neck and lumbar strain'
    },
    {
      year: '2022',
      phase: 'CIRCULAR BREAKTHROUGH',
      title: 'Hydro-Armor™ & Recycled Ocean Textiles',
      desc: 'Replaced traditional petroleum-based synthetics with 100% GRS-certified recycled ocean-bound plastics. Patented our Hydro-Armor™ PFC-free hydrophobic weather coating, delivering a 5,000mm water barrier without environmental toxins.',
      image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=900&q=80',
      tag: 'Eco-Resilience Patent',
      stat: '28 Bottles / Pack',
      statSub: 'Over 4.2 million plastic bottles diverted from oceans'
    },
    {
      year: '2024',
      phase: 'ATELIER EXPANSION',
      title: 'Global Experience Hubs & 500,000 Scholars',
      desc: 'Expanded beyond digital storefronts with flagship sensory ateliers in Mumbai, Bengaluru, and New Delhi. Reached our 500,000th customer milestone across 42 countries, equipping top academic institutions and tech enterprises.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
      tag: 'Worldwide Footprint',
      stat: '500,000+ Geared',
      statSub: 'Equipping students in over 42 countries globally'
    },
    {
      year: '2026',
      phase: 'NEXT HORIZON',
      title: 'Smart Biometrics & Autonomous Craftsmanship',
      desc: 'Pioneering magnetic FIDLOCK® modular docking, embedded RFID bio-shields, and zero-gravity suspension frames. Continuing our uncompromising mission: to build the most durable, elegant carrying instruments in the world.',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80',
      tag: 'Future of Carry',
      stat: 'Zero-Gravity Spec',
      statSub: 'Engineered for another 20 years of relentless use'
    }
  ];

  // ----------------------------------------------------
  // 2. FULL BAG CREATION / BUILD JOURNEY PIPELINE (STAGES 1-6)
  // ----------------------------------------------------
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const buildStages = [
    {
      step: '01',
      name: 'Architectural Blueprint & 3D Load Simulation',
      headline: 'Before a single thread is cut, every stress vector is simulated.',
      desc: 'Our industrial designers render each bag model in 3D CAD to simulate gravitational pressure across shoulder pivot points. We calculate weight displacement down to the gram, ensuring textbooks and high-spec laptops float safely within the chassis.',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80',
      specs: [
        { label: 'Dimensional Tolerance', val: '±0.02 mm' },
        { label: 'Virtual Drop Load', val: '25 kg Stress' },
        { label: 'CAD Testing Cycles', val: '120+ Simulations' }
      ],
      tag: 'STAGE 01: DIGITAL ARCHITECTURE'
    },
    {
      step: '02',
      name: 'Textile Sourcing & High-Precision Laser Cutting',
      headline: 'Automated CO2 laser knives seal every micro-fiber against fraying.',
      desc: 'Raw rolls of 1680D Cordura® ballistic weave and recycled ocean polymers are fed into computerized laser cutters. The extreme focal beam instantly seals fabric edges with microscopic heat, preventing seam unraveling under heavy tension.',
      icon: Scissors,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
      specs: [
        { label: 'Cutting Precision', val: 'Micron-Level' },
        { label: 'Edge Finish', val: '100% Thermal Sealed' },
        { label: 'Hydro Shield', val: '5,000 mm Column' }
      ],
      tag: 'STAGE 02: LASER CUTTING'
    },
    {
      step: '03',
      name: 'Thermo-Molded S-Curve Straps & Lumbar Injection',
      headline: 'Closed-cell EVA memory foam baked to preserve ergonomic contours.',
      desc: 'Shoulder harness curves are heat-pressed inside precision steel molds at 180°C. We inject breathable 3D hex-channel AirMesh to create active airflow tunnels that prevent sweat accumulation during hot campus walks.',
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=900&q=80',
      specs: [
        { label: 'Compression Temp', val: '180°C Pressure' },
        { label: 'Foam Density', val: 'Dual-Layer EVA' },
        { label: 'Air-Channel Flow', val: 'Hexagonal 3D Mesh' }
      ],
      tag: 'STAGE 03: ERGONOMIC SHAPING'
    },
    {
      step: '04',
      name: 'Military Bar-Tack Stitching & AquaGuard® Sealing',
      headline: 'Over 2,400 precision stitches per bag with reinforced stress hubs.',
      desc: 'Master artisans assemble the 78 individual panels using heavy-gauge bonded nylon threads. Every corner and strap terminal receives a high-density bar-tack stitch. Zippers are heat-welded using YKK® AquaGuard® waterproof polyurethane tapes.',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
      specs: [
        { label: 'Stitch Density', val: '2,400+ Per Bag' },
        { label: 'Stress Reinforce', val: 'Triple Bar-Tack' },
        { label: 'Waterproof Zipper', val: 'YKK® AquaGuard®' }
      ],
      tag: 'STAGE 04: SEAM CONSTRUCTION'
    },
    {
      step: '05',
      name: '14-Stage Drop, Torsion & Hydrostatic Rig Testing',
      headline: 'Subjected to robotic torture rigs simulating a decade of school journeys.',
      desc: 'Random production units are loaded with 20kg weights and dropped from 2-meter heights 1,000 consecutive times. The top handle is yanked on a mechanical jerk machine for 50,000 cycles while storm chambers spray high-pressure monsoon water.',
      icon: Gauge,
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80',
      specs: [
        { label: 'Handle Jerk Rig', val: '50,000 Pulls' },
        { label: 'Free Drop Rig', val: '2m Height / 20kg' },
        { label: 'Downpour Spray', val: '30 Min Torrent' }
      ],
      tag: 'STAGE 05: TORTURE RIG TESTING'
    },
    {
      step: '06',
      name: 'White-Glove Artisan Inspection & Lifetime Monogram',
      headline: 'Every single bag is hand-inspected, serialized, and sealed.',
      desc: 'Before any bag leaves our atelier, an inspector reviews all 78 component junctions under daylight magnification. A unique metallic serial number is debossed onto the internal leather badge, registering it under our Lifetime Warranty.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=900&q=80',
      specs: [
        { label: 'Inspection Grade', val: 'White-Glove 78-Pt' },
        { label: 'Serial Registry', val: 'Laser Debossed' },
        { label: 'Warranty Shield', val: 'Lifetime Atelier' }
      ],
      tag: 'STAGE 06: ATELIER FINISHING'
    }
  ];

  // Auto-play timer for build journey
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % buildStages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, buildStages.length]);

  return (
    <div className="about-page">
      {/* 1. HERO EDITORIAL SHOWCASE */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-eyebrow">ESTABLISHED 2018 • ARCHITECTURAL CARRY SYSTEMS</span>
            <h1 className="hero-title">
              Form Follows Movement. Built for a Lifetime of Journeys.
            </h1>
            <p className="hero-subtitle">
              At VELO &amp; CO., we believe a bag is not merely an accessory — it is your personal mobile sanctuary. Engineered at the intersection of ergonomic science, high-tensile materials, and timeless minimalist luxury.
            </p>
            <div className="hero-actions">
              <a href="#brand-journey" className="btn btn-primary">
                Explore Our Genesis &amp; Journey
                <ArrowRight size={18} />
              </a>
              <a href="#build-journey" className="btn btn-secondary">
                See How We Build A Bag
              </a>
            </div>
          </div>
        </div>

        {/* Hero Visual Collage */}
        <div className="hero-media-strip">
          <div className="container">
            <div className="media-grid">
              <div className="media-card primary">
                <img 
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80" 
                  alt="VELO Craftsmanship Atelier" 
                />
                <div className="media-caption">
                  <span className="caption-badge">THE ATELIER</span>
                  <p>Hand-cut ballistic nylon and saddle-stitched stress points.</p>
                </div>
              </div>

              <div className="media-card">
                <img 
                  src="https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80" 
                  alt="Ergonomic Testing" 
                />
                <div className="media-caption">
                  <span className="caption-badge">BIOMECHANICS</span>
                  <p>Weight redistribution tested with spinal orthopedic experts.</p>
                </div>
              </div>

              <div className="media-card">
                <img 
                  src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80" 
                  alt="Minimalist Design Language" 
                />
                <div className="media-caption">
                  <span className="caption-badge">MATERIALS</span>
                  <p>Recycled ocean polymers with Makrolon® polycarbonate.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NUMERICAL CREDIBILITY & IMPACT METRICS */}
      <section className="about-stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">500K+</span>
              <span className="stat-label">Students &amp; Leaders Geared</span>
              <p className="stat-sub">Across 42 countries and top educational institutions globally.</p>
            </div>

            <div className="stat-item">
              <span className="stat-number">14-Stage</span>
              <span className="stat-label">Drop &amp; Tensile Rig Testing</span>
              <p className="stat-sub">Simulating 10+ years of daily school commute and luggage carousel stress.</p>
            </div>

            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Weatherproof Integrity</span>
              <p className="stat-sub">Hydrophobic polyurethane coatings and YKK® AquaGuard® zippers.</p>
            </div>

            <div className="stat-item">
              <span className="stat-number">Lifetime</span>
              <span className="stat-label">Craftsmanship Guarantee</span>
              <p className="stat-sub">Direct atelier repair warranty covering seams, structural buckles, and zips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BRAND ORIGIN & EVOLUTION JOURNEY (START HERE - ANIMATED TIMELINE)      */}
      {/* ========================================================================= */}
      <section id="brand-journey" className="about-brand-journey-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">OUR GENESIS &amp; CHRONICLE</span>
            <h2 className="section-title">The Journey From Inception to Global Renown</h2>
            <p className="section-subtitle">
              How a refusal to compromise transformed an experimental student backpack into an international standard of durable carrying science.
            </p>
          </div>

          {/* Interactive Timeline Navigation Bar */}
          <div className="timeline-nav-wrapper">
            <div className="timeline-track">
              <div 
                className="timeline-progress-fill" 
                style={{ width: `${(activeMilestone / (milestones.length - 1)) * 100}%` }}
              />
            </div>

            <div className="timeline-nodes-grid">
              {milestones.map((m, index) => {
                const isActive = activeMilestone === index;
                const isPassed = activeMilestone >= index;

                return (
                  <button
                    key={m.year}
                    type="button"
                    className={`timeline-node-btn ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                    onClick={() => setActiveMilestone(index)}
                    aria-label={`Jump to year ${m.year}`}
                  >
                    <span className="node-dot">
                      <span className="node-inner" />
                    </span>
                    <span className="node-year">{m.year}</span>
                    <span className="node-phase">{m.phase}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Milestone Animated Showcase Card */}
          <div className="milestone-showcase-card">
            <div className="milestone-content-col">
              <div className="milestone-meta">
                <span className="milestone-year-badge">{milestones[activeMilestone].year}</span>
                <span className="milestone-phase-badge">{milestones[activeMilestone].phase}</span>
              </div>

              <h3 className="milestone-title">
                {milestones[activeMilestone].title}
              </h3>

              <p className="milestone-description">
                {milestones[activeMilestone].desc}
              </p>

              <div className="milestone-highlight-card">
                <div className="highlight-stat">
                  <span className="stat-val">{milestones[activeMilestone].stat}</span>
                  <span className="stat-lbl">{milestones[activeMilestone].statSub}</span>
                </div>
              </div>

              <div className="milestone-nav-buttons">
                <button 
                  type="button"
                  className="nav-btn"
                  disabled={activeMilestone === 0}
                  onClick={() => setActiveMilestone((prev) => Math.max(0, prev - 1))}
                >
                  <ArrowLeft size={16} />
                  <span>Previous Milestone</span>
                </button>

                <button 
                  type="button"
                  className="nav-btn primary"
                  disabled={activeMilestone === milestones.length - 1}
                  onClick={() => setActiveMilestone((prev) => Math.min(milestones.length - 1, prev + 1))}
                >
                  <span>Next Milestone</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="milestone-image-col">
              <div className="image-frame">
                <img 
                  src={milestones[activeMilestone].image} 
                  alt={milestones[activeMilestone].title} 
                />
                <div className="image-overlay-badge">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>{milestones[activeMilestone].tag}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW TO MAKE THE BUILD: FULL 6-STAGE PRODUCTION PIPELINE (ANIMATED)     */}
      {/* ========================================================================= */}
      <section id="build-journey" className="about-build-pipeline-section">
        <div className="container">
          <div className="pipeline-header-flex">
            <div className="text-block">
              <span className="section-eyebrow">THE CRAFTSMANSHIP LABORATORY</span>
              <h2 className="section-title">How A VELO Bag is Built: The 6-Stage Journey</h2>
              <p className="section-subtitle">
                From raw computational 3D blueprints to laser-cut ballistic armor and 14-stage torture rigs.
              </p>
            </div>

            {/* Auto-Play Toggle */}
            <div className="pipeline-controls">
              <button 
                type="button" 
                className={`autoplay-btn ${isAutoPlaying ? 'playing' : ''}`}
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              >
                {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
                <span>{isAutoPlaying ? 'Pause Auto-Play' : 'Auto-Play Journey'}</span>
              </button>
            </div>
          </div>

          {/* Stage Step Selector Tabs */}
          <div className="stage-tabs-grid">
            {buildStages.map((stage, idx) => {
              const IconComp = stage.icon;
              const isActive = activeStage === idx;

              return (
                <button
                  key={stage.step}
                  type="button"
                  className={`stage-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveStage(idx);
                    setIsAutoPlaying(false);
                  }}
                >
                  <div className="tab-top">
                    <span className="stage-num">0{idx + 1}</span>
                    <IconComp size={18} className="stage-icon" />
                  </div>
                  <span className="stage-tab-title">{stage.name}</span>
                  {isActive && <span className="active-glow-bar" />}
                </button>
              );
            })}
          </div>

          {/* Main Stage Interactive Showcase */}
          <div className="active-stage-card">
            <div className="stage-info-column">
              <div className="stage-header-row">
                <span className="stage-tag-pill">{buildStages[activeStage].tag}</span>
                <span className="stage-index-counter">
                  STAGE <strong>0{activeStage + 1}</strong> OF <strong>06</strong>
                </span>
              </div>

              <h3 className="stage-display-title">
                {buildStages[activeStage].name}
              </h3>

              <p className="stage-headline-lead">
                "{buildStages[activeStage].headline}"
              </p>

              <p className="stage-long-desc">
                {buildStages[activeStage].desc}
              </p>

              {/* Technical Specifications Grid */}
              <div className="stage-specs-grid">
                {buildStages[activeStage].specs.map((spec, sIdx) => (
                  <div key={sIdx} className="spec-item">
                    <span className="spec-label">{spec.label}</span>
                    <strong className="spec-val">{spec.val}</strong>
                  </div>
                ))}
              </div>

              {/* Next/Prev Navigation */}
              <div className="stage-pagination">
                <button
                  type="button"
                  className="stage-nav-arrow"
                  onClick={() => {
                    setActiveStage((prev) => (prev === 0 ? buildStages.length - 1 : prev - 1));
                    setIsAutoPlaying(false);
                  }}
                  title="Previous Stage"
                >
                  <ArrowLeft size={18} />
                  <span>Prev Stage</span>
                </button>

                <div className="stage-dots">
                  {buildStages.map((_, dotIdx) => (
                    <span 
                      key={dotIdx} 
                      className={`dot ${dotIdx === activeStage ? 'active' : ''}`}
                      onClick={() => {
                        setActiveStage(dotIdx);
                        setIsAutoPlaying(false);
                      }}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  className="stage-nav-arrow"
                  onClick={() => {
                    setActiveStage((prev) => (prev + 1) % buildStages.length);
                    setIsAutoPlaying(false);
                  }}
                  title="Next Stage"
                >
                  <span>Next Stage</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Stage Visual Column with HUD Overlays */}
            <div className="stage-visual-column">
              <div className="stage-image-wrapper">
                <img 
                  src={buildStages[activeStage].image} 
                  alt={buildStages[activeStage].name} 
                />
                
                {/* Visual HUD overlay pins */}
                <div className="hud-overlay">
                  <div className="hud-badge top-left">
                    <Wrench size={13} />
                    <span>VELO ATELIER SPEC</span>
                  </div>
                  <div className="hud-badge bottom-right">
                    <CheckCircle2 size={13} />
                    <span>PRECISION VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR FOUR CORE PILLARS OF ENGINEERING */}
      <section className="about-pillars-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">THE VELO STANDARD</span>
            <h2 className="section-title">Four Pillars of Uncompromising Engineering</h2>
            <p className="section-subtitle">
              Every curve, lining, and pocket is purpose-driven to solve real carrying friction.
            </p>
          </div>

          <div className="pillars-cards-grid">
            <div className="pillar-feature-card">
              <div className="pillar-icon-box">
                <Activity size={32} />
              </div>
              <h3 className="pillar-card-title">Orthopedic Spinal Health</h3>
              <p className="pillar-card-desc">
                Traditional backpacks pull the shoulders backward, causing neck compression. Our proprietary S-Curve EVA straps and AirMesh lumbar pads channel 65% of weight directly onto the pelvic bone, keeping students and commuters upright.
              </p>
              <ul className="pillar-bullet-list">
                <li><CheckCircle2 size={16} /> Certified ergonomic load displacement</li>
                <li><CheckCircle2 size={16} /> Multi-density shock absorption backplate</li>
                <li><CheckCircle2 size={16} /> Magnetic quick-adjust sternum strap</li>
              </ul>
            </div>

            <div className="pillar-feature-card">
              <div className="pillar-icon-box">
                <ShieldCheck size={32} />
              </div>
              <h3 className="pillar-card-title">Indestructible Materials</h3>
              <p className="pillar-card-desc">
                From 1680D Cordura® ballistic weave to Makrolon® German polycarbonate shells, we select textiles engineered for extreme resilience against downpours, concrete scrapes, and daily overhead bin friction.
              </p>
              <ul className="pillar-bullet-list">
                <li><CheckCircle2 size={16} /> 5,000mm hydrostatic head waterproof barrier</li>
                <li><CheckCircle2 size={16} /> Bar-tack reinforcement on all stress seams</li>
                <li><CheckCircle2 size={16} /> Custom forged anodized zinc-alloy hardware</li>
              </ul>
            </div>

            <div className="pillar-feature-card">
              <div className="pillar-icon-box">
                <Cpu size={32} />
              </div>
              <h3 className="pillar-card-title">Digital Nomad Architecture</h3>
              <p className="pillar-card-desc">
                Dedicated suspended tech cradles ensure your MacBook or tablet floats 1.5 inches above the base of the bag, neutralizing impact when set down abruptly on hard ceramic or tarmac.
              </p>
              <ul className="pillar-bullet-list">
                <li><CheckCircle2 size={16} /> Suspended 360° velvet-lined laptop cradle</li>
                <li><CheckCircle2 size={16} /> RFID-shielded biometric passport &amp; card pocket</li>
                <li><CheckCircle2 size={16} /> Pass-through luggage trolley sleeve</li>
              </ul>
            </div>

            <div className="pillar-feature-card">
              <div className="pillar-icon-box">
                <Leaf size={32} />
              </div>
              <h3 className="pillar-card-title">Conscious Circular Craft</h3>
              <p className="pillar-card-desc">
                We take accountability for our ecological footprint. 80% of our collection uses GRS-certified post-consumer recycled PET fabric bottles, finished with PFC-free water-repellent treatments.
              </p>
              <ul className="pillar-bullet-list">
                <li><CheckCircle2 size={16} /> ~28 ocean plastic bottles repurposed per pack</li>
                <li><CheckCircle2 size={16} /> Zero fluorocarbon (PFC-free) DWR treatment</li>
                <li><CheckCircle2 size={16} /> 100% biodegradable FSC certified packaging</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE BAG ANATOMY BLUEPRINT */}
      <section className="about-blueprint-section">
        <div className="container">
          <div className="blueprint-box">
            <div className="blueprint-info">
              <span className="blueprint-badge">DISSECTED ANATOMY</span>
              <h2 className="blueprint-title">Inside a VELO Carrying Instrument</h2>
              <p className="blueprint-desc">
                Over 78 individual precision components work in harmonic synchronization to ensure absolute protection of your academic and professional gear.
              </p>

              <div className="layers-accordion">
                <div className="layer-item">
                  <div className="layer-num">01</div>
                  <div className="layer-text">
                    <h4>Hydro-Armor Outer Shell</h4>
                    <p>Weatherproof 840D recycled nylon with micro-ripstop weave preventing snags.</p>
                  </div>
                </div>

                <div className="layer-item">
                  <div className="layer-num">02</div>
                  <div className="layer-text">
                    <h4>High-Density EVA Impact Core</h4>
                    <p>Internal 6mm closed-cell foam buffers accidental drops and structural crushing.</p>
                  </div>
                </div>

                <div className="layer-item">
                  <div className="layer-num">03</div>
                  <div className="layer-text">
                    <h4>Thermo-Regulating Lumbar Air-Mesh</h4>
                    <p>3D hex-channel padding prevents back sweat during long commutes and hot campus walks.</p>
                  </div>
                </div>

                <div className="layer-item">
                  <div className="layer-num">04</div>
                  <div className="layer-text">
                    <h4>High-Visibility Contrast Interior</h4>
                    <p>Soft silver lining ensures small items like keys and flash drives are instantly spotted in low light.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="blueprint-visual">
              <img 
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80" 
                alt="VELO Bag Blueprint" 
              />
              <div className="blueprint-tag tag-top">REINFORCED TOP ARCH</div>
              <div className="blueprint-tag tag-side">MODULAR ACCESS PORT</div>
              <div className="blueprint-tag tag-bottom">IMPACT REBOUND SOLE</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GLOBAL ATELIERS & HUBS */}
      <section className="about-ateliers-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">WORLDWIDE PRESENCE</span>
            <h2 className="section-title">Design Studios &amp; Experience Centers</h2>
            <p className="section-subtitle">
              Where materials research, human ergonomics, and industrial design take physical form.
            </p>
          </div>

          <div className="ateliers-grid">
            <div className="atelier-card">
              <div className="atelier-image">
                <img 
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80" 
                  alt="Bengaluru Innovation Hub" 
                />
              </div>
              <div className="atelier-content">
                <div className="atelier-city">
                  <MapPin size={18} className="text-bronze" />
                  <h4>Bengaluru, India</h4>
                </div>
                <p className="atelier-role">Global Engineering &amp; Ergonomics Lab</p>
                <p className="atelier-address">100 Feet Road, Indiranagar, Bengaluru, KA 560038</p>
              </div>
            </div>

            <div className="atelier-card">
              <div className="atelier-image">
                <img 
                  src="https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=600&q=80" 
                  alt="Mumbai Experience Studio" 
                />
              </div>
              <div className="atelier-content">
                <div className="atelier-city">
                  <MapPin size={18} className="text-bronze" />
                  <h4>Mumbai, India</h4>
                </div>
                <p className="atelier-role">Flagship Retail &amp; Custom Monogramming</p>
                <p className="atelier-address">G Block, Bandra Kurla Complex (BKC), Mumbai, MH 400051</p>
              </div>
            </div>

            <div className="atelier-card">
              <div className="atelier-image">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=600&q=80" 
                  alt="New Delhi Diplomatic Atelier" 
                />
              </div>
              <div className="atelier-content">
                <div className="atelier-city">
                  <MapPin size={18} className="text-bronze" />
                  <h4>New Delhi, India</h4>
                </div>
                <p className="atelier-role">Executive &amp; Corporate Bespoke Atelier</p>
                <p className="atelier-address">The Chanakya, Chanakyapuri, New Delhi, DL 110021</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOUNDER'S PLEDGE & MANIFESTO */}
      <section className="about-manifesto-section">
        <div className="container">
          <div className="manifesto-card">
            <span className="manifesto-quote-mark">“</span>
            <blockquote className="manifesto-quote">
              We started VELO &amp; CO. because we were tired of choosing between fragile fashion bags that rip within six months and bulky military gear with zero elegance. A student carrying their entire academic future and a professional carrying critical contracts deserve a bag that honors their ambition with flawless protection.
            </blockquote>
            <div className="manifesto-author">
              <div className="author-info">
                <span className="author-name">Aarav Singhania &amp; Elena Rostova</span>
                <span className="author-title">Co-Founders &amp; Heads of Industrial Design, VELO &amp; CO.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CALL TO ACTION */}
      <section className="about-cta-section">
        <div className="container">
          <div className="cta-wrapper">
            <div className="cta-text">
              <h2>Ready to Elevate Your Daily Carry?</h2>
              <p>Discover our engineered school backpacks, executive briefcases, and modular travel gear.</p>
            </div>
            <div className="cta-buttons">
              <Link to="/products" className="btn btn-primary">
                Shop The Entire Catalog
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-outline-white">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
