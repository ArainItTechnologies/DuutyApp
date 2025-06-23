import React from "react";
import { ShieldCheck, Lock, FileText, UserCheck,Mail, Phone, MapPin } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Last updated: May 20, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Key Points */}
      <div className="bg-blue-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Key Points</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <ShieldCheck className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Data Protection
                  </h3>
                  <p className="text-gray-700">
                    We implement robust security measures to protect your
                    personal data.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Lock className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    No Data Selling
                  </h3>
                  <p className="text-gray-700">
                    We never sell your personal information to third parties.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Transparency</h3>
                  <p className="text-gray-700">
                    We're clear about what data we collect and how we use it.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <UserCheck className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Your Control</h3>
                  <p className="text-gray-700">
                    You can access, modify, or delete your personal data at any
                    time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              At Duuty ("we", "our", or "us"), we respect your privacy and are
              committed to protecting your personal data. This privacy policy
              will inform you about how we look after your personal data when
              you visit our website and use our application, regardless of where
              you visit it from, and tell you about your privacy rights.
            </p>
            <p className="text-gray-700">
              This policy applies to information we collect when you use our
              website, mobile applications, and services (collectively, the
              "Services") or when you otherwise interact with us.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              2. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              We collect several types of information from and about users of
              our Services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <span className="font-medium">Personal Information:</span> This
                includes your name, email address, and other information you
                provide when registering for an account.
              </li>
              <li>
                <span className="font-medium">Usage Data:</span> We collect
                information about how you interact with our Services, including
                the features you use, the time spent on the platform, and other
                usage statistics.
              </li>
              <li>
                <span className="font-medium">Device Information:</span> This
                includes the type of device you use, operating system, browser
                type, and IP address.
              </li>
              <li>
                <span className="font-medium">Tasks and Content:</span>{" "}
                Information and content you provide when creating tasks,
                projects, and other content within our Services.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Providing, maintaining, and improving our Services</li>
              <li>Processing your transactions and managing your account</li>
              <li>
                Sending you technical notices, updates, and support messages
              </li>
              <li>
                Communicating with you about products, services, and events
              </li>
              <li>
                Monitoring and analyzing trends, usage, and activities in
                connection with our Services
              </li>
              <li>
                Detecting, investigating, and preventing fraudulent transactions
                and other illegal activities
              </li>
              <li>
                Personalizing and improving your experience with our Services
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell your personal information. We may share your
              information in the following situations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <span className="font-medium">With Service Providers:</span> We
                share information with vendors, consultants, and other service
                providers who need access to such information to carry out work
                on our behalf.
              </li>
              <li>
                <span className="font-medium">For Legal Reasons:</span> We may
                disclose information if we believe it's necessary to comply with
                a legal obligation or to protect the rights, property, and
                safety of Duuty, our users, or others.
              </li>
              <li>
                <span className="font-medium">With Your Consent:</span> We may
                share information with third parties when you give us explicit
                consent to do so.
              </li>
              <li>
                <span className="font-medium">During Business Transfers:</span>{" "}
                If Duuty is involved in a merger, acquisition, or sale of all or
                a portion of its assets, your information may be transferred as
                part of that transaction.
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              5. Your Rights and Choices
            </h2>
            <p className="text-gray-700 mb-4">
              You have several rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                Access and update your information through your account settings
              </li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of the data we have about you</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise these rights, please contact us at privacy@duuty.com.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p className="text-gray-700">
              We take reasonable measures to help protect information about you
              from loss, theft, misuse, unauthorized access, disclosure,
              alteration, and destruction. However, no internet or electronic
              storage system is 100% secure, and we cannot guarantee absolute
              security of your data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              7. Changes to this Policy
            </h2>
            <p className="text-gray-700">
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new privacy policy on
              this page and updating the "Last updated" date at the top of this
              policy. You are advised to review this privacy policy periodically
              for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about this privacy policy or our privacy
              practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">support@duuty.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 8939785306</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office</h3>
                    <p className="text-gray-600">
                      10-37, Maruthi Nagar
                      <br />
                      Kodambakkam
                      <br />
                      Chennai, IN, 600024
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
