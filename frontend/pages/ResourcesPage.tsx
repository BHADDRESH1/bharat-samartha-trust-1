import React from 'react';
import { SectionHeader, Card, Button, Badge } from '../components/ui/Shared';
import { Book, Video, Download, PlayCircle } from 'lucide-react';
import { PageTransition, StaggerContainer, FadeInItem, RevealSection } from '../components/ui/Motion';
import { motion } from 'framer-motion';

const ResourcesPage: React.FC = () => {
  return (
    <PageTransition className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Knowledge Hub" subtitle="Free educational resources for students and community members." />
        
        {/* Tabs (Visual only) */}
        <RevealSection className="flex border-b border-slate-200 mb-8 overflow-x-auto">
          <button className="px-6 py-3 border-b-2 border-trust-600 text-trust-700 font-bold text-sm whitespace-nowrap">E-Books</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 font-medium text-sm whitespace-nowrap transition-colors">Video Lectures</button>
          <button className="px-6 py-3 border-b-2 border-transparent text-slate-500 hover:text-slate-700 font-medium text-sm whitespace-nowrap transition-colors">Workshops</button>
        </RevealSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { type: 'book', title: 'Basic Mathematics', author: 'NCERT', tag: 'Class 10' },
            { type: 'book', title: 'Indian Constitution', author: 'Legal Cell', tag: 'General' },
            { type: 'video', title: 'English Speaking 101', author: 'Prof. Sharma', tag: 'Skill' },
            { type: 'book', title: 'Science Experiments', author: 'OpenSource', tag: 'Class 8' },
            { type: 'video', title: 'Computer Basics', author: 'Tech Team', tag: 'Digital Lit' },
          ].map((item, i) => (
             <FadeInItem key={i}>
               <Card className="flex flex-col h-full hover:shadow-lg transition-shadow group">
                 <div className="h-40 bg-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-slate-300 transition-colors">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      {item.type === 'book' ? <Book size={48} /> : <Video size={48} />}
                    </motion.div>
                 </div>
                 <div className="p-4 flex-1">
                   <Badge variant="neutral" className="mb-2">{item.tag}</Badge>
                   <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                   <p className="text-xs text-slate-500 mb-4">{item.author}</p>
                   <Button variant="outline" size="sm" className="w-full group-hover:bg-trust-50 group-hover:border-trust-200 group-hover:text-trust-700 transition-colors">
                     {item.type === 'book' ? <><Download size={14} className="mr-2" /> Download</> : <><PlayCircle size={14} className="mr-2" /> Watch</>}
                   </Button>
                 </div>
               </Card>
             </FadeInItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
};

export default ResourcesPage;
