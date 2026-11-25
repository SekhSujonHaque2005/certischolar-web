import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import {
  HeroOut,
  FloatDown,
  RevealMedia,
  ZoomMedia,
  RiseCard,
  ClarityReveal,
  SheetSection,
} from '../../components/framer/MotionPrimitives';
import {
  Glyph,
  Art,
  OrbitRings,
  CountUpNumber,
  Eyebrow,
  ArrowChip,
  RollingButton,
} from '../../components/framer/FramerArtwork';

const STORY_STATS = [
  {
    id: 'stat-01',
    tag: '{ 01 }',
    glyph: 'burst',
    value: 133,
    suffix: '',
    label: 'Functional Requirements*',
    sublabel: 'M0 to M20 Scope',
    variant: 'A',
  },
  {
    id: 'stat-02',
    tag: '{ 02 }',
    glyph: 'asterisk',
    value: 345,
    suffix: '',
    label: 'Acceptance Tests*',
    sublabel: 'Traceable Verification',
    variant: 'B',
  },
  {
    id: 'stat-03',
    tag: '{ 03 }',
    glyph: 'sun',
    value: 90,
    suffix: '%+',
    label: 'Field Extraction Target*',
    sublabel: 'P12 Pilot Benchmark',
    variant: 'C',
  },
];

const CORE_VALUES = [
  {
    id: 'val-01',
    tag: '{ value 01 }',
    shape: 'burst',
    title: 'Explainable Rules',
    desc: 'Every eligibility score cites published LPU circular clauses, weightings, and effective ruleset versions.',
    variant: 'A',
  },
  {
    id: 'val-02',
    tag: '{ value 02 }',
    shape: 'grid',
    title: 'Evidence Precision',
    desc: 'Pre-flight blur detection and bounding-box OCR keep marksheet and income extraction verifiable.',
    variant: 'B',
  },
  {
    id: 'val-03',
    tag: '{ value 03 }',
    shape: 'wave',
    title: 'Human Escalation',
    desc: 'Uncertain fields route cleanly to M5 split-screen reviewers rather than silent automated rejection.',
    variant: 'C',
  },
  {
    id: 'val-04',
    tag: '{ value 04 }',
    shape: 'bloom',
    title: 'Equitable Access',
    desc: 'Multilingual guidance and clear upload feedback remove avoidable barriers for first-time applicants.',
    variant: 'D',
  },
  {
    id: 'val-05',
    tag: '{ value 05 }',
    shape: 'orbit',
    title: 'DPDP Custody',
    desc: 'Student records remain encrypted with role-scoped masking and immutable institutional audit logs.',
    variant: 'A',
  },
];

const APPROACH_CHIPS = [
  'Rule Versioning',
  'Pre-Flight OCR',
  'Quorum Sign-Off',
  'DPDP Audit',
];

const STAKEHOLDERS = [
  {
    name: 'Sekh Sujon Haque',
    role: 'Project Proponent & Architect',
    tag: '{ architecture }',
    image: '/images/mentor-1.jpg',
    variant: 'A',
  },
  {
    name: 'Document Verifier Role',
    role: 'M5 Split-Screen Review (SRS 2.4)',
    tag: '{ verification }',
    image: '/images/mentor-2.jpg',
    variant: 'B',
  },
  {
    name: 'Policy Owner Role',
    role: 'Ruleset & Circular Approval (SRS 2.4)',
    tag: '{ policy }',
    image: '/images/mentor-3.jpg',
    variant: 'C',
  },
  {
    name: 'Committee Chair Role',
    role: 'Quorum Deliberation & Sign-Off (SRS 2.4)',
    tag: '{ committee }',
    image: '/images/mentor-4.jpg',
    variant: 'D',
  },
];

const INSTITUTION_REASONS = [
  'Pre-flight scan quality checks catch blur and low DPI before student submission',
  'Multi-board marksheet normalization and bounding-box OCR streamline M5 review',
  'Versioned deterministic rulesets keep every eligibility calculation reproducible',
  'Tripartite committee quorum records formal votes with tamper-evident audit logs',
  'DPDP Act 2023 custody enforces encrypted storage and role-scoped field masking',
];

export default function AboutPage({
  onNavigateHome = () => {},
  onNavigateLogin = () => {},
  onNavigateRegister = () => {},
  onNavigateStudentWorkspace = () => {},
  onNavigateScholarships = () => {},
}) {
  const [language, setLanguage] = useState('EN');
  const [fontScale, setFontScale] = useState(100);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rootScaleStyle = {
    fontSize: fontScale === 90 ? '90%' : fontScale === 110 ? '110%' : '100%',
  };

  const handleExploreSchemes = () => {
    onNavigateScholarships();
  };

  return (
    <div
      className="min-h-screen bg-[#eeeef0] text-[#171717] font-['Manrope'] antialiased selection:bg-[#171717] selection:text-white overflow-x-clip w-full"
      style={rootScaleStyle}
    >
      <Header
        currentView="about"
        language={language}
        onLanguageChange={setLanguage}
        fontScale={fontScale}
        onFontScaleChange={setFontScale}
        onLogin={onNavigateLogin}
        onRegister={onNavigateRegister}
      />

      <main className="w-full">
        {/* Section 1: Opening Hero + Campus Banner */}
        <section aria-label="About CertiScholar Hero" className="w-full bg-white">
          <div className="max-w-[1400px] mx-auto p-3 flex flex-col gap-3">
            <div className="bg-[linear-gradient(160deg,#F1F1F3_0%,#E3E4E8_55%,#CFD1D8_100%)] rounded-[28px] overflow-hidden relative min-h-[440px] md:min-h-[480px] xl:min-h-[560px] pt-[120px] md:pt-[150px] xl:pt-[190px] px-5 md:px-7 xl:px-9 pb-8 md:pb-10 xl:pb-12 flex flex-col justify-end">
              {/* Background top-right rotating bloom glyph */}
              <div
                aria-hidden="true"
                className="pointer-events-none select-none absolute -top-10 -right-10 md:-top-14 md:-right-14 xl:-top-20 xl:-right-16 w-[260px] h-[260px] md:w-[380px] md:h-[380px] xl:w-[520px] xl:h-[520px]"
              >
                <Glyph
                  shape="bloom"
                  color="rgba(23,23,23,0.07)"
                  weight={2.4}
                  spin={90}
                  hoverSpin={false}
                  className="w-full h-full"
                />
              </div>

              {/* Floating book artwork: top-right on mobile/tablet, bottom-right on desktop */}
              <FloatDown className="pointer-events-none select-none absolute top-[68px] right-4 md:top-[76px] md:right-8 xl:top-auto xl:right-[90px] xl:bottom-[70px] w-[120px] h-[120px] xl:w-[210px] xl:h-[210px] z-10">
                <Art kind="book" className="w-full h-full" />
              </FloatDown>

              {/* Hero Copy */}
              <HeroOut className="max-w-[860px] flex flex-col items-start gap-6 relative z-10">
                <Eyebrow label="Get to know CertiScholar" />

                <h1 className="text-[40px] md:text-[62px] xl:text-[84px] font-medium leading-[1.04] tracking-[-0.055em] text-[#171717]">
                  Financial Aid Should Open Doors, Not Create Barriers.
                </h1>

                <p className="max-w-[560px] text-[15px] md:text-[17px] leading-[1.55] text-[#5f5f66] font-normal">
                  Built under CS-SRS-002 v3.2 for Lovely Professional University, CertiScholar unifies scheme discovery, pre-flight OCR verification, deterministic eligibility rules, and accountable quorum review.
                </p>

                <RollingButton
                  label="Explore Our Schemes"
                  variant="dark"
                  onClick={handleExploreSchemes}
                />
              </HeroOut>
            </div>

            {/* Clean Campus Banner Image (no text overlay) */}
            <RevealMedia className="w-full h-[260px] md:h-[400px] xl:h-[540px] rounded-[22px] md:rounded-[28px] overflow-hidden bg-[#e8e8eb]">
              <ZoomMedia className="w-full h-full">
                <img
                  src="/images/hero-student-2.jpg"
                  alt="Lovely Professional University students collaborating on campus"
                  className="w-full h-full object-cover object-center"
                />
              </ZoomMedia>
            </RevealMedia>
          </div>
        </section>

        {/* Section 2: Our Story + Counters */}
        <section id="our-story" className="w-full bg-white py-16 md:py-24 xl:py-28">
          <div className="max-w-[1400px] mx-auto px-4 md:px-7 xl:px-9 flex flex-col gap-12 md:gap-16">
            <div className="grid grid-cols-1 md:grid-cols-[0.34fr_0.66fr] gap-6 md:gap-10 items-start">
              <div>
                <Eyebrow label="Our story" />
              </div>

              <div className="flex flex-col gap-5">
                <ClarityReveal>
                  <h2 className="text-[25px] md:text-[32px] xl:text-[40px] font-medium leading-[1.18] tracking-[-0.035em] text-[#171717]">
                    Built on the Belief That Merit Deserves Clarity.{' '}
                    <span className="text-[#5f5f66]">
                      CertiScholar brings Lovely Professional University scholarship discovery, structured OCR evidence, and transparent rule evaluation together so students and reviewers work from one shared record.
                    </span>
                  </h2>
                </ClarityReveal>

                <p className="text-[15px] md:text-[16.5px] leading-[1.6] text-[#5f5f66] max-w-[680px]">
                  Originated under Capstone Project P12 and formalized in CS-SRS-002 v3.2 and DOC-002, the platform pairs client-side quality checks with multi-board marksheet normalization and split-screen verification before committee deliberation begins.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {STORY_STATS.map((stat) => (
                <RiseCard
                  key={stat.id}
                  variant={stat.variant}
                  className="bg-[#f4f4f5] rounded-[22px] p-[22px] md:p-[26px] flex flex-col justify-between gap-10 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium text-[#52525b] tabular-nums">
                      {stat.tag}
                    </span>
                    <div className="w-[34px] h-[34px] shrink-0">
                      <Glyph
                        shape={stat.glyph}
                        color="#171717"
                        weight={5}
                        spin={24}
                        className="w-full h-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-[52px] md:text-[56px] xl:text-[64px] font-medium leading-none tracking-[-0.045em] text-[#171717] tabular-nums">
                      <CountUpNumber value={stat.value} suffix={stat.suffix} />
                    </div>
                    <h3 className="text-[16px] font-medium text-[#171717] mt-3">
                      {stat.label}
                    </h3>
                    <p className="text-[13.5px] text-[#5f5f66] mt-1">
                      {stat.sublabel}
                    </p>
                  </div>
                </RiseCard>
              ))}
            </div>

            <p className="text-[13px] leading-[1.55] text-[#52525b]">
              * Targets reflect the CS-SRS-002 v3.2 baseline across modules M0 to M20 and Lovely Professional University pilot planning documented in DOC-001 (institutional approval pending).
            </p>
          </div>
        </section>

        {/* Section 3: Mission & Vision */}
        <section className="w-full bg-[#f4f4f5] py-16 md:py-24 xl:py-28">
          <div className="max-w-[1400px] mx-auto px-4 md:px-7 xl:px-9 flex flex-col gap-10 md:gap-12">
            <div className="flex flex-col items-start gap-3">
              <Eyebrow label="What drives us" />
              <h2 className="text-[29px] md:text-[38px] xl:text-[46px] font-medium leading-[1.1] tracking-[-0.04em] text-[#171717]">
                Mission &amp; Vision
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Mission Card */}
              <RiseCard
                variant="A"
                className="bg-white p-2 rounded-[22px] shadow-[0_30px_60px_-40px_rgba(23,23,23,0.25)] group flex flex-col"
              >
                <div className="px-4 pt-3 pb-3 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[#52525b]">
                    {`{ our mission }`}
                  </span>
                  <ArrowChip className="bg-[#171717]! text-white! border-[#171717]! group-hover:bg-black!" />
                </div>

                <div className="h-[200px] md:h-[260px] bg-[#f4f4f5] rounded-[16px] flex items-center justify-center overflow-hidden">
                  <Art kind="cap" className="w-[140px] h-[140px] md:w-[170px] md:h-[170px]" />
                </div>

                <div className="px-4 pt-5 pb-5 flex flex-col gap-2">
                  <h3 className="text-[22px] md:text-[26px] font-medium tracking-[-0.03em] text-[#171717]">
                    Our Mission
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-[#5f5f66]">
                    Replace fragmented scholarship queues at Lovely Professional University with pre-flight document checks, deterministic eligibility scoring, and accountable M5 reviewer verification under DOC-002.
                  </p>
                </div>
              </RiseCard>

              {/* Vision Card */}
              <RiseCard
                variant="B"
                className="bg-white p-2 rounded-[22px] shadow-[0_30px_60px_-40px_rgba(23,23,23,0.25)] group flex flex-col"
              >
                <div className="px-4 pt-3 pb-3 flex items-center justify-between">
                  <span className="text-[13px] font-medium text-[#52525b]">
                    {`{ our vision }`}
                  </span>
                  <ArrowChip className="bg-[#171717]! text-white! border-[#171717]! group-hover:bg-black!" />
                </div>

                <div className="h-[200px] md:h-[260px] bg-[#f4f4f5] rounded-[16px] flex items-center justify-center overflow-hidden">
                  <Art kind="bulb" className="w-[140px] h-[140px] md:w-[170px] md:h-[170px]" />
                </div>

                <div className="px-4 pt-5 pb-5 flex flex-col gap-2">
                  <h3 className="text-[22px] md:text-[26px] font-medium tracking-[-0.03em] text-[#171717]">
                    Our Vision
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-[#5f5f66]">
                    Deliver an auditable university aid infrastructure where every deserving applicant receives timely tuition concessions backed by explainable rules, DPDP Act 2023 custody, and verifiable committee sign-off.
                  </p>
                </div>
              </RiseCard>
            </div>
          </div>
        </section>

        {/* Section 4: Core Values */}
        <section className="w-full bg-white py-16 md:py-24 xl:py-28">
          <div className="max-w-[1400px] mx-auto px-4 md:px-7 xl:px-9 flex flex-col gap-10 md:gap-14">
            <div className="flex flex-col items-start gap-4 max-w-[920px]">
              <Eyebrow label="Our core values" />
              <ClarityReveal>
                <h2 className="text-[25px] md:text-[32px] xl:text-[40px] font-medium leading-[1.18] tracking-[-0.035em] text-[#171717]">
                  Five principles guide every verification and rule.{' '}
                  <span className="text-[#5f5f66]">
                    They define how evidence is captured, how low-confidence fields reach human reviewers, and how institutional decisions remain transparent.
                  </span>
                </h2>
              </ClarityReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {CORE_VALUES.map((val) => (
                <RiseCard key={val.id} variant={val.variant}>
                  <div className="h-[270px] md:h-[300px] xl:h-[340px] rounded-[22px] bg-[#f4f4f5] hover:bg-[#171717] p-[28px_20px] transition-all duration-500 group relative overflow-hidden flex flex-col items-center text-center justify-between">
                    <div className="flex flex-col items-center gap-4 pt-1">
                      <div className="w-[58px] h-[58px] text-[#171717] group-hover:text-white transition-colors duration-500">
                        <Glyph
                          shape={val.shape}
                          color="currentColor"
                          weight={5}
                          spin={24}
                          className="w-full h-full"
                        />
                      </div>

                      <h3 className="text-[18px] font-medium tracking-[-0.025em] text-[#171717] group-hover:text-white transition-colors duration-500">
                        {val.title}
                      </h3>

                      <p className="text-[13.5px] leading-[1.5] text-[#5f5f66] group-hover:text-white/78 transition-colors duration-500">
                        {val.desc}
                      </p>
                    </div>

                    <span className="opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-[12px] font-medium px-3 py-1 rounded-full bg-white/15 text-white">
                      {val.tag}
                    </span>
                  </div>
                </RiseCard>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Our Approach */}
        <section className="w-full bg-[#f4f4f5] py-16 md:py-24 xl:py-28">
          <div className="max-w-[1400px] mx-auto px-4 md:px-7 xl:px-9">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 xl:gap-14 items-center">
              <div className="md:col-span-5">
                <RevealMedia className="w-full h-[340px] md:h-[460px] xl:h-[560px] rounded-[24px] overflow-hidden bg-[#e8e8eb]">
                  <ZoomMedia className="w-full h-full">
                    <img
                      src="/images/step-card.jpg"
                      alt="Student reviewing verified scholarship application documents"
                      className="w-full h-full object-cover object-center"
                    />
                  </ZoomMedia>
                </RevealMedia>
              </div>

              <div className="md:col-span-7 flex flex-col items-start gap-6">
                <Eyebrow label="Our approach" />

                <h2 className="text-[36px] md:text-[52px] xl:text-[68px] font-medium leading-[1.06] tracking-[-0.045em] text-[#171717]">
                  Designed Around Real Governance.
                </h2>

                <p className="text-[15.5px] md:text-[17px] leading-[1.6] text-[#5f5f66] max-w-[600px]">
                  Scholarship governance demands traceable policy execution, not guesswork. CertiScholar encodes university circulars into versioned rulesets, flags low-confidence OCR fields for split-screen review, and records quorum votes in an immutable audit trail.
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {APPROACH_CHIPS.map((chip) => (
                    <span
                      key={chip}
                      className="bg-white text-[#171717] text-[13.5px] font-medium px-4 py-2 rounded-full border border-black/6 shadow-[0_6px_18px_-10px_rgba(23,23,23,0.18)]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <RollingButton
                  label="Open Student Portal"
                  variant="dark"
                  onClick={onNavigateStudentWorkspace}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Governance & Project Stakeholders */}
        <section className="w-full bg-white py-16 md:py-24 xl:py-28">
          <div className="max-w-[1400px] mx-auto px-4 md:px-7 xl:px-9 flex flex-col gap-12 md:gap-16">
            <div className="grid grid-cols-1 md:grid-cols-[0.34fr_0.66fr] gap-6 md:gap-10 items-start">
              <div>
                <Eyebrow label="Project stakeholders" />
              </div>

              <ClarityReveal>
                <h2 className="text-[25px] md:text-[32px] xl:text-[40px] font-medium leading-[1.18] tracking-[-0.035em] text-[#171717]">
                  People Accountability Over Black-Box Automation.{' '}
                  <span className="text-[#5f5f66]">
                    Every automated extraction and eligibility score remains answerable to designated SRS 2.4 roles across system design, verification, policy governance, and quorum sign-off.
                  </span>
                </h2>
              </ClarityReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {STAKEHOLDERS.map((person) => (
                <RiseCard
                  key={person.name}
                  variant={person.variant}
                  className="bg-[#f4f4f5] hover:bg-[#e8e8eb] p-2 rounded-[22px] group transition-colors duration-300 flex flex-col"
                >
                  <div className="px-3 pt-2.5 pb-2.5 flex items-center justify-between">
                    <span className="text-[12.5px] font-medium text-[#52525b]">
                      {person.tag}
                    </span>
                    <ArrowChip />
                  </div>

                  <div className="h-[320px] w-full rounded-[16px] overflow-hidden bg-[#e8e8eb]">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.06] transition-all duration-700"
                    />
                  </div>

                  <div className="px-3 pt-4 pb-3">
                    <h3 className="text-[18px] font-medium tracking-[-0.025em] text-[#171717]">
                      {person.name}
                    </h3>
                    <p className="text-[13.5px] text-[#5f5f66] mt-0.5">
                      {person.role}
                    </p>
                  </div>
                </RiseCard>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Why Institutions Choose CertiScholar */}
        <section className="w-full bg-[#f4f4f5] py-16 md:py-24 xl:py-28">
          <div className="max-w-[1400px] mx-auto px-4 md:px-7 xl:px-9">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 xl:gap-14 items-start">
              <div className="md:col-span-5 flex flex-col items-start gap-5">
                <Eyebrow label="Why institutions choose CertiScholar" />

                <h2 className="text-[30px] md:text-[40px] xl:text-[48px] font-medium leading-[1.08] tracking-[-0.04em] text-[#171717]">
                  A Smarter Way to Verify Aid.
                </h2>

                <Art
                  kind="medal"
                  className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] xl:w-[180px] xl:h-[180px] mt-2"
                />
              </div>

              <div className="md:col-span-7 flex flex-col gap-3">
                {INSTITUTION_REASONS.map((reason) => (
                  <div
                    key={reason}
                    className="bg-white rounded-[16px] p-[18px] flex items-center gap-4 border border-black/5"
                  >
                    <div
                      aria-hidden="true"
                      className="w-[30px] h-[30px] rounded-full bg-[#171717] text-white flex items-center justify-center shrink-0"
                    >
                      <Check className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <p className="text-[15px] font-medium leading-[1.45] text-[#171717]">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Closing CTA */}
        <section className="w-full bg-white rounded-b-[28px] pt-4 md:pt-6 pb-3 px-3">
          <div className="max-w-[1400px] mx-auto">
            <SheetSection>
              <div className="bg-[linear-gradient(180deg,#F5F6F9_0%,#D3D6E0_42%,#8A90A5_100%)] rounded-[22px] md:rounded-[28px] py-[84px] md:py-[120px] xl:py-[150px] px-3.5 md:px-6 relative overflow-hidden flex items-center justify-center">
                {/* Background concentric orbit rings */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none flex items-center justify-center"
                >
                  <OrbitRings rings={5} speed={90} className="w-full h-full" />
                </div>

                {/* Centered massive dark halo ring */}
                <div
                  aria-hidden="true"
                  className="w-[330px] h-[330px] border-[26px] md:w-[540px] md:h-[540px] md:border-[40px] xl:w-[620px] xl:h-[620px] xl:border-[46px] rounded-full border-[#16171B] shadow-[0_40px_80px_-20px_rgba(22,23,27,0.55)] absolute pointer-events-none"
                />

                {/* Floating white CTA card */}
                <div className="max-w-[430px] w-full bg-white rounded-[20px] p-[30px_20px_18px] md:p-[36px_28px_24px] shadow-[0_30px_70px_-24px_rgba(22,23,27,0.45)] relative z-10 text-center flex flex-col items-center gap-4">
                  <Eyebrow label="Start today" />

                  <h2 className="text-[25px] md:text-[30px] font-medium leading-[1.15] tracking-[-0.035em] text-[#171717]">
                    Transparent Aid Starts With Proof.
                  </h2>

                  <p className="text-[14.5px] leading-[1.55] text-[#5f5f66]">
                    Explore eligible LPU scholarship schemes, validate your marksheets before submission, and track every verification step in one place.
                  </p>

                  <div className="w-full pt-1">
                    <RollingButton
                      label="Explore Schemes"
                      variant="soft"
                      className="w-full justify-center"
                      onClick={onNavigateRegister}
                    />
                  </div>
                </div>
              </div>
            </SheetSection>
          </div>
        </section>
      </main>

      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateLogin={onNavigateLogin}
        onNavigateRegister={onNavigateRegister}
      />
    </div>
  );
}
