import { FormModel, getFormBuilderDef, getHTMLFormFields } from './forms';

const fakeModel: FormModel = {
  entity: 'test',
  fields: {
    firstName: {
      type: 'text',
      validators: ['required'],
    },
    notRequired: {
      type: 'number',
      validators: [],
    },
    numberRequired: {
      type: 'number',
      validators: ['required'],
    },
    numberWithDefaults: {
      type: 'number',
      default: 13,
      validators: [],
    },
  },
};

describe('utils/forms', () => {
  it('getFormBuilderDef', () => {
    const act = getFormBuilderDef(fakeModel);

    const expectedResult: typeof act = [
      `firstName: ['', Validators.required]`,
      `notRequired: []`,
      `numberRequired: [0, Validators.required]`,
      `numberWithDefaults: [${fakeModel.fields.numberWithDefaults.default}]`,
    ];

    expect(act).toStrictEqual(expectedResult);
  });

  it('getHTMLFormFields text type', () => {
    const testModel: FormModel = {
      entity: 'test',
      fields: {
        firstName: {
          type: 'text',
          validators: [],
        },
      },
    };
    const act = getHTMLFormFields(testModel);

    const expectedResult: typeof act = [
      `<div class="form-group-item">`,
      `<label for="firstName">test.firstname</label>`,
      `<input id="firstName" type="text" class="form-item" formControlName="firstName" (blur)="validateForm()"/>`,
      `</div>`,
    ];

    expect(act).toStrictEqual(expectedResult);
  });
});
