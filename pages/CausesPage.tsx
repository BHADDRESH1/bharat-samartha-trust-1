import React from 'react';
import { SectionHeader, Card, Badge, ProgressBar, Button } from '../components/ui/Shared';
import { Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageTransition, StaggerContainer, FadeInItem, RevealSection } from '../components/ui/Motion';
import { motion } from 'framer-motion';

import { useState, useEffect } from 'react';
import api from '../lib/api';

interface Cause {
  _id: string;
  title: string;
  description: string;
  category: string;
  goalAmount: number;
  raisedAmount?: number; // Backend might not have this field yet, assuming 0 or explicit field
  image: string;
}

const CausesPage: React.FC = () => {
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCauses = async () => {
      try {
        const { data } = await api.get('/causes');
        setCauses(data);
      } catch (error) {
        console.error("Failed to fetch causes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCauses();
  }, []);
  return (
    <PageTransition className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Our Causes" subtitle="Support the initiatives that resonate with you." />

        {/* Filter Bar */}
        <RevealSection className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-8 gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-trust-700 text-white rounded-full text-sm font-medium whitespace-nowrap">All Causes</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full text-sm font-medium whitespace-nowrap">Education</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full text-sm font-medium whitespace-nowrap">Health</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full text-sm font-medium whitespace-nowrap">Legal Aid</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} className="px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-full text-sm font-medium whitespace-nowrap">Disaster Relief</motion.button>
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            <Filter size={16} className="mr-2" /> Sort by: Newest
          </div>
        </RevealSection>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {causes.map((cause, idx) => (
            <FadeInItem key={idx}>
              <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
                <div className="h-56 overflow-hidden relative">
                  <Badge variant="info" className="absolute top-4 left-4 z-10">{cause.cat}</Badge>
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={cause.img} alt={cause.title} className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{cause.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 flex-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm font-semibold mb-1">
                      <span className="text-trust-700">₹{cause.raised.toLocaleString()}</span>
                      <span className="text-slate-400">of ₹{cause.target.toLocaleString()}</span>
                    </div>
                    <ProgressBar value={cause.raised} max={cause.target} />
                  </div>

                  <div className="flex space-x-3">
                    <Link to="/donate" className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">Donate</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </FadeInItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
};

export default CausesPage;
