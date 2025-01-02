import React from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useResult } from "../context/ResultContext";
import { useResultWindow } from "../context/ResultWindowContext";
import Contact from "../contact/Contact";
import {userEvent} from "@testing-library/user-event";

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

describe("Contact Component", () => {
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

    test("renders the form and fields correctly", () => {
        render(<Contact />);
        expect(screen.getByPlaceholderText("namePlaceholder")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("emailPlaceholder")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("titlePlaceholder")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("messagePlaceholder")).toBeInTheDocument();
    });

    test("shows validation errors on submitting empty form", async () => {
        render(<Contact />);

        const nameField = screen.getByPlaceholderText("namePlaceholder");
        const emailField = screen.getByPlaceholderText("emailPlaceholder");
        const titleField = screen.getByPlaceholderText("titlePlaceholder");
        const messageField = screen.getByPlaceholderText("messagePlaceholder");

        fireEvent.blur(nameField);
        fireEvent.blur(emailField);
        fireEvent.blur(titleField);
        fireEvent.blur(messageField);

        const nameError = await screen.findByText("nameRequired");
        const emailError = await screen.findByText("emailRequired");
        const titleError = await screen.findByText("titleRequired");
        const messageError = await screen.findByText("messageRequired");

        expect(nameError).toBeInTheDocument();
        expect(emailError).toBeInTheDocument();
        expect(titleError).toBeInTheDocument();
        expect(messageError).toBeInTheDocument();
    });

    test("shows validation error on entering invalid email", async () => {
        render(<Contact />);

        const user = userEvent.setup()
        const emailField = screen.getByPlaceholderText("emailPlaceholder");
        await user.type(screen.getByPlaceholderText("emailPlaceholder"), "wadada"); // Invalid email (no @)

        fireEvent.blur(emailField);

        expect(screen.getByText("emailInvalid")).toBeInTheDocument();
    });

    test("submits the form successfully", async () => {
        render(<Contact />);

        fireEvent.change(screen.getByPlaceholderText("namePlaceholder"), {
            target: { value: "Name" },
        });
        fireEvent.change(screen.getByPlaceholderText("emailPlaceholder"), {
            target: { value: "name@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("titlePlaceholder"), {
            target: { value: "Test Title" },
        });
        fireEvent.change(screen.getByPlaceholderText("messagePlaceholder"), {
            target: { value: "Test Message" },
        });

        fireEvent.click(screen.getByText("send"));

        await waitFor(() => {
            expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:5000/send-email", {
                name: "Name",
                email: "name@example.com",
                title: "Test Title",
                message: "Test Message",
            });
        });

        expect(screen.getByText("messageSentSuccessfully")).toBeInTheDocument();
    });

    test("shows error message on submission failure", async () => {
        mockAxios.post.mockRejectedValue(new Error("Submission failed"));

        render(<Contact />);

        fireEvent.change(screen.getByPlaceholderText("namePlaceholder"), {
            target: { value: "Name" },
        });
        fireEvent.change(screen.getByPlaceholderText("emailPlaceholder"), {
            target: { value: "name@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText("titlePlaceholder"), {
            target: { value: "Test Title" },
        });
        fireEvent.change(screen.getByPlaceholderText("messagePlaceholder"), {
            target: { value: "Test Message" },
        });

        fireEvent.click(screen.getByText("send"));

        await waitFor(() => {
            expect(screen.getByText("messageSentUnsuccessfully")).toBeInTheDocument();
        });
    });
});
