import { useState } from 'react';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
      {
          id: 4,
          name: 'Priya Ramaswamy',
          location: 'Chennai, Tamil Nadu',
          content: 'The platform simplified our entire workflow. What used to take days now happens in hours. Efficiency has improved dramatically across our team.',
          avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      },
      {
          id: 5,
          name: 'Karthik Subramanian',
          location: 'Coimbatore, Tamil Nadu',
          content: 'As a small business owner, I was looking for an affordable solution that wouldn\'t compromise on quality. Duuty exceeded all my expectations and has become essential to our daily operations.',
          avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      },
      {
          id: 6,
          name: 'Lakshmi Venkatesh',
          location: 'Madurai, Tamil Nadu',
          content: 'The customer support team deserves special mention. They were responsive and helped us customize the platform to our specific needs. Truly a game-changer for our business.',
          avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      },
      {
          id: 7,
          name: 'Raj Sundaram',
          location: 'Tiruchirappalli, Tamil Nadu',
          content: 'We implemented Duuty across all our departments last year, and the improvement in communication and project delivery has been remarkable. The ROI is clear and substantial.',
          avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
      },
      {
          id: 8,
          name: 'Ananya Krishnan',
          location: 'Salem, Tamil Nadu',
          content: 'After 5 years in a chain restaurant, I wanted to explore authentic Tamil cuisine. Duuty connected me with a heritage restaurant that valued my fusion experience. Within two weeks of creating my profile, I had three interviews and my dream job!',
          avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
      },
      {
          id: 9,
          name: 'Vikram Chandrasekar',
          location: 'Thanjavur, Tamil Nadu',
          content: 'As a pastry chef specializing in French techniques, I struggled to find the right fit locally. Duuty\'s detailed skill matching algorithm found me a position at a luxury hotel that needed exactly my expertise. The seamless application process made everything so easy.',
          avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
      },
      {
          id: 10,
          name: 'Deepa Murugan',
          location: 'Vellore, Tamil Nadu',
          content: 'I had been job hunting for months with no success until a friend recommended Duuty. Their verification process gave employers confidence in my experience, and I received a job offer as head chef within just 3 weeks!',
          avatar: 'https://randomuser.me/api/portraits/women/89.jpg',
      },
      {
          id: 11,
          name: 'Arjun Natesan',
          location: 'Erode, Tamil Nadu',
          content: 'After my restaurant closed during the pandemic, I was desperate to find work. Duuty not only helped me find a temporary position but also connected me with a new restaurant opening that needed my expertise in traditional Tamil cuisine.',
          avatar: 'https://randomuser.me/api/portraits/men/37.jpg',
      },
      {
          id: 12,
          name: 'Divya Shankar',
          location: 'Kanyakumari, Tamil Nadu',
          content: 'As a young chef just out of culinary school, I was struggling to get noticed. The portfolio feature on Duuty allowed me to showcase my dishes and techniques, which caught the attention of a beachside resort looking for innovative talent.',
          avatar: 'https://randomuser.me/api/portraits/women/74.jpg',
      },
      {
          id: 13,
          name: 'Mohan Venkataraman',
          location: 'Tiruppur, Tamil Nadu',
          content: 'The specialized categories on Duuty made all the difference for me. As a mess cook with 15 years of experience, I found a perfect match at a corporate cafeteria that appreciated my ability to prepare nutritious meals at scale.',
          avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
      },
      {
          id: 14,
          name: 'Geetha Rajendran',
          location: 'Hosur, Tamil Nadu',
          content: 'After relocating to Hosur, I was worried about finding a position that accommodated my family schedule. Duuty\'s filter for flexible hours helped me find a breakfast chef position at a popular hotel, allowing me to be home when my children return from school.',
          avatar: 'https://randomuser.me/api/portraits/women/52.jpg',
      },
      {
          id: 15,
          name: 'Surya Narayanan',
          location: 'Nagercoil, Tamil Nadu',
          content: 'The direct messaging feature on Duuty eliminated the usual delays in the hiring process. I could clarify my questions about the position, and the restaurant manager could view my certificates immediately. I was hired within days of applying!',
          avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      },
      {
          id: 16,
          name: 'Kavitha Suresh',
          location: 'Thoothukudi, Tamil Nadu',
          content: 'As a chef specializing in seafood, Duuty matched me with a coastal restaurant that needed my exact skills. The platform understood the nuances of culinary specializations that other job sites missed completely.',
          avatar: 'https://randomuser.me/api/portraits/women/38.jpg',
      },
      {
          id: 17,
          name: 'Prakash Ravi',
          location: 'Dindigul, Tamil Nadu',
          content: 'The salary transparency on Duuty was a game-changer. After years of being underpaid, I found a position that valued my experience as a biryani specialist. The platform even helped negotiate my compensation package!',
          avatar: 'https://randomuser.me/api/portraits/men/82.jpg',
      },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="testimonials" className="testimonial-section py-[50px] sm:py-[70px] md:py-[100px]">
        <div className="container-wrapper mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 w-full">
                    <div className='testimonial-head text-[18px] font-semibold text-(--secondary-text-color) text-center lg:text-left'>Testimonials</div>
                    <h2 className='text-[28px] lg:text-[34px] xl:text-[50px] font-[AvenirNextBold] text-(--primary-text-color) mb-[35px] lg:mb-[70px] lg:max-w-[350px] text-center lg:text-left'>What users say about Us.</h2>
                    <div className="space-x-2 hidden lg:flex">
                    {testimonials.map((_, index) => (
                        <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-3 w-3 rounded-full cursor-pointer ${currentIndex === index ? 'bg-[#39425D]' : 'bg-[#E5E5E5]'}`}
                        aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                    </div>
                </div>

                <div className="max-w-[90%] sm:max-w-[100%] lg:w-1/2 lg:px-6 lg:mt-0">
                    <div className='testimonial-details lg:text-left text-center  bg-white max-w-[620px] rounded-[10px] p-[20px] sm:p-[30px] shadow-[0px_0px_12px_2px_var(--testimonial-border)]'>
                        <p className="testimonial-quotes max-w-lg text-gray-500 dark:text-gray-400 text-[16px] leading-[32px]">
                            “{testimonials[currentIndex].content}”
                        </p>

                        <img className="h-[54px] w-[54px] mt-[24px] mb-[14px] rounded-full mx-auto lg:mx-0 object-cover" src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} />
                        <p className="text-[var(--testimonial-text-color)] font-medium customer-name text-[18px]">{testimonials[currentIndex].name}</p>
                        <p className="text-sm text-gray-500 mt-[5px]">{testimonials[currentIndex].location}</p>
                    </div>

                    <div className="flex items-center justify-between mt-6 md:mt-12 justify-center lg:justify-start">
                        <button onClick={prevTestimonial} aria-label="Previous testimonial" title="left arrow" className="p-2 text-[#E6E6F3] transition-colors duration-300 border rounded-full cursor-pointer rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#14183E" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button onClick={nextTestimonial} aria-label="Next testimonial" title="right arrow" className="p-2 text-[#E6E6F3] transition-colors duration-300 border rounded-full cursor-pointer rtl:-scale-x-100 dark:border-[#E6E6F3] dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100 prev-btn ml-[15px]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#14183E" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </section>
  );
};

export default TestimonialSection;