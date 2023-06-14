import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BookingForm from '../../pages/BookingForm';

describe('BookingForm', () => {
  const mockState = {
    movieName: 'Avengers: Endgame',
    theatreName: 'ABC Theatre',
  };

  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockResolvedValue({
      json: () =>
        Promise.resolve({
          status: 'Success',
          message: 'Booking successful!',
        }),
    });
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  test('should render booking form and submit form successfully', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/booking', state: mockState }]}>
        <Routes>
          <Route path="/booking" element={<BookingForm />} />
        </Routes>
      </MemoryRouter>
    );

    const noOfTicketsInput = screen.getByLabelText('noOfTickets');
    const seatNumberInput = screen.getByLabelText('Seat Numbers');
    const bookTicketButton = screen.getByText('BookTicket');

    fireEvent.change(noOfTicketsInput, { target: { value: '2' } });
    fireEvent.change(seatNumberInput, { target: { value: 'A1,A2' } });
    fireEvent.click(bookTicketButton);

    // Wait for the response message to appear
    const message = await screen.findByText('Booking successful!');
    expect(message).toBeInTheDocument();

    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(
      'http://localhost:8081/api/v1.0/moviebooking/Avengers: Endgame/book',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.accessToken}`,
        },
        body: JSON.stringify({
          loginId: JSON.parse(localStorage.getItem('userInfo'))?.username,
          movieName: 'Avengers: Endgame',
          theatreName: 'ABC Theatre',
          noOfTickets: '2',
          seatNumber: ['A1', 'A2'],
        }),
      })
    );
  });
});
