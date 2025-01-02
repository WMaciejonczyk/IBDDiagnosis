import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import View from "./navbar/View";
import i18n from "./i18n";
import DiagnosticModel from "./diagnostic-model/DiagnosticModel";
import FAQ from "./faq/FAQ";
import IBDOverview from "./ibd-overview/IBDOverview";
import TermsOfUse from "./terms-of-use/TermsOfUse";
import Contact from "./contact/Contact";
import {ResultProvider} from "./context/ResultContext";
import {ResultWindowProvider} from "./context/ResultWindowContext";
import {ActiveSectionProvider} from "./context/ActiveSectionContext";

function App() {
  return (
      <BrowserRouter>
          <ActiveSectionProvider>
          <ResultWindowProvider>
          <ResultProvider>
          <I18nextProvider i18n={i18n}>
            <Routes>
                <Route
                    path="/*"
                    element={
                        <>
                            <View>
                                <Routes>
                                    <Route
                                        path="/diagnostic-model"
                                        element={<DiagnosticModel />}
                                    />
                                    <Route
                                        path="/ibd-overview"
                                        element={<IBDOverview />}
                                    />
                                    <Route
                                        path="/FAQ"
                                        element={<FAQ />}
                                    />
                                    <Route
                                        path="/terms-of-use"
                                        element={<TermsOfUse />}
                                    />
                                    <Route
                                        path="/contact"
                                        element={<Contact />}
                                    />
                                </Routes>
                            </View>
                        </>
                    }
                />
            </Routes>
          </I18nextProvider>
          </ResultProvider>
          </ResultWindowProvider>
          </ActiveSectionProvider>
      </BrowserRouter>
  );
}

export default App;
