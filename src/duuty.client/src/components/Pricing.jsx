import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
    const navigate = useNavigate();

    // Razorpay payment handler
    const handleRazorpayPayment = async (amount, description) => {
        // Ideally, fetch order_id from your backend here
        const options = {
            key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
            amount: amount * 100, // Amount in paise
            currency: "INR",
            name: "Your Company Name",
            description: description,
            // order_id: "order_DBJOWzybf0sJbb", // Get this from your backend
            handler: function (response) {
                alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                // You can verify payment on the backend here
            },
            prefill: {
                name: "",
                email: "",
                contact: "",
            },
            theme: {
                color: "#6366f1",
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

  return (
    <section className="bg-[#f4f2ff] min-h-screen py-12 px-4">
      <div className="container-wrapper mx-auto">
        <h2 className="text-2xl font-semibold mb-2 text-left flex">
          <button
            className="cursor-pointer flex items-center text-gray-700 hover:text-indigo-600"
            onClick={() => navigate("/")}
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
          </button>{" "}
          Our Pricing Plan
        </h2>
        <p className="text-gray-600 mb-10 text-left">
          You can get all access by selecting your plan!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-2xl font-semibold mb-2">1 - Month</h3>
            <p className="text-gray-500 text-[16px] mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
              quam
            </p>
            <p className="text-3xl font-bold mb-1">
              &#8377; 999 {" "}
              {/* <span className="text-base font-normal text-gray-600">
                / Month
              </span> */}
            </p>
            <p className="text-gray-500 mb-6">Monthly Payment</p>
                      <button className="bg-linear-(--gradient-bg) text-white py-2 w-full rounded-lg mb-2 cursor-pointer"
                          onClick={() => handleRazorpayPayment(999, "1 - Month Plan")}
                      >
              Pay Now
            </button>
            <div className="border-t border-gray-300 my-6"></div>
            <h4 className="font-semibold mb-4 text-[18px]">What’s included:</h4>
            <ul className="space-y-5 text-[16px]">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-indigo-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                All limited links
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-indigo-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>{" "}
                Own analytics platform
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-indigo-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>{" "}
                Chat support
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </div>
                Optimize hashtags
              </li>
              <li className="flex items-center gap-3">
                {" "}
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </div>{" "}
                Mobile app
              </li>
              <li className="flex items-center gap-3">
                {" "}
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </div>{" "}
                Unlimited users
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-2xl font-semibold mb-2">3 - Months</h3>
            <p className="text-gray-500 text-[16px] mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
              quam
            </p>
            <p className="text-3xl font-bold mb-1">
              &#8377; 1,999{" "}
              {/* <span className="text-base font-normal text-gray-600">
                / Quarter
              </span> */}
            </p>
            <p className="text-gray-500 mb-6">Quarterly Payment</p>
                      <button className="bg-linear-(--gradient-bg) text-white py-2 w-full rounded-lg mb-2 cursor-pointer"
                          onClick={() => handleRazorpayPayment(999, "3 - Months Plan")}
                      >
              Pay Now
            </button>
            <div className="border-t border-gray-300 my-6"></div>
            <h4 className="font-semibold mb-4 text-[18px]">What’s included:</h4>
            <ul className="space-y-5 text-[16px]">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-indigo-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                All limited links
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-indigo-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>{" "}
                Own analytics platform
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-indigo-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>{" "}
                Chat support
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </div>
                Optimize hashtags
              </li>
              <li className="flex items-center gap-3">
                {" "}
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </div>{" "}
                Mobile app
              </li>
              <li className="flex items-center gap-3">
                {" "}
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </div>{" "}
                Unlimited users
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-2xl font-semibold mb-2">12 - Months</h3>
            <p className="text-gray-500 text-[16px] mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
              quam
            </p>
            <p className="text-3xl font-bold mb-1">
              &#8377; 6,999 {" "}
              {/* <span className="text-base font-normal text-gray-600">
                / Month
              </span> */}
            </p>
            <p className="text-gray-500 mb-6">Yearly Payment</p>
                      <button className="bg-linear-(--gradient-bg) text-white py-2 w-full rounded-lg mb-2 cursor-pointer"
                          onClick={() => handleRazorpayPayment(999, "1 - Month Plan")}
                      >
              Pay Now
            </button>
            <div className="border-t border-gray-300 my-6"></div>
            <h4 className="font-semibold mb-4 text-[18px]">What’s included:</h4>
            <ul className="space-y-5 text-[16px]">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-indigo-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                All limited links
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-indigo-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>{" "}
                Own analytics platform
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-indigo-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>{" "}
                Chat support
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </div>
                Optimize hashtags
              </li>
              <li className="flex items-center gap-3">
                {" "}
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </div>{" "}
                Mobile app
              </li>
              <li className="flex items-center gap-3">
                {" "}
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </div>{" "}
                Unlimited users
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-2xl font-semibold mb-2">End To End</h3>
            <p className="text-gray-500 text-[16px] mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
              quam
            </p>
            <p className="text-3xl font-bold mb-1">
              &#8377; 9,999{" "}
              {/* <span className="text-base font-normal text-gray-600">
                / Month
              </span> */}
            </p>
            <p className="text-gray-500 mb-6">Quarterly Payment</p>
            <button className="bg-linear-(--gradient-bg) text-white py-2 w-full rounded-lg mb-2 cursor-pointer">
              Contact Us
            </button>
            <div className="border-t border-gray-300 my-6"></div>
            <h4 className="font-semibold mb-4 text-[18px]">What’s included:</h4>
            <ul className="space-y-5 text-[16px]">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-indigo-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                All limited links
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-indigo-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>{" "}
                Own analytics platform
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-indigo-600 text-indigo-600">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>{" "}
                Chat support
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </div>
                Optimize hashtags
              </li>
              <li className="flex items-center gap-3">
                {" "}
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </div>{" "}
                Mobile app
              </li>
              <li className="flex items-center gap-3">
                {" "}
                <div className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </div>{" "}
                Unlimited users
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
