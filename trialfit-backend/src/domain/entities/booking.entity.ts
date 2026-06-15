import { BookingStatus, BookingStatusValue } from "../value-objects/booking-status.vo.js";

export interface BookingProps {
  id: string;
  seekerId: string;
  buddyId: string;
  scheduledAt: Date;
  durationHours: number;
  pricePaid: number;
  status: BookingStatus;
  createdAt: Date;
  xenditInvoiceId?: string;
}

export class Booking {
  private constructor(private props: BookingProps) {}

  public static create(props: Omit<BookingProps, "status" | "createdAt">): Booking {
    return new Booking({
      ...props,
      status: BookingStatus.PENDING_PAYMENT,
      createdAt: new Date()
    });
  }

  public static reconstitute(props: BookingProps): Booking {
    return new Booking(props);
  }

  public get id(): string {
    return this.props.id;
  }

  public get seekerId(): string {
    return this.props.seekerId;
  }

  public get buddyId(): string {
    return this.props.buddyId;
  }

  public get scheduledAt(): Date {
    return this.props.scheduledAt;
  }

  public get durationHours(): number {
    return this.props.durationHours;
  }

  public get pricePaid(): number {
    return this.props.pricePaid;
  }

  public get status(): BookingStatus {
    return this.props.status;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get xenditInvoiceId(): string | undefined {
    return this.props.xenditInvoiceId;
  }

  public setXenditInvoiceId(invoiceId: string): void {
    this.props.xenditInvoiceId = invoiceId;
  }

  /**
   * Performs a secure state transition.
   */
  public transitionTo(nextStatus: BookingStatus): void {
    const stateObj = new BookingStatusValue(this.props.status);
    if (!stateObj.canTransitionTo(nextStatus)) {
      throw new Error(`Invalid state transition from ${this.props.status} to ${nextStatus}`);
    }
    this.props.status = nextStatus;
  }
}
