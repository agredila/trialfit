import { Booking } from "../../domain/entities/booking.entity.js";
import { CreateBookingInput, BookingOutput } from "../dto/booking.dto.js";
import { IBuddyRepository } from "../interfaces/buddy.repository.js";
import { IBookingRepository } from "../interfaces/booking.repository.js";
import { randomUUID } from "crypto";

export class CreateBookingUseCase {
  constructor(
    private readonly buddyRepo: IBuddyRepository,
    private readonly bookingRepo: IBookingRepository
  ) {}

  public async execute(input: CreateBookingInput): Promise<BookingOutput> {
    // 1. Find Buddy
    const buddy = await this.buddyRepo.findById(input.buddyId);
    if (!buddy) {
      throw new Error(`Buddy with ID ${input.buddyId} not found.`);
    }

    // 2. Business Rule: Only verified Buddies can accept bookings
    if (!buddy.isVerified) {
      throw new Error(`Buddy with ID ${input.buddyId} is not verified. Unverified buddies cannot accept bookings.`);
    }

    // 3. Compute Session Price (Duration * Price/Hr)
    const basePrice = buddy.getPrice();
    const finalPricePaid = basePrice * input.durationHours;

    // 4. Instantiate Domain Booking Entity
    const booking = Booking.create({
      id: randomUUID(),
      seekerId: input.seekerId,
      buddyId: input.buddyId,
      scheduledAt: new Date(input.scheduledAt),
      durationHours: input.durationHours,
      pricePaid: finalPricePaid
    });

    // 5. Save to database via Repository
    await this.bookingRepo.save(booking);

    // 6. Return standard presentation DTO
    return {
      id: booking.id,
      seekerId: booking.seekerId,
      buddyId: booking.buddyId,
      scheduledAt: booking.scheduledAt.toISOString(),
      durationHours: booking.durationHours,
      pricePaid: booking.pricePaid,
      status: booking.status,
      createdAt: booking.createdAt.toISOString(),
      xenditInvoiceUrl: `https://checkout.xendit.co/v2/invoices/${randomUUID()}` // Mock checkout url for redirect
    };
  }
}
