export const backgroundColor = {
  label: 'Background',
  key: 'backgroundColor',
  renderer: 'colorPicker'
};

export const fontWeight = {
  label: 'Font Weight',
  key: 'fontWeight',
  renderer: 'select',
  options: [
    { value: '100', label: '100 - Ultra Thin' },
    { value: '200', label: '200 - Thin' },
    { value: '300', label: '300 - Semi Thin' },
    { value: '400', label: '400 - Normal' },
    { value: '500', label: '500 - Semi Bold' },
    { value: '600', label: '600 - Bold' },
    { value: '700', label: '700 - Ultra Bold' }
  ]
};

export const fontSize = {
  label: 'Font Size',
  key: 'fontSize',
  renderer: 'number'
};

export const height = {
  label: 'Height (px)',
  key: 'height',
  renderer: 'pixel'
};

export const textCase = {
  label: 'Text Case',
  key: 'textTransform',
  renderer: 'select',
  options: [
    { value: 'uppercase', label: 'Uppercase' },
    { value: 'lowercase', label: 'Lowercase' }
  ]
};

export const textColor = {
  label: 'Text Color',
  key: 'color',
  renderer: 'colorPicker'
};

export const width = {
  label: 'Width (px)',
  key: 'width',
  renderer: 'pixel'
};
