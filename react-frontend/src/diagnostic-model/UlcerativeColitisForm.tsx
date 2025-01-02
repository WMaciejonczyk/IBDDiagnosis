import axios from "axios";
import {Field, Form, Formik} from "formik";
import {useTranslation} from "react-i18next";
import {useResult} from "../context/ResultContext";
import {useResultWindow} from "../context/ResultWindowContext";
import React, {useMemo, useState} from "react";
import * as yup from "yup";

interface UlcerativeColitisFormProps {
    onSubmit: (values: Record<string, any>) => void;
}

const UlcerativeColitisForm: React.FC<UlcerativeColitisFormProps> = ({onSubmit}) => {

    const {t} = useTranslation();
    const {setResult} = useResult()
    const {setShowResultWindow} = useResultWindow()
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
    };
    const handleSubmit = (values: any) => {
        const updatedData = { ...values, disease: "Ulcerative Colitis" };
        onSubmit(updatedData);
        axios
            .post("http://localhost:5000/predict", {
                "disease": "Ulcerative Colitis",
                ...values,
            })
            .then((response) => {
                setResult(response.data);
                setShowResultWindow(false)
                setTimeout(() => setShowResultWindow(true), 10);
            })
            .catch((error) => console.error(error));
    };

    const validationSchema = useMemo(
        () =>
            yup.object().shape({
                "CEA": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("ceaRequired")),
                "Cholesterol": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("cholesterolRequired")),
                "HBE": yup
                    .number()
                    .integer(t("mustBeInteger"))
                    .max(1, t("lessThan1"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("hbeRequired")),
                "Parasites in the stool": yup
                    .number()
                    .integer(t("mustBeInteger"))
                    .max(1, t("lessThan1"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("parasitesInTheStoolRequired")),
                "Calprotectin": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("calprotectinRequired")),
                "Creatinine": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("creatinineRequired")),
                "Glucose in urine": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("glucoseInUrineRequired")),
                "Bacteries in urine": yup
                    .number()
                    .min(0, t("bacteriesError"))
                    .max(5, t("bacteriesError"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("bacteriesInUrineRequired")),
                "Erythrocytes": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("erythrocytesRequired")),
                "Hemoglobin": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("hemoglobinRequired")),
                "MCH": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("mchRequired")),
                "Leucocytes": yup
                    .number()
                    .min(0, t("min0"))
                    .max(100, t("max100"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("leucocytesRequired")),
                "P-LCR": yup
                    .number()
                    .min(0, t("min0"))
                    .max(100, t("max100"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("pLcrRequired")),
                "OB": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("obRequired")),
                "Gender": yup
                    .number()
                    .integer(t("mustBeInteger"))
                    .min(0, t("genderUCError"))
                    .max(1, t("genderUCError"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("genderRequired")),
                "Age": yup
                    .number()
                    .integer(t("mustBeInteger"))
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("ageRequired")),
            }),
        [t],
    );

    return (
        <Formik
            initialValues={{
                "CEA": "",
                "Cholesterol": "",
                "HBE": "",
                "Parasites in the stool": "",
                "Calprotectin": "",
                "Creatinine": "",
                "Glucose in urine": "",
                "Bacteries in urine": "",
                "Erythrocytes": "",
                "Hemoglobin": "",
                "MCH": "",
                "Leucocytes": "",
                "P-LCR": "",
                "OB": "",
                "Gender": "",
                "Age": "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ errors, touched, isValid, dirty }) => (
                <Form className="space-y-4">
                    <div>
                        <label className="block p-1 text-left font-medium text-gray-700">
                            {t('Age') + " [" + t('years') + "]"}
                        </label>
                        <Field
                            name="Age"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Age && touched.Age ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Age && touched.Age && (
                            <p className="text-left text-red-500 text-sm">{errors.Age}</p>
                        )}
                    </div>
                    <div>
                        <label className="block p-1 text-left font-medium text-gray-700">
                            {t('Gender') + "  " + t('MoFUC')}
                        </label>
                        <Field
                            name="Gender"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Gender && touched.Gender ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Gender && touched.Gender && (
                            <p className="text-left text-red-500 text-sm">{errors.Gender}</p>
                        )}
                    </div>
                    <div>
                        <label className="block p-1 text-left font-medium text-gray-700">
                            {t('CEA') + " [ng/mL]"}
                        </label>
                        <Field
                            name="CEA"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.CEA && touched.CEA ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.CEA && touched.CEA && (
                            <p className="text-left text-red-500 text-sm">{errors.CEA}</p>
                        )}
                    </div>
                    <div>
                        <label className="block p-1 text-left font-medium text-gray-700">
                            {t('Cholesterol') + " [mg/dL]"}
                        </label>
                        <Field
                            name="Cholesterol"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Cholesterol && touched.Cholesterol ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Cholesterol && touched.Cholesterol && (
                            <p className="text-left text-red-500 text-sm">{errors.Cholesterol}</p>
                        )}
                    </div>
                    <div>
                        <label className="block p-1 text-left font-medium text-gray-700">
                            {t('HBE') + " (0 - " + t('negative') + "   1 - " + t('positive') + ")"}
                        </label>
                        <Field
                            name="HBE"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.HBE && touched.HBE ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.HBE && touched.HBE && (
                            <p className="text-left text-red-500 text-sm">{errors.HBE}</p>
                        )}
                    </div>
                    <div>
                        <label className="block p-1 text-left font-medium text-gray-700">
                            {t('Parasites in the stool') + " (0 - " + t('negative') + "   1 - " + t('positive') + ")"}
                        </label>
                        <Field
                            name="Parasites in the stool"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors["Parasites in the stool"] && touched["Parasites in the stool"] ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors["Parasites in the stool"] && touched["Parasites in the stool"] && (
                            <p className="text-left text-red-500 text-sm">{errors["Parasites in the stool"]}</p>
                        )}
                    </div>
                    <div>
                        <label className="block p-1 text-left font-medium text-gray-700">
                            {t('Calprotectin') + " [μg/g]"}
                        </label>
                        <Field
                            name="Calprotectin"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Calprotectin && touched.Calprotectin ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Calprotectin && touched.Calprotectin && (
                            <p className="text-left text-red-500 text-sm">{errors.Calprotectin}</p>
                        )}
                    </div>
                    <div>
                        <label className="block p-1 text-left font-medium text-gray-700">
                            {t('Creatinine') + " [mg/dL]"}
                        </label>
                        <Field
                            name="Creatinine"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Creatinine && touched.Creatinine ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Creatinine && touched.Creatinine && (
                            <p className="text-left text-red-500 text-sm">{errors.Creatinine}</p>
                        )}
                    </div>
                    <div>
                        <label className="block p-1 text-left font-medium text-gray-700">
                            {t('Glucose in urine') + " [mg/dL]"}
                        </label>
                        <Field
                            name="Glucose in urine"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors["Glucose in urine"] && touched["Glucose in urine"] ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors["Glucose in urine"] && touched["Glucose in urine"] && (
                            <p className="text-left text-red-500 text-sm">{errors["Glucose in urine"]}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className="block p-1 text-left font-medium text-gray-700">{t('Bacteries in urine')}<br />{t('BacteriesOptions')}</label>
                        <Field
                            name="Bacteries in urine"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors["Bacteries in urine"] && touched["Bacteries in urine"] ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors["Bacteries in urine"] && touched["Bacteries in urine"] && (
                            <p className="text-left text-red-500 text-sm">{errors["Bacteries in urine"]}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className="block p-1 text-left font-medium text-gray-700">{t('Erythrocytes') + " [10⁶/μL]"}</label>
                        <Field
                            name="Erythrocytes"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Erythrocytes && touched.Erythrocytes ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Erythrocytes && touched.Erythrocytes && (
                            <p className="text-left text-red-500 text-sm">{errors.Erythrocytes}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className="block p-1 text-left font-medium text-gray-700">{t('Hemoglobin') + " [g/dL]"}</label>
                        <Field
                            name="Hemoglobin"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Hemoglobin && touched.Hemoglobin ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Hemoglobin && touched.Hemoglobin && (
                            <p className="text-left text-red-500 text-sm">{errors.Hemoglobin}</p>
                        )}
                    </div>
                    <div>
                        <label className="block p-1 text-left font-medium text-gray-700">{t('MCH') + " [pg]"}</label>
                        <Field
                            name="MCH"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.MCH && touched.MCH ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.MCH && touched.MCH && (
                            <p className="text-left text-red-500 text-sm">{errors.MCH}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className="block p-1 text-left font-medium text-gray-700">{t('Leucocytes') + " [%]"}</label>
                        <Field
                            name="Leucocytes"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Leucocytes && touched.Leucocytes ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Leucocytes && touched.Leucocytes && (
                            <p className="text-left text-red-500 text-sm">{errors.Leucocytes}</p>
                        )}
                    </div>
                    <div>
                        <label className="block p-1 text-left font-medium text-gray-700">{t('P-LCR') + " [%]"}</label>
                        <Field
                            name="P-LCR"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors["P-LCR"] && touched["P-LCR"] ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors["P-LCR"] && touched["P-LCR"] && (
                            <p className="text-left text-red-500 text-sm">{errors["P-LCR"]}</p>
                        )}
                    </div>
                    <div>
                        <label className="block p-1 text-left font-medium text-gray-700">{t('OB') + " [mm/h]"}</label>
                        <Field
                            name="OB"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.OB && touched.OB ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.OB && touched.OB && (
                            <p className="text-left text-red-500 text-sm">{errors.OB}</p>
                        )}
                    </div>

                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            disabled={!isValid || !dirty}
                            onClick={handleClick}
                            className={`w-1/3 py-2 px-6 mt-3 rounded-md transform transition duration-200 
                                ${!isValid || !dirty
                                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                : `${isClicked ? "scale-90" : "hover:bg-blue-600 hover:scale-105"} 
                                        ${!isClicked && "hover:transition duration-200"} bg-blue-500 text-white hover:bg-blue-600 hover:scale-105`
                            }`}
                        >
                            {t('calculate')}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default UlcerativeColitisForm;