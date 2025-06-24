import api from '~/core/api';

export const getTicket = ({ ticketId }) =>
  api.get(`/tickets/${ticketId}`).then((res) => res.data);

export const createTicket = (formData) =>
  api.post('/tickets', formData).then((res) => res.data);

export const createTicketMessage = (ticketId, formData) =>
  api
    .post(`/tickets/${ticketId}/ticket_messages`, formData)
    .then((res) => res.data);

export const getTicketMessages = ({ ticketId }) =>
  api.get(`/tickets/${ticketId}/ticket_messages`).then((res) => res.data);
