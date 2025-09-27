import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle } from 'lucide-react';
import ResearchDashboard from './components/ResearchDashboard';
import CrawlStatus from './components/CrawlStatus';
import Header from './components/Header';

export interface CrawlItem {
  id: string;
  url: string;
  status: 'pending' | 'crawling' | 'completed' | 'failed';
  timestamp: Date;
  title?: string;
  progress?: number;
}

function App() {
  const [crawlItems, setCrawlItems] = useState<CrawlItem[]>([]);
  const [activeResearch, setActiveResearch] = useState<string>('');
  const [isResearching, setIsResearching] = useState(false);

  // Simulate WebSocket updates for crawling status
  useEffect(() => {
    const interval = setInterval(() => {
      if (crawlItems.length > 0) {
        setCrawlItems(prev => prev.map(item => {
          if (item.status === 'crawling' && Math.random() > 0.7) {
            return {
              ...item,
              status: 'completed',
              progress: 100,
              title: `Research data from ${new URL(item.url).hostname}`
            };
          }
          if (item.status === 'pending' && Math.random() > 0.8) {
            return {
              ...item,
              status: 'crawling',
              progress: Math.floor(Math.random() * 70) + 10
            };
          }
          if (item.status === 'crawling' && item.progress && item.progress < 100) {
            return {
              ...item,
              progress: Math.min(100, item.progress + Math.floor(Math.random() * 15))
            };
          }
          return item;
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [crawlItems]);

  const startResearch = (topic: string) => {
    setActiveResearch(topic);
    setIsResearching(true);

    // Simulate adding URLs to crawl
    const mockUrls = [
      'https://scholar.google.com/search?q=' + encodeURIComponent(topic),
      'https://arxiv.org/search/?query=' + encodeURIComponent(topic),
      'https://pubmed.ncbi.nlm.nih.gov/?term=' + encodeURIComponent(topic),
      'https://www.researchgate.net/search?q=' + encodeURIComponent(topic),
      'https://www.semanticscholar.org/search?q=' + encodeURIComponent(topic)
    ];

    const newCrawlItems = mockUrls.map((url, index) => ({
      id: Date.now() + index + '',
      url,
      status: 'pending' as const,
      timestamp: new Date()
    }));

    setCrawlItems(prev => [...newCrawlItems, ...prev]);

    // Simulate research completion
    setTimeout(() => {
      setIsResearching(false);
      setActiveResearch('');
    }, 15000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Live Crawl Status - Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <CrawlStatus crawlItems={crawlItems} />
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Crawls</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {crawlItems.filter(item => item.status === 'crawling').length}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {crawlItems.filter(item => item.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Research Dashboard - Bottom Section */}
          <div>
            <ResearchDashboard 
              onStartResearch={startResearch}
              isResearching={isResearching}
              activeResearch={activeResearch}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;