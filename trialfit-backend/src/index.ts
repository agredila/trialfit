import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { CreateBookingSchema } from "./application/dto/booking.dto.js";
import { CreateBookingUseCase } from "./application/use-cases/create-booking.usecase.js";
import { InMemoryBuddyRepository } from "./infrastructure/database/in-memory-buddy.repository.js";
import { InMemoryBookingRepository } from "./infrastructure/database/in-memory-booking.repository.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

// Middlewares
app.use(cors());
app.use(express.json());

// Initialize Clean Architecture repositories and containers
const buddyRepo = new InMemoryBuddyRepository();
const bookingRepo = new InMemoryBookingRepository();
const createBookingUseCase = new CreateBookingUseCase(buddyRepo, bookingRepo);

/**
 * Health Check Endpoint
 * Highly recommended for Docker or serverless cloud deployments.
 */
app.get("/healthz", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * Discovery Endpoint
 * List pre-seeded buddies.
 */
app.get("/buddies", async (req: Request, res: Response) => {
  try {
    const buddies = [
      await buddyRepo.findById("a1a1a1a1-b2b2-c3c3-d4d4-e5e5e5e5e5e5"),
      await buddyRepo.findById("f1f1f1f1-e2e2-d3d3-c4c4-b5b5b5b5b5b5")
    ]
      .filter((buddy): buddy is NonNullable<typeof buddy> => buddy !== null)
      .map((buddy) => ({
        id: buddy.id,
        tier: buddy.tier,
        isVerified: buddy.isVerified,
        rating: buddy.rating,
        reviewCount: buddy.reviewCount,
        bio: buddy.bio,
        gymLocation: buddy.gymLocation,
      }));

    res.status(200).json({ success: true, data: buddies });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * Booking Generation Endpoint
 * Validates request input strictly with Zod, executes the DDD Use Case.
 */
app.post("/bookings", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // 1. Strict input validation with Zod DTO
    const parsedInput = CreateBookingSchema.safeParse(req.body);
    if (!parsedInput.success) {
      res.status(400).json({
        success: false,
        message: "Invalid input schema validation failed.",
        errors: parsedInput.error.errors
      });
      return;
    }

    // 2. Execute business rule usecase
    const result = await createBookingUseCase.execute(parsedInput.data);

    res.status(201).json({
      success: true,
      message: "Booking successfully initialized. Proceeding to payment redirect.",
      data: result
    });
  } catch (error: any) {
    next(error);
  }
});

// Centralized error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error Handler] ${err.stack}`);
  res.status(500).json({
    success: false,
    message: err.message || "An unexpected internal server error occurred."
  });
});

// Start Express Server
app.listen(port, () => {
  console.log(`[TrialFit Backend] Service running on http://localhost:${port}`);
  console.log(`[TrialFit Backend] Health status: http://localhost:${port}/healthz`);
});
