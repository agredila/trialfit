export enum BookingStatus {
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PAID_ESCROW = "PAID_ESCROW",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REVIEWED = "REVIEWED"
}

export class BookingStatusValue {
  private static readonly allowedTransitions: Record<BookingStatus, BookingStatus[]> = {
    [BookingStatus.PENDING_PAYMENT]: [BookingStatus.PAID_ESCROW, BookingStatus.CANCELLED],
    [BookingStatus.PAID_ESCROW]: [BookingStatus.CONFIRMED, BookingStatus.CANCELLED],
    [BookingStatus.CONFIRMED]: [BookingStatus.COMPLETED, BookingStatus.CANCELLED],
    [BookingStatus.COMPLETED]: [BookingStatus.REVIEWED],
    [BookingStatus.CANCELLED]: [], // Terminal state
    [BookingStatus.REVIEWED]: []   // Terminal state
  };

  constructor(public readonly status: BookingStatus) {}

  /**
   * Validates if a transition from current status to next status is business-logic allowed.
   */
  public canTransitionTo(next: BookingStatus): boolean {
    const allowed = BookingStatusValue.allowedTransitions[this.status];
    return allowed.includes(next);
  }

  public isTerminal(): boolean {
    return BookingStatusValue.allowedTransitions[this.status].length === 0;
  }
}
