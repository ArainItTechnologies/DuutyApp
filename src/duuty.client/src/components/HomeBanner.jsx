import { useState } from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/image-banner.png";
import BannerImageMob from "../assets/banner-image-mob.png";
import RegistrationTabs from "./user/RegistrationTabs";
import JobSearch from "./JobSearch";
import AdminDashboard from "./admin/AdminDashboard";
import EmployerDashboard from "./employer/EmployerDashboard";
import SuperAdminDashboard from "./superAdmin/SuperAdminDashboard";
import { ROUTES } from "../Constants";
import { useUser } from "../hooks/Hooks";

const HomeBanner = () => {
    const [activeTab, setActiveTab] = useState("employeeForm");
    const { isSuperAdmin, isAdmin, isEmployer, isEmployee } = useUser();

    // Function to render content based on user role
    const renderRoleBasedContent = () => {
        if (isSuperAdmin) {
            return (
                <div className="w-full">
                    <SuperAdminDashboard />
                </div>
            );
        } 
        
        if (isAdmin) {
            return (
                <div className="w-full">
                    <AdminDashboard />
                </div>
            );
        } 
        
        if (isEmployer) {
            return (
                <div className="w-full">
                    <EmployerDashboard />
                </div>
            );
        } 
        
        if (isEmployee) {
            return (
                <div className="w-full">
                    <JobSearch />
                </div>
            );
        }
        
        // Not logged in - show registration/landing page
        return (
            <div className="container-wrapper items-center lg:items-start flex flex-col lg:flex-row justify-center sm:gap-[50px] xl:gap-[100px]">
                {/* Mobile Banner */}
                <div className="block sm:hidden text-center relative w-full">
                    <img 
                        className="w-full h-auto" 
                        src={BannerImageMob} 
                        alt="Duuty banner image" 
                    />
                    <h1 className="text-[30px] lg:text-[40px] xl:text-[47px] font-[AvenirNextBold] pt-0 pb-6 font-bold">
                        Connecting Great Kitchens With Great Talent
                    </h1>
                </div>

                {/* Desktop Banner */}
                <div className="hidden sm:block w-full lg:mt-0 lg:w-1/2 xl:w-3/5 max-w-[500px] lg:max-w-[700px] text-center lg:max-w-[600px] lg:text-left">
                    <img 
                        className="w-full h-full lg:max-w-3xl" 
                        src={BannerImage} 
                        alt="Duuty banner image" 
                    />
                    <h1 className="text-[32px] lg:text-[40px] xl:text-[47px] font-[AvenirNextBold] pt-3 pb-3 font-bold">
                        Connecting Great Kitchens With Great Talent
                    </h1>
                    <p className="text-(--secondary-text-color) mb-[22px]">
                        Whether you're a restaurant owner seeking reliable kitchen staff or a talented individual looking for your next culinary adventure, Duuty has you covered.
                    </p>
                    
                    {/* Call to Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to={ROUTES.JOB_RESULTS}
                            className="text-[15px] text-white font-medium inline-block rounded-[11px] bg-linear-(--gradient-bg) px-[25px] py-[15px]"
                        >
                            Find a Job
                        </Link>
                        <Link
                            to={ROUTES.JOB_LISTING}
                            className="hover:bg-[#ECEFFF] text-[15px] text-[#3B31FF] font-medium inline-block rounded-[11px] px-[25px] py-[15px] border-1 border-[#ECEFFF]"
                        >
                            Hire Now
                        </Link>
                    </div>
                </div>

                {/* Registration Tabs */}
                <div className="w-full lg:w-1/2 xl:w-2/5 flex justify-center lg:justify-end max-w-[500px] lg:max-w-[100%]">
                    <RegistrationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
            </div>
        );
    };

    return (
        <div id="overview" className="banner-section px-3 sm:px-6 py-6 pb-[50px] sm:pb-[70px] md:pb-[100px] mx-auto bg-linear-[180deg,#F4F3FF,#FFFFFF]">
            {renderRoleBasedContent()}
        </div>
    );
};

export default HomeBanner;