import { useMutation } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutateFunc, result] = useMutation(SIGN_IN);

  const signIn = async (credentials) => {
    const response = await mutateFunc({
      variables: {
        credentials //: { username, password }
      }
    });
    return response;
  };

  return [signIn, result]; // result == access token
};

export default useSignIn;
