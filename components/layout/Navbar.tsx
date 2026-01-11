import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Shared';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Causes', path: '/causes' },
    { name: 'Impact', path: '/impact' },
    { name: 'Legal Aid', path: '/legal' },
    { name: 'Resources', path: '/resources' },
    { name: 'Transparency', path: '/transparency' },
  ];

  const getDashboardPath = (role: string) => {
    switch (role) {
      case 'Super Admin': return '/dashboard/super-admin';
      case 'Admin': return '/dashboard/admin';
      case 'Volunteer': return '/dashboard/volunteer';
      case 'Donor': return '/dashboard/donor';
      case 'Mentor': return '/dashboard/mentor';
      case 'Legal Aid Case Worker': return '/dashboard/legal-worker';
      case 'Legal Aid Applicant': return '/dashboard/legal-applicant';
      case 'Student': return '/dashboard/student';
      default: return '/dashboard';
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-trust-900 text-white text-xs py-2 px-4 flex justify-between items-center z-50 relative">
        <p className="font-medium truncate mr-4">🚨 Emergency Flood Relief Campaign - Your support saves lives!</p>
        <Link to="/donate" className="underline hover:text-saffron-500 font-bold whitespace-nowrap">Donate Now</Link>
      </div>

      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-sm"
                >
                  <img src="/logo.jpg" alt="BST Logo" className="w-full h-full object-cover" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="font-black text-slate-900 text-lg leading-tight group-hover:text-trust-700 transition-colors uppercase tracking-tight">Bharat Samartha Trust</span>
                  <span className="text-[10px] text-trust-700 font-black tracking-[0.2em] uppercase">Empowering Together</span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative text-sm font-bold text-slate-600 hover:text-trust-700 transition-colors group uppercase tracking-tight"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-trust-700 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}

              <div className="h-6 w-px bg-slate-300 mx-2"></div>

              {isAuthenticated && user ? (
                <div className="relative ml-3">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center space-x-2 text-sm focus:outline-none"
                  >
                    <img src={user.avatar} alt="User" className="h-9 w-9 rounded-full border border-slate-200" />
                    <span className="font-bold text-slate-700">{user.name}</span>
                    <motion.div animate={{ rotate: isProfileMenuOpen ? 180 : 0 }}>
                      <ChevronDown size={16} className="text-slate-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-xs text-slate-500">Signed in as</p>
                          <p className="text-sm font-bold text-trust-900 truncate">{user.role}</p>
                        </div>
                        <Link to={getDashboardPath(user.role)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center" onClick={() => setIsProfileMenuOpen(false)}>
                          <LayoutDashboard size={16} className="mr-2" /> Dashboard
                        </Link>
                        <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                          <LogOut size={16} className="mr-2" /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/auth">
                    <Button variant="ghost" size="sm" className="font-bold uppercase tracking-tight">Login</Button>
                  </Link>
                  <Link to="/donate">
                    <Button variant="primary" size="sm" className="font-bold uppercase tracking-tight">Donate</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-trust-700 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg absolute w-full top-20 z-50 overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-base font-bold text-slate-700 hover:bg-slate-50 hover:text-trust-700 px-3 py-2 rounded-md uppercase tracking-tight"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-slate-100 pt-4 mt-2">
                {isAuthenticated && user ? (
                  <>
                    <Link
                      to={getDashboardPath(user.role)}
                      className="flex items-center w-full px-3 py-2 text-base font-bold text-trust-700 bg-trust-50 rounded-md mb-2 uppercase tracking-tight"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard size={18} className="mr-2" /> Go to Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-base font-bold text-red-600 hover:bg-red-50 rounded-md uppercase tracking-tight"
                    >
                      <LogOut size={18} className="mr-2" /> Logout
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full font-bold uppercase tracking-tight">Login</Button>
                    </Link>
                    <Link to="/donate" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="primary" className="w-full font-bold uppercase tracking-tight">Donate</Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;