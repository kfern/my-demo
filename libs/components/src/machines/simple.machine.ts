import { createMachine } from 'xstate';

export type MachineContext = {
  message: string;
};

/*
type EventWithPayload = {
  type: 'EVENT_WITH_PARAMS_EXAMPLE';
  payload: {
    entityId: string;
  };
};
*/
export type MachineEventsList = 'TOGGLE' | 'ENABLE' | 'DISABLE';

export type MachineEvents =
  | { type: 'ENABLE' }
  | { type: 'TOGGLE' }
  | { type: 'DISABLE' };

export const initialContext: MachineContext = {
  message: 'Hello World',
};

export const machineDefinition = {
  id: 'simple',
  schema: {
    context: {} as MachineContext,
    events: {} as MachineEvents,
  },
  predictableActionArguments: true,
  initial: 'disabled',
  states: {
    disabled: {
      on: {
        ENABLE: 'inactive',
      },
    },
    inactive: {
      on: {
        TOGGLE: {
          target: 'active',
        },
      },
    },
    active: {
      on: {
        TOGGLE: 'inactive',
        DISABLE: 'disabled',
      },
    },
  },
};

export const stateMachine = createMachine(machineDefinition);
