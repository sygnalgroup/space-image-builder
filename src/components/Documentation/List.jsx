import React from 'react';
import api from '~/core/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

import ActivityIndicator from '~/core/ui/ActivityIndicator';
import { DocumentItem } from './DocumentItem';

export const List = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['documentations'],
    queryFn: () => api.get('/documentations').then((res) => res.data),
  });

  const { mutate: deleteDocumentation } = useMutation({
    mutationFn: (id) => {
      return api.delete(`/documentations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['documentations']);
      toast.success('Documentation was successfully destroyed.');
    },
    onError: (error) => {
      toast.error(error.response.data.errors.join('\n'));
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action is irreversible and cannot be undone. Are you sure you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDocumentation(id);
      }
    });
  };

  return (
    <section className="scrollbar-hidden h-full items-end overflow-y-auto p-4">
      <div className="relative flex flex-col gap-6">
        <div>
          <h2 class="text-2xl font-semibold text-white">Video Tutorials</h2>
          <p class="mt-1 text-gray-400">
            A collection of video guides to help you get started and master new
            features.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data
            ?.filter((x) => x.kind === 'video')
            .map((doc) => (
              <div key={doc?.id}>
                <DocumentItem doc={doc} isAdmin onRemove={handleDelete} />
              </div>
            ))}
        </div>

        <div>
          <h2 class="text-2xl font-semibold text-white">Guides & Documents</h2>
          <p class="mt-1 text-gray-400">
            Step-by-step articles and documentation for quick reference.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data
            ?.filter((x) => x.kind === 'doc')
            .map((doc) => (
              <div key={doc?.id}>
                <DocumentItem doc={doc} onRemove={handleDelete} />
              </div>
            ))}
        </div>
        {isLoading && (
          <div className="m-4 flex items-center justify-center">
            <div className="h-14">
              <ActivityIndicator />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
