import {
  backgroundColor,
  fontSize,
  fontWeight,
  width,
  textColor
} from '../commonConfigurations';

export default {
  label: 'Weather',
  fields: [{
    label: 'City',
    key: 'city',
    renderer: 'input'
  },
  {
    label: 'Temperature Type',
    key: 'type',
    renderer: 'select',
    options: [
      { value: 'f', label: 'Farenheit' },
      { value: 'c', label: 'Celcius' }
    ]
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
      label: 'Weather Image',
      key: 'weatherImage',
      children: [width]
    },
    {
      label: 'Weather Text',
      key: 'weatherText',
      children: [backgroundColor, textColor, fontSize, fontWeight]
    }]
  }]
};
