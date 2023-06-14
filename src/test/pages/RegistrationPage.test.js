import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationPage from "../../pages/RegistrationPage"
describe('RegistrationPage', () => {
  test('should render registration form inputs', () => {
    render(<RegistrationPage />);

    const usernameInput = screen.getByLabelText('Username');
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const contactNumberInput = screen.getByLabelText('Contact No.');
    const rolesInput = screen.getByLabelText('Roles');
    const passwordInput = screen.getByLabelText('Password');

    expect(usernameInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(contactNumberInput).toBeInTheDocument();
    expect(rolesInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('should update input values when typing', () => {
    render(<RegistrationPage />);

    const usernameInput = screen.getByLabelText('Username');

    fireEvent.change(usernameInput, { target: { value: 'johnDoe' } });

    expect(usernameInput.value).toBe('johnDoe');
  });

  test('should submit form and display response message', async () => {
    const mockResponse = {
      status: 'Success',
      message: 'Registration successful!',
    };

    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );

    render(<RegistrationPage />);

    const usernameInput = screen.getByLabelText('Username');
    const firstNameInput = screen.getByLabelText('First Name');
    const lastNameInput = screen.getByLabelText('Last Name');
    const emailInput = screen.getByLabelText('Email');
    const contactNumberInput = screen.getByLabelText('Contact No.');
    const rolesInput = screen.getByLabelText('Roles');
    const passwordInput = screen.getByLabelText('Password');
    const registerButton = screen.getByText('register');

    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(firstNameInput, { target: { value: 'john' } });
    fireEvent.change(lastNameInput, { target: { value: 'doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@doe.com' } });
    fireEvent.change(contactNumberInput, { target: { value: '1234567890' } });
    fireEvent.change(rolesInput, { target: { value: "user,admin" } });
    fireEvent.change(passwordInput, { target: { value: 'johndoe123' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      const message = screen.getByText('Registration successful!');
      expect(message).toBeInTheDocument();
    });

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(
      'http://localhost:8081/api/v1.0/moviebooking/register',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          loginId: 'johndoe',
          firstName: 'john',
          lastName: 'doe',
          email: 'john@doe.com',
          contactNumber: "1234567890",
          roles: ['user','admin'],
          password: 'johndoe123',
        }),
      })
    );
  });
});
