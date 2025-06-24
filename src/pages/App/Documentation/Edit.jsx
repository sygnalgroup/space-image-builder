import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import { BackButton } from '~/core/ui/Buttons/BackButton';
import { Form } from '~/components/Documentation/Form';
import api from '~/core/api';
import SharedHeader from '~/components/SharedHeader';

export const EditDocumentation = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['documentation', id],
    queryFn: () => api.get(`/documentations/${id}`).then((res) => res.data),
  });

  return (
    <section className="flex h-screen flex-col">
      <SharedHeader
        title="Edit Documentation"
        rightActions={
          <div>
            <BackButton icon />
          </div>
        }
      />

      <section className="scrollbar-hidden h-full items-end overflow-y-auto p-4">
        {!isLoading && <Form documentation={data} />}
      </section>
    </section>
  );
};
