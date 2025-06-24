import React, { useContext } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import ActivityIndicator from '~/core/ui/ActivityIndicator';
import { useTicketForm } from './useForm';
import { TicketContext } from '~/contexts/TicketContext';
import { Controller } from 'react-hook-form';
import EmojiSelector from './EmojiSelector';
export const TicketForm = () => {
  const { ticketId } = useContext(TicketContext);

  const { control, handleKeyDown, handleSubmit, clients, isLoading } =
    useTicketForm({ ticketId });

  return (
    <section className="px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col flex-wrap gap-2"
      >
        {!ticketId && (
          <div className="flex w-full gap-2 md:flex-1">
            {isLoading && <ActivityIndicator />}

            {!isLoading && clients.length == 1 && (
              <span className="input">{clients[0]['name']}</span>
            )}

            {!isLoading && clients.length > 1 && (
              <Controller
                name="clientId"
                control={control}
                defaultValue={clients[0]?.id || ''}
                render={({ field }) => (
                  <select {...field} className="input">
                    {clients.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                )}
              />
            )}

            <Controller
              name="category"
              control={control}
              defaultValue="issue"
              render={({ field }) => (
                <select {...field} className="input">
                  {[
                    { value: 'feature_request', label: 'Feature Request' },
                    { value: 'issue', label: 'Issue' },
                  ].map(({ value, label }) => (
                    <option value={value} className="radio-option" key={value}>
                      {label}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
        )}

        <div className="relative mb-4 flex items-center rounded-md bg-zinc-700/70 p-6 pl-14">
          <Controller
            name="text"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <>
                <div className="absolute left-2 flex items-center justify-end gap-2 p-2">
                  <EmojiSelector
                    control={control}
                    setValue={(v) => field.onChange(v)}
                  />
                </div>
                <TextareaAutosize
                  {...field}
                  id="text"
                  value={field.value || ''}
                  onKeyDown={handleKeyDown}
                  className="w-full resize-none rounded-md focus:outline-none"
                  maxRows={10}
                  placeholder="Message for a new ticket"
                  autoFocus
                />
              </>
            )}
          />
        </div>
      </form>
    </section>
  );
};
