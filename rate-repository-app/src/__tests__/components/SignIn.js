import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import { SignInContainer } from '../../components/SignIn';


describe('SignIn', () => {

  describe('SignInContainer', () => {

    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const username = 'app-tester';
      const password = 'topsecret-pass'
      const onSubmit = jest.fn();

      render(<SignInContainer error={undefined} onSubmit={onSubmit} />);

      //screen.debug();

      fireEvent.changeText(screen.getByPlaceholderText('Username'), username);
      fireEvent.changeText(screen.getByPlaceholderText('Password'), password);
      fireEvent.press(screen.getByText('Sign In'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({ username, password });
        //expect(onSubmit).toHaveBeenCalledWith({ username, password });
      });

    }); // calls onSubmit function with correct arguments when a valid form is submitted

  }); // SignInContainer

}); // SignIn
