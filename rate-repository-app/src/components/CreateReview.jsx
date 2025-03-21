import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import useCreateRepositoryReview from '../hooks/useCreateRepositoryReview';
import Form from './Form';

const formFields = {
  ownerName: {
    initialValue: '',
    placeholderText: 'Repository owner name',
  },
  repositoryName: {
    initialValue: '',
    placeholderText: 'Repository name',
  },
  rating: {
    initialValue: '',
    placeholderText: 'Rating between 0 and 100',
  },
  text: {
    initialValue: '',
    placeholderText: 'Review',
    props: {
      multiline: true,
    },
  },
};

const validationSchema = yup.object().shape({
  ownerName: yup.string()
    .required('Repository owner name is required'),
  repositoryName: yup.string()
    .required('Repository name is required'),
  rating: yup.number()
    .typeError('Rating must be a number between 0 and 100')
    .integer('Rating must be an integer between 0 and 100')
    .min(0, 'Rating cannot be less than 0')
    .max(100, 'Rating cannot be higher than 100')
    .required('Rating is required'),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview, result] = useCreateRepositoryReview();

  const onSubmit = async (values) => {
    const repositoryId = await createReview(values);
    if (repositoryId) {
      navigate(`/repository/${repositoryId}`);
    }
  };

  return (
    <Form
      error={result.error?.message}
      loading={result.loading}
      formFields={formFields}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      submitLabel='Create a review'
    />
  );
};

export default CreateReview;
