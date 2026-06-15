import { IBookingRepository } from "../../application/interfaces/booking.repository.js";
import { Booking } from "../../domain/entities/booking.entity.js";

export class InMemoryBookingRepository implements IBookingRepository {
  private bookings: Map<string, Booking> = new Map();

  public async findById(id: string): Promise<Booking | null> {
    const booking = this.bookings.get(id);
    return booking || null;
  }

  public async save(booking: Booking): Promise<void> {
    this.bookings.set(booking.id, booking);
  }

  public async getAll(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }
}
