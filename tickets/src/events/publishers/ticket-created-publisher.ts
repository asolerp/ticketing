import { Publisher, Subjects, TicketCreatedEvent } from '@asptickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
