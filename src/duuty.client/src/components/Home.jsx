import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BannerImage from "../assets/image-banner.png";
import BannerImageMob from "../assets/banner-image-mob.png";
import FindEmp from "../assets/dream-kitchen.jpg";
import Emp1 from "../assets/emp-1.png";
import Emp2 from "../assets/emp-2.png";

import WavePatten1 from "../assets/wave-patten1.svg";
import WavePatten2 from "../assets/wave-patten2.svg";

import TrustedCompanies from "./TrustedCompanies";
import TestimonialSection from "../components/Testimonial";
import RegistrationTabs from "./user/RegistrationTabs";
import LanguageSelectionModal from "./LanguageSelectionModal";
import Benefits from "./Benefits";
import Faq from "./Faq";
import { useUser } from "../hooks/Hooks";
import { ROUTES } from "../Constants";

export const Home = () => {
    const [activeTab, setActiveTab] = useState("employeeForm");
    const [selectLanguage, setSelectLanguage] = useState(false);
    const selectedLanguage = localStorage.getItem("selectedLanguage");

    const { user } = useUser();

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === ROUTES.HOME && selectedLanguage===null) {
            setSelectLanguage(true);
        }
    }, [location.pathname, user, setSelectLanguage]);

    useEffect(() => {
        if (location.hash) {
            const el = document.querySelector(location.hash);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <section className="main-wrapper bg-linear-[180deg,#F4F3FF,#FFFFFF]">
            <div id="overview" className="banner-section px-3 sm:px-6 py-6 pb-[50px] sm:pb-[70px] md:pb-[100px] mx-auto bg-linear-[180deg,#F4F3FF,#FFFFFF]">
                <div className="container-wrapper items-center lg:items-start flex flex-col lg:flex-row justify-center sm:gap-[50px] xl:gap-[100px] ">
                    <div className="block sm:hidden text-center relative w-full">
                        <img className="w-full h-auto" src={BannerImageMob} alt="Duuty banner image" />
                        <h1 className="text-[30px] lg:text-[40px] xl:text-[47px] font-[AvenirNextBold] pt-0 pb-6 font-bold">Connecting Great Kitchens With Great Talent</h1>
                    </div>
                    <div className="hidden sm:block w-full lg:mt-0 lg:w-1/2 xl:w-3/5 max-w-[500px] lg:max-w-[700px] text-center lg:max-w-[600px] lg:text-left">
                        <img className="w-full h-full lg:max-w-3xl" src={BannerImage} alt="Duuty banner image" />
                        {/* <span className="md:text-[27px] font-medium text-(--teritary-text-color)">Connecting great kitchens with great talent</span> */}
                        <h1 className="text-[32px] lg:text-[40px] xl:text-[47px] font-[AvenirNextBold] pt-3 pb-3 font-bold">Connecting Great Kitchens With Great Talent</h1>
                        <p className="text-(--secondary-text-color) mb-[22px]">
                            Whether you're a restaurant owner seeking reliable kitchen staff or a talented individual looking for your next culinary adventure, Duuty has you covered.
                        </p>
                        <Link
                            to="/find-job"
                            className="hidden text-[15px] text-white font-medium sm:inline-block rounded-[11px] bg-linear-(--gradient-bg) px-[25px] py-[15px] mr-[12px]"
                        >
                            Find a Job
                        </Link>
                        <Link
                            to="/job-listing"
                            className="hidden hover:bg-[#ECEFFF] text-[15px] text-[#3B31FF] font-medium sm:inline-block rounded-[11px] px-[25px] py-[15px] border-1 border-[#ECEFFF"
                        >
                            Hire Now
                        </Link>

                    </div>
                    <div className="w-full lg:w-1/2 xl:w-2/5 flex justify-center lg:justify-end max-w-[500px] lg:max-w-[100%]">
                        <RegistrationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </div>

            </div>

            <Benefits />

            <div className="find-employer-wrapper pt-[50px] pb-[50px] sm:pt-[70px] sm:pb-[70px]">
                <div className="container-wrapper text-center lg:text-left flex lg:flex-row flex-col-reverse items-center lg:items-start xl:items-center justify-center lg:justify-between gap-[100px] lg:gap-[50px] xl:gap-[0px]">
                    <div className="w-full max-w-[600px] lg:max-w-[100%] lg:w-2/5 xl:w-1/2 flex justify-center relative">
                        <img className="max-w-[300px] sm:max-w-[90%] xl:w-[380px] 2xl:w-[410px] rounded-2xl" src={FindEmp} width="410" height="563" alt="Find your Employer" />
                        <div className="border-[1px] border-[var(--neutral-black)] emp-img emp-img1 bg-white absolute rounded-[16px] flex items-center p-4 sm:p-6 gap-4 right-0 top-[-20px]">
                            <img className="size-[48px]" src={Emp2} alt="Find your Employer" />
                            <p className="max-w-[180px] text-left sm:text-[16px] text-[14px]">Employers find qualified candidates within 48 hours.</p>
                        </div>
                        <div className="border-[1px] border-[var(--neutral-black)] emp-img emp-img2 bg-white absolute rounded-[16px] flex items-center p-4 sm:p-6 gap-4 left-0 bottom-[60px]">
                            <img className="size-[48px]" src={Emp1} alt="Find your Employer" />
                            <p className="max-w-[180px] text-left sm:text-[16px] text-[14px]">Candidate match accuracy based on employer preferences.</p>
                        </div>

                    </div>
                    <div className="find-employer-right w-full lg:w-3/5 xl:w-1/2 max-w-[580px]">
                        <h2 className="text-[28px] lg:text-[34px] xl:text-[40px] font-[AvenirNextBold]">Build Your Dream Kitchen Team</h2>
                        <p className="text-[var(--secondary-text-color)] mt-[18px] mb-[35px]">At Duuty, we make kitchen hiring effortless. Access a pool of pre-vetted culinary professionals, from line cooks to head chefs. Post jobs in minutes, connect with top talent, and fill your kitchen roles faster—with less hassle and better results.</p>
                        <div className="employer-card-wrapper flex flex-wrap gap-x-[30px] sm:gap-y-[50px] gap-y-[30px] justify-center lg:justify-start">
                            <div className="employer-card w-[255px] xl:w-[275px] flex items-center justify-center gap-[15px] rounded-[16px] py-[12px] px-[26px] border-[1px] border-[var(--neutral-black)] bg-[var(--employee-card-bg)] shadow-[8px_8px_0_var(--employee-card-border)]">
                                <span className="text-[22px] font-semibold">10K</span>
                                <p className="text-[14px] text-left text-[var(--secondary-text-color)]">Culinary professionals actively using Duuty to find jobs.</p>
                            </div>
                            <div className="employer-card w-[255px] xl:w-[275px] flex items-center justify-center gap-[15px] rounded-[16px] py-[12px] px-[26px] border-[1px] border-[var(--neutral-black)] bg-[var(--employee-card-child1)] shadow-[8px_8px_0_var(--employee-card-border)]">
                                <span className="text-[22px] font-semibold">99%</span>
                                <p className="text-[14px] text-left text-[var(--secondary-text-color)]">Employers find qualified candidates within 48 hours.</p>
                            </div>
                            <div className="employer-card w-[255px] xl:w-[275px] flex items-center justify-center gap-[15px] rounded-[16px] py-[12px] px-[26px] border-[1px] border-[var(--neutral-black)] bg-[var(--employee-card-child2)] shadow-[8px_8px_0_var(--employee-card-border)]">
                                <span className="text-[22px] font-semibold">4.89</span>
                                <p className="text-[14px] text-left text-[var(--secondary-text-color)]">Average rating from employers on hiring experience.</p>
                            </div>
                            <div className="employer-card w-[255px] xl:w-[275px] flex items-center justify-center gap-[15px] rounded-[16px] py-[12px] px-[26px] border-[1px] border-[var(--neutral-black)] bg-[var(--employee-card-child3)] shadow-[8px_8px_0_var(--employee-card-border)]">
                                <span className="text-[22px] font-semibold">4.95</span>
                                <p className="text-[14px] text-left text-[var(--secondary-text-color)]">Candidate match accuracy based on employer preferences.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <TrustedCompanies/>

            <TestimonialSection />

            <div id="faq-section" className="faq-wrapper flow-root pb-[0px] lg:pb-[100px]">
                <Faq />
            </div>

            <div className="interesting-offers-section relative my-[50px] sm:my-[80px] mx-auto py-[50px] sm:py-[80px] px-[20px] sm:rounded-[130px_20px_20px] rounded-[90px_20px_20px] max-w-[90%] xl:max-w-[85%] bg-[var(--interesting-offer-bg)]">
                <img className="hidden sm:block w-[360px] absolute bottom-[0px] left-[0px]" src={WavePatten1} alt="Wave Patten" />
                <img className="hidden sm:block w-[246px] absolute top-[0px] right-[0px]" src={WavePatten2} alt="Wave Patten" />
                <div className="content-wrapper text-center mx-auto relative">
                    <h2 className="text-[22px] sm:text-[28px] lg:text-[33px] lg:leading-[54px] text-(--secondary-text-color) mb-[30px] sm:mb-[54px]">Start to get information, latest news and other interesting offers about <span className="text-[var(--interesring-offer-special)]">Duuty</span></h2>
                    <input id="phone-num" name="phone number" type="text" required autoComplete="phone number" placeholder="Your Phone Number" className="w-[420px] max-w-[100%] md:mr-[24px] rounded-xl h-[50px] sm:h-[68px] bg-white py-3 px-4 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                    <button type="submit" className="w-[180px] mt-[20px] justify-center rounded-xl h-[50px] sm:h-[68px] bg-linear-(--gradient-bg) p-3 text-sm/6 font-normal text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">Sign Up</button>
                </div>
                <svg className="w-[50px] sm:w-[70px] fly-svg absolute right-[-20px] top-[-13px]" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="35" cy="35" r="35" fill="url(#paint0_linear_3410_637)" />
                    <path d="M52.6105 23.9904C53.3018 25.1878 53.2092 26.6136 52.3677 27.711L33.8939 51.8182C33.1321 52.8123 31.8776 53.3191 30.5948 53.0729C29.3387 52.8313 28.3427 51.9156 27.997 50.6841L25.2635 40.9555L24.9789 39.9435L24.2449 39.191L17.1864 31.9595C16.2927 31.0444 15.9977 29.724 16.4166 28.5154C16.8311 27.3206 17.8708 26.4536 19.1527 26.2856L49.267 22.3404C50.6381 22.1604 51.9192 22.793 52.6105 23.9904Z" fill="white" />
                    <path d="M25.2636 40.9552L27.997 50.6839C28.3427 51.9154 29.3386 52.831 30.5948 53.0727C31.8776 53.319 33.1321 52.8121 33.8939 51.818L52.3677 27.7109C53.2092 26.6134 53.3018 25.1876 52.6105 23.9902L24.9789 39.9433L25.2636 40.9552Z" fill="white" />
                    <path d="M36.2234 33.4515C36.5045 33.9385 36.3381 34.5616 35.8505 34.8431L25.2638 40.9553L24.9791 39.9434L24.2451 39.1909L34.8318 33.0787C35.3194 32.7973 35.9422 32.9646 36.2234 33.4515Z" fill="url(#paint1_linear_3410_637)" />
                    <path d="M25.2632 40.9554L35.85 34.8432C36.3375 34.5617 36.504 33.9387 36.2228 33.4517L24.9786 39.9435L25.2632 40.9554Z" fill="url(#paint2_linear_3410_637)" />
                    <defs>
                        <linearGradient id="paint0_linear_3410_637" x1="0.992909" y1="6.99981" x2="70.3198" y2="7.41987" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#3B31FF" />
                            <stop offset="1" stopColor="#9239FF" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_3410_637" x1="32.4079" y1="34.5441" x2="33.5455" y2="36.8251" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#747DEF" />
                            <stop offset="1" stopColor="#5E3BE1" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_3410_637" x1="32.9024" y1="35.4017" x2="33.5065" y2="36.5259" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#747DEF" />
                            <stop offset="1" stopColor="#5E3BE1" />
                        </linearGradient>
                    </defs>
                </svg>
                <svg className="plus-svg absolute bottom-[-70px] right-[-90px] hidden xl:block" width="153" height="166" viewBox="0 0 153 166" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.19727 152.61H11.5586V154.49H7.19727V159.432H5.19922V154.49H0.837891V152.61H5.19922V148.045H7.19727V152.61Z" fill="#E5E5E5" />
                    <path d="M42.1973 117.61H46.5586V119.49H42.1973V124.432H40.1992V119.49H35.8379V117.61H40.1992V113.045H42.1973V117.61Z" fill="#E5E5E5" />
                    <path d="M77.1973 12.6104H81.5586V14.4902H77.1973V19.4316H75.1992V14.4902H70.8379V12.6104H75.1992V8.04492H77.1973V12.6104Z" fill="#E5E5E5" />
                    <path d="M77.1973 47.6104H81.5586V49.4902H77.1973V54.4316H75.1992V49.4902H70.8379V47.6104H75.1992V43.0449H77.1973V47.6104Z" fill="#E5E5E5" />
                    <path d="M77.1973 82.6104H81.5586V84.4902H77.1973V89.4316H75.1992V84.4902H70.8379V82.6104H75.1992V78.0449H77.1973V82.6104Z" fill="#6246E5" />
                    <path d="M77.1973 117.61H81.5586V119.49H77.1973V124.432H75.1992V119.49H70.8379V117.61H75.1992V113.045H77.1973V117.61Z" fill="#E5E5E5" />
                    <path d="M77.1973 152.61H81.5586V154.49H77.1973V159.432H75.1992V154.49H70.8379V152.61H75.1992V148.045H77.1973V152.61Z" fill="#E5E5E5" />
                    <path d="M112.197 12.6104H116.559V14.4902H112.197V19.4316H110.199V14.4902H105.838V12.6104H110.199V8.04492H112.197V12.6104Z" fill="#E5E5E5" />
                    <path d="M112.197 47.6104H116.559V49.4902H112.197V54.4316H110.199V49.4902H105.838V47.6104H110.199V43.0449H112.197V47.6104Z" fill="#E5E5E5" />
                    <path d="M112.197 82.6104H116.559V84.4902H112.197V89.4316H110.199V84.4902H105.838V82.6104H110.199V78.0449H112.197V82.6104Z" fill="#E5E5E5" />
                    <path d="M112.197 117.61H116.559V119.49H112.197V124.432H110.199V119.49H105.838V117.61H110.199V113.045H112.197V117.61Z" fill="#E5E5E5" />
                    <path d="M112.197 152.61H116.559V154.49H112.197V159.432H110.199V154.49H105.838V152.61H110.199V148.045H112.197V152.61Z" fill="#E5E5E5" />
                    <path d="M151.559 12.6104V14.4795H140.838V12.6104H151.559ZM147.197 8.04492V19.4316H145.21V8.04492H147.197Z" fill="#8D39FF" />
                    <path d="M147.197 47.6104H151.559V49.4902H147.197V54.4316H145.199V49.4902H140.838V47.6104H145.199V43.0449H147.197V47.6104Z" fill="#E5E5E5" />
                    <path d="M147.197 82.6104H151.559V84.4902H147.197V89.4316H145.199V84.4902H140.838V82.6104H145.199V78.0449H147.197V82.6104Z" fill="#E5E5E5" />
                    <path d="M147.197 117.61H151.559V119.49H147.197V124.432H145.199V119.49H140.838V117.61H145.199V113.045H147.197V117.61Z" fill="#E5E5E5" />
                    <path d="M147.197 152.61H151.559V154.49H147.197V159.432H145.199V154.49H140.838V152.61H145.199V148.045H147.197V152.61Z" fill="#E5E5E5" />
                </svg>
            </div>
            <LanguageSelectionModal isOpen={selectLanguage} setIsOpen={setSelectLanguage} />
        </section>


    );
};

export default Home;
