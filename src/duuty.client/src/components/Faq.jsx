import FaqImg from "../assets/faq-img.png";
import { FAQS } from "../Constants";

const Faq = () => {
    return (
        <div className="container-wrapper flex justify-center flex-col-reverse px-[20px] lg:px-[0px] lg:flex-row lg:justify-between items-center lg:items-start relative gap-[80px]">
            <div className="hidden lg:block w-full lg:w-1/2 lg:sticky lg:top-[90px] max-w-[90%] sm:max-w-[500px] lg:max-w-[100%]">
                <div className="faq-img-container relative">
                    <img className="rounded-[20px] relative w-full" src={FaqImg} alt="Frequently Asked Questions" />
                    <svg className="faq-plus-patten absolute bottom-[-100px] hidden md:block md:left-[-20px] left-[-30px] z-[-1]" xmlns="http://www.w3.org/2000/svg" width="153" height="166" viewBox="0 0 153 166" fill="none">
                        <path d="M141.441 152.61V154.479H152.162V152.61H141.441ZM145.803 148.045V159.432H147.79V148.045H145.803Z" fill="#6246E5" />
                        <path d="M106.441 117.61V119.479H117.162V117.61H106.441ZM110.803 113.045V124.432H112.79V113.045H110.803Z" fill="#6246E5" />
                        <path d="M106.441 152.61V154.479H117.162V152.61H106.441ZM110.803 148.045V159.432H112.79V148.045H110.803Z" fill="#6246E5" />
                        <path d="M71.4414 12.6104V14.4795H82.1621V12.6104H71.4414ZM75.8027 8.04492V19.4316H77.79V8.04492H75.8027Z" fill="#6246E5" />
                        <path d="M71.4414 47.6104V49.4795H82.1621V47.6104H71.4414ZM75.8027 43.0449V54.4316H77.79V43.0449H75.8027Z" fill="#6246E5" />
                        <path d="M71.4414 82.6104V84.4795H82.1621V82.6104H71.4414ZM75.8027 78.0449V89.4316H77.79V78.0449H75.8027Z" fill="#6246E5" />
                        <path d="M71.4414 117.61V119.479H82.1621V117.61H71.4414ZM75.8027 113.045V124.432H77.79V113.045H75.8027Z" fill="#6246E5" />
                        <path d="M71.4414 152.61V154.479H82.1621V152.61H71.4414ZM75.8027 148.045V159.432H77.79V148.045H75.8027Z" fill="#6246E5" />
                        <path d="M36.4414 12.6104V14.4795H47.1621V12.6104H36.4414ZM40.8027 8.04492V19.4316H42.79V8.04492H40.8027Z" fill="#6246E5" />
                        <path d="M36.4414 47.6104V49.4795H47.1621V47.6104H36.4414ZM40.8027 43.0449V54.4316H42.79V43.0449H40.8027Z" fill="#6246E5" />
                        <path d="M36.4414 82.6104V84.4795H47.1621V82.6104H36.4414ZM40.8027 78.0449V89.4316H42.79V78.0449H40.8027Z" fill="#6246E5" />
                        <path d="M36.4414 117.61V119.479H47.1621V117.61H36.4414ZM40.8027 113.045V124.432H42.79V113.045H40.8027Z" fill="#6246E5" />
                        <path d="M36.4414 152.61V154.479H47.1621V152.61H36.4414ZM40.8027 148.045V159.432H42.79V148.045H40.8027Z" fill="#6246E5" />
                        <path d="M1.44141 12.6104V14.4795H12.1621V12.6104H1.44141ZM5.80273 8.04492V19.4316H7.79004V8.04492H5.80273Z" fill="#6246E5" />
                        <path d="M1.44141 47.6104V49.4795H12.1621V47.6104H1.44141ZM5.80273 43.0449V54.4316H7.79004V43.0449H5.80273Z" fill="#6246E5" />
                        <path d="M1.44141 82.6104V84.4795H12.1621V82.6104H1.44141ZM5.80273 78.0449V89.4316H7.79004V78.0449H5.80273Z" fill="#6246E5" />
                        <path d="M1.44141 117.61V119.479H12.1621V117.61H1.44141ZM5.80273 113.045V124.432H7.79004V113.045H5.80273Z" fill="#6246E5" />
                        <path d="M1.44141 152.61V154.479H12.1621V152.61H1.44141ZM5.80273 148.045V159.432H7.79004V148.045H5.80273Z" fill="#6246E5" />
                    </svg>
                </div>
            </div>
            <div className="-my-4 w-full lg:w-1/2  flex flex-col faq-right-content divide-y-2 lg:divide-y-4 divide-[#D7DEF0] max-w-[700px] lg:max-w-[570px]">
                <h2 className="text-[28px] lg:text-[34px] xl:text-[40px] font-[AvenirNextBold] pb-8">Frequently Asked Questions</h2>

                {FAQS.map(({ question, answer }, index) => (
                    <details key={index} className="group py-4 lg:py-8 [&_summary::-webkit-details-marker]:hidden" open={index === 0}>
                        <summary className="flex items-center justify-between gap-1.5 text-black cursor-pointer">
                            <h5 className="text-[18px] font-semibold font-[AvenirNextMedium]">{question}</h5>
                            <svg className="shrink-0 transition-transform duration-300 group-open:-rotate-43" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.54534 12.5674H11.1408V17.1628C11.1408 17.6299 11.525 18.0216 11.9996 18.0216C12.4742 18.0216 12.8584 17.6299 12.8584 17.1628V12.5674H17.4538C17.9209 12.5674 18.3126 12.1832 18.3126 11.7086C18.3126 11.234 17.9209 10.8497 17.4538 10.8497H12.8584V6.25432C12.8584 5.78725 12.4742 5.39551 11.9996 5.39551C11.525 5.39551 11.1408 5.78725 11.1408 6.25432V10.8497H6.54534C6.07826 10.8497 5.68652 11.234 5.68652 11.7086C5.68652 12.1832 6.07826 12.5674 6.54534 12.5674Z" fill="#3E2E4D" />
                            </svg>
                        </summary>
                        <p className="pt-4 font-normal sm:text-[18px] text-[16px] text-[var(--faq-text-color)]">{answer}</p>
                    </details>
                ))}
            </div>
        </div>
    );
};

export default Faq;