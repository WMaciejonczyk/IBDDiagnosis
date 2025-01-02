import {useResult} from "../context/ResultContext";
import {useResultWindow} from "../context/ResultWindowContext";
import {useTranslation} from "react-i18next";

const IBDOverview = () => {

    const {setResult} = useResult();
    const {setShowResultWindow} = useResultWindow();
    const {t} = useTranslation();

    setShowResultWindow(false);
    setResult("")

    return (
        <div className="flex flex-col bg-grayish-blue items-center min-h-screen">
            <div className="text-center py-10">
                <h1 className="text-4xl font-bold text-gray-800">{t("overview1")}</h1>
                <p className="text-lg text-gray-600 mt-4">
                    {t("overview2")}
                </p>
            </div>
                <div className="bg-white my-2 shadow-lg rounded-lg p-8 max-w-4xl">
            <div className="max-w-4xl mx-auto text-justify"  style={{ whiteSpace: 'pre-line' }}>
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">{t("overview3")}</h3>
                    <ul className="list-disc pl-5">
                        <li>
                            <strong>{t("overview4")}</strong>{t("overview5")}
                        </li>
                        <br/>
                        <li>
                            <strong>{t("overview6")}</strong>{t("overview7")}
                        </li>
                        <br/>
                        <li>
                            <strong>{t("overview8")}</strong>{t("overview9")}
                        </li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">{t("overview10")}</h3>
                    <p>{t("overview11")}</p>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">{t("overview12")}</h3>
                    <p>{t("overview13")}</p><br/>
                    <ul className="list-disc pl-5">
                        <li><strong>{t("overview14")}</strong>{t("overview15")}
                        </li>
                        <br/>
                        <li><strong>{t("overview16")}</strong>{t("overview17")}
                        </li>
                        <br/>
                        <li>
                            <strong>{t("overview18")}</strong>
                            {t("overview19")}
                            <i>{t("overview20")}</i>
                            {t("overview21")}
                            <i>{t("overview22")}</i>
                            {t("overview23")}
                            <i>{t("overview24")}</i>
                        </li>
                        <br/>
                        <li><strong>{t("overview25")}</strong>{t("overview26")}
                        </li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">{t("overview27")}</h3>
                    <p>{t("overview28")}</p>
                </div>

                <div className="mb-6">
                    <h3 className="text-2xl font-semibold mb-2">{t("overview29")}</h3>
                    <p>{t("overview30")}</p><br/>
                    <ul className="list-disc pl-5">
                        <li><strong>{t("overview31")}</strong>{t("overview32")}</li>
                        <br/>
                        <li><strong>{t("overview33")}</strong>{t("overview34")}
                        </li>
                        <br/>
                        <li><strong>{t("overview35")}</strong>{t("overview36")}
                        </li>
                        <br/>
                        <li><strong>{t("overview37")}</strong>{t("overview38")}
                        </li>
                        <br/>
                    </ul>
                    <p>{t("overview39")}</p>
                </div>
            </div>
                </div>
            </div>
    );
};

export default IBDOverview;
