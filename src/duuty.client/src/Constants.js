import chef from "./assets/chef.jpeg";
import chettinad from "./assets/chettinad-master.jpeg";
import chat from "./assets/chat-master.jpeg";
import tandoor from "./assets/tandoori-master.jpeg";
import biryani from "./assets/biryani.jpeg";
import barota from "./assets/dosa.jpeg";
import chinese from "./assets/Chinese.png";
import teamaster from "./assets/tea-master.jpeg";
import northindian from "./assets/north-indian.jpeg";
import southindian from "./assets/south-indian.jpeg";
import bakery from "./assets/bakery.jpeg";
import kitchen from "./assets/kitcher-helpers.jpeg";
import juice from "./assets/juice-master.jpeg";
import bajji from "./assets/bajji-master.jpeg";
import shawarma from "./assets/shawarma-master.jpg";
import dhaba from "./assets/dhaba-master.jpg";

export const ROUTES = {
  HOME: '/',
  FAQ: '#faq-section',
  CONTACT_US: '/contact-us',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  JOB_APPLICATION: '/job',
  FIND_JOB: '/find-job',
  HIRE_NOW: '/hire',
  JOB_RESULTS: '/job-results',
  JOB_LISTING: '/job-listing',
  REGISTER: '/register',
  MANAGE_JOBS: '/manage-jobs',
  BECOME_EMPLOYER: '/become-employer',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  PROFILE: '/profile/:userId',
  PROFILE_EDIT: '/profile/edit',
  EMAIL_CONFIRM: '/confirm',
  CHANGE_PASSWORD: '/change-password',
  PRICING: '/pricing',
  ABOUT_US: '/about-us',
  PRIVACY_POLICY: '/privacy',

  EMPLOYER_DASHBOARD: '/employer-dashboard',
  ADMIN_DASHBOARD: '/admin-dashboard',
  SUPER_ADMIN_DASHBOARD: '/super-admin-dashboard',
};

export const SUPER_ADMIN_ROLES = ['SuperAdmin'];
export const ADMIN_ROLES = [...SUPER_ADMIN_ROLES, 'Admin'];
export const EMPLOYER_ROLES = [...ADMIN_ROLES, 'Employer'];
export const EMPLOYEE_ROLES = [...EMPLOYER_ROLES, 'User'];

export const roleChecks = (user) => {
  const roles = user?.role || [];

  return {
    isSuperAdmin: roles.some(r => SUPER_ADMIN_ROLES.includes(r)),
    isAdmin: roles.some(r => ADMIN_ROLES.includes(r)),
    isEmployer: roles.some(r => EMPLOYER_ROLES.includes(r)),
    isEmployee: roles.some(r => EMPLOYEE_ROLES.includes(r))
  };
};

export const CHEF_OPTIONS = [
  { id: "Pastry Chef", name: "Pastry Chef", image: chef },
  { id: "Chef de partie", name: "Chef de partie", image: chef },
  { id: "Commis Chef", name: "Commis Chef", image: chef },
  { id: "Sous Chef", name: "Sous Chef", image: chef },
  { id: "Station Chef", name: "Station Chef", image: chef },
  { id: "Butcher Chef", name: "Butcher Chef", image: chef },
  { id: "Executive Chef", name: "Executive Chef", image: chef },
  { id: "Head Chef", name: "Head Chef", image: chef },
  { id: "Sauce Chef", name: "Sauce Chef", image: chef },
  { id: "Pantry chef", name: "Pantry chef", image: chef },
];

export const ROLE_OPTIONS = [
  { id: "Chef", name: "Chef", image: chef },
  { id: "Shawarma Master", name: "Shawarma Master", image: shawarma },
  { id: "Chaat Master", name: "Chaat Master", image: chat },
  { id: "Grill Master", name: "Grill Master", image: tandoor },
  { id: "Chettinadu Master", name: "Chettinadu Master", image: chettinad },
  { id: "Kitchen Helper", name: "Kitchen Helper", image: kitchen },
  { id: "Bakery Master", name: "Bakery Master", image: bakery },
  { id: "Biriyani Master", name: "Biriyani Master", image: biryani },
  { id: "Tea Master", name: "Tea Master", image: teamaster },
  { id: "Parotta/Dosa Master", name: "Parotta / Dosa Master", image: barota },
  { id: "South Indian Master", name: "South Indian Thali Master", image: southindian },
  { id: "North Indian Master", name: "North Indian Thali Master", image: northindian },
  { id: "Chinese Master", name: "Chinese Master", image: chinese },
  { id: "Juice Master", name: "Juice Master", image: juice },
  { id: "Bajji Master", name: "Bajji Master", image: bajji },
  { id: "Dhaba Master", name: "Dhaba Master", image: dhaba }
];

export const ALL_ROLE_OPTIONS = [
  ...ROLE_OPTIONS.filter((role) => role.id !== "Chef"),
  ...CHEF_OPTIONS
];

export const pageSizeOptions = [
  { id: 5, name: "5 per page" },
  { id: 10, name: "10 per page" },
  { id: 20, name: "20 per page" },
];

export const CITIES = [
  { id: "Ahmedabad", name: "Ahmedabad", state: "Gujarat" },
  { id: "Bangalore", name: "Bangalore", state: "Karnataka" },
  { id: "Chennai", name: "Chennai", state: "Tamil Nadu" },
  { id: "Delhi", name: "Delhi", state: "Delhi" },
  { id: "Hyderabad", name: "Hyderabad", state: "Telangana" },
  { id: "Jaipur", name: "Jaipur", state: "Rajasthan" },
  { id: "Kolkata", name: "Kolkata", state: "West Bengal" },
  { id: "Lucknow", name: "Lucknow", state: "Uttar Pradesh" },
  { id: "Mumbai", name: "Mumbai", state: "Maharashtra" },
  { id: "Pune", name: "Pune", state: "Maharashtra" },
  { id: "Surat", name: "Surat", state: "Gujarat" },
  { id: "Vadodara", name: "Vadodara", state: "Gujarat" },
  { id: "Indore", name: "Indore", state: "Madhya Pradesh" },
  { id: "Bhopal", name: "Bhopal", state: "Madhya Pradesh" },
  { id: "Coimbatore", name: "Coimbatore", state: "Tamil Nadu" },
  { id: "Nagpur", name: "Nagpur", state: "Maharashtra" },
  { id: "Visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh" },
  { id: "Patna", name: "Patna", state: "Bihar" },
  { id: "Ludhiana", name: "Ludhiana", state: "Punjab" },
  { id: "Agra", name: "Agra", state: "Uttar Pradesh" },
  { id: "Nashik", name: "Nashik", state: "Maharashtra" },
  { id: "Faridabad", name: "Faridabad", state: "Haryana" },
  { id: "Meerut", name: "Meerut", state: "Uttar Pradesh" },
  { id: "Rajkot", name: "Rajkot", state: "Gujarat" },
  { id: "Kalyan-Dombivli", name: "Kalyan-Dombivli", state: "Maharashtra" },
  { id: "Vasai-Virar", name: "Vasai-Virar", state: "Maharashtra" },
  { id: "Varanasi", name: "Varanasi", state: "Uttar Pradesh" },
  { id: "Srinagar", name: "Srinagar", state: "Jammu and Kashmir" },
  { id: "Aurangabad", name: "Aurangabad", state: "Maharashtra" },
  { id: "Dhanbad", name: "Dhanbad", state: "Jharkhand" },
  { id: "Amritsar", name: "Amritsar", state: "Punjab" },
  { id: "Navi Mumbai", name: "Navi Mumbai", state: "Maharashtra" },
  { id: "Allahabad", name: "Allahabad", state: "Uttar Pradesh" },
  { id: "Ranchi", name: "Ranchi", state: "Jharkhand" },
  { id: "Howrah", name: "Howrah", state: "West Bengal" },
  { id: "Thane", name: "Thane", state: "Maharashtra" },
  { id: "Salem", name: "Salem", state: "Tamil Nadu" },
  { id: "Warangal", name: "Warangal", state: "Telangana" },
  { id: "Gwalior", name: "Gwalior", state: "Madhya Pradesh" },
  { id: "Jabalpur", name: "Jabalpur", state: "Madhya Pradesh" }
];
export const STATES = [
  { id: "Andhra Pradesh", name: "Andhra Pradesh" },
  { id: "Tamil Nadu", name: "Tamil Nadu" },
  { id: "Kerala", name: "Kerala" },
  { id: "Odisha", name: "Odisha" },
  { id: "West Bengal", name: "West Bengal" },
  { id: "Telangana", name: "Telangana" },
  { id: "Karnataka", name: "Karnataka" },
  { id: "Rajasthan", name: "Rajasthan" }
];

export const FAQS = [
  {
    question: "How do I post a job on Duuty?",
    answer: "Creating a job listing takes just a few minutes. Sign in, add your role details, and start receiving applications instantly.",
  },
  {
    question: "What kind of kitchen roles can I hire for?",
    answer: "Duuty supports all culinary roles—chefs, line cooks, kitchen porters, sous chefs, and more.",
  },
  {
    question: "How quickly can I expect candidates?",
    answer: "Most employers start receiving matches within 24–48 hours of posting.",
  },
  {
    question: "Are candidates pre-vetted?",
    answer: "Yes, we verify every candidate’s experience and availability to ensure quality matches.",
  },
  {
    question: "How much does it cost to hire through Duuty?",
    answer: "We offer flexible pricing plans. Contact us for details tailored to your hiring needs.",
  },
  {
    question: "How do I apply for a kitchen job?",
    answer: "Simply create a profile, browse jobs, and apply with one click.",
  },
  {
    question: "Can I get alerts for new jobs?",
    answer: "Yes, we’ll notify you when new jobs match your skills and preferences.",
  },
];


