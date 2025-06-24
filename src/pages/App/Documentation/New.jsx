import React from 'react';
import { BackButton } from '~/core/ui/Buttons/BackButton';
import { Form } from '~/components/Documentation/Form';
import SharedHeader from '~/components/SharedHeader';

export const NewDocumentation = () => {
  return (
    <section className="flex h-screen flex-col">
      <SharedHeader
        title="New Documentation"
        rightActions={
          <div>
            <BackButton icon />
          </div>
        }
      />

      <section className="scrollbar-hidden h-full items-end overflow-y-auto p-4">
        <Form />
      </section>
    </section>
  );
};
