import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import './Preloader.scss';

interface PreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // milliseconds
}

export const Preloader: React.FC<PreloaderProps> = ({ 
  onComplete, 
  minDuration = 4200 
}) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'disassembled' | 'assembling' | 'assembled' | 'boy-arrives' | 'boy-takes' | 'done'>('disassembled');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = 30; // update every 30ms

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.round((elapsed / minDuration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress < 22) {
        setPhase('disassembled');
      } else if (currentProgress < 50) {
        setPhase('assembling');
      } else if (currentProgress < 68) {
        setPhase('assembled');
      } else if (currentProgress < 82) {
        setPhase('boy-arrives');
      } else if (currentProgress < 98) {
        setPhase('boy-takes');
      } else {
        setPhase('done');
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [minDuration, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 400);
  };

  const getStatusText = () => {
    switch (phase) {
      case 'disassembled':
        return 'Sourcing ballistic fabrics & ergonomic components...';
      case 'assembling':
        return 'Precision stitching & self-assembling school bag parts...';
      case 'assembled':
        return 'VELO School Bag assembled & drop-tested!';
      case 'boy-arrives':
        return 'Here comes the young scholar...';
      case 'boy-takes':
        return 'Bag ready & geared up for school!';
      case 'done':
        return 'Welcome to VELO & CO.';
    }
  };

  return (
    <div className={`velo-preloader-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="preloader-backdrop-glow" />

      {/* Top Bar with Brand and Skip */}
      <div className="preloader-header">
        <div className="brand-logo">
          <span className="brand-title">VELO & CO.</span>
          <span className="brand-tag">CRAFTSMANSHIP STUDIO</span>
        </div>
        <button 
          type="button" 
          className="skip-button" 
          onClick={handleSkip} 
          title="Skip Intro"
        >
          <span>Skip Intro</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Central Interactive Animation Stage */}
      <div className="preloader-stage-container">
        <svg 
          viewBox="0 0 900 520" 
          className={`stage-svg phase-${phase}`}
          aria-label="Interactive bag assembly and schoolboy animation"
        >
          <defs>
            {/* Bag Gradients */}
            <linearGradient id="bagShellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="goldAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="strapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fdba74" />
            </linearGradient>
            <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#292524" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>
            <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            {/* Filter for glow & drop shadows */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="130%">
              <feDropShadow dx="0" dy="12" stdDeviation="10" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Ambient Platform Shadow */}
          <ellipse 
            cx="450" 
            cy="420" 
            rx="180" 
            ry="22" 
            className="ground-shadow" 
          />

          {/* Dynamic Laser / Stitch Guide Path */}
          <g className="stitch-guide-lines">
            <path 
              d="M 370 160 C 370 120 530 120 530 160 L 545 370 C 545 390 355 390 355 370 Z" 
              className="stitch-contour"
            />
          </g>

          {/* --- THE SCHOOL BAG ASSEMBLY GROUP --- */}
          <g id="school-bag-assembly" className="bag-group" filter="url(#dropShadow)">

            {/* Part 1: Top Grab Handle */}
            <g className="bag-part part-handle">
              <path 
                d="M 425 155 C 425 118 475 118 475 155" 
                fill="none" 
                stroke="#0f172a" 
                strokeWidth="12" 
                strokeLinecap="round" 
              />
              <path 
                d="M 432 145 C 432 128 468 128 468 145" 
                fill="none" 
                stroke="url(#goldAccentGrad)" 
                strokeWidth="4" 
                strokeLinecap="round" 
              />
            </g>

            {/* Part 2: Ergonomic Back Straps (Behind) */}
            <g className="bag-part part-straps-back">
              {/* Left Strap Arch */}
              <path 
                d="M 410 160 C 365 190 340 280 370 360" 
                fill="none" 
                stroke="url(#strapGrad)" 
                strokeWidth="20" 
                strokeLinecap="round" 
              />
              {/* Right Strap Arch */}
              <path 
                d="M 490 160 C 535 190 560 280 530 360" 
                fill="none" 
                stroke="url(#strapGrad)" 
                strokeWidth="20" 
                strokeLinecap="round" 
              />
              {/* Reflective high-vis stripe on strap */}
              <path 
                d="M 360 240 L 354 270" 
                stroke="#38bdf8" 
                strokeWidth="5" 
                strokeLinecap="round" 
              />
              <path 
                d="M 540 240 L 546 270" 
                stroke="#38bdf8" 
                strokeWidth="5" 
                strokeLinecap="round" 
              />
            </g>

            {/* Part 3: Main Arch Bag Body Shell */}
            <g className="bag-part part-main-body">
              {/* Base body */}
              <path 
                d="M 375 175 C 375 130 525 130 525 175 L 538 360 C 538 385 362 385 362 360 Z" 
                fill="url(#bagShellGrad)" 
              />
              {/* Main compartment zipper curve */}
              <path 
                d="M 382 178 C 382 142 518 142 518 178" 
                fill="none" 
                stroke="#0f172a" 
                strokeWidth="5" 
                strokeDasharray="4 3" 
              />
              {/* Accent diagonal color block */}
              <path 
                d="M 368 230 Q 450 260 532 230 L 535 270 Q 450 300 365 270 Z" 
                fill="#1e40af" 
                opacity="0.65" 
              />
            </g>

            {/* Part 4: Side Mesh Bottle Pockets */}
            <g className="bag-part part-left-pocket">
              <path 
                d="M 358 275 Q 345 285 348 340 L 366 345 Z" 
                fill="#1e293b" 
                opacity="0.9" 
              />
              {/* Insulated Bottle inside pocket */}
              <rect x="345" y="250" width="16" height="42" rx="6" fill="#0284c7" />
              <rect x="348" y="244" width="10" height="8" rx="2" fill="#e2e8f0" />
            </g>
            <g className="bag-part part-right-pocket">
              <path 
                d="M 542 275 Q 555 285 552 340 L 534 345 Z" 
                fill="#1e293b" 
                opacity="0.9" 
              />
              {/* Umbrella / compact pouch */}
              <rect x="539" y="254" width="14" height="38" rx="5" fill="#f59e0b" />
            </g>

            {/* Part 5: Front Zipper Pocket & Stationery Organiser */}
            <g className="bag-part part-front-pocket">
              {/* Front rounded pocket pouch */}
              <path 
                d="M 382 255 C 382 235 518 235 518 255 L 522 360 C 522 375 378 375 378 360 Z" 
                fill="url(#pocketGrad)" 
                stroke="#1d4ed8" 
                strokeWidth="2" 
              />
              {/* Front zipper track */}
              <path 
                d="M 395 260 L 505 260" 
                stroke="#0f172a" 
                strokeWidth="4" 
                strokeDasharray="3 2" 
              />
              {/* Gold Metal Zipper Puller */}
              <circle cx="450" cy="260" r="5" fill="url(#goldAccentGrad)" />
              <rect x="447" y="265" width="6" height="15" rx="3" fill="url(#goldAccentGrad)" />

              {/* Reflective safety bar */}
              <rect x="410" y="340" width="80" height="5" rx="2.5" fill="#38bdf8" opacity="0.9" />

              {/* Brand Silicone Emblem Patch */}
              <g className="brand-patch" transform="translate(425, 290)">
                <rect x="0" y="0" width="50" height="24" rx="5" fill="#0f172a" />
                <text 
                  x="25" 
                  y="16" 
                  textAnchor="middle" 
                  fill="#fbbf24" 
                  fontSize="8.5" 
                  fontWeight="bold" 
                  letterSpacing="1"
                >
                  VELO
                </text>
              </g>
            </g>

            {/* Sparkle Gleams on completion */}
            <g className="assembly-sparkles">
              <path d="M 535 150 L 542 153 L 535 156 L 532 163 L 529 156 L 522 153 L 529 150 L 532 143 Z" fill="#fbbf24" />
              <path d="M 360 210 L 365 212 L 360 214 L 358 219 L 356 214 L 351 212 L 356 210 L 358 205 Z" fill="#38bdf8" />
              <path d="M 515 330 L 521 332 L 515 334 L 513 340 L 511 334 L 505 332 L 511 330 L 513 324 Z" fill="#fbbf24" />
            </g>
          </g>

          {/* --- THE SCHOOL BOY CHARACTER GROUP --- */}
          <g id="school-boy-character" className="boy-group">
            {/* Shadow beneath the boy */}
            <ellipse cx="280" cy="425" rx="50" ry="12" fill="#000000" opacity="0.12" className="boy-shadow" />

            {/* Legs and School Uniform Trousers */}
            <g className="boy-legs">
              {/* Left Leg */}
              <line x1="265" y1="340" x2="260" y2="405" stroke="#1e293b" strokeWidth="16" strokeLinecap="round" />
              {/* Left Shoe */}
              <ellipse cx="253" cy="410" rx="14" ry="7" fill="#0f172a" />
              <rect x="245" y="411" width="18" height="3" fill="#ffffff" rx="1" />

              {/* Right Leg */}
              <line x1="295" y1="340" x2="295" y2="405" stroke="#1e293b" strokeWidth="16" strokeLinecap="round" />
              {/* Right Shoe */}
              <ellipse cx="298" cy="410" rx="14" ry="7" fill="#0f172a" />
              <rect x="290" y="411" width="18" height="3" fill="#ffffff" rx="1" />
            </g>

            {/* School Boy Torso / Uniform Jacket */}
            <g className="boy-torso">
              {/* White collar shirt & dark school blazer */}
              <path d="M 250 250 L 310 250 L 315 345 L 245 345 Z" fill="url(#shirtGrad)" />
              {/* Navy Blazer Jacket */}
              <path d="M 245 250 L 275 250 L 265 345 L 242 345 Z" fill="#0f172a" />
              <path d="M 315 250 L 285 250 L 295 345 L 318 345 Z" fill="#0f172a" />
              {/* School Tie */}
              <polygon points="278,252 282,252 285,310 280,320 275,310" fill="#dc2626" />
              {/* Tie stripes */}
              <line x1="277" y1="270" x2="283" y2="270" stroke="#fef08a" strokeWidth="2" />
              <line x1="276" y1="290" x2="284" y2="290" stroke="#fef08a" strokeWidth="2" />
            </g>

            {/* Left Arm (Relaxed or posing) */}
            <g className="boy-left-arm">
              <path d="M 248 255 Q 230 290 236 325" fill="none" stroke="#0f172a" strokeWidth="14" strokeLinecap="round" />
              <circle cx="236" cy="328" r="8" fill="url(#skinGrad)" />
            </g>

            {/* Boy's Head & Face */}
            <g className="boy-head">
              {/* Neck */}
              <rect x="272" y="235" width="16" height="18" fill="url(#skinGrad)" rx="3" />

              {/* Head shape */}
              <ellipse cx="280" cy="205" rx="30" ry="34" fill="url(#skinGrad)" />

              {/* Cute Ears */}
              <circle cx="249" cy="205" r="7" fill="url(#skinGrad)" />
              <circle cx="311" cy="205" r="7" fill="url(#skinGrad)" />

              {/* Stylized Hair */}
              <path 
                d="M 248 200 C 248 160 312 160 312 200 C 315 185 305 170 290 168 C 275 166 260 175 250 190 Z" 
                fill="url(#hairGrad)" 
              />
              {/* Front hair tuft */}
              <path d="M 265 175 Q 275 188 288 180" fill="none" stroke="url(#hairGrad)" strokeWidth="6" strokeLinecap="round" />

              {/* Friendly Eyes */}
              <ellipse cx="270" cy="202" rx="3" ry="4" fill="#1c1917" className="eye-left" />
              <ellipse cx="290" cy="202" rx="3" ry="4" fill="#1c1917" className="eye-right" />
              {/* Eye shine highlights */}
              <circle cx="271" cy="200" r="1.2" fill="#ffffff" />
              <circle cx="291" cy="200" r="1.2" fill="#ffffff" />

              {/* Eyebrows */}
              <path d="M 265 194 Q 270 191 275 194" fill="none" stroke="#292524" strokeWidth="2" strokeLinecap="round" />
              <path d="M 285 194 Q 290 191 295 194" fill="none" stroke="#292524" strokeWidth="2" strokeLinecap="round" />

              {/* Cheerful Smile */}
              <path d="M 273 216 Q 280 225 287 216" fill="none" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" />

              {/* Rosy Cheeks */}
              <circle cx="264" cy="212" r="5" fill="#fca5a5" opacity="0.5" />
              <circle cx="296" cy="212" r="5" fill="#fca5a5" opacity="0.5" />
            </g>

            {/* Right Arm: Extends, grabs the bag and lifts it up! */}
            <g className="boy-right-arm">
              {/* Upper arm */}
              <path 
                d="M 310 258 Q 360 270 410 240" 
                fill="none" 
                stroke="#0f172a" 
                strokeWidth="15" 
                strokeLinecap="round" 
                className="arm-path"
              />
              {/* Hand grabbing the bag handle */}
              <g className="boy-hand" transform="translate(425, 150)">
                <ellipse cx="5" cy="0" rx="9" ry="8" fill="url(#skinGrad)" />
                <path d="M 0 -5 Q 8 2 12 -3" stroke="url(#skinGrad)" strokeWidth="4" strokeLinecap="round" />
              </g>
            </g>

            {/* Speech / Action Bubble: "Ready for School!" */}
            <g className="speech-bubble" transform="translate(200, 100)">
              <rect x="0" y="0" width="160" height="42" rx="14" fill="#0f172a" />
              <polygon points="80,42 90,42 85,52" fill="#0f172a" />
              <text 
                x="80" 
                y="26" 
                textAnchor="middle" 
                fill="#ffffff" 
                fontSize="12" 
                fontWeight="700"
                letterSpacing="0.5"
              >
                🎒 Ready for School!
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Progress & Milestone Indicator */}
      <div className="preloader-footer">
        <div className="status-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span className="status-label">{getStatusText()}</span>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <div className="progress-digits">
            <span className="percentage">{progress}%</span>
            <span className="craftsmanship-state">
              {progress === 100 ? (
                <span className="complete-msg">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  Loaded
                </span>
              ) : 'Assembly in Progress'}
            </span>
          </div>
        </div>

        <p className="preloader-subnote">
          Engineering durable, ergonomic backpacks for students & modern creators.
        </p>
      </div>
    </div>
  );
};

