import { useState } from 'react';
import { Eye, Users, Clock, CheckCircle, XCircle, Calendar, MapPin, DollarSign, User, Mail, Phone, FileText, ArrowLeft } from 'lucide-react';

const JobDashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for jobs
  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "Tech Solutions Inc",
      location: "Remote",
      salary: "$80,000 - $120,000",
      status: "active",
      postedDate: "2024-05-20",
      deadline: "2024-06-15",
      description: "We are looking for an experienced React developer to join our growing team.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "Node.js knowledge"],
      applicantCount: 12,
      applicants: [
        {
          id: 1,
          name: "John Smith",
          email: "john.smith@email.com",
          phone: "+1 (555) 123-4567",
          experience: "6 years",
          appliedDate: "2024-05-22",
          resume: "john_smith_resume.pdf",
          status: "Under Review"
        },
        {
          id: 2,
          name: "Sarah Johnson",
          email: "sarah.j@email.com",
          phone: "+1 (555) 987-6543",
          experience: "4 years",
          appliedDate: "2024-05-21",
          resume: "sarah_johnson_resume.pdf",
          status: "Shortlisted"
        },
        {
          id: 3,
          name: "Mike Chen",
          email: "mike.chen@email.com",
          phone: "+1 (555) 456-7890",
          experience: "7 years",
          appliedDate: "2024-05-23",
          resume: "mike_chen_resume.pdf",
          status: "Interview Scheduled"
        }
      ]
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Creative Agency",
      location: "New York, NY",
      salary: "$60,000 - $85,000",
      status: "recruited",
      postedDate: "2024-04-15",
      deadline: "2024-05-10",
      description: "Seeking a creative UX/UI designer to create amazing user experiences.",
      requirements: ["3+ years design experience", "Figma proficiency", "Portfolio required"],
      applicantCount: 8,
      applicants: [
        {
          id: 4,
          name: "Emily Davis",
          email: "emily.davis@email.com",
          phone: "+1 (555) 234-5678",
          experience: "5 years",
          appliedDate: "2024-04-18",
          resume: "emily_davis_portfolio.pdf",
          status: "Hired"
        },
        {
          id: 5,
          name: "Alex Rodriguez",
          email: "alex.r@email.com",
          phone: "+1 (555) 345-6789",
          experience: "3 years",
          appliedDate: "2024-04-20",
          resume: "alex_rodriguez_portfolio.pdf",
          status: "Rejected"
        }
      ]
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Analytics Corp",
      location: "San Francisco, CA",
      salary: "$70,000 - $95,000",
      status: "expired",
      postedDate: "2024-03-01",
      deadline: "2024-04-01",
      description: "Looking for a detail-oriented data analyst to help drive business decisions.",
      requirements: ["SQL expertise", "Python/R knowledge", "Statistics background"],
      applicantCount: 15,
      applicants: [
        {
          id: 6,
          name: "David Wilson",
          email: "david.w@email.com",
          phone: "+1 (555) 567-8901",
          experience: "4 years",
          appliedDate: "2024-03-05",
          resume: "david_wilson_resume.pdf",
          status: "Application Expired"
        }
      ]
    },
    {
      id: 4,
      title: "Full Stack Developer",
      company: "StartupX",
      location: "Austin, TX",
      salary: "$75,000 - $110,000",
      status: "active",
      postedDate: "2024-05-25",
      deadline: "2024-06-20",
      description: "Join our innovative startup as a full-stack developer working on cutting-edge projects.",
      requirements: ["Full-stack experience", "React & Node.js", "AWS knowledge preferred"],
      applicantCount: 6,
      applicants: [
        {
          id: 7,
          name: "Lisa Anderson",
          email: "lisa.a@email.com",
          phone: "+1 (555) 678-9012",
          experience: "5 years",
          appliedDate: "2024-05-26",
          resume: "lisa_anderson_resume.pdf",
          status: "Under Review"
        }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'recruited':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'recruited':
        return <Users className="w-4 h-4" />;
      case 'expired':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredJobs = statusFilter === 'all' 
    ? jobs 
    : jobs.filter(job => job.status === statusFilter);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <button
              onClick={() => setSelectedJob(null)}
              className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </button>
            
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedJob.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{selectedJob.company}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedJob.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {selectedJob.salary}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Posted {formatDate(selectedJob.postedDate)}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {selectedJob.applicantCount} applicants
                  </div>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-2 ${getStatusColor(selectedJob.status)}`}>
                {getStatusIcon(selectedJob.status)}
                {selectedJob.status.charAt(0).toUpperCase() + selectedJob.status.slice(1)}
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-2">Job Description</h3>
              <p className="text-gray-700 mb-4">{selectedJob.description}</p>
              
              <h3 className="font-semibold mb-2">Requirements</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {selectedJob.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Applicants List */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">Applicants ({selectedJob.applicants.length})</h2>
            </div>
            
            <div className="divide-y">
              {selectedJob.applicants.map((applicant) => (
                <div key={applicant.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{applicant.name}</h3>
                          <p className="text-gray-600">{applicant.experience} experience</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {applicant.email}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {applicant.phone}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Applied {formatDate(applicant.appliedDate)}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FileText className="w-4 h-4 mr-2" />
                          {applicant.resume}
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        applicant.status === 'Hired' ? 'bg-green-100 text-green-800' :
                        applicant.status === 'Shortlisted' ? 'bg-blue-100 text-blue-800' :
                        applicant.status === 'Interview Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                        applicant.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {applicant.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Dashboard</h1>
          <p className="text-gray-600">Manage your job postings and track applicants</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Jobs ({jobs.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({jobs.filter(j => j.status === 'active').length})
            </button>
            <button
              onClick={() => setStatusFilter('recruited')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'recruited'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Recruited ({jobs.filter(j => j.status === 'recruited').length})
            </button>
            <button
              onClick={() => setStatusFilter('expired')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'expired'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Expired ({jobs.filter(j => j.status === 'expired').length})
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-2 ${getStatusColor(job.status)}`}>
                    {getStatusIcon(job.status)}
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {job.applicantCount}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-3">{job.company}</p>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Posted {formatDate(job.postedDate)}
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description}</p>
                
                <button
                  onClick={() => setSelectedJob(job)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details & Applicants
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">No jobs match the selected filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDashboard;