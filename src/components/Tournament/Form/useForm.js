import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import api from '~/core/api';
import * as yup from 'yup';

// Replace these with your actual API functions
import { createTournament, updateTournament } from '~/modules/tournaments';

const schema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  modalidade: yup.string().required('Modalidade is required.'),
  image: yup
    .string()
    .url('Image must be a valid URL')
    .required('Image is required.'),
});

export const useTournamentForm = ({ tournament }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    control,
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: tournament?.id || '',
      name: tournament?.name || '',
      modalidade: tournament?.modalidade || '',
      image: tournament?.image || '',
    },
  });

  // Reset form when tournament changes
  // (optional, if you expect tournament prop to change)
  // useEffect(() => {
  //   reset({
  //     id: tournament?.id || '',
  //     name: tournament?.name || '',
  //     modalidade: tournament?.modalidade || '',
  //     image: tournament?.image || '',
  //   });
  // }, [tournament, reset]);

  const { mutate: formTournament } = useMutation({
    mutationFn: (formData) => {
      if (formData.id) {
        return updateTournament(formData);
      } else {
        return createTournament(formData);
      }
    },
  });

  const submit = (values) => {
    const dataForm = { ...values };

    formTournament(dataForm, {
      onSuccess: () => {
        if (dataForm.id) {
          queryClient.invalidateQueries(['tournament', dataForm.id]);
          toast.success('Tournament was successfully updated.');
        } else {
          toast.success('Tournament was successfully created.');
        }
        navigate('/app/tournaments');
      },
      onError: () => {
        const message = dataForm.id
          ? 'Unable to update the tournament.'
          : 'Unable to create the tournament.';
        toast.error(message);
      },
    });
  };

  return {
    control,
    register,
    watch,
    errors,
    isLoading: false,
    onSubmit: handleSubmit(submit),
  };
};
