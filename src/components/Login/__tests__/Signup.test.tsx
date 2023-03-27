import {
  screen,
  render,
  getByLabelText,
  findByLabelText,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import Signup from '..';

beforeEach(() => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
});

describe('<Signup />', () => {
  it('renders a signup form', () => {
    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
  });

  it('renders input fields for first name, last name and email', () => {
    const firstname = screen.getByPlaceholderText('First name');
    const lastname = screen.getByPlaceholderText('Last name');
    const email = screen.getByPlaceholderText('Email');

    expect(firstname).toBeInTheDocument();
    expect(lastname).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  describe('<PhoneInput />', () => {
    it('renders the India flag svg', () => {
      const svg = screen.getByLabelText('India flag icon');
      expect(svg).toBeInTheDocument();
    });

    it('renders +91 text', () => {
      const text91 = screen.getByText(/\(\+91\)/);
      expect(text91).toBeInTheDocument();
    });

    it('renders phone input', () => {
      const phoneInput = screen.getByPlaceholderText('Phone number');
      expect(phoneInput).toBeInTheDocument();
    });
  });

  describe('<PasswordInput />', () => {
    it('renders password input field with type "password"', () => {
      const password = screen.getByPlaceholderText('Password');
      expect(password).toBeInTheDocument();
      expect(password).toHaveAttribute('type', 'password');
    });

    it('renders password visibility toggle button', () => {
      const toggleButton = screen.getByLabelText(
        'Password visibility toggle button'
      );

      expect(toggleButton).toBeInTheDocument();
    });

    it('changes password input field type to "text" on clicking visibility toggle button', async () => {
      const toggleButton = screen.getByLabelText(
        'Password visibility toggle button'
      );

      await userEvent.click(toggleButton);

      const password = screen.getByPlaceholderText('Password');
      expect(password).toHaveAttribute('type', 'text');
    });

    it('changes icon of password visibility toggle button on clicking it', async () => {
      const toggleButton = screen.getByLabelText(
        'Password visibility toggle button'
      );
      const visibilityOnIcon = getByLabelText(
        toggleButton,
        'Visibility on icon'
      );

      expect(visibilityOnIcon).toBeInTheDocument();

      await userEvent.click(toggleButton);

      const VisibilityOffIcon = await findByLabelText(
        toggleButton,
        'Visibility off icon'
      );

      expect(VisibilityOffIcon).toBeInTheDocument();
    });
  });

  describe('Submit form', () => {
    it('renders an error message on empty firstname', async () => {
      const form = screen.getByRole('form');

      await fireEvent.submit(form);

      const errorElement = await screen.findByText(
        'Please provide a first name'
      );

      expect(errorElement).toBeInTheDocument();
    });

    it('renders an error message on invalid email', async () => {
      const emailInput = screen.getByPlaceholderText('Email');

      const form = screen.getByRole('form');

      await userEvent.type(emailInput, 'onestop');

      await fireEvent.submit(form);

      const errorElement = await screen.findByText(
        'Please provide a valid email'
      );

      expect(errorElement).toBeInTheDocument();
    });

    it('renders an error message on empty password', async () => {
      const form = screen.getByRole('form');

      await fireEvent.submit(form);

      const errorElement = await screen.findByText('Please provide a password');

      expect(errorElement).toBeInTheDocument();
    });

    it('renders an error message on password less than 8 characters', async () => {
      const form = screen.getByRole('form');
      const passwordInput = screen.getByPlaceholderText('Password');

      await userEvent.type(passwordInput, 'abcdefg');

      await fireEvent.submit(form);

      const errorElement = await screen.findByText(
        'Password must be atleast 8 characters long'
      );

      expect(errorElement).toBeInTheDocument();
    });

    it('renders an error message on password greater than 40 characters', async () => {
      const form = screen.getByRole('form');
      const passwordInput = screen.getByPlaceholderText('Password');

      await userEvent.type(
        passwordInput,
        'abcdefghijabcdefghijabcdefghijabcdefghija'
      );

      await fireEvent.submit(form);

      const errorElement = await screen.findByText(
        'Password must be less than equal to 40 characters long'
      );

      expect(errorElement).toBeInTheDocument();
    });

    it('renders an error message on password greater than 40 characters', async () => {
      const form = screen.getByRole('form');
      const passwordInput = screen.getByPlaceholderText('Password');

      await userEvent.type(passwordInput, 'Abcdefgh3');

      await fireEvent.submit(form);

      const errorElement = await screen.findByText(
        'Password must contain atleast 1 uppercase letter, 1 lowercase letter, 1 digt and 1 special character'
      );

      expect(errorElement).toBeInTheDocument();
    });
  });
});
