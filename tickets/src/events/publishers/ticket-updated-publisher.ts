import { Publisher, Subjects, TicketUpdatedEvent } from '@asptickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
