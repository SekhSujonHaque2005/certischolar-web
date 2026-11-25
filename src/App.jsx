import React, { useState, useEffect } from 'react';
import LandingPage from './pages/public/LandingPage';
import AboutPage from './pages/public/AboutPage';
import FaqPage from './pages/public/FaqPage';
import {
  GraduationCap,
  FileCheck,
  ShieldCheck,
  UploadCloud,
  Clock,
  CheckCircle2,
  ArrowLeft,
  LayoutDashboard,
  Info,
  HelpCircle,
} from 'lucide-react';

function resolveRouteFromHash() {
  const hash = window.location.hash.toLowerCase();
  if (hash === '#about') return 'about';
  if (hash === '#faq' || hash === '#faq-page' || hash === '#help' || hash === '#help-center') {
    return 'faq';
  }
  if (hash === '#workspace' || hash === '#portal' || hash === '#portals') {
    return 'workspace';
  }
  return 'landing';
}

export default function App() {
  const [currentView, setCurrentView] = useState(resolveRouteFromHash); // 'landing' | 'about' | 'faq' | 'workspace'
  const [activeRole, setActiveRole] = useState('student'); // 'student' | 'reviewer' | 'committee'

  // Hash-based navigation support (#about, #faq, #home, #workspace)
  useEffect(() => {
    const handleHash = () => {
      setCurrentView(resolveRouteFromHash());
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToView = (view, hash) => {
    if (hash) {
      window.location.hash = hash;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openStudentWorkspace = () => {
    setActiveRole('student');
    navigateToView('workspace', '#workspace');
  };

  const navigateToLandingSection = (sectionId) => {
    window.location.hash = '#home';
    setCurrentView('landing');
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  if (currentView === 'about') {
    return (
      <div className="relative">
        <AboutPage
          currentView={currentView}
          onNavigateHome={() => navigateToView('landing', '#home')}
          onNavigateLogin={openStudentWorkspace}
          onNavigateRegister={openStudentWorkspace}
          onNavigateStudentWorkspace={openStudentWorkspace}
          onNavigateScholarships={() => navigateToLandingSection('scholarships')}
        />

        <nav
          aria-label="Quick view switcher"
          className="fixed bottom-3 right-3 z-50 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => navigateToView('landing', '#home')}
            className="flex items-center gap-1.5 bg-white/95 hover:bg-white text-slate-800 text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-300 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          >
            <span>&larr; Landing (PUB-001)</span>
          </button>
          <button
            type="button"
            onClick={() => navigateToView('faq', '#faq')}
            className="flex items-center gap-1.5 bg-white/95 hover:bg-white text-slate-900 text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-200/90 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" aria-hidden="true" />
            <span>FAQ Page (PUB-009)</span>
          </button>
          <button
            type="button"
            onClick={() => navigateToView('workspace', '#workspace')}
            className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg border border-slate-700/60 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-300" aria-hidden="true" />
            <span>Open Portals &rarr;</span>
          </button>
        </nav>
      </div>
    );
  }

  if (currentView === 'faq') {
    return (
      <div className="relative">
        <FaqPage
          currentView={currentView}
          onNavigateHome={() => navigateToView('landing', '#home')}
          onNavigateLogin={openStudentWorkspace}
          onNavigateRegister={openStudentWorkspace}
          onNavigateStudentWorkspace={openStudentWorkspace}
        />

        <nav
          aria-label="Quick view switcher"
          className="fixed bottom-3 right-3 z-50 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => navigateToView('landing', '#home')}
            className="flex items-center gap-1.5 bg-white/95 hover:bg-white text-slate-800 text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-300 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          >
            <span>&larr; Landing (PUB-001)</span>
          </button>
          <button
            type="button"
            onClick={() => navigateToView('about', '#about')}
            className="flex items-center gap-1.5 bg-white/95 hover:bg-white text-slate-900 text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-200/90 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-[#ff5a2b]" aria-hidden="true" />
            <span>About (PUB-002)</span>
          </button>
          <button
            type="button"
            onClick={() => navigateToView('workspace', '#workspace')}
            className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg border border-slate-700/60 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-300" aria-hidden="true" />
            <span>Open Portals &rarr;</span>
          </button>
        </nav>
      </div>
    );
  }

  if (currentView === 'landing') {
    return (
      <div className="relative">
        <LandingPage
          currentView={currentView}
          onNavigateLogin={openStudentWorkspace}
          onNavigateRegister={openStudentWorkspace}
          onNavigateStudentWorkspace={openStudentWorkspace}
        />

        <nav
          aria-label="Quick view switcher"
          className="fixed bottom-3 right-3 z-50 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => navigateToView('about', '#about')}
            className="flex items-center gap-1.5 bg-white/95 hover:bg-white text-slate-900 text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-200 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-[#ff5a2b]" aria-hidden="true" />
            <span>About (PUB-002)</span>
          </button>
          <button
            type="button"
            onClick={() => navigateToView('faq', '#faq')}
            className="flex items-center gap-1.5 bg-white/95 hover:bg-white text-slate-900 text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg border border-slate-200/90 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" aria-hidden="true" />
            <span>FAQ Page (PUB-009)</span>
          </button>
          <button
            type="button"
            onClick={() => navigateToView('workspace', '#workspace')}
            className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg border border-slate-700/60 backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-300" aria-hidden="true" />
            <span>Open Portals &rarr;</span>
          </button>
        </nav>
      </div>
    );
  }

  // INTERNAL WORKSPACE VIEWS
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => navigateToView('landing', '#home')}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition mr-1 cursor-pointer"
              title="Return to Public Landing Page"
              aria-label="Return to Public Landing Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <GraduationCap className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-white">CertiScholar</span>
              <span className="ml-2 text-xs bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 px-2 py-0.5 rounded-full font-medium">
                P1 Institutional Core
              </span>
            </div>
          </div>

          {/* Prototype Role Switcher */}
          <div
            role="group"
            aria-label="Workspace role switcher"
            className="flex items-center space-x-2 bg-slate-800/80 p-1 rounded-lg border border-slate-700 text-sm"
          >
            <span className="text-xs text-slate-300 px-2 font-medium">Role:</span>
            <button
              type="button"
              onClick={() => setActiveRole('student')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeRole === 'student'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setActiveRole('reviewer')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeRole === 'reviewer'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Reviewer (M5)
            </button>
            <button
              type="button"
              onClick={() => setActiveRole('committee')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition cursor-pointer ${
                activeRole === 'committee'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Committee
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <section
          aria-labelledby="workspace-heading"
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 id="workspace-heading" className="text-2xl font-bold text-slate-900">
              {activeRole === 'student' && 'Student Scholarship Portal'}
              {activeRole === 'reviewer' && 'Verification & Field Correction Queue (M5)'}
              {activeRole === 'committee' && 'Scholarship Committee Review Console (M9/M10)'}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {activeRole === 'student' &&
                'Apply for institutional aid, upload certificates, and track automated verification.'}
              {activeRole === 'reviewer' &&
                'Validate OCR extracted fields, review bounding boxes, and correct mismatched values.'}
              {activeRole === 'committee' &&
                'Review scored eligibility recommendations and record formal award decisions.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => navigateToView('faq', '#faq')}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              Help &amp; FAQ (PUB-009)
            </button>
            <button
              type="button"
              onClick={() => navigateToView('landing', '#home')}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              &larr; Back to Landing Page (PUB-001)
            </button>
          </div>
        </section>

        {/* Dynamic Role Views */}
        {activeRole === 'student' && (
          <section aria-label="Student portal overview" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                <FileCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Active Applications</p>
                <p className="text-xl font-bold text-slate-900">1 Submitted</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-amber-50 text-amber-700 rounded-lg">
                <Clock className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Pipeline Status</p>
                <p className="text-xl font-bold text-amber-700">OCR Extracted (92%)</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium">Eligibility Engine</p>
                <p className="text-xl font-bold text-emerald-700">Eligible (Need-Based)</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="font-semibold text-slate-900 text-lg">Need-Based Financial Aid (EWS)</h2>
                  <p className="text-xs text-slate-600">
                    Scheme ID: LPU-SCH-2026-EWS &middot; Cycle: Fall 2026
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  UNDER_REVIEW
                </span>
              </div>

              <div className="py-6">
                <div className="grid grid-cols-4 text-center text-xs font-medium text-slate-600">
                  <div className="text-indigo-700 font-semibold">1. Intake Clean</div>
                  <div className="text-indigo-700 font-semibold">2. OCR Extracted</div>
                  <div className="text-amber-700 font-semibold animate-pulse">3. Reviewer Queue</div>
                  <div className="text-slate-500">4. Committee Vote</div>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-indigo-600 h-2 rounded-full w-3/4" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase text-slate-600 tracking-wider">
                  Uploaded Documents
                </h3>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <FileCheck className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-slate-800">12th_Standard_Marksheet.pdf</p>
                      <p className="text-xs text-slate-600">
                        Class: Academic Marksheet &middot; Confidence: 94.2%
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                    Field Recomputed
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <FileCheck className="w-5 h-5 text-emerald-700" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-slate-800">Income_Certificate_Tehsildar.pdf</p>
                      <p className="text-xs text-slate-600">
                        Class: Income Certificate &middot; Confidence: 89.0%
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                    Income: INR 1,80,000
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="font-semibold text-slate-900 text-lg mb-2">New Submission</h2>
                <p className="text-xs text-slate-600 mb-6">
                  Ready to apply for Shikshak Samman Anudaan or Sports Aid? Upload documents to initiate instant OCR.
                </p>
                <button
                  type="button"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" aria-hidden="true" />
                  Launch Application Wizard
                </button>
              </div>

              <div className="pt-6 border-t border-slate-100 text-xs text-slate-600">
                <p>Governed by CS-SRS-002 v3.2</p>
                <p>DPDP Act 2023 Compliant &middot; Privacy Masking Active</p>
              </div>
            </div>
          </section>
        )}

        {/* Reviewer View (SCR-008) */}
        {activeRole === 'reviewer' && (
          <section
            aria-label="Document reviewer workspace"
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Document Reviewer Workspace (SCR-008)</h2>
                <p className="text-xs text-slate-600">
                  Case ID: CS-APP-2026-0042 &middot; Applicant: Rahul Sharma (Reg: 12204590)
                </p>
              </div>
              <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-3 py-1 rounded-full">
                Review Required: 1 Low Confidence Field
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="bg-slate-900 text-slate-300 rounded-lg p-8 flex flex-col items-center justify-center min-h-[350px] border border-slate-800 text-center">
                <FileCheck className="w-12 h-12 text-slate-400 mb-3" aria-hidden="true" />
                <p className="font-semibold text-slate-100">Interactive PDF Viewer Preview</p>
                <p className="text-xs text-slate-300 max-w-xs mt-1">
                  12th_Standard_Marksheet.pdf (Bounding boxes highlight extracted aggregate marks and roll number)
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="reviewer-student-name" className="block text-xs font-semibold text-slate-700 uppercase">
                    Student Name (Extracted)
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      id="reviewer-student-name"
                      type="text"
                      readOnly
                      value="RAHUL SHARMA"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 font-medium"
                    />
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      98%
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="reviewer-total-marks" className="block text-xs font-semibold text-slate-700 uppercase">
                    Total Marks Obtained
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      id="reviewer-total-marks"
                      type="text"
                      readOnly
                      value="445 / 500"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 font-medium"
                    />
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      96%
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="reviewer-recomputed-pct" className="block text-xs font-semibold text-slate-700 uppercase">
                    Recomputed Percentage (M6)
                  </label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      id="reviewer-recomputed-pct"
                      type="text"
                      readOnly
                      value="89.00%"
                      className="w-full bg-emerald-50 border border-emerald-300 rounded-lg px-3 py-2 text-sm text-emerald-900 font-bold"
                    />
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-1 rounded">
                      Exact Match
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg text-sm transition shadow-sm cursor-pointer"
                  >
                    Confirm &amp; Approve Extraction
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition cursor-pointer"
                  >
                    Request Rescan
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Committee View */}
        {activeRole === 'committee' && (
          <section
            aria-label="Committee quorum console"
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-2">Committee Quorum &amp; Award Console</h2>
            <p className="text-xs text-slate-600 mb-6">
              Review verified applications ready for final award allocation.
            </p>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3 text-left">Application ID</th>
                    <th className="px-4 py-3 text-left">Applicant</th>
                    <th className="px-4 py-3 text-left">Scheme</th>
                    <th className="px-4 py-3 text-left">Merit / Score</th>
                    <th className="px-4 py-3 text-left">Rule Engine Result</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="px-4 py-3 font-semibold text-slate-900">CS-APP-2026-0042</td>
                    <td className="px-4 py-3 text-slate-700">Rahul Sharma</td>
                    <td className="px-4 py-3 text-slate-600">Need-Based (EWS)</td>
                    <td className="px-4 py-3 text-slate-800 font-medium">89.0% &middot; INR 1.8L Income</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> ELIGIBLE (30% Waiver)
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition shadow-sm cursor-pointer"
                      >
                        Record Vote
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
