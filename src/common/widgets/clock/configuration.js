import {
  fontWeight,
  fontSize,
  backgroundColor,
  textCase
} from '../commonConfigurations';

export default {
  label: 'Clock',
  fields: [{
    label: 'Date Format',
    key: 'dateFormat',
    renderer: 'dateFormat'
  },
  {
    label: 'Styling',
    key: 'style',
    children: [{
      label: 'Container',
      key: 'container',
      children: [backgroundColor]
    },
    {
      label: 'Date',
      key: 'date',
      children: [fontSize, fontWeight, textCase]
    },
    {
      label: 'Time',
      key: 'time',
      children: [fontSize, fontWeight, textCase]
    }]
  }]
};
