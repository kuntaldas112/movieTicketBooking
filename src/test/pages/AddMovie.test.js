import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddMovie from '../../pages/AddMovie';

describe('AddMovie', () => {
  test('should render add movie form inputs', () => {
    render(<AddMovie />);

    const movieNameInput = screen.getByLabelText('Movie name');
    const theatreNameInput = screen.getByLabelText('Theatre name');
    const ticketCountInput = screen.getByLabelText('Ticket Count');
    const ticketStatusInput = screen.getByLabelText('Tickets status');

    expect(movieNameInput).toBeInTheDocument();
    expect(theatreNameInput).toBeInTheDocument();
    expect(ticketCountInput).toBeInTheDocument();
    expect(ticketStatusInput).toBeInTheDocument();
  });

  test('should update input values when typing', () => {
    render(<AddMovie />);

    const movieNameInput = screen.getByLabelText('Movie name');

    fireEvent.change(movieNameInput, { target: { value: 'Avengers: Endgame' } });

    expect(movieNameInput.value).toBe('Avengers: Endgame');
  });

  test('should submit form and display response message', async () => {
    const mockResponse = {
      status: 'Success',
      message: 'Movie added successfully!',
    };
  
    jest.spyOn(window, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      })
    );
  
    render(<AddMovie />);
  
    const movieNameInput = screen.getByLabelText('Movie name');
    const theatreNameInput = screen.getByLabelText('Theatre name');
    const ticketCountInput = screen.getByLabelText('Ticket Count');
    const ticketStatusInput = screen.getByLabelText('Tickets status');
    const addButton = screen.getByText('Add');
  
    fireEvent.change(movieNameInput, { target: { value: 'Avengers: Endgame' } });
    fireEvent.change(theatreNameInput, { target: { value: 'ABC Theater' } });
    fireEvent.change(ticketCountInput, { target: { value: 100 } });
    fireEvent.change(ticketStatusInput, { target: { value: 'Available' } });
    fireEvent.click(addButton);
  
    await waitFor(() => {
        const message = screen.queryByText('Movie added successfully!');
        expect(message).toBeInTheDocument();
      });
  
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(
      'http://localhost:8081/api/v1.0/moviebooking/addmovie',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.accessToken}`,
        },
        body: JSON.stringify({
          movieName: 'Avengers: Endgame',
          theatreName: 'ABC Theater',
          noOfTicketsAvailable: "100",
          ticketsStatus: 'Available',
        }),
      })
    );
  });
  
});
