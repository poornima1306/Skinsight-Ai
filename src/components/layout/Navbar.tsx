import React from 'react';
import { 
  Shield, 
  PlusCircle, 
  Menu, 
  X, 
  LayoutDashboard,
  Clock,
  MessageSquare,
  FileText,
  Cpu,
  User
} from 'lucide-react';
import { AppView, UserProfile } from '../../types';
import { NotificationsDropdown } from './NotificationsDropdown';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onNavigateToAnalysis?: (id: string) => void;
  user: UserProfile;
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onNavigateToAnalysis,
  user,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks: { label: string; view: AppView; icon: React.FC<{ className?: string }> }[] = [
    { label: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
    { label: 'New Screening', view: 'new-analysis', icon: PlusCircle },
    { label: 'Train & Evaluate', view: 'train-evaluate', icon: Cpu },
    { label: 'History', view: 'history', icon: Clock },
    { label: 'AI Assistant', view: 'assistant', icon: MessageSquare },
    { label: 'Reports', view: 'reports', icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/98 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Title */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg p-1"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-600 dark:bg-teal-500 text-white flex items-center justify-center shadow-xs group-hover:bg-teal-700 transition-colors">
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap">
                SkinSight <span className="text-teal-600 dark:text-teal-400 font-extrabold text-sm ml-0.5 px-1.5 py-0.5 bg-teal-50 dark:bg-teal-950/60 rounded border border-teal-200 dark:border-teal-800/60">AI</span>
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => onNavigate(link.view)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Notifications, New Analysis, Profile Access Button) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Notifications */}
            <NotificationsDropdown onNavigateToAnalysis={onNavigateToAnalysis} />

            {/* Primary Action Button */}
            <button
              onClick={() => onNavigate('new-analysis')}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-lg bg-teal-600 text-white hover:bg-teal-700 shadow-xs transition-all whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Analyze Image</span>
            </button>

            {/* Profile Page Access Button */}
            <button
              onClick={() => onNavigate('profile')}
              className={`inline-flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                currentView === 'profile' || currentView === 'settings'
                  ? 'border-teal-500 bg-teal-50/80 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 ring-2 ring-teal-500/20'
                  : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 shadow-xs'
              }`}
              title="View & Edit Clinician Profile"
              aria-label="View & Edit Clinician Profile"
            >
              <div className="w-7 h-7 rounded-lg bg-teal-600 dark:bg-teal-500 text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-tight pr-1">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[110px]">
                  {user?.name || 'Profile'}
                </span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold truncate max-w-[110px]">
                  Profile & Settings
                </span>
              </div>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-3 shadow-lg animate-in slide-in-from-top-2">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => {
                    onNavigate(link.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Profile Navigation Link */}
          <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                onNavigate('profile');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
                currentView === 'profile' || currentView === 'settings'
                  ? 'bg-teal-50 dark:bg-teal-950 border-teal-300 dark:border-teal-800 text-teal-800 dark:text-teal-300'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs font-extrabold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'P'}
                </div>
                <span>Clinician Profile & Settings</span>
              </span>
              <span className="text-[11px] text-teal-600 dark:text-teal-400 font-mono font-semibold">View</span>
            </button>
          </div>

          <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                onNavigate('new-analysis');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 bg-teal-600 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Skin Analysis</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

