import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav'; // Import your modified Nav component
import Header from './components/Header';
import Carousel from './components/Carousel'; // Corrected import name
import Home from './components/Home'; // Import components for each route
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Disclaimer from './components/Disclaimer';
import CentralizedGrievances from './components/CentralizedGrievances';
import StateSpecificGrievances from './components/StateSpecificGrievances';
import Test from './components/Test';
import Blog from './components/Blog';
import TermsPopup from './components/terms_pop';
import ComplaintPopup from './components/form_pop';
import Opportunities from './components/LegalUpdates';
import { pdfjs } from 'react-pdf';
import TrackComplaint from './components/TrackComplaint';
import ComplaintFormPopup from './components/ComplaintPopup';
import BlogSlider from './components/BlogSlider';
import BlogDetails from './components/BlogDetails';
import WhatsAppButton from './components/whatsapp';
import usePageTracking from './hooks/usePageTracking';
import useGoogleAds from './hooks/useGoogleAds';
import Advertisements from './components/Advertisement';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PrivacyPolicy from './components/PrivacyPolicy'; // Import PrivacyPolicy Component

pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js';

const App = () => {
    const clientId = '2666968885960053'; // Replace with your actual AdSense client ID
    useGoogleAds(clientId);
    usePageTracking();
    
    return (
        <div>
            <TermsPopup />
            <Advertisements />
            {/* <ComplaintFormPopup /> */}
            {/* <DiscPopup /> */}
            <Header />
            <Nav />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/test" element={<Test />} />
                <Route path="/about" element={<PageWithDisclaimer><About /></PageWithDisclaimer>} />
                <Route path="/centralized-grievances" element={<PageWithDisclaimer><CentralizedGrievances /></PageWithDisclaimer>} />
                <Route path="/state-specific-grievances" element={<PageWithDisclaimer><StateSpecificGrievances /></PageWithDisclaimer>} />
                <Route path="/blog" element={<PageWithoutBlogSlider><Blog /></PageWithoutBlogSlider>} />
                <Route path="/contact" element={<PageWithDisclaimer><Contact /></PageWithDisclaimer>} />
                <Route path="/track-complaint" element={<PageWithDisclaimer><TrackComplaint /></PageWithDisclaimer>} />
                <Route path="/legal-updates" element={<PageWithDisclaimer><Opportunities /></PageWithDisclaimer>} />
                <Route path="/blogDetails/:slug/:id" element={<PageWithDisclaimer><BlogDetails /></PageWithDisclaimer>} />
                <Route path="/PrivacyPolicy" element={<PageWithDisclaimer><PrivacyPolicy /></PageWithDisclaimer>} />
                {/* Add other routes here */}
            </Routes>
            <WhatsAppButton />
            <Footer />
        </div>
    );
};

// Component for the home page
const HomePage = () => {
    return (
        <>
            <Carousel />
            <Disclaimer />
            <Home />
            <BlogSlider />
        </>
    );
};

// Component for pages with Disclaimer below the content
const PageWithDisclaimer = ({ children }) => {
    return (
        <>
            <Disclaimer />
            {children}
            <BlogSlider />
        </>
    );
};

const PageWithoutBlogSlider = ({ children }) => {
    return (
        <>
            <Disclaimer />
            {children}
        </>
    );
};

const PageOnlyComponent = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
};

export default App;
