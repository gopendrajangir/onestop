// import { fireEvent, screen, render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom';
// import { MemoryRouter } from 'react-router-dom';

// import OTPForm from 'components/OTPForm';

// beforeEach(() => {
//   render(
//     <MemoryRouter initialEntries={[{ state: { phoneNumber: '7230989157' } }]}>
//       <OTPForm
//         confirmationResult={{
//           verificationId: '',
//           confirm: (otp: string) => new Promise(() => {}),
//         }}
//         setConfirmationResult={}
//       />
//     </MemoryRouter>
//   );
// });

// describe('<OTPForm />', () => {
//   it('renders a back arrow icon', () => {
//     const svg = screen.getByLabelText('Back arrow icon');
//     expect(svg).toBeInTheDocument();
//   });

//   it('renders a message for sent OTP on phone number', async () => {
//     const message = /We have sent a 6-digit otp code on the phone number/;

//     const p = screen.getByText(message);
//     expect(p).toBeInTheDocument();
//     expect(p).toHaveTextContent(/7230989157/);
//   });

//   it('renders a form for entering otp', () => {
//     const otpForm = screen.getByRole('form');

//     expect(otpForm).toBeInTheDocument();
//   });

//   it('renders a text for entering otp', async () => {
//     const p = screen.getByText('Enter the OTP', { selector: 'p' });
//     expect(p).toBeInTheDocument();
//   });

//   it('renders 6 input field for otp', async () => {
//     const inputs = screen.getAllByLabelText(/Character/);
//     expect(inputs).toHaveLength(6);
//   });

//   it('renders a button with "Verify OTP" text', async () => {
//     const button = screen.getByText('Verify OTP', { selector: 'button' });
//     expect(button).toBeInTheDocument();
//   });

//   it('renders an error message on submitting form with empty otp input fields', async () => {
//     const form = screen.getByRole('form');

//     await fireEvent.submit(form);

//     const error = await screen.findByText('Please enter the otp', {
//       selector: 'p',
//     });

//     expect(error).toBeInTheDocument();
//   });

//   it('renders an error message on submitting form with any otp input field left empty', async () => {
//     const inputs = screen.getAllByLabelText(/Character/);
//     const form = screen.getByRole('form');

//     for (let i = 0; i < inputs.length - 1; i++) {
//       await userEvent.type(inputs[i], i.toString());
//     }

//     await fireEvent.submit(form);

//     const error = await screen.findByText('OTP should be 6-digit long');

//     expect(error).toBeInTheDocument();
//   });
// });
