import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import FullList from './pages/FullList';
import FindSitter from './pages/FindSitter';
import BecomeSitter from './pages/BecomeSitter';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import SuperUserDashboard from './pages/SuperUserDashboard';
import UserDashboard from './pages/UserDashboard';
import SellerDashboard from './pages/SellerDashboard';
import SitterProfile from './pages/SitterProfile';
import ListingDetails from './pages/ListingDetails';
import JobDetails from './pages/JobDetails';
import JobsOffered from './pages/JobsOffered';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<FullList />} />
            <Route path="/listings/:id" element={<ListingDetails />} />
            <Route path="/find-sitter" element={<FindSitter />} />
            <Route path="/become-sitter" element={<BecomeSitter />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/superuser-dashboard" element={<SuperUserDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/sitter-profile/:id" element={<SitterProfile />} />
            <Route path="/jobs-offered" element={<JobsOffered />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/user-profile/:id" element={<UserProfile />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
