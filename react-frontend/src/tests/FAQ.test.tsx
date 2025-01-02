import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import FAQ from '../faq/FAQ';
import React from "react";
import {useTranslation} from "react-i18next";
import {useResult} from "../context/ResultContext";
import {useResultWindow} from "../context/ResultWindowContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useActiveSection} from "../context/ActiveSectionContext";

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

describe('FAQ Component', () => {
    const mockUseTranslation = useTranslation as jest.Mock;
    const mockUseResult = useResult as jest.Mock;
    const mockUseResultWindow = useResultWindow as jest.Mock;
    const mockUseActiveSection = useActiveSection as jest.Mock;
    const mockUseNavigate = useNavigate as jest.Mock;
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

        mockUseActiveSection.mockReturnValue({
            setActiveSection: jest.fn(),
            navigate: jest.fn(),
        });

        mockUseNavigate.mockReturnValue(jest.fn());

        mockAxios.post.mockResolvedValue({});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should expand and collapse FAQ answers when clicked', async () => {
        render(<FAQ />);

        const questionButton = screen.getByText('faqQ1');

        fireEvent.click(questionButton);
        const answer = await screen.findByText("faqA1")
        expect(answer).toBeInTheDocument();

        fireEvent.click(questionButton);

        expect(screen.queryByText('faqA1')).toBeNull();
    });

    test('should navigate to the contact page when the contact button is clicked', async () => {
        render(<FAQ />);

        const questionButton = screen.getByText('faqQ4');

        fireEvent.click(questionButton);

        const contactButton = screen.getByText('faqContact');

        fireEvent.click(contactButton);

        expect(mockUseActiveSection).toHaveBeenCalled();

        expect(mockUseNavigate).toHaveBeenCalled();
    });

    test('should navigate to IBD overview section when the button inside faqA3 is clicked', async () => {
        render(<FAQ />);

        const questionButton = screen.getByText('faqQ3');

        fireEvent.click(questionButton);

        const ibdOverviewButton = screen.getByText('faqIBDOverview');

        fireEvent.click(ibdOverviewButton);

        expect(mockUseActiveSection).toHaveBeenCalled();

        expect(mockUseNavigate).toHaveBeenCalled();
    });

    test('should change the button style when clicked (scale effect)', async () => {
        render(<FAQ />);

        const faqButton = screen.getByText('faq3');

        expect(faqButton).not.toHaveClass('scale-90');

        // Simulate button click
        fireEvent.click(faqButton);

        expect(faqButton).toHaveClass('scale-90');

        expect(faqButton).not.toHaveClass('hover:bg-blue-600');
        expect(faqButton).not.toHaveClass('hover:scale-105');
    });

    test('should render the section header correctly', () => {
        render(<FAQ />);

        expect(screen.getByText('faq1')).toBeInTheDocument();
    });
});
