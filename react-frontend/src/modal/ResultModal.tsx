import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {ArrowDownTrayIcon} from "@heroicons/react/24/outline";
import autoTable from "jspdf-autotable";
import {callAddNormalFont} from "../fonts/comme.normal";
import {callAddBoldFont} from "../fonts/comme.bold";
import {callAddRegularFont} from "../fonts/comme.regular";

interface ResultModalProps {
    isOpen: boolean
    result: string
    formData: any;
}

const ResultModal: React.FC<ResultModalProps> = ({
                                                             isOpen,
                                                             result,
                                                             formData
                                                         }) => {

    const {t} = useTranslation();
    const modalRef = useRef<HTMLDivElement>(null)
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
    };

    useEffect(() => {
        if (isOpen) {
            modalRef.current?.scrollIntoView({ behavior: "smooth"});
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div ref={modalRef} className="bg-white mb-8 shadow-lg rounded-lg p-8 w-[32.5%] max-w-2xl mx-auto text-center flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('result')}</h2>
            <p className={`text-lg`}>
                {result === 'positive' ? t('positive') : t('negative')}
            </p>
            <button
                onClick={() => {
                    handleClick()
                    generatePDF(result, formData, t)
                    }}
                className={`mt-6 bg-blue-500 text-white py-2 px-4 rounded-md flex items-center justify-center transform transition duration-200
                            ${isClicked ? "scale-90" : "hover:bg-blue-600 hover:scale-105"} 
                            ${!isClicked && "hover:transition duration-200"}`}
            >
                {t('generateReport')}
                <ArrowDownTrayIcon className="h-5 w-5 ml-2"/>
            </button>
        </div>
    )
}

const generatePDF = (result: string, formData: any, t: any) => {
    let { jsPDF } = require("jspdf");
    jsPDF.API.events.push(['addFonts', callAddNormalFont])
    jsPDF.API.events.push(['addFonts', callAddBoldFont])
    jsPDF.API.events.push(['addFonts', callAddRegularFont])

    // Create a new jsPDF instance
    let doc = new jsPDF();

    // Center alignment helper
    const xOffset = doc.internal.pageSize.width / 2;

    doc.setFontSize(18);
    doc.setFont("Comme-Bold", "bold");
    doc.text(t("reportTitle"), xOffset, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont("Comme-Bold", "bold");
    doc.text(t("reportDisease"), xOffset, 30, { align: 'center' });
    doc.setFont("Comme-Regular", "normal");
    doc.text(`${formData?.disease === "Crohn's Disease" ? t("CD") : t("UC")}`, xOffset, 40, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont("Comme-Bold", "bold");
    doc.text(t("reportResult"), xOffset, 50, { align: 'center' });
    doc.setFont("Comme-Regular", "normal");
    doc.text(`${result === "positive" ? t("positive") : t("negative")}`, xOffset, 60, { align: 'center' });

    const tableColumns = [
        t("parameter"), t("value"), t("unit"),
    ];

    console.log(Object.keys(formData));
    const tableBody: (any[]) = Object.keys(formData).map((key) => {
        if (key !== "disease") {
            if ((key === "HBE" || key === "Parasites in the stool") && Number(formData[key]) === 0) {
                return [t(key), t("negative"), "-"];
            } else if ((key === "HBE" || key === "Parasites in the stool") && Number(formData[key]) === 1) {
                return [t(key), t("positive"), "-"];
            } else if (formData["disease"] === "Crohn's Disease" && key === "Gender" && Number(formData[key]) === 1) {
                return [t(key), t("female"), "-"];
            } else if (formData["disease"] === "Crohn's Disease" && key === "Gender" && Number(formData[key]) === 2) {
                return [t(key), t("male"), "-"];
            } else if (formData["disease"] === "Ulcerative Colitis" && key === "Gender" && Number(formData[key]) === 0) {
                return [t(key), t("female"), "-"];
            } else if (formData["disease"] === "Ulcerative Colitis" && key === "Gender" && Number(formData[key]) === 1) {
                return [t(key), t("male"), "-"];
            } else if (key === "Bacteries in urine") {
                return [t(key), t(`BacteriesUnit${formData[key]}`), "-"];
            }
            return [t(key), formData[key].toString(), t(key + "Unit")];
        }
        return null;
    }).filter(row => row !== null);

    autoTable(doc, {
        head: [tableColumns],
        body: tableBody,
        startY: 70,
        styles: { font: "Comme-Regular", fontStyle: "normal", fontSize: 11 },
        tableWidth: 'auto',
        // margin: {left: margin, right: margin}
    });

    doc.setFont("Comme-Regular", "normal");
    doc.text(
        t("reportModel"),
        14, doc.internal.pageSize.height - 70, { maxWidth: doc.internal.pageSize.width - 30, align: 'justify' }
    );

    doc.setFontSize(10);
    doc.text(
        t("reportDisclaimer"),
        14, doc.internal.pageSize.height - 30, { maxWidth: doc.internal.pageSize.width - 30, align: 'justify' }
    );

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(t("reportGenerated"), 14, doc.internal.pageSize.height - 10);

    doc.save("IBD_Report.pdf");
};

export default ResultModal