import { Link } from "react-router-dom";
import LogoSrc from "../assets/logo.svg";
import { ROUTES } from "../Constants";
import { ScrollLink } from "./custom/FormElements";

const Footer = () => {
  return (
    <footer className="container-wrapper text-center text-surface/75 lg:text-left">
      <div className="py-6 text-center md:text-left">
        <div className="grid-1 grid gap-8 lg:gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <div className="">
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              <span className="">
                <img alt="Duuty Logo" src={LogoSrc} className="w-[130px]" />
              </span>
            </h6>
            <p>Connecting great kitchens with great talent</p>
            <div className="flex justify-center sm:justify-start mt-4 space-x-4 mb-4">
              <a
                href="https://www.facebook.com/share/15SHJ1yqH9/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="[&>svg]:h-5 [&>svg]:w-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 320 512"
                >
                  <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com"
                className="[&>svg]:h-5 [&>svg]:w-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path d="M100.28 448H7.4V148.9h92.88zm-46.44-341C24.07 107 0 82.94 0 53.8 0 24.66 24.07.6 53.84.6c29.77 0 53.84 24.06 53.84 53.2 0 29.14-24.07 53.2-53.84 53.2zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.7 37.7-55.7 76.6V448h-92.68V148.9h88.98v40.8h1.3c12.4-23.5 42.5-48.3 87.5-48.3 93.6 0 110.8 61.5 110.8 141.3V448z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/duuty.in?igsh=MWU4dmpjcXhoOWxpcg=="
                className="inline-flex items-center justify-center [&>svg]:h-5 [&>svg]:w-5 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600 rounded-lg text-white no-underline transition-transform duration-200 hover:scale-110 [&>svg]:h-5 [&>svg]:w-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  {" "}
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />{" "}
                </svg>{" "}
              </a>
            </div>
          </div>
          <div>
            <h6 className="mb-4 flex justify-center font-bold md:justify-start">
              Company
            </h6>
            <p className="mb-4">
              <Link to={ROUTES.ABOUT_US}>About Us</Link>
            </p>
            <p className="mb-4">
              <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
            </p>
            <p className="mb-4">
              <Link to={ROUTES.PRICING}>Pricing</Link>
            </p>
          </div>
          <div>
            <h6 className="mb-4 flex justify-center font-bold md:justify-start">
              Contact
            </h6>
            <p className="mb-4">
              <ScrollLink to={`${ROUTES.HOME}#faq-section`} label="Help/FAQ" />
            </p>
            <p className="mb-4">
              <Link to={ROUTES.CONTACT_US}>Contact Us</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
