import api from '~/core/api';

export const getTournaments = () =>
  api.get('/tournaments').then((res) => res.data);

export const createTournament = (data) =>
  api.post('/tournaments', data).then((res) => res.data);

export const updateTournament = (id, data) =>
  api.put(`/tournaments/${id}`, data).then((res) => res.data);
