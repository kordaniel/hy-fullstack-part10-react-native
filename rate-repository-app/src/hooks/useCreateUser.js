import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../graphql/mutations';
import useSignIn from './useSignIn';

const useCreateUser = () => {
  const [signIn] = useSignIn();
  const [mutateFunc, result] = useMutation(CREATE_USER);

  const createUser = async (credentials) => {
    try {
      const response = await mutateFunc({
        variables: {
          user: credentials
        }
      });

      if (!response.loading && response.data?.createUser?.id) {
        const { data } = await signIn(credentials);
        if (data?.authenticate?.accessToken) {
          return true;
        }
      }
    } catch (error) {
      console.error('error creating user:', error.message);
    }

    return false;
  };

  return [createUser, result];
};

export default useCreateUser;
