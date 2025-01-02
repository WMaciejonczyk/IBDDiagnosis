import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import UlcerativeColitisForm from "./UlcerativeColitisForm";
import CrohnDiseaseForm from "./CrohnDiseaseForm";
import {useResult} from "../context/ResultContext";
import ResultModal from "../modal/ResultModal";
import {useResultWindow} from "../context/ResultWindowContext";


function DiagnosticModel() {
    const [disease, setDisease] = useState("");
    const [formData, setFormData] = useState(null);
    const {result} = useResult()
    const {showResultWindow, setShowResultWindow} = useResultWindow()
    const {t} = useTranslation();

    useEffect(() => {
        if (disease) {
            setShowResultWindow(false);
        }
    }, [disease, setShowResultWindow]);

    const handleFormSubmit = (data: any) => {
        setFormData(data);
    };

    return (
        <div className="flex flex-col bg-grayish-blue min-h-screen">
            <div className="flex-grow flex justify-center items-center">
                <div className="bg-white my-10 shadow-lg rounded-lg p-8 w-[32.5%] max-w-2xl">
                    <h1 className="text-2xl font-bold text-center mb-6">{t('ibdCalculator')}</h1>
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">
                            {t('likelihood')}
                        </p>
                        <div>
                            {/* Disease Selection */}
                            <div className="mb-6">
                                <label className="block p-1 text-left font-medium text-gray-700">
                                    {t('select')}
                                </label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={disease}
                                    onChange={(e) => setDisease(e.target.value)}
                                >
                                    <option value="" disabled>
                                        {t('choose')}
                                    </option>
                                    <option value="ulcerative-colitis">{t('UC')}</option>
                                    <option value="crohns-disease">{t('CD')}</option>
                                </select>
                            </div>
                            {disease === "ulcerative-colitis" && <UlcerativeColitisForm onSubmit={handleFormSubmit}/>}
                            {disease === "crohns-disease" && <CrohnDiseaseForm onSubmit={handleFormSubmit}/>}
                        </div>
                    </div>
                </div>
            </div>
            <ResultModal
                isOpen={showResultWindow}
                result={result}
                formData={formData}
            />
        </div>
    );
}
export default DiagnosticModel;
