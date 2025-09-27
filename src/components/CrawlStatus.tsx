import React from 'react';
import { Globe, Clock, CheckCircle, AlertCircle, Activity } from 'lucide-react';
import type { CrawlItem } from '../App';

interface CrawlStatusProps {
  crawlItems: CrawlItem[];
}

const CrawlStatus: React.FC<CrawlStatusProps> = ({ crawlItems }) => {
  const getStatusIcon = (status: CrawlItem['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'crawling':
        return <Activity className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: CrawlItem['status']) => {
    switch (status) {
      case 'pending':
        return 'border-l-yellow-400 bg-yellow-50';
      case 'crawling':
        return 'border-l-blue-400 bg-blue-50';
      case 'completed':
        return 'border-l-green-400 bg-green-50';
      case 'failed':
        return 'border-l-red-400 bg-red-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <Globe className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-800">Live Crawl Status</h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">Real-time URL crawling updates</p>
      </div>
      
      <div className="p-6">
        {crawlItems.length === 0 ? (
          <div className="text-center py-8">
            <Globe className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No active crawls</p>
            <p className="text-sm text-gray-400 mt-1">Start a research to see live crawling</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {crawlItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 border-l-4 rounded-r-lg transition-all duration-300 ${getStatusColor(item.status)}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(item.status)}
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {item.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-800 font-medium truncate" title={item.url}>
                      {item.title || new URL(item.url).hostname}
                    </p>
                    
                    <p className="text-xs text-gray-500 mt-1">
                      {item.timestamp.toLocaleTimeString()}
                    </p>
                    
                    {item.status === 'crawling' && item.progress !== undefined && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{item.progress}% complete</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CrawlStatus;