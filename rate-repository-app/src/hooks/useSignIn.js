import { useApolloClient, useMutation } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutateFunc, result] = useMutation(SIGN_IN);

  const signIn = async (credentials) => {
    const response = await mutateFunc({
      variables: {
        credentials //: { username, password }
      }
    });

    if (!response.loading && !response.error && response.data.authenticate.accessToken) {
      await authStorage.setAccessToken(response.data.authenticate.accessToken);
      apolloClient.resetStore();
    }

    return response;
  };

  return [signIn, result]; // result == access token
};

export default useSignIn;
