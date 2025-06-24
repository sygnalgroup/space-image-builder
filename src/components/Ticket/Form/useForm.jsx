import { useEffect } from 'react';
import api from '~/core/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { createTicket, createTicketMessage } from '~/modules/ticket';
import { useForm } from 'react-hook-form';

export const useTicketForm = ({ ticketId } = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: { text: '' },
  });

  const { mutate: formTicket } = useMutation({
    mutationFn: (formData) => {
      return ticketId
        ? createTicketMessage(ticketId, formData)
        : createTicket(formData);
    },
  });

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: () => api.get('/clients').then((res) => res.data),
  });

  useEffect(() => {
    if (isLoading || clients.length <= 0) return;

    setValue('clientId', clients[0].id);
  }, [clients, setValue, isLoading]);

  const handleKeyDown = (e) => {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();

      handleSubmit(submit)();
    }
  };

  const submit = (values) => {
    if (!values?.text) return;

    const dataForm = ticketId
      ? {
          ticket_message: {
            text: values?.text,
          },
        }
      : {
          ...values,
          ticket_messages_attributes: [
            {
              text: values?.text,
            },
          ],
        };

    formTicket(dataForm, {
      onSuccess: (e) => {
        queryClient.invalidateQueries({ queryKey: ['tickets'] });
        navigate(`/app/tickets/${e.id}`);
        setValue('text', '');
      },
      onError: () => {
        toast.error('Unable to create the ticket.');
      },
    });
  };

  return {
    control,

    handleKeyDown,
    onSubmit: handleSubmit(submit),

    clients,
    isLoading,
  };
};
