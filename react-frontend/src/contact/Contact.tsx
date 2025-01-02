import React, {useCallback, useMemo, useState} from "react";
import {Field, Form, Formik} from "formik";
import * as yup from "yup";
import {useTranslation} from "react-i18next";
import {useResult} from "../context/ResultContext";
import axios from "axios";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {useResultWindow} from "../context/ResultWindowContext";

const Contact = () => {

    const {t} = useTranslation();
    const {setResult} = useResult();
    const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
    const [isSubmittedUnsuccessfully, setIsSubmittedUnSuccessfully] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const {setShowResultWindow} = useResultWindow();

    setShowResultWindow(false);
    setResult("")

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
    }

    const handleSubmit = useCallback(
        (
            values: {
                name: string;
                email: string;
                title: string;
                message: string;}
        ) => {
            axios
                .post("http://localhost:5000/send-email", {
                    ...values,
                })
                .then(() => {
                    setIsSubmittedSuccessfully(true);
                })
                .catch((error) => {
                    setIsSubmittedUnSuccessfully(true);
                    console.error(error)
                });
            },
        [],
    )

    const validationSchema = useMemo(
        () =>
            yup.object().shape({
            name: yup
                .string()
                .required(t("nameRequired")),
            email: yup
                .string()
                .email(t("emailInvalid"))
                .required(t("emailRequired")),
            title: yup
                .string()
                .required(t("titleRequired")),
            message: yup
                .string()
                .required(t("messageRequired")),
            }),
        [t],
    );

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                title: "",
                message: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ errors, touched, isValid, dirty }) => (
                <div className="bg-grayish-blue min-h-screen">
                    <div className="text-center py-10">
                        <h1 className="text-4xl font-bold text-gray-800">{t("contactUs")}</h1>
                        <p className="text-lg text-gray-600 mt-4">{t("haveQuestions")}</p>
                    </div>

                    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
                        <Form className="space-y-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">{t("name")}</label>
                                <Field
                                    type="text"
                                    name="name"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                                        errors.name && touched.name ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder={t("namePlaceholder")}
                                />
                                {errors.name && touched.name && (
                                    <p className="text-red-500 text-sm">{errors.name}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                                        errors.email && touched.email ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder={t("emailPlaceholder")}
                                />
                                {errors.email && touched.email && (
                                    <p className="text-red-500 text-sm">{errors.email}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">{t("title")}</label>
                                <Field
                                    type="text"
                                    name="title"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                                        errors.title && touched.title ? "border-red-500" : "border-gray-300"
                                    }`}
                                    placeholder={t("titlePlaceholder")}
                                />
                                {errors.title && touched.title && (
                                    <p className="text-red-500 text-sm">{errors.title}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">{t("message")}</label>
                                <Field
                                    as="textarea"
                                    name="message"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                                        errors.message && touched.message ? "border-red-500" : "border-gray-300"
                                    }`}
                                    rows={4}
                                    placeholder={t("messagePlaceholder")}
                                />
                                {errors.message && touched.message && (
                                    <p className="text-red-500 text-sm">{errors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={!isValid || !dirty}
                                onClick={handleClick}
                                className={`w-full py-2 rounded-lg transform transition duration-200 
                                ${!isValid || !dirty
                                    ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Disabled state
                                    : `${isClicked ? "scale-90" : "hover:bg-blue-600 hover:scale-105"} 
                                        ${!isClicked && "hover:transition duration-200"} bg-blue-500 text-white hover:bg-blue-600 hover:scale-105` // Enabled state
                                }`}
                            >
                                {t("send")}
                            </button>
                        </Form>

                        {isSubmittedSuccessfully && (
                            <div className="mt-6 p-4 text-green-800 bg-green-100 border border-green-400 rounded-lg flex items-center justify-center space-x-3">
                                <CheckCircleIcon className="h-5 w-5 mr-2 stroke-green-800" />
                                {t("messageSentSuccessfully")}
                            </div>
                        )}

                        {/* Error Message */}
                        {isSubmittedUnsuccessfully && (
                            <div className="mt-6 p-4 text-red-800 bg-red-100 border border-red-400 rounded-lg flex items-center justify-center space-x-3">
                                <XCircleIcon className="h-5 w-5 mr-2 stroke-red-800" />
                                {t("messageSentUnsuccessfully")}
                            </div>
                        )}
                    </div>

                    {/* Contact Information Section */}
                    <div className="mt-12 text-center text-gray-700">
                        <p>Email:
                            <span>
                            {/*wstawić docelowego e-maila*/}
                            </span>
                        </p>
                        <p>{t("phone")}:
                            <span>
                                {/*wstawić docelowy numer telefonu*/}
                            </span>
                        </p>
                        <p>
                            {t("address")}:
                            <span>
                                {/*wstawić docelowy adres wraz z tłumaczeniem państwa,{" "}*/}
                                {/*{t("poland")}*/}
                            </span>
                        </p>
                    </div>
                </div>
            )}
        </Formik>
    );
};

export default Contact;

