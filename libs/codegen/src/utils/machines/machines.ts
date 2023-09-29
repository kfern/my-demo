import { createMachine } from 'xstate';

export type EventsByState = Record<string, string[]>;

export const getEventsByState = (machineDef: object) => {
  const machine = createMachine(machineDef);
  const result: EventsByState = {};
  Object.keys(machine.definition.states).forEach((state) => {
    machine.definition.states[state].transitions.forEach((t) => {
      if (result[state] === undefined) {
        result[state] = [];
      }
      result[state].push(t.eventType);
    });
  });

  return result;
};

export const getHTMLViewByState = (data: EventsByState) => {
  const result: string[] = [`<div [ngSwitch]="state">`];
  const states = Object.keys(data);
  states.forEach((s) => {
    result.push(`<ng-container *ngSwitchCase="'${s}'">`);
    result.push(`<ng-container *ngTemplateOutlet="${s}Template" />`);
    result.push(`</ng-container>`);
  });
  result.push('');
  states.forEach((s) => {
    result.push(`<ng-template #${s}Template>`);
    result.push(`<div>`);
    result.push(`<p>This content is for the '${s}' state.</p>`);
    data[s].forEach((e) => {
      result.push(`<button (click)="send('${e}')">${e}</button>`);
    });
    result.push(`</div>`);
    result.push(`</ng-template>`);
  });
  result.push(`</div>`);
  return result;
};
