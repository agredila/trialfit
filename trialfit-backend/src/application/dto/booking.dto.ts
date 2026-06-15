import { z } from "zod";

export const CreateBookingSchema = z.object({
  seekerId: z.string().uuid("Invalid seeker ID format. Must be a valid UUID."),
  buddyId: z.string().uuid("Invalid buddy ID format. Must be a valid UUID."),
  scheduledAt: z.string().datetime("Scheduled time must be a valid ISO-8601 date string."),
  durationHours: z.number().int().min(1, "Duration must be at least 1 hour.").max(4, "Duration cannot exceed 4 hours.")
});

export type CreateBookingInput = z.infer<typeof CreateBookingSchema>;

export interface BookingOutput {
  id: string;
  seekerId: string;
  buddyId: string;
  scheduledAt: string;
  durationHours: number;
  pricePaid: number;
  status: string;
  createdAt: string;
  xenditInvoiceUrl?: string;
}
