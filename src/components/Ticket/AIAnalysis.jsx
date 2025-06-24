import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import robotStream from '../../assets/images/robot-stream.png';
import { Flare } from '@mui/icons-material';

const AIAnalysisPopup = ({ ticketId, isVisible, onClose }) => {
  const [opened, setOpened] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisible) {
      setOpened(ticketId);
    } else {
      setOpened(null);
    }
  }, [isVisible, ticketId]);

  useEffect(() => {
    if (isVisible && ticketId) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setAnalysis({
          summary:
            'User reports avatar issues and requests several new features like notification pagination and agent permissions.',
          sentiment: 'Neutral',
        });
        setLoading(false);
      }, 1000);
    }
  }, [isVisible, ticketId]);

  // This effect handles auto-closing the popup
  useEffect(() => {
    if (isVisible && !loading) {
      const timer = setTimeout(() => {
        onClose();
      }, 8000); // Auto-close after 8 seconds

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [isVisible, loading, onClose]);

  const close = () => {
    setOpened(null);
    onClose();
  };

  return (
    <div
      className={`bg-background-secondary fixed top-24 right-5 z-40 w-full max-w-sm rounded-lg border border-zinc-800 p-5 text-zinc-300 shadow-2xl transition-transform duration-500 ease-in-out ${opened ? 'translate-x-0 opacity-100' : 'translate-x-[110%] opacity-0'}`}
    >
      <button
        onClick={close}
        className="absolute top-3 right-3 cursor-pointer text-zinc-500 transition-colors hover:text-white"
        aria-label="Close"
      >
        <CloseIcon style={{ fontSize: 20 }} />
      </button>
      <div className="mb-4 flex flex-row items-center gap-2">
        <img src={robotStream} className="h-6 w-6" alt="AI" />
        <h3 className="text-lg font-semibold text-white">AI Analysis</h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-500 border-t-green-500"></div>
          <p className="ml-3 text-zinc-400">Analyzing...</p>
        </div>
      ) : (
        <>
          {/* Summary Section */}
          <div className="mb-4">
            <h4 className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase">
              <Flare style={{ fontSize: 16 }} />
              Summary
            </h4>
            <p className="text-sm leading-relaxed text-zinc-300">
              {analysis.summary}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAnalysisPopup;
