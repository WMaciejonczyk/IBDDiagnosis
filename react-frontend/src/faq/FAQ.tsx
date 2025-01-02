import React, { useState } from "react";
import {useResult} from "../context/ResultContext";
import {useNavigate} from "react-router-dom";
import {useActiveSection} from "../context/ActiveSectionContext";
import {useTranslation} from "react-i18next";
import {useResultWindow} from "../context/ResultWindowContext";

const FAQ = () => {
    const [expanded, setExpanded] = useState<string | null>(null);
    const {setResult} = useResult();
    const navigate = useNavigate();
    const {setActiveSection} = useActiveSection();
    const [isClicked, setIsClicked] = useState(false);
    const {t} = useTranslation()
    const {setShowResultWindow} = useResultWindow();

    setShowResultWindow(false);


    setResult("")

    const handleButton = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
        setActiveSection("contact")
        navigate("/contact")
    }

    const handleActiveSection = (section: string) => {
        setActiveSection(section)
        navigate("/" + section);
    }

    const toggleExpand = (id: string) => {
        setExpanded((prev) => (prev === id ? null : id));
    };

    const faqs = [
        { id: "1", question: t("faqQ1"), answer: t("faqA1") },
        { id: "2", question: t("faqQ2"), answer: t("faqA2") },
        { id: "3", question: t("faqQ3"), answer: (
                <p>
                    {t("faqA3.1")}
                    <button
                        onClick={() => handleActiveSection("ibd-overview")}
                        className="text-blue-500 underline hover:text-blue-700"
                    >
                        {t("faqIBDOverview")}
                    </button>
                    {t("faqA3.2")}
                </p>
            ),
        },
        {
            id: "4", question: t("faqQ4"), answer: (
                <p>
                    {t("faqA4.1")}
                    <button
                        onClick={() => handleActiveSection("contact")}
                        className="text-blue-500 underline hover:text-blue-700"
                    >
                        {t("faqContact")}
                    </button>
                    {t("faqA4.2")}
                </p>
            ),
        },
        {id: "5", question: t("faqQ5"), answer: t("faqA5")},
    ];

    return (
        <div className="p-8 bg-grayish-blue min-h-screen">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">{t("faq1")}</h2>
            <div className="space-y-4 bg-grayish-blue">
                {faqs.map((faq) => (
                    <div
                        key={faq.id}
                    >
                        <button
            onClick={() => toggleExpand(faq.id)}
            className={`w-full text-left ${expanded ? "rounded-t-lg" : "rounded-lg"} p-4 bg-blue-500 hover:bg-blue-600 flex justify-between items-center`}
            >
            <span className="text-white font-medium">{faq.question}</span>
            <span className="text-white text-xl">{expanded === faq.id ? "-" : "+"}</span>
            </button>
            {expanded === faq.id && (
                <div className="p-4 rounded-b-lg shadow-lg border-b-2 border-x-2 border-blue-500 text-gray-600">
                    {faq.answer}
                    </div>
            )}
    </div>
))}
    </div>
    <div className="mt-12 text-center">
    <p className="text-gray-700">{t("faq2")}</p>
        <button
            onClick={handleButton}
            className={`mt-4 px-6 py-2 bg-blue-500 text-white rounded-md transform transition duration-200 
                                        ${isClicked ? "scale-90" : "hover:bg-blue-600 hover:scale-105"} 
                                        ${!isClicked && "hover:transition duration-200"}`}>
            {t("faq3")}
    </button>
    </div>
    </div>
);
}

export default FAQ;
