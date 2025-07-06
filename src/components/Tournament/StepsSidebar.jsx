import { IconCheck } from '@tabler/icons-react';

const steps = [
  {
    label: 'Informações do torneio',
    description: 'Adicione os detalhes principais como data, nome, local etc.',
  },
  { label: 'Categorias, quadras e cálculo de capacidade' },
  { label: 'Valores e impedimento' },
];

export function StepsSidebar({ currentStep = 0, setStep }) {
  return (
    <aside className="fixed min-h-full w-[270px] overflow-scroll border-r bg-white px-5 py-7">
      <div className="mb-6 text-lg font-semibold">Etapas</div>
      <ul className="space-y-4">
        {steps.map((step, i) => (
          <li
            key={step.label}
            className={`group relative flex cursor-pointer items-start gap-3 transition ${i === currentStep ? 'text-primary font-semibold' : 'text-muted-foreground'} `}
            onClick={() => setStep?.(i)}
          >
            {i <= currentStep ? (
              <>
                {steps?.length - 1 > i && (
                  <div className="bg-placar absolute top-[16px] left-[8.5px] z-2 h-full w-[2px]"></div>
                )}
                <div className="bg-placar z-10 flex min-h-5 min-w-5 items-center justify-center rounded-full">
                  <IconCheck size={12} className="text-primary mt-0.5" />
                </div>
              </>
            ) : (
              <>
                {steps?.length - 1 > i && (
                  <div className="absolute top-[16px] left-[8.5px] z-2 h-full w-[2px] bg-gray-200"></div>
                )}
                <div className="bg-border-gray-500 z-20 flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 bg-white"></div>
              </>
            )}
            <div>
              <div className="text-sm font-medium text-black">{step.label}</div>
              {step.description && (
                <div className="mt-1 text-xs font-normal text-gray-500">
                  {step.description}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
