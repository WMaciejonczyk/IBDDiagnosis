import axios from "axios";
import {Field, Form, Formik} from "formik";
import {useTranslation} from "react-i18next";
import {useResult} from "../context/ResultContext";
import {useResultWindow} from "../context/ResultWindowContext";
import React, {useMemo, useState} from "react";
import * as yup from "yup";

interface CrohnDiseaseFormProps {
    onSubmit: (values: Record<string, any>) => void;
}

const CrohnDiseaseForm: React.FC<CrohnDiseaseFormProps> = ({ onSubmit }) => {

    const {t} = useTranslation();
    const {setResult} = useResult()
    const {setShowResultWindow} = useResultWindow()
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
    };
    const handleSubmit = (values: any) => {
        const updatedData = { ...values, disease: "Crohn's Disease" };
        onSubmit(updatedData);
        axios
            .post("http://localhost:5000/predict", {
                "disease": "Crohn's Disease",
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
                "ASPAT": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("aspatRequired")),
                "Bilirubin": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("bilirubinRequired")),
                "Alkaline phosphatase": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("alkalinePhosphataseRequired")),
                "Basophils": yup
                    .number()
                    .min(0, t("min0"))
                    .max(100, t("max100"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("basophilsRequired")),
                "Erythroblasts": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("erythroblastsRequired")),
                "Erythrocytes": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("erythrocytesRequired")),
                "Hematocrit": yup
                    .number()
                    .min(0, t("min0"))
                    .max(100, t("max100"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("hematocritRequired")),
                "MCH": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("mchRequired")),
                "MCHC": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("mchcRequired")),
                "Monocytes": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("monocytesRequired")),
                "MPV": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("mpvRequired")),
                "Neutrophils": yup
                    .number()
                    .min(0, t("min0"))
                    .max(100, t("max100"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("neutrophilsRequired")),
                "Potassium": yup
                    .number()
                    .min(0, t("moreThan0"))
                    .typeError(t("mustBeNumberType"))
                    .required(t("potassiumRequired")),
                "Gender": yup
                    .number()
                    .integer(t("mustBeInteger"))
                    .min(1, t("genderCDError"))
                    .max(2, t("genderCDError"))
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
                "ASPAT": "",
                "Bilirubin": "",
                "Alkaline phosphatase": "",
                "Basophils": "",
                "Erythroblasts": "",
                "Erythrocytes": "",
                "Hematocrit": "",
                "MCH": "",
                "MCHC": "",
                "Monocytes": "",
                "MPV": "",
                "Neutrophils": "",
                "Potassium": "",
                "Gender": "",
                "Age": "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnChange
            validateOnBlur
        >
            {({ errors, touched, isValid, dirty }) => (
                <Form className="space-y-4">
                    <div>
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
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
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('Gender') + "  " + t('MoFCD')}
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
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('ASPAT') + " [U/L]"}
                        </label>
                        <Field
                            name="ASPAT"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.ASPAT && touched.ASPAT ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.ASPAT && touched.ASPAT && (
                            <p className="text-left text-red-500 text-sm">{errors.ASPAT}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('Bilirubin') + " [mg/dL]"}
                        </label>
                        <Field
                            name="Bilirubin"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Bilirubin && touched.Bilirubin ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Bilirubin && touched.Bilirubin && (
                            <p className="text-left text-red-500 text-sm">{errors.Bilirubin}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('Alkaline phosphatase') + " [U/L]"}
                        </label>
                        <Field
                            name="Alkaline phosphatase"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors['Alkaline phosphatase'] && touched['Alkaline phosphatase'] ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors['Alkaline phosphatase'] && touched['Alkaline phosphatase'] && (
                            <p className="text-left text-red-500 text-sm">{errors['Alkaline phosphatase']}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('Basophils') + " [%]"}
                        </label>
                        <Field
                            name="Basophils"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Basophils && touched.Basophils ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Basophils && touched.Basophils && (
                            <p className="text-left text-red-500 text-sm">{errors.Basophils}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('Erythroblasts') + " [NRBC/100 WBC]"}
                        </label>
                        <Field
                            name="Erythroblasts"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Erythroblasts && touched.Erythroblasts ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Erythroblasts && touched.Erythroblasts && (
                            <p className="text-left text-red-500 text-sm">{errors.Erythroblasts}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('Erythrocytes') + " [10⁶/μL]"}
                        </label>
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
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('Hematocrit') + " [%]"}
                        </label>
                        <Field
                            name="Hematocrit"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Hematocrit && touched.Hematocrit ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Hematocrit && touched.Hematocrit && (
                            <p className="text-left text-red-500 text-sm">{errors.Hematocrit}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('MCH') + " [pg]"}
                        </label>
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
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('MCHC') + " [g/dL]"}
                        </label>
                        <Field
                            name="MCHC"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.MCHC && touched.MCHC ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.MCHC && touched.MCHC && (
                            <p className="text-left text-red-500 text-sm">{errors.MCHC}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('Monocytes') + " [10³/μL]"}
                        </label>
                        <Field
                            name="Monocytes"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Monocytes && touched.Monocytes ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Monocytes && touched.Monocytes && (
                            <p className="text-left text-red-500 text-sm">{errors.Monocytes}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('MPV') + " [fL]"}
                        </label>
                        <Field
                            name="MPV"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.MPV && touched.MPV ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.MPV && touched.MPV && (
                            <p className="text-left  text-red-500 text-sm">{errors.MPV}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('Neutrophils') + " [%]"}
                        </label>
                        <Field
                            name="Neutrophils"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Neutrophils && touched.Neutrophils ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Neutrophils && touched.Neutrophils && (
                            <p className="text-left text-red-500 text-sm">{errors.Neutrophils}</p>
                        )}
                    </div>
                    <div>
                        <label
                            className={`block p-1 text-left font-medium text-gray-700`}>
                            {t('Potassium') + " [mmol/L]"}
                        </label>
                        <Field
                            name="Potassium"
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded-md ${errors.Potassium && touched.Potassium ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.Potassium && touched.Potassium && (
                            <p className="text-left text-red-500 text-sm">{errors.Potassium}</p>
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

export default CrohnDiseaseForm;