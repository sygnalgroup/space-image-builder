import React, { useState } from 'react';
import SelectField from '~/core/ui/inputs/SelectBox';
import Switch from '~/core/ui/inputs/Swtich';
import TextField from '~/core/ui/inputs/TextField';
import { useTournamentForm } from './useForm';
import { Controller } from 'react-hook-form';
import { Button } from '~/core/ui/shadcn/components/ui/button';
import {
  IconAlertTriangle,
  IconChevronRight,
  IconCloudUpload,
} from '@tabler/icons-react';
import { DateTimePicker } from '~/core/ui/Calendar/DateTimePicker';
import { Link } from 'react-router';
import CkEditor from '~/core/ui/CkEditor';

export default function TournamentForm({ tournament }) {
  const [undefinedLocation, setUndefinedLocation] = useState(false);

  const { control } = useTournamentForm({ tournament });

  return (
    <form className="mx-auto flex max-w-2xl flex-col gap-8 pt-0 md:pt-6">
      {/* Visão geral */}
      <section className="card-form">
        <h2 className="card-form-title">Visão geral</h2>
        <div className="flex flex-col gap-4">
          <div>
            <Controller
              name="name"
              control={control}
              defaultValue={tournament?.name || ''}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label={'Nome do torneio'}
                  className="border-none outline-none"
                  placeholder="Torneio de Inauguração Villa Clube – Etapa NovaNet"
                />
              )}
            />
          </div>
          <div>
            <Controller
              name="modality"
              control={control}
              defaultValue={tournament?.modality || 'padel'}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label="Modalidade"
                  placeholder="Selecione uma modalidade"
                  className="border-none outline-none"
                  options={[
                    { value: 'padel', label: 'Padel' },
                    { value: 'beach_tenis', label: 'Beach Tennis' },
                    { value: 'Outro', label: 'Outro' },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <label
                htmlFor="checkin"
                className="text-sm font-semibold text-black"
              >
                Exigir check-in por parte dos atletas?
              </label>
              <label htmlFor="checkin" className="tet-gray-500 text-sm">
                Ao habilitar esta opção, todos os atletas precisarão fazer
                check-in para que seja possível dar início a uma partida.
              </label>
            </div>
            <Controller
              name="requireCheckin"
              control={control}
              defaultValue={tournament?.requireCheckin || false}
              render={({ field }) => (
                <div>
                  <Switch
                    size="lg"
                    checked={!!field.value}
                    onClick={() => field.onChange(!field?.value)}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </section>
      <section className="card-form">
        <h2 className="card-form-title">Imagem de capa</h2>
        <div className="flex flex-col items-center justify-center rounded-lg border-1 border-solid border-gray-200 bg-gray-50 p-6">
          <IconCloudUpload />
          <span className="my-2 text-gray-400">
            Arrastar e soltar aqui uma imagem ou
          </span>
          <Button variant="outline" type="button">
            Carregar imagem
          </Button>
          <span className="mt-2 text-xs text-gray-400">
            JPEG ou PNG igual ou menor que 10MB. Recomendamos imagens em 2160 x
            1080px.
          </span>
        </div>
      </section>

      {/* Data e hora */}
      <section className="card-form">
        <h2 className="card-form-title">Data e hora</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-base font-semibold">Inscrições</label>
            <div className="block text-sm font-normal text-gray-500">
              Defina o período em que você quer aceitar inscrições dos atletas.
            </div>
          </div>
          <div className="relative">
            <div className="right-0 left-0 z-0 hidden h-14 w-full items-center justify-center lg:absolute lg:flex">
              <IconChevronRight />
            </div>
            <div className="relative grid w-full flex-1 grid-cols-1 gap-10 lg:grid-cols-2">
              <Controller
                name="startAt"
                control={control}
                defaultValue={tournament?.name || ''}
                render={({ field }) => (
                  <DateTimePicker
                    value={field.value}
                    setValue={field.onChange}
                  />
                )}
              />
              <Controller
                name="endAt"
                control={control}
                defaultValue={tournament?.name || ''}
                render={({ field }) => (
                  <DateTimePicker
                    value={field.value}
                    setValue={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-base font-semibold">Torneio</label>
            <div className="block text-sm font-normal text-gray-500">
              Defina data e horário que irá começar e terminar o torneio.
            </div>
          </div>
          <div className="relative">
            <div className="right-0 left-0 z-0 hidden h-14 w-full items-center justify-center lg:absolute lg:flex">
              <IconChevronRight />
            </div>
            <div className="relative grid w-full flex-1 grid-cols-1 gap-10 lg:grid-cols-2">
              <Controller
                name="startAt"
                control={control}
                defaultValue={tournament?.name || ''}
                render={({ field }) => (
                  <DateTimePicker
                    value={field.value}
                    setValue={field.onChange}
                  />
                )}
              />
              <Controller
                name="endAt"
                control={control}
                defaultValue={tournament?.name || ''}
                render={({ field }) => (
                  <DateTimePicker
                    value={field.value}
                    setValue={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          <div>
            <Controller
              name="modality"
              control={control}
              defaultValue={tournament?.modality || 'padel'}
              render={({ field }) => (
                <SelectField
                  {...field}
                  label="Fuso horário"
                  placeholder="Selecione um fuso horário"
                  className="border-none outline-none"
                  options={[
                    { value: 'padel', label: 'Padel' },
                    { value: 'beach_tenis', label: 'Beach Tennis' },
                    { value: 'Outro', label: 'Outro' },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
      </section>

      {/* Local */}
      <section className="card-form">
        <h2 className="card-form-title">Local</h2>
        <div className="flex flex-col gap-4">
          <label className="mb-1 block text-sm font-medium">Clubes</label>
          <div className="flex grow flex-wrap items-center gap-4">
            <div className="flex-1">
              <Controller
                name="club"
                control={control}
                defaultValue={tournament?.modality || 'padel'}
                render={({ field }) => (
                  <SelectField
                    {...field}
                    label="Modalidade"
                    placeholder="Selecione um clube"
                    className="border-none outline-none"
                    options={[
                      { value: 'padel', label: 'Padel' },
                      { value: 'beach_tenis', label: 'Beach Tennis' },
                      { value: 'Outro', label: 'Outro' },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <Link className="rounded border-b border-gray-300 hover:opacity-70">
              Remover
            </Link>
          </div>
          <div>
            <Button variant="outline">Adicionar clube</Button>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex-1">
            <div className="text-sm font-semibold">
              O local ainda não foi definido?
            </div>
            <div className="text-sm text-gray-500">
              Marque esta opção caso o local do torneio ainda não tenha sido
              definido.
            </div>
          </div>
          <Controller
            name="requireCheckin"
            control={control}
            defaultValue={tournament?.requireCheckin || false}
            render={({ field }) => (
              <div>
                <Switch
                  size="lg"
                  checked={!!field.value}
                  onClick={() => field.onChange(!field?.value)}
                />
              </div>
            )}
          />
        </div>

        <div className="mt-4 flex flex-row gap-4 rounded-md border border-gray-200 bg-gray-50 p-4">
          <div>
            <IconAlertTriangle size={24} className="text-placar-500" />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="text-xs font-semibold">
              As informações utilizadas são inseridas pelos usuários e pelos
              próprios clubes
            </div>
            <div className="text-xs text-gray-500">
              As informações exibidas são inseridas pelos usuários e pelos
              próprios clubes. O Placar não tem gerência sobre os clubes e não
              pode garantir que os dados estejam 100% corretos. Recomendamos
              confirmar os detalhes diretamente com o clube antes de definir os
              locais que sediarão o torneio.
            </div>
          </div>
        </div>
      </section>

      {/* Mais detalhes do torneio */}
      <section className="card-form">
        <h2 className="card-form-title">Mais detalhes do torneio</h2>
        <div className="mb-4">
          <Controller
            name="details"
            control={control}
            defaultValue={tournament?.details || false}
            render={({ field }) => (
              <div>
                <CkEditor content={field.value} onChange={field.onChange} />
              </div>
            )}
          />

          {/* <textarea
            className="min-h-[80px] w-full rounded-lg border px-3 py-2"
            placeholder="Adicione mais informações sobre o torneio..."
          /> */}
        </div>
        <div className="mb-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6">
          <span className="mb-2 text-gray-400">
            Arrastar e soltar aqui uma imagem ou
          </span>
          <button
            type="button"
            className="rounded border bg-gray-100 px-4 py-2 font-medium transition hover:bg-gray-50"
          >
            Carregar imagem
          </button>
          <span className="mt-2 text-xs text-gray-400">
            JPEG, PNG igual ou menor que 10MB.
          </span>
        </div>
        <input
          type="url"
          className="mb-4 w-full rounded-lg border px-3 py-2"
          placeholder="Colar link do vídeo"
        />
        <div className="flex gap-2">
          <button className="rounded border bg-gray-50 px-3 py-1 text-xs hover:bg-gray-100">
            Adicionar texto
          </button>
          <button className="rounded border bg-gray-50 px-3 py-1 text-xs hover:bg-gray-100">
            Adicionar imagem
          </button>
          <button className="rounded border bg-gray-50 px-3 py-1 text-xs hover:bg-gray-100">
            Adicionar vídeo
          </button>
        </div>
      </section>

      {/* Botão de ação */}
      <div className="flex justify-end border-t border-gray-200 pt-2">
        <Button
          type="submit"
          className="bg-placar-400 hover:bg-placar-500 rounded-full px-6 py-2 font-semibold text-black transition"
        >
          Salvar e continuar
        </Button>
      </div>
    </form>
  );
}
