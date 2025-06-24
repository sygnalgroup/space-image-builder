import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { DocumentItem } from '~/components/Documentation/DocumentItem';
import { getDocumentations } from '~/modules/documentation';

export const EmptyMessages = () => {
  const { data } = useQuery({
    queryKey: ['documentations'],
    queryFn: () => getDocumentations({ limit: 4 }),
  });
  return (
    <div class="mx-auto w-full max-w-2xl items-center justify-center px-4 py-16 text-center">
      <h2 class="text-4xl font-extrabold text-white">How can we help?</h2>
      <p class="mt-3 text-lg text-gray-400">
        Start typing in the message box below. As you type, we'll suggest
        helpful articles right here.
      </p>

      <div
        id="suggestions-container"
        class="mt-8 grid min-h-[180px] grid-cols-1 gap-4 text-left sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2"
      >
        {data?.map((doc) => (
          <DocumentItem doc={doc} />
        ))}
      </div>

      <p class="mt-8 text-gray-500">
        Can't find an answer? No problem. Just finish your message below.
      </p>
    </div>
  );
};
