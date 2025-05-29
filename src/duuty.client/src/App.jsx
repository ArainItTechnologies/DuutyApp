import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "./Constants";
import Login from "./components/user/Login";
import Home from "./components/Home";
import Register from "./components/user/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Edit from "./components/Edit";
import Notfound from "./components/Notfound";
import JobApplication from "./components/JobApplication";
import HireNow from "./components/HireNow";
import FindAJob from "./components/FindAJobs";
import Footer from "./components/Footer";
import EmailConfirmation from "./components/EmailConfirmation";
import ForgotPassword from "./components/user/ForgotPassword";
import Profile from "./components/Profile";
import Pricing from "./components/Pricing";
import ChangePassword from "./components/user/ChangePassword";
import JobListing from "./components/JobListings";
import BecomeEmployer from "./components/BecomeEmployer";
import AboutUs from "./components/AboutUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import JobSearch from "./components/JobSearch";
import AddRestaurantModal from "./components/AddRestaurantModal";
import ContactUs from "./components/ContactUs";
import { useTranslation } from "./translations/TranslationHook";
import ScrollToTop from "./components/ScrollToTop";
import JobDashboard from "./components/JobDashboard";

function App() {
  const { languageLoading } = useTranslation();

  if (languageLoading) {
    return <div>Loading translations...</div>;
  }
  return (
    <Router>
       <ScrollToTop />
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.JOB_APPLICATION} element={<JobApplication />} />
        <Route path={ROUTES.FIND_JOB} element={<FindAJob />} />
        <Route path={ROUTES.HIRE_NOW} element={<HireNow />} />
        <Route path={ROUTES.JOB_LISTING} element={<JobListing />} />
        <Route path={ROUTES.JOB_RESULTS} element={<JobSearch />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.BECOME_EMPLOYER} element={<BecomeEmployer />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.PROFILE_EDIT} element={<Edit />} />
        <Route path={ROUTES.EMAIL_CONFIRM} element={<EmailConfirmation />} />
        <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
        <Route path={ROUTES.PRICING} element={<Pricing />} />
        <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />
        <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
        <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/ddd" element={<JobDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
