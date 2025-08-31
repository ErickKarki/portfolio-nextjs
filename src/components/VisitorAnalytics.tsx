'use client';

import { useState, useEffect } from 'react';

interface Visitor {
  id: string;
  location: string;
  browser: string;
  os: string;
  timeOnSite: string;
  lastSeen: string;
  status: 'active' | 'idle' | 'away';
}

const VisitorAnalytics = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [uptime, setUptime] = useState('0d 0h 0m');

  useEffect(() => {
    // Generate realistic visitor data
    const generateVisitors = () => {
      const locations = ['New York, US', 'London, UK', 'Tokyo, JP', 'Sydney, AU', 'Mumbai, IN', 'Berlin, DE', 'Toronto, CA'];
      const browsers = ['Chrome 118', 'Safari 17', 'Firefox 119', 'Edge 118'];
      const oses = ['macOS 14', 'Windows 11', 'Ubuntu 22.04', 'iOS 17'];
      const statuses: ('active' | 'idle' | 'away')[] = ['active', 'idle', 'away'];

      const mockVisitors: Visitor[] = Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, i) => ({
        id: `user_${i + 1}`,
        location: locations[Math.floor(Math.random() * locations.length)],
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        os: oses[Math.floor(Math.random() * oses.length)],
        timeOnSite: `${Math.floor(Math.random() * 15) + 1}m ${Math.floor(Math.random() * 60)}s`,
        lastSeen: Math.random() > 0.3 ? 'now' : `${Math.floor(Math.random() * 5) + 1}m ago`,
        status: statuses[Math.floor(Math.random() * statuses.length)]
      }));

      setVisitors(mockVisitors);
    };

    // Generate initial data
    generateVisitors();
    setTotalVisits(Math.floor(Math.random() * 500) + 150);

    // Update visitors periodically
    const visitorInterval = setInterval(() => {
      generateVisitors();
      setTotalVisits(prev => prev + Math.floor(Math.random() * 3));
    }, 10000); // Update every 10 seconds

    // Update uptime
    const startTime = Date.now();
    const uptimeInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
      const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      setUptime(`${days}d ${hours}h ${minutes}m`);
    }, 60000); // Update every minute

    return () => {
      clearInterval(visitorInterval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'var(--text-success)';
      case 'idle': return 'var(--text-warning)';
      case 'away': return 'var(--text-secondary)';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusSymbol = (status: string) => {
    switch (status) {
      case 'active': return '●';
      case 'idle': return '◐';
      case 'away': return '○';
      default: return '○';
    }
  };

  return (
    <div className="space-y-4 text-mono text-sm">
      {/* Header */}
      <div className="border-b pb-3" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
            Active Sessions
          </h4>
          <div className="flex items-center gap-4 text-xs">
            <span style={{ color: 'var(--text-secondary)' }}>
              Total: {totalVisits} visits
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              Uptime: {uptime}
            </span>
          </div>
        </div>
        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Currently {visitors.filter(v => v.status === 'active').length} active, {visitors.length} total
        </div>
      </div>

      {/* Visitor List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {visitors.map((visitor) => (
          <div key={visitor.id} className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span 
                className="text-xs"
                style={{ color: getStatusColor(visitor.status) }}
              >
                {getStatusSymbol(visitor.status)}
              </span>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                    {visitor.id}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {visitor.location}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span>{visitor.browser}</span>
                  <span>•</span>
                  <span>{visitor.os}</span>
                  <span>•</span>
                  <span>{visitor.timeOnSite}</span>
                </div>
              </div>
              
              <div className="text-xs text-right" style={{ color: 'var(--text-secondary)' }}>
                {visitor.lastSeen}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="border-t pt-3 grid grid-cols-3 gap-4 text-center text-xs" style={{ borderColor: 'var(--border)' }}>
        <div>
          <div className="font-semibold" style={{ color: 'var(--text-success)' }}>
            {visitors.filter(v => v.status === 'active').length}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>Active</div>
        </div>
        <div>
          <div className="font-semibold" style={{ color: 'var(--text-warning)' }}>
            {visitors.filter(v => v.status === 'idle').length}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>Idle</div>
        </div>
        <div>
          <div className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
            {visitors.filter(v => v.status === 'away').length}
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>Away</div>
        </div>
      </div>
    </div>
  );
};

export default VisitorAnalytics;