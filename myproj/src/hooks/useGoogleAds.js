// src/hooks/useGoogleAds.js

import { useEffect } from 'react';

const useGoogleAds = (clientId) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${clientId}`;
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);

        // Cleanup the script on component unmount
        return () => {
            document.head.removeChild(script);
        };
    }, [clientId]);
};

export default useGoogleAds;
