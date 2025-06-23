import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "../../translations/TranslationHook";
import { ROUTES } from "../../Constants";
import {
  Bars3Icon,
  UserCircleIcon,
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  IdentificationIcon
} from "@heroicons/react/24/outline";
import LogoSrc from "../../assets/logo.svg";
import { useUser } from "../../hooks/Hooks";
import MobileSideNav from "./MobileSideNav";

export default function Navbar() {
  const { t, reset } = useTranslation();

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
    reset();
    setOpen(false);
    navigate(ROUTES.LOGIN); // or use navigate if inside react-router
  };

  return (
    <div className="bg-[#F4F3FF] sticky top-0 z-5">
      <MobileSideNav open={open} onClose={setOpen} user={user} handleLogout={handleLogout}/>
      <header className="relative bg-white">
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
                  {t("findajob")}
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
