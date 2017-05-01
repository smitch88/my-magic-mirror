import {
  backgroundColor
} from '../commonConfigurations';

export default {
  label: 'Calendar',
  fields: [{
    label: 'Styling',
    key: 'style',
    children: [{
      label: 'Container',
      key: 'container',
      children: [backgroundColor]
    }]
  }]
};
