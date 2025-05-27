import RegisterImg from "../assets/register-img.png";
import HotelImg from "../assets/world-of-opportunities.jpg";
import PayImg from "../assets/dream-job.jpg";

const Benefits = () => {
    return <div id="benefits" className="employee-benifits-section relative">
        <svg className="hidden sm:block absolute right-[0px] top-[0px]" width="94" height="177" viewBox="0 0 94 177" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="83" cy="23" r="78" stroke="#232962" strokeWidth="10" />
            <circle cx="104" cy="94" r="78" stroke="#232962" strokeWidth="10" />
        </svg>
        <div className="top-employee-benifits text-center sm:py-[50px] px-[20px] py-[25px] bg-[var(--employee-bg)]">
            <h3 className="text-white text-[28px] sm:text-[32px] font-[AvenirNextMedium]">Your path to the perfect kitchen role</h3>
            <p className="mt-[10px] max-w-[calc(100%-100px)] m-auto text-[var(--employee-para-color)]">Discover the Culinary Career You Deserve. Your Dream Kitchen Job Awaits.</p>
        </div>
        <div className="benifits-wrapper sm:pr-[30px] pr-[20px] sm:pb-[90px] sm:pl-[80px] pl-[20px] relative before:content-[''] before:absolute before:left-0 before:top-[-40px] sm:before:top-0  before:w-full before:h-[150px] sm:before:h-[100px] before:bg-(--employee-bg) bg-[var(--benefit-bg)]">
            <div className="container-wrapper">
                <div className="benifits-list flex relative sm:pt-[40px] pt-[60px] sm:pr-[40px] pr-[20px] sm:pb-[40px] pb-[25px] md:pl-[110px] sm:pl-[85px] pl-[20px] w-[750px] max-w-full rounded-[35px] bg-white mt-[40px] sm:mt-[unset] border-[1px] border-[var(--benefit-card-border)]">
                    <div className="list-count shadow-[inset_0px_0px_0px_12px_var(--neutral-white)] text-[28px] sm:text-[46px] font-medium rounded-full w-[80px] h-[80px] sm:w-[123px] sm:h-[123px] flex items-center justify-center absolute sm:left-[-55px] sm:right-[unset] left-0 right-0 m-auto top-[-40px] sm:top-[unset] text-[var(--benefit-list-color)] bg-[var(--benefit-list-bg)] border-[1px] border-[var(--benefit-list-border)]">01</div>
                    <div className="benifits-content flex flex-col sm:flex-row items-center gap-[25px]">
                        <img className="sm:size-[124px] size-100 max-w-[160px] max-h-[160px] sm:max-w-[100%] sm:max-w-[100%]" src={RegisterImg} alt="Register your role" />
                        <div className="max-w-[100%] text-center sm:text-left sm:max-w-[340px]">
                            <h4 className="text-[20px] sm:text-[22px] lg:text-[26px] font-[AvenirNextBold] mb-2.5">Create your profile</h4>
                            <p>Easy profile creation with minimal information.</p>
                        </div>

                    </div>
                </div>
                <div className="benifits-list flex relative sm:pt-[40px] pt-[60px] sm:pr-[40px] pr-[20px] sm:pb-[40px] pb-[25px] md:pl-[110px] sm:pl-[85px] pl-[20px] w-[750px] max-w-full rounded-[35px] bg-white sm:mt-[40px] sm:mb-[40px] mt-[60px] mb-[60px] ml-auto before:content-[''] before:absolute lg:before:left-0 before:top-0 before:z-1 before:rounded-[35px] before:w-[70px] before:h-full before:bg-white md:before:left-[50px] before:hidden md:before:block border-[1px] border-[var(--benefit-card-border)]">
                    <svg className="hidden md:block absolute top-[-43px] lg:left-[-24px] md:left-[50px] z-0" width="52" height="290" viewBox="0 0 52 290" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1C10.5 12.3333 31.3 40 38.5 60C47.5 85 70 217 14.5 289.5" stroke="#B7B0FF" strokeDasharray="4 4" />
                    </svg>
                    <div className="list-count shadow-[inset_0px_0px_0px_12px_var(--neutral-white)] text-[28px] sm:text-[46px] font-medium rounded-full w-[80px] h-[80px] sm:w-[123px] sm:h-[123px] flex items-center justify-center absolute sm:left-[-55px] sm:right-[unset] left-0 right-0 m-auto top-[-40px] sm:top-[unset] z-1 text-[var(--benefit-list-color)] bg-[var(--benefit-list-bg)] border-[1px] border-[var(--benefit-list-border)]">02</div>
                    <div className="benifits-content flex flex-col sm:flex-row items-center gap-[25px] relative z-1">
                        <img className="sm:size-[124px] size-100 max-w-[160px] max-h-[160px] sm:max-w-[100%] sm:max-w-[100%] rounded-2xl" src={HotelImg} alt="Find your dream hotel" />
                        <div className="max-w-[100%] text-center sm:text-left sm:max-w-[340px]">
                            <h4 className="text-[20px] sm:text-[22px] lg:text-[26px] font-[AvenirNextBold] mb-2.5">Explore a World of Opportunities</h4>
                            <p>Access thousands of kitchen jobs and connect directly with top employers.</p>
                        </div>

                    </div>
                </div>
                <div className="benifits-list flex relative sm:pt-[40px] pt-[60px] sm:pr-[40px] pr-[20px] sm:pb-[40px] pb-[25px] md:pl-[110px] sm:pl-[85px] pl-[20px] w-[750px] max-w-full rounded-[35px] bg-white border-[1px] border-[var(--benefit-card-border)]">
                    <div className="list-count shadow-[inset_0px_0px_0px_12px_var(--neutral-white)] text-[28px] sm:text-[46px] font-medium rounded-full w-[80px] h-[80px] sm:w-[123px] sm:h-[123px] flex items-center justify-center absolute sm:left-[-55px] sm:right-[unset] left-0 right-0 m-auto top-[-40px] sm:top-[unset] text-[var(--benefit-list-color)] bg-[var(--benefit-list-bg)] border-[1px] border-[var(--benefit-list-border)]">03</div>
                    <div className="benifits-content flex flex-col sm:flex-row items-center gap-[25px] gap-[25px]">
                        <img className="sm:size-[124px] size-100 max-w-[160px] max-h-[160px] sm:max-w-[100%] sm:max-w-[100%] rounded-2xl" src={PayImg} alt="Get Good Pay" />
                        <div className="max-w-[100%] text-center sm:text-left sm:max-w-[340px]">
                            <h4 className="text-[20px] sm:text-[22px] lg:text-[26px] font-[AvenirNextBold] mb-2.5">Land Your Dream Job</h4>
                            <p>Receive real-time alerts tailored to your profile and apply with confidence.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default Benefits;
