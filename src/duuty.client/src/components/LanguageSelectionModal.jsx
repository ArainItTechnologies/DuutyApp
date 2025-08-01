import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { supportedLanguages } from "../translations/SupportedLanguages";
import { useTranslation } from "../translations/TranslationHook";

const LanguageSelectionModal = ({ isOpen, setIsOpen }) => {
    const { setLanguage } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setLanguage(language.code);
        setTimeout(() => {
            setIsOpen(false);
        }, 500);
    };

    const handleSkip = () => {
        setIsOpen(false);
    };

    if (!isOpen) {
        return <div />;
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-transparent bg-opacity-80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                    <div className="flex items-center justify-center mb-2">
                        <Globe className="w-8 h-8 mr-3" />
                        <h2 className="text-2xl font-bold">Select Language</h2>
                    </div>
                    <p className="text-blue-100 text-center text-sm">
                        Choose your preferred language to continue
                    </p>
                </div>

                {/* Language Grid */}
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-3">
                        {supportedLanguages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => {
                                    if (selectedLanguage?.code !== language.code) {
                                        handleLanguageSelect(language);
                                    } else {
                                        setIsOpen(false); // Just close if it's already selected
                                    }
                                }}
                                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${selectedLanguage?.code === language.code
                                    ? 'border-blue-500 bg-blue-50 text-blue-700 transform scale-105'
                                    : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="font-medium text-left">{language.name}</span>
                                {selectedLanguage?.code === language.code && (
                                    <Check className="w-5 h-5 text-blue-600" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4">
                    <button
                        onClick={handleSkip}
                        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                    >
                        Skip for now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelectionModal;