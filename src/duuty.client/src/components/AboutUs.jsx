const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Join Our Culinary Team
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We're looking for passionate kitchen professionals to create
              extraordinary dining experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Our Restaurant Story */}
      <div className="container mx-auto px-4 py-2">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8">About Us</h2>
          <p className="text-heading mb-6">
            At Duuty, we’re passionate about fueling the food industry by
            connecting the right talent with the right kitchens. Whether you're
            a bustling restaurant in need of skilled chefs or a talented cook
            looking to land your next kitchen job, we’re here to make that
            connection fast, easy, and efficient.
          </p>
          <p className="text-heading mb-6">
            To empower the food industry by streamlining the hiring
            process—helping food businesses find reliable, qualified kitchen
            staff and enabling culinary professionals to discover meaningful job
            opportunities.
          </p>
        </div>
      </div>

      {/* Kitchen Culture */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-12 text-center">
              Our Kitchen Culture
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Who We Help
                </h3>
                <p className="text-heading">
                  Restaurants, cafes, food trucks, cloud kitchens, and all types
                  of food joints looking to hire trusted kitchen staff,
                  including chefs, cooks, prep workers, and more. <br />
                  Culinary professionals—from seasoned head chefs to rising
                  stars—seeking their next great opportunity in kitchens that
                  value their skills.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Why Choose Us
                </h3>
                <p className="text-heading">
                  Targeted Platform: We’re built specifically for the food and
                  hospitality sector—no irrelevant job listings, no noise.{" "}
                  <br />
                  Smart Matching: Our system connects job seekers with roles
                  that match their experience, skills, and location.
                  <br />
                  Quick Hiring: Whether you're posting a job or applying for
                  one, our tools make the process seamless and time-saving.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  Our Vision
                </h3>
                <p className="text-heading">
                  To become the go-to platform for kitchen hiring and career
                  growth in the food service industry—supporting both sides of
                  the counter with trust, efficiency, and transparency. Join us
                  in shaping the future of food industry hiring.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Culinary Team */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            Meet Our Culinary Team
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img
                  src="/api/placeholder/400/400"
                  alt="Executive Chef"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary">
                Marcus Jameson
              </h3>
              <p className="text-heading">Executive Chef</p>
              <p className="text-sm text-heading mt-2">
                15 years of experience with training in French and Asian
                cuisine. Winner of Regional Chef Award 2023.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img
                  src="/api/placeholder/400/400"
                  alt="Sous Chef"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary">
                Elena Rodriguez
              </h3>
              <p className="text-heading">Sous Chef</p>
              <p className="text-sm text-heading mt-2">
                Specializes in pastry and desserts. Graduate of Le Cordon Bleu
                with 8 years in fine dining kitchens.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img
                  src="/api/placeholder/400/400"
                  alt="Head Line Cook"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary">James Kim</h3>
              <p className="text-heading">Head Line Cook</p>
              <p className="text-sm text-heading mt-2">
                Joined as a commis chef and promoted through dedication and
                exceptional skills. Known for perfect protein cookery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-10 text-center">
              What We Offer
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Competitive Benefits
                </h3>
                <ul className="space-y-2 text-heading">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Competitive salary based on experience
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Health insurance for full-time staff
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Paid time off and sick leave
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Staff meals during shifts
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Employee dining discount
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Career Growth
                </h3>
                <ul className="space-y-2 text-heading">
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Regular skills training and development
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Opportunity to contribute to menu development
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Clear promotion pathways
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Industry event participation
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Professional certification support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
