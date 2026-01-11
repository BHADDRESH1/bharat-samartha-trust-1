import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { UserRole } from './lib/types.ts';
import Navbar from './components/layout/Navbar.tsx';
import Footer from './components/layout/Footer.tsx';
import { MessageCircle, X } from 'lucide-react';
import { Button } from './components/ui/Shared.tsx';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import AuthPage from './pages/AuthPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import DonatePage from './pages/DonatePage.tsx';
import CausesPage from './pages/CausesPage.tsx';
import VolunteerPage from './pages/VolunteerPage.tsx';
import LegalPage from './pages/LegalPage.tsx';
import TransparencyPage from './pages/TransparencyPage.tsx';
import ResourcesPage from './pages/ResourcesPage.tsx';
import ImpactPage from './pages/ImpactPage.tsx';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
            className="mb-4 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden"
          >
            <div className="bg-trust-700 p-4 flex justify-between items-center text-white">
              <h3 className="font-medium">Support Assistant</h3>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity"><X size={18} /></button>
            </div>
            <div className="p-4 bg-slate-50 min-h-[200px] text-sm text-slate-600">
              <p className="mb-4">Namaste! 🙏 How can we help you today?</p>
              <div className="space-y-2">
                {["I want to donate", "I want to volunteer", "I need legal help", "Student Resources"].map((text, i) => (
                  <button key={i} className="w-full text-left px-3 py-2 bg-white border border-slate-200 rounded hover:bg-trust-50 hover:border-trust-200 transition-colors text-trust-700 font-medium">
                    {text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="h-14 w-14 bg-saffron-500 hover:bg-saffron-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </motion.button>
    </div>
  );
};

const PublicLayout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      {!isDashboard && <Footer />}
      <Chatbot />
    </div>
  );
};

const ProtectedRoute = ({ children, allowedRoles }: { children?: React.ReactNode, allowedRoles?: UserRole[] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div className="h-screen flex items-center justify-center text-trust-700 font-bold">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/auth" />;
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 uppercase">Access Denied</h1>
        <p className="text-slate-600 mb-6">You do not have permission to view this page.</p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/causes" element={<CausesPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/volunteer" element={<VolunteerPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/transparency" element={<TransparencyPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;