import Ramana from "../assets/ramana.jpg";
import PaatiVeedu from "../assets/paati-veedu.jpg";
import Khalidas from "../assets/khalidas.jpg";
import Manjal from "../assets/manjal.jpg";
import Nalams from "../assets/nalams.jpg";
import PandiNadu from "../assets/pandi-nadu.jpg";

const logos = [Ramana, PaatiVeedu, Khalidas, Manjal, Nalams, PandiNadu];

const TrustedCompanies = () => {
    return (
        <div id="trusted-companies" className="trusted-brands-wrapper lg:pt-[70px] lg:pb-[70px] overflow-hidden">
            <div className="container-wrapper">
                <h2 className="text-[28px] lg:text-[34px] xl:text-[40px] font-[AvenirNextBold] text-center">
                    Trusted by 25+ Restaurants
                </h2>
                <div className="mt-[50px] relative overflow-hidden">
                    <div className="flex items-center gap-x-[50px] lg:gap-x-[60px] xl:gap-x-[75px] 2xl:gap-x-[100px] animate-scroll whitespace-nowrap w-max">
                        {logos.map((logo, index) => (
                            <img key={`original-${index}`} className="h-[100px]" src={logo} alt={`Company Logo ${index + 1}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrustedCompanies;
