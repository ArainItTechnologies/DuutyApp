import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../Constants";
import { useTranslation } from "../../translations/TranslationHook";
import {
  UserIcon,
  CurrencyRupeeIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  HomeIcon,
  IdentificationIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import LogoSrc from "../../assets/logo.svg";

const MobileSideNav = ({ open, onClose, user, handleLogout }) => {
  const { t } = useTranslation();

  const getProfileUrl = () => {
    return user?.userId ? ROUTES.USER_PROFILE.replace(':userId', user.userId) : ROUTES.LOGIN;
  };

  return (
    <div>
      {/* Mobile menu */}
      <Dialog open={open} onClose={onClose} className="relative z-40 lg:hidden">
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
                onClick={() => onClose(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 cursor-pointer"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-3 py-3">
              <div className="flow-root">
                <NavLink
                  onClick={() => onClose(false)}
                  to={ROUTES.HOME}
                  className={({ isActive }) =>
                    `mb-2 flex p-2 px-6 font-medium text-center rounded-[12px] ${isActive
                      ? "bg-indigo-600 text-white" // Active state styles
                      : "bg-[#fafafa] text-gray-900 hover:bg-[#EDEBFF] hover:text-indigo-600"
                    }`
                  }
                >
                  <HomeIcon className="h-5 w-5 mr-3 text-primary" />
                  <span>Home</span>
                </NavLink>
                {!user && (
                  <NavLink
                    onClick={() => onClose(false)}
                    to={ROUTES.LOGIN}
                    className={({ isActive }) =>
                      `mb-2 flex p-2 px-6 font-medium text-center rounded-[12px] ${isActive
                        ? "bg-indigo-600 text-white" // Active state styles
                        : "bg-[#fafafa] text-gray-900 hover:bg-[#EDEBFF] hover:text-indigo-600"
                      }`
                    }
                  >
                    <UserIcon className="h-5 w-5 mr-3 text-primary" />
                    <span>Sign in</span>
                  </NavLink>
                )}
                <NavLink
                  onClick={() => onClose(false)}
                  to={ROUTES.PRICING}
                  className={({ isActive }) =>
                    `mb-2 flex p-2 px-6 font-medium text-center rounded-[12px] ${isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-[#fafafa] text-gray-900 hover:bg-[#EDEBFF] hover:text-indigo-600"
                    }`
                  } >
                  <CurrencyRupeeIcon className="h-5 w-5 mr-3 text-primary" />
                  <span>Pricing</span>
                </NavLink>
                <NavLink
                  onClick={() => onClose(false)}
                  to={getProfileUrl()}
                  className={({ isActive }) =>
                    `mb-2 flex p-2 px-6 font-medium text-center rounded-[12px] ${isActive
                      ? "bg-indigo-600 text-white"
                      : "bg-[#fafafa] text-gray-900 hover:bg-[#EDEBFF] hover:text-indigo-600"
                    }`
                  } >
                  <IdentificationIcon className="h-5 w-5 mr-3 text-primary" />
                  <span>Profile</span>
                </NavLink>
                <NavLink
                  onClick={() => onClose(false)}
                  to={ROUTES.JOB_RESULTS}
                  className={({ isActive }) =>
                    `mb-2 flex p-2 px-6 font-medium text-center rounded-[12px] ${isActive
                      ? "bg-indigo-600 text-white" // Active state styles
                      : "bg-[#fafafa] text-gray-900 hover:bg-[#EDEBFF] hover:text-indigo-600"
                    }`
                  }
                >
                  <BriefcaseIcon className="h-5 w-5 mr-3 text-primary" />
                  <span> {t("findajob")}</span>
                </NavLink>
                <NavLink
                  onClick={() => onClose(false)}
                  to={ROUTES.JOB_LISTING}
                  className={({ isActive }) =>
                    `mb-2 flex p-2 px-6 font-medium text-center rounded-[12px] ${isActive
                      ? "bg-indigo-600 text-white" // Active state styles
                      : "bg-[#fafafa] text-gray-900 hover:bg-[#EDEBFF] hover:text-indigo-600"
                    }`
                  }
                >
                  <BuildingOfficeIcon className="h-5 w-5 mr-3 text-primary" />
                  <span>Hire Now</span>
                </NavLink>
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
    </div>
  );
};

export default MobileSideNav;
