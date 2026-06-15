import { IBuddyRepository } from "../../application/interfaces/buddy.repository.js";
import { Buddy } from "../../domain/entities/buddy.entity.js";
import { BuddyTier } from "../../domain/value-objects/buddy-tier.vo.js";

export class InMemoryBuddyRepository implements IBuddyRepository {
  private buddies: Map<string, Buddy> = new Map();

  constructor() {
    this.seed();
  }

  public async findById(id: string): Promise<Buddy | null> {
    const buddy = this.buddies.get(id);
    return buddy || null;
  }

  public async save(buddy: Buddy): Promise<void> {
    this.buddies.set(buddy.id, buddy);
  }

  private seed(): void {
    // Verified Pro certified buddy (Ready for booking)
    const proBuddy = Buddy.reconstitute({
      id: "a1a1a1a1-b2b2-c3c3-d4d4-e5e5e5e5e5e5",
      tier: BuddyTier.PRO,
      isVerified: true,
      rating: 4.8,
      reviewCount: 32,
      bio: "Certified fitness instructor with 10+ years experience in personal training and sports medicine. Focused on endurance and strength scaling.",
      gymLocation: "Gold's Gym Mall Indonesia"
    });

    // Unverified Silver buddy (Awaiting verification)
    const silverBuddy = Buddy.reconstitute({
      id: "f1f1f1f1-e2e2-d3d3-c4c4-b5b5b5b5b5b5",
      tier: BuddyTier.SILVER,
      isVerified: false,
      rating: 4.2,
      reviewCount: 4,
      bio: "Calisthenics enthusiast. Ready to help you start your weight-loss or bulk-up journey with high motivation.",
      gymLocation: "Celebrity Fitness Kota Kasablanka"
    });

    this.buddies.set(proBuddy.id, proBuddy);
    this.buddies.set(silverBuddy.id, silverBuddy);
  }
}
