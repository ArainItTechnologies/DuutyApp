import { Clock, MessageSquare, ShieldCheck, Users } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Duuty</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Transforming task management for teams and individuals around the world.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-heading">Our Mission</h2>
          <p className="text-lg mb-6 text-heading">
            At Duuty, we believe that productivity shouldn't be complicated. Our mission is to create intuitive, 
            powerful task management solutions that help people focus on what matters most.
          </p>
          <p className="text-lg mb-6 text-heading">
            Founded in 2023, we've grown from a small team of passionate developers to a diverse community
            dedicated to transforming how work gets done. Our platform combines simplicity with robust features,
            making task management accessible to everyone.
          </p>
          <p className="text-lg text-heading">
            We're not just building software; we're building a better way to work together.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-heading">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-center mb-4">
                <Users size={36} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Collaboration</h3>
              <p className="text-heading text-center">
                We believe in the power of teams working together seamlessly.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-center mb-4">
                <ShieldCheck size={36} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Reliability</h3>
              <p className="text-heading text-center">
                Our platform is built to be dependable when you need it most.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-center mb-4">
                <Clock size={36} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Efficiency</h3>
              <p className="text-heading text-center">
                We help you accomplish more in less time with smart workflows.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-center mb-4">
                <MessageSquare size={36} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Transparency</h3>
              <p className="text-heading text-center">
                We believe in open communication and clear expectations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-heading">Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
              <img src="/api/placeholder/250/250" alt="Team member" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-semibold text-primary">Sarah Johnson</h3>
            <p className="text-heading">Founder & CEO</p>
          </div>
          <div className="text-center">
            <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
              <img src="/api/placeholder/250/250" alt="Team member" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-semibold text-primary">Michael Chen</h3>
            <p className="text-heading">Lead Developer</p>
          </div>
          <div className="text-center">
            <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
              <img src="/api/placeholder/250/250" alt="Team member" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-semibold text-primary">Aisha Patel</h3>
            <p className="text-heading">UX Designer</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            We're always looking for passionate people to join our team and help us build the future of productivity.
          </p>
          <button className="bg-white text-primary px-8 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}