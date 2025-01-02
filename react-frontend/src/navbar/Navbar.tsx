import {ReactNode} from "react";
import { useTranslation } from 'react-i18next';
import i18n from "../i18n";
import { Gb, Pl } from 'react-flags-select';
import {useNavigate} from "react-router-dom";
import {useActiveSection} from "../context/ActiveSectionContext";

interface NavbarProps {
    children?: ReactNode;
}

function Navbar({ children }: NavbarProps) {

    const {section, setActiveSection} = useActiveSection();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSectionClick = (section: string) => {
        setActiveSection(section);
        navigate("/" + section);
    }

    return (
        <div
            className={`relative top-0 flex z-30 h-20 w-full flex-row items-center bg-soft-blue shadow-[0px_0px_10px_3px_rgba(0,0,0,0.4)] px-8`}
        >
            <div className="text-2xl font-bold text-white">
                {t('ibdDiagnosis')}
            </div>

            <div className="text-white flex-1 flex justify-center space-x-16">
                <button
                    className={`text-white hover:text-muted-navy transition-all ${section === "diagnostic-model" ? `underline` : ''}`}
                    onClick={() => handleSectionClick("diagnostic-model")}
                >
                    {t("diagnosticModel")}
                </button>
                <button
                    className={`text-white hover:text-muted-navy transition-all ${section === "ibd-overview" ? `underline` : ''}`}
                    onClick={() => handleSectionClick("ibd-overview")}
                >
                    {t("ibdOverview")}
                </button>
                <button
                    className={`text-white hover:text-muted-navy transition-all ${section === "FAQ" ? `underline` : ''}`}
                    onClick={() => handleSectionClick("FAQ")}
                >
                    {t("FAQ")}
                </button>
                <button
                    className={`text-white hover:text-muted-navy transition-all ${section === "terms-of-use" ? `underline` : ''}`}
                    onClick={() => handleSectionClick("terms-of-use")}
                >
                    {t("termsOfUse")}
                </button>
                <button
                    className={`text-white hover:text-muted-navy transition-all ${section === "contact" ? `underline` : ''}`}
                    onClick={() => handleSectionClick("contact")}
                >
                    {t("contact")}
                </button>
            </div>

            <div className="flex space-x-4">
                <button
                    className="px-2 py-1 rounded-md hover:bg-gray-50 transition-all"
                    onClick={() => i18n.changeLanguage('pl')}
                >
                    <Pl />
                </button>
                <button
                    className="px-2 py-1 rounded-md hover:bg-gray-50 transition-all"
                    onClick={() => i18n.changeLanguage('en')}
                >
                    <Gb />
                </button>
            </div>
        </div>
    );
}

export default Navbar