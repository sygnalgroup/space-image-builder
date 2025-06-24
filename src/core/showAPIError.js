import { toast } from 'react-hot-toast';

const defaultErrorMessage = 'There was an error';

export function showAPIError(error) {
  toast.error(typeof error === 'string' ? error : getErrorMessage(error));
}

const getErrorMessage = (error) => {
  const errors = error?.response?.data?.errors;

  if (!errors) return defaultErrorMessage;

  return Object.values(errors).join('. ') || defaultErrorMessage;
};
