import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GeographicLanding from './pages/GeographicLanding';
import GigListingPage from './pages/GigListingPage';
import ProfessionalProfilePage from './pages/ProfessionalProfilePage';
import PostJobWizard from './pages/PostJobWizard';
import BiddingInterface from './pages/BiddingInterface';
import MilestoneTracker from './pages/MilestoneTracker';
import OnTheJobHub from './pages/OnTheJobHub';
import MobilePunchClock from './pages/MobilePunchClock';
import JobPhotoApproval from './pages/JobPhotoApproval';
import DigitalInvoiceGenerator from './pages/DigitalInvoiceGenerator';
import DispatchAlerts from './pages/DispatchAlerts';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<GeographicLanding />} />
            <Route path="/services" element={<GigListingPage />} />
            <Route path="/profile/:profileId" element={<ProfessionalProfilePage />} />
            <Route path="/post-job" element={<PostJobWizard />} />
            <Route path="/bids/:jobId" element={<BiddingInterface />} />
            <Route path="/project/:projectId" element={<MilestoneTracker />} />
            <Route path="/worker/on-the-job" element={<OnTheJobHub />} />
            <Route path="/worker/on-the-job/punch-clock" element={<MobilePunchClock />} />
            <Route path="/worker/on-the-job/photos" element={<JobPhotoApproval />} />
            <Route path="/worker/on-the-job/invoice" element={<DigitalInvoiceGenerator />} />
            <Route path="/worker/on-the-job/dispatch" element={<DispatchAlerts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
