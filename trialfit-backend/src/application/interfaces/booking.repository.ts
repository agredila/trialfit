import { Booking } from "../../domain/entities/booking.entity.js";

export interface IBookingRepository {
  findById(id: string): Promise<Booking | null>;
  save(booking: Booking): Promise<void>;
}
