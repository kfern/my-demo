/*
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    age: [0],
  });

  */

export const defaultModel = {
  entity: 'changeme',
  fields: {
    id: {
      type: 'number',
      readonly: true,
    },
    name: {
      type: 'text',
      required: true,
    },
    age: {
      type: 'number',
      default: 0,
    },
  },
};

interface FormItem {
  type: 'text' | 'number' | 'date' | 'select';
  default?: string | number;
  readonly?: boolean;
  validators: string[];
}

export interface FormModel {
  entity: string;
  fields: Record<string, FormItem>;
}

const getDefaultValue = (formItem: FormItem) => {
  let result: unknown = null;
  if (formItem.default) {
    result = formItem.default;
  } else {
    switch (formItem.type) {
      case 'number':
        result = formItem.validators.some((v) => v === 'required') ? 0 : '';
        break;
      default:
        result = "''"; // ''
        break;
    }
  }
  return result;
};

export const getFormBuilderDef = (formModel: FormModel) => {
  const result: string[] = [];

  Object.keys(formModel.fields).forEach((f) => {
    const defaultValue = getDefaultValue(formModel.fields[f]);
    const validators = formModel.fields[f].validators.map(
      (v) => `Validators.${v}`
    );
    const data = [defaultValue, ...validators].join(', ');
    result.push(`${f}: [${data}]`);
  });

  return result;
};

export const getHTMLFormFields = (formModel: FormModel) => {
  const result: string[] = [];

  Object.keys(formModel.fields).forEach((f) => {
    const htmlField = [
      `<div class="form-group-item">`,
      `<label for="${f}">${formModel.entity}.${f.toLowerCase()}</label>`,
      `<input id="${f}" type="${formModel.fields[f].type}" class="form-item" formControlName="${f}" (blur)="validateForm()"/>`,
      `</div>`,
    ];
    result.push(...htmlField);
  });

  return result;
};
