import {
  EventsByState,
  getEventsByState,
  getHTMLViewByState,
} from './machines';

const testMachineDefinition = {
  id: 'test',
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

describe('utils/machines', () => {
  it('getEventsByState', () => {
    const act = getEventsByState(testMachineDefinition);

    const expectedResult: typeof act = {
      active: ['TOGGLE', 'DISABLE'],
      disabled: ['ENABLE'],
      inactive: ['TOGGLE'],
    };
    expect(act).toStrictEqual(expectedResult);
  });

  it('getHTMLViewByState', () => {
    const testData: EventsByState = { disabled: ['ENABLE'] };
    const act = getHTMLViewByState(testData);

    const expectedResult: typeof act = [
      `<div [ngSwitch]="state">`,
      `<ng-container *ngSwitchCase="'disabled'">`,
      `<ng-container *ngTemplateOutlet="disabledTemplate" />`,
      `</ng-container>`,
      '',
      `<ng-template #disabledTemplate>`,
      `<div>`,
      `<p>This content is for the 'disabled' state.</p>`,
      `<button (click)="send('ENABLE')">ENABLE</button>`,
      `</div>`,
      `</ng-template>`,
      `</div>`,
    ];

    expect(act).toStrictEqual(expectedResult);
  });
});
