import chef from "./assets/chef.jpeg";
import chettinad from "./assets/chettinad-master.jpeg";
import chat from "./assets/chat-master.jpeg";
import tandoor from "./assets/tandoori-master.jpeg";
import biryani from "./assets/biryani.jpeg";
import barota from "./assets/dosa.jpeg";
import chinese from "./assets/chinese.jpeg";
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
  BECOME_EMPLOYER: '/become-employer',
  FORGOT_PASSWORD: '/forgot',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  EMAIL_CONFIRM: '/confirm',
  CHANGE_PASSWORD: '/change-password',
  PRICING: '/pricing',
  ABOUT_US: '/about-us',
  PRIVACY_POLICY: '/privacy',
};

export const SUPER_ADMIN_ROLES = ['SuperAdmin', 'Admin', 'Employer', 'User'];
export const ADMIN_ROLES = ['Admin', 'Employer'];
export const EMPLOYER_ROLES = ['Employer'];

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


