import api from '~/core/api';

export const getDocumentations = () =>
  api.get('/documentations').then((res) => res.data);
