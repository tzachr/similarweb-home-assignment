import { render, screen, fireEvent } from '@testing-library/react';
import VideoInput from './../VideoInput';

describe("VideoInput", () => {
    it('renders input element', () => {
        render(<VideoInput />);
        const inputElement = screen.getByPlaceholderText(/Enter video url/i);
        expect(inputElement).toBeInTheDocument();
    });

    it('renders input element with focus', () => {
        render(<VideoInput />);
        const inputElement = screen.getByRole('textbox');
        // const buttonElement = screen.getByRole('button', {name: /Add/i});
        expect(inputElement).toHaveFocus();
    });

    it('should be able to type input', () => {
        render(<VideoInput />);
        const inputElement = screen.getByRole('button', {name: /Add/i});
        fireEvent.change(inputElement, {target: {value: "https://www.youtube.com/watch?v=Kt-tLuszKBA&t=2110s&ab_channel=SoulRecords"}});

        expect(inputElement.value).toBe("https://www.youtube.com/watch?v=Kt-tLuszKBA&t=2110s&ab_channel=SoulRecords");
    });

    it('renders button element', () => {
        render(<VideoInput />);
        const buttonElement = screen.getByRole("button", {name: /Add/i});
        expect(buttonElement).toBeInTheDocument();
    });

    it('should be button disabled', () => {
        render(<VideoInput />);
        const buttonElement = screen.getByRole("button", {name: /Add/i});
        expect(buttonElement).toBeDisabled();
    });

    it('should not be button disabled when input has valid url', () => {
        render(<VideoInput />);
        const inputElement = screen.getByPlaceholderText(/Enter video url/i);
        fireEvent.change(inputElement, {target: {value: "https://www.youtube.com/watch?v=Kt-tLuszKBA&t=2110s&ab_channel=SoulRecords"}});
        const buttonElement = screen.getByRole("button", {name: /Add/i});
        expect(buttonElement).not.toBeDisabled();
    });

    it('should be button disabled when input has invalid url', () => {
        render(<VideoInput />);
        const inputElement = screen.getByPlaceholderText(/Enter video url/i);
        fireEvent.change(inputElement, {target: {value: "https://www.notyoutubeurl.com/watch?v=Kt-tLuszKBA&t=2110s&ab_channel=SoulRecords"}});
        const buttonElement = screen.getByRole("button", {name: /Add/i});
        expect(buttonElement).toBeDisabled();
    });
});