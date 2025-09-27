import React, { useState } from 'react';
import { Search, Zap, Loader } from 'lucide-react';

interface ResearchDashboardProps {
  onStartResearch: (topic: string) => void;
  isResearching: boolean;
  activeResearch: string;
}

const ResearchDashboard: React.FC<ResearchDashboardProps> = ({
  onStartResearch,
  isResearching,
  activeResearch
}) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isResearching) {
      onStartResearch(topic.trim());
      setTopic('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">AI Research Agent</h2>
        <p className="text-blue-100">Enter a topic to start deep research with real-time crawling</p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter research topic (e.g., 'machine learning in healthcare')"
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              disabled={isResearching}
            />
          </div>
          
          <button
            type="submit"
            disabled={!topic.trim() || isResearching}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-3"
          >
            {isResearching ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                Researching "{activeResearch}"...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                Start Deep Research
              </>
            )}
          </button>
        </form>
        
        {isResearching && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-blue-800">Research in Progress</span>
            </div>
            <p className="text-blue-700 text-sm">
              AI agents are crawling multiple sources and analyzing content for "{activeResearch}"
            </p>
            <div className="mt-3">
              <div className="bg-blue-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse" style={{width: '65%'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchDashboard;