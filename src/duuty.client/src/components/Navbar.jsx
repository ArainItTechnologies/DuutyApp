import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "../translations/TranslationHook";
import { ROUTES } from "../Constants";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  UserIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  HomeIcon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  IdentificationIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import LogoSrc from "../assets/logo.svg";
import { useUser } from "../hooks/Hooks";

export default function Navbar() {
  const { t } = useTranslation();

  const { user, setUser } = useUser();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    setOpen(false);
    navigate(ROUTES.LOGIN); // or use navigate if inside react-router
  };

  return (
    <div className="bg-[#F4F3FF] sticky top-0 z-5">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex justify-end">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
          >
            {/* Logo Section */}
            <div className="flex px-4 pt-5 pb-2 items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-auto">
                  <img src={LogoSrc} alt="Duuty Logo" className="h-8" />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 cursor-pointer"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-3 py-3">
              <div className="flow-root">
                <Link
                  onClick={() => setOpen(false)}
                  to={ROUTES.HOME}
                  className={`mb-2 flex p-2 px-6 font-medium text-center rounded-[12px] ${
                    window.location.pathname === '/find-job'
                      ? 'bg-indigo-600 text-white' // Active state styles
                      : 'bg-[#fafafa] text-gray-900 hover:bg-[#EDEBFF] hover:text-indigo-600'
                  }`}
                >
                  <HomeIcon className="h-5 w-5 mr-3 text-primary" />
                  <span>Home</span>
                </Link>
                {!user && (
                  <Link
                    onClick={() => setOpen(false)}
                    to={ROUTES.LOGIN}
                    className="flex items-center p-3 font-medium text-gray-900 hover:bg-[#EDEBFF] hover:text-indigo-600 rounded-lg transition-colors"
                  >
                    <UserIcon className="h-5 w-5 mr-3 text-primary" />
                    <span>Sign in</span>
                  </Link>
                )}
                <Link
                  onClick={() => setOpen(false)}
                  to={ROUTES.JOB_RESULTS}
                  className="flex items-center p-3 font-medium text-gray-900 hover:bg-[#EDEBFF] hover:text-indigo-600 rounded-lg transition-colors"
                >
                  <BriefcaseIcon className="h-5 w-5 mr-3 text-primary" />
                  <span>Find a Job</span>
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to={ROUTES.JOB_LISTING}
                  className="flex items-center p-3 font-medium text-gray-900 hover:bg-[#EDEBFF] hover:text-indigo-600 rounded-lg transition-colors"
                >
                  <BuildingOfficeIcon className="h-5 w-5 mr-3 text-primary" />
                  <span>Hire Now</span>
                </Link>
                {/*<Link to="/pricing" className="flex items-center p-3 font-medium text-gray-900 hover:bg-[#EDEBFF] hover:text-indigo-600 rounded-lg transition-colors">
                <CurrencyDollarIcon className="h-5 w-5 mr-3 text-primary" />
                <span>Pricing</span>
              </Link>*/}
              </div>
            </div>

            {/* Profile Section with Horizontal Line */}
            {user && (
              <div className="mt-auto">
                <div className="border-t border-gray-200 w-full"></div>
                <div className="px-4 py-4">
                  {/* Logout button */}
                  <div className="mt-4">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        {/* <p className="flex h-10 items-center justify-center bg-primary px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          India's first job portal for kitchen staff recruitment
        </p> */}

        <nav aria-label="Top" className="mx-auto px-0 bg-[#F4F3FF]">
          <div className="container-wrapper">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex">
                <Link to={ROUTES.HOME}>
                  <span className="sr-only">Your Company</span>
                  <img
                    alt="Duuty Logo"
                    src={LogoSrc}
                    className="h-8 w-[102px]"
                  />
                </Link>
              </div>

              {/* Mobile nav buttons */}
              <div className="flex items-center space-x-2 lg:hidden">
                <Link
                  to={ROUTES.JOB_RESULTS}
                  className="text-[12px] text-white font-medium inline-block rounded-[11px] bg-linear-(--gradient-bg) py-2 px-4 mr-[12px]"
                >
                   {t("findajob")}
                </Link>
                <Link
                  to="/job-listing"
                  className="text-[12px] text-[#3B31FF] font-medium inline-block rounded-[11px] py-2 px-4 border-1 border-[#3B31FF]"
                >
                  Hire Now
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="relative rounded-[11px] h-[36px] p-2 border-1 border-[#3B31FF] text-gray-400 flex items-center"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="size-6 text-[#3B31FF]"
                  />
                </button>
              </div>

              <div className="ml-auto hidden lg:flex lg:items-center lg:justify-end lg:space-x-4">
                {/* Desktop navigation buttons */}
                <div className="flex h-full space-x-8 mr-[40px]">
                  <div className="relative flex">
                    {/*<Link to="/pricing" className="cursor-pointer text-[16px] relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out border-transparent text-gray-700 hover:text-indigo-600">*/}
                    {/*  Pricing*/}
                    {/*</Link>*/}
                  </div>
                </div>

                <Link
                  to={ROUTES.JOB_RESULTS}
                  className="text-[15px] text-white font-medium inline-block rounded-[11px] bg-linear-(--gradient-bg) px-[25px] py-[10px] mr-[12px]"
                >
                  Find a Job
                </Link>
                <Link
                  to={ROUTES.JOB_LISTING}
                  className="hover:bg-[#ECEFFF] text-[15px] text-[#3B31FF] font-medium inline-block rounded-[11px] px-[25px] py-[10px] border-1 border-[#ECEFFF"
                >
                  Hire Now
                </Link>
                {/* Conditionally show based on user */}
                {user == null ? (
                  <Link
                    to={ROUTES.LOGIN}
                    className="text-[15px] text-white font-medium inline-block rounded-[11px] bg-linear-(--gradient-bg) px-[25px] py-[10px] mr-[12px]"
                  >
                    Sign in / Sign up
                  </Link>
                ) : (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      <UserCircleIcon className="h-8 w-8 text-[#3B31FF]" />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg z-50">
                        <Link
                          to={ROUTES.PROFILE}
                          className="flex items-center gap-2 px-4 py-2 text-[#3B31FF] hover:bg-gray-100"
                        >
                          <IdentificationIcon className="h-5 w-5" />
                          Profile
                        </Link>
                        <Link
                          to={ROUTES.CHANGE_PASSWORD}
                          className="flex items-center gap-2 px-4 py-2 text-[#3B31FF] hover:bg-gray-100"
                        >
                          <Cog6ToothIcon className="h-5 w-5" />
                          Change Password
                        </Link>
                        <hr className="my-1 border-gray-200" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 w-full text-left text-white bg-red-600 rounded-b-lg"
                        >
                          <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
