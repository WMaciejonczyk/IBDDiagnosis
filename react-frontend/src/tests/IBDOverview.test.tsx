import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import React from "react";
import {useTranslation} from "react-i18next";
import {useResult} from "../context/ResultContext";
import {useResultWindow} from "../context/ResultWindowContext";
import axios from "axios";
import IBDOverview from "../ibd-overview/IBDOverview";

jest.mock("axios");
jest.mock("react-i18next", () => ({
    useTranslation: jest.fn(),
}));
jest.mock("../context/ResultContext", () => ({
    useResult: jest.fn(),
}));
jest.mock("../context/ResultWindowContext", () => ({
    useResultWindow: jest.fn(),
}));

jest.mock("../context/ActiveSectionContext", () => ({
    useActiveSection: jest.fn(),
}))

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}))

describe('IBDOverview Component', () => {
    const mockUseTranslation = useTranslation as jest.Mock;
    const mockUseResult = useResult as jest.Mock;
    const mockUseResultWindow = useResultWindow as jest.Mock;
    const mockAxios = axios as jest.Mocked<typeof axios>;

    beforeEach(() => {
        mockUseTranslation.mockReturnValue({
            t: (key: string) => key,
        });

        mockUseResult.mockReturnValue({
            setResult: jest.fn(),
        });

        mockUseResultWindow.mockReturnValue({
            setShowResultWindow: jest.fn(),
        });

        mockAxios.post.mockResolvedValue({});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    test('render the section correctly', () => {
        render(<IBDOverview />);
        for (let i = 1; i <= 39; i++) {
            const regex = new RegExp(`overview${i}`, 'i');
            const elements = screen.getAllByText(regex);
            expect(elements.length).toBeGreaterThan(0);
        }
    });
});