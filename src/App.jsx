import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { RequestsView } from './components/requests/RequestsView';
import { NewRequestModal } from './components/requests/NewRequestModal';
import { VolunteersView } from './components/volunteers/VolunteersView';
import { DepartmentsView } from './components/departments/DepartmentsView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { ShieldCheck, HeartHandshake } from 'lucide-react';

const MainLayout = () => {
  const { activeTab } = useApp();
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Navbar */}
      <Navbar onOpenNewRequest={() => setIsNewRequestOpen(true)} />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'requests' && (
          <RequestsView onOpenNewRequest={() => setIsNewRequestOpen(true)} />
        )}
        {activeTab === 'volunteers' && <VolunteersView />}
        {activeTab === 'departments' && <DepartmentsView />}
        {activeTab === 'analytics' && <AnalyticsView />}
      </main>

      {/* Global New Request Modal */}
      <NewRequestModal
        isOpen={isNewRequestOpen}
        onClose={() => setIsNewRequestOpen(false)}
      />

      {/* Clean Hospital Footer */}
      <footer className="no-print border-t border-slate-200 bg-white py-5 px-4 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <HeartHandshake className="w-4 h-4 text-sky-600" />
            <span className="font-semibold text-slate-800">
              MedAssist — Hospital Volunteer Hub
            </span>
            <span>• Система управления волонтерской помощью</span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span className="flex items-center text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Конфиденциальность: Zero-PII
            </span>
            <span>|</span>
            <span>Данные сохраняются автоматически</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export const App = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
