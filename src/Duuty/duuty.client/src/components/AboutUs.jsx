import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Join Our Culinary Team</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            We're looking for passionate kitchen professionals to create extraordinary dining experiences.
          </p>
        </div>
      </div>

      {/* Our Restaurant Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8">Our Culinary Journey</h2>
          <p className="text-heading mb-6">
            Founded in 2018, Duuty Restaurant began with a simple mission: to create exceptional dining experiences that combine traditional techniques with modern innovation. Our executive chef started with a small team of dedicated professionals who shared his passion for quality ingredients and creative presentations.
          </p>
          <p className="text-heading mb-6">
            Today, we've grown into one of the region's most respected culinary destinations, known for our seasonal menus and commitment to supporting local producers. Our kitchen team works collaboratively to push boundaries while honoring classic cooking traditions.
          </p>
        </div>
      </div>

      {/* Kitchen Culture */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-12 text-center">Our Kitchen Culture</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Collaborative Team</h3>
                <p className="text-heading">We value input from every team member, creating a supportive environment where ideas can flourish.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Continuous Learning</h3>
                <p className="text-heading">We encourage professional development through workshops, tastings, and opportunities to experiment with new techniques.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Quality First</h3>
                <p className="text-heading">We never compromise on ingredients or preparation. Our commitment to excellence is evident in every dish we serve.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Culinary Team */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">Meet Our Culinary Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img src="/api/placeholder/400/400" alt="Executive Chef" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-primary">Marcus Jameson</h3>
              <p className="text-heading">Executive Chef</p>
              <p className="text-sm text-heading mt-2">15 years of experience with training in French and Asian cuisine. Winner of Regional Chef Award 2023.</p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img src="/api/placeholder/400/400" alt="Sous Chef" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-primary">Elena Rodriguez</h3>
              <p className="text-heading">Sous Chef</p>
              <p className="text-sm text-heading mt-2">Specializes in pastry and desserts. Graduate of Le Cordon Bleu with 8 years in fine dining kitchens.</p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="w-40 h-40 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <img src="/api/placeholder/400/400" alt="Head Line Cook" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold text-primary">James Kim</h3>
              <p className="text-heading">Head Line Cook</p>
              <p className="text-sm text-heading mt-2">Joined as a commis chef and promoted through dedication and exceptional skills. Known for perfect protein cookery.</p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-10 text-center">What We Offer</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 text-primary">Competitive Benefits</h3>
                <ul className="space-y-2 text-heading">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Competitive salary based on experience
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Health insurance for full-time staff
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Paid time off and sick leave
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Staff meals during shifts
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Employee dining discount
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4 text-primary">Career Growth</h3>
                <ul className="space-y-2 text-heading">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Regular skills training and development
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Opportunity to contribute to menu development
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Clear promotion pathways
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Industry event participation
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Professional certification support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Current Openings */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Current Kitchen Openings</h2>
          
          <div className="space-y-6">
            {/* Job Position 1 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">Sous Chef</h3>
              <p className="text-heading mb-4">Full-time position working closely with our Executive Chef to manage kitchen operations and mentor junior staff.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-heading px-3 py-1 rounded-full text-sm">5+ years experience</span>
                <span className="bg-gray-100 text-heading px-3 py-1 rounded-full text-sm">Leadership skills</span>
                <span className="bg-gray-100 text-heading px-3 py-1 rounded-full text-sm">Menu development</span>
              </div>
              <button className="text-white bg-primary px-5 py-2 rounded hover:bg-opacity-90 transition-colors">
                Apply Now
              </button>
            </div>
            
            {/* Job Position 2 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">Line Cook</h3>
              <p className="text-heading mb-4">Join our team preparing high-quality dishes with attention to detail and consistency.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-heading px-3 py-1 rounded-full text-sm">2+ years experience</span>
                <span className="bg-gray-100 text-heading px-3 py-1 rounded-full text-sm">Fast-paced environment</span>
                <span className="bg-gray-100 text-heading px-3 py-1 rounded-full text-sm">Fine dining</span>
              </div>
              <button className="text-white bg-primary px-5 py-2 rounded hover:bg-opacity-90 transition-colors">
                Apply Now
              </button>
            </div>
            
            {/* Job Position 3 */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">Pastry Chef</h3>
              <p className="text-heading mb-4">Create exceptional desserts and pastries for our award-winning restaurant.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-heading px-3 py-1 rounded-full text-sm">3+ years experience</span>
                <span className="bg-gray-100 text-heading px-3 py-1 rounded-full text-sm">Pastry expertise</span>
                <span className="bg-gray-100 text-heading px-3 py-1 rounded-full text-sm">Creative mindset</span>
              </div>
              <button className="text-white bg-primary px-5 py-2 rounded hover:bg-opacity-90 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Join Us Call-to-Action */}
      <div className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Kitchen Team</h2>
            <p className="text-xl mb-8">
              Whether you're an experienced chef or just starting your culinary journey, we'd love to hear from you. Send us your resume today and take the next step in your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                View All Positions
              </button>
              <button className="bg-transparent border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
                Contact Recruitment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;