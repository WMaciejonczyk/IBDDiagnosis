import {useResult} from "../context/ResultContext";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useActiveSection} from "../context/ActiveSectionContext";
import {useResultWindow} from "../context/ResultWindowContext";

const TermsOfUse = () => {

    const [activeTab, setActiveTab] = useState('instruction');
    const {setResult} = useResult();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {setActiveSection} = useActiveSection();
    const {setShowResultWindow} = useResultWindow();

    setShowResultWindow(false);

    setResult("")

    const handleActiveSection = (section: string) => {
        setActiveSection(section)
        navigate("/" + section);
    }

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className="flex flex-col bg-grayish-blue min-h-screen">
            <div className="flex justify-center items-center">
                <div className="bg-white my-10 shadow-lg rounded-lg p-8 max-w-2xl">
                    <div className="flex border-b justify-center items-center">
                        <button
                            onClick={() => handleTabClick('instruction')}
                            className={`py-2 px-4 text-lg font-medium ${activeTab === 'instruction' ? 'border-b-4 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                        >
                            {t("guide")}
                        </button>
                        <button
                            onClick={() => handleTabClick('regulations')}
                            className={`py-2 px-4 text-lg font-medium ${activeTab === 'regulations' ? 'border-b-4 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                        >
                            {t("regulations")}
                        </button>
                    </div>

                    <div className="mt-6 text-justify" style={{ whiteSpace: 'pre-line' }}>
                        {activeTab === 'instruction' ? (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">{t("tou1")}</h3>
                                <p className="mb-4">{t("tou2")}</p>

                                <ol className="list-decimal pl-5 space-y-2 text-justify">
                                    <li>
                                        <strong>{t("tou3")}</strong>
                                        <p>{t("tou4")}</p>
                                        <ul className="list-disc pl-5">
                                            <li>{t("UC")}</li>
                                            <li>{t("CD")}</li>
                                        </ul>
                                        <p>{t("tou5")}</p>
                                    </li>
                                    <li>
                                        <strong>{t("tou6")}</strong>
                                        <p>{t("tou7")}</p>
                                    </li>
                                    <li>
                                        <strong>{t("tou8")}</strong>
                                        <p>{t("tou9")}</p>
                                    </li>
                                    <li>
                                        <strong>{t("tou10")}</strong>
                                        <p>{t("tou11")}</p>
                                        <ul className="list-disc pl-5">
                                            <li>{t("tou12")}</li>
                                            <li>{t("tou13")}</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong>{t("tou14")}</strong>
                                        <p>{t("tou15")}</p>
                                        <ul className="list-disc pl-5">
                                            <li>{t("tou16")}</li>
                                            <li>{t("tou17")}</li>
                                        </ul>
                                    </li>
                                </ol>

                                <h4 className="font-semibold mt-6 text-justify">{t("tou18")}</h4>
                                <ul className="list-disc pl-5 space-y-2 text-justify">
                                    <li>{t("tou19")}</li>
                                    <li>{t("tou20")}</li>
                                </ul>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">
                                    {t("regulations1")}
                                </h3>
                                <p className="mb-4">
                                    {t("regulations2")}
                                </p>
                                <ol className="list-decimal pl-5 space-y-2 text-justify">
                                    <li>
                                        <strong>{t("regulations3")}</strong>
                                        <p>
                                            {t("regulations4")}
                                        </p>
                                    </li>
                                    <li>
                                        <strong>{t("regulations5")}</strong>
                                        <p>
                                            {t("regulations6")}
                                        </p>
                                    </li>
                                    <li>
                                        <strong>{t("regulations7")}</strong>
                                        <p>
                                            {t("regulations8")}
                                        </p>
                                    </li>
                                    <li>
                                        <strong>{t("regulations9")}</strong>
                                        <p>
                                            {t("regulations10")}
                                        </p>
                                    </li>
                                    <li>
                                        <strong>{t("regulations11")}</strong>
                                        <p>
                                            {t("regulations12")}
                                        </p>
                                    </li>
                                    <li>
                                        <strong>{t("regulations13")}</strong>
                                        <p>
                                            {t("regulations14")}
                                        </p>
                                    </li>
                                    <li>
                                        <strong>{t("regulations15")}</strong>
                                        <p>
                                            {t("regulations16")}
                                        </p>
                                    </li>
                                    <li>
                                        <strong>{t("regulations17")}</strong>
                                        <p>
                                            {t("regulations18")}
                                            <button
                                                onClick={() => handleActiveSection("contact")}
                                                className="text-blue-500 underline hover:text-blue-700"
                                            >
                                                {t("regulations17")}
                                            </button>
                                            {t("regulations19")}
                                            <span>
                                                {/*wprowadzić docelowego e-maila*/}
                                            </span>
                                            .
                                        </p>
                                    </li>
                                </ol>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default TermsOfUse;
