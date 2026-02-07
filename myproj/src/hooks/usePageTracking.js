// src/hooks/usePageTracking.js

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    window.gtag('config', 'AW-16724407487', {
      page_path: location.pathname,
    });
  }, [location]);
};

export default usePageTracking;
