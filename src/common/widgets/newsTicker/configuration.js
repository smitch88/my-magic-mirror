import {
  backgroundColor
} from '../commonConfigurations';

export default {
  label: 'News',
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
