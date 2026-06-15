export enum BuddyTier {
  SILVER = "SILVER",
  GOLD = "GOLD",
  PRO = "PRO"
}

export interface BuddyTierConfig {
  displayName: string;
  pricePerSession: number;
  requiresCertification: boolean;
  requiresInterview: boolean;
}

export class BuddyTierValue {
  private static readonly configs: Record<BuddyTier, BuddyTierConfig> = {
    [BuddyTier.SILVER]: {
      displayName: "Silver Buddy",
      pricePerSession: 100000, // Rp 100.000
      requiresCertification: false,
      requiresInterview: true // Zoom Interview for non-certified
    },
    [BuddyTier.GOLD]: {
      displayName: "Gold Buddy",
      pricePerSession: 150000, // Rp 150.000
      requiresCertification: false,
      requiresInterview: true // Zoom Interview for non-certified
    },
    [BuddyTier.PRO]: {
      displayName: "Pro Buddy (Certified)",
      pricePerSession: 250000, // Rp 250.000
      requiresCertification: true,
      requiresInterview: false
    }
  };

  constructor(public readonly tier: BuddyTier) {}

  public getConfig(): BuddyTierConfig {
    return BuddyTierValue.configs[this.tier];
  }

  public getPrice(): number {
    return this.getConfig().pricePerSession;
  }

  public isCertifiedRequired(): boolean {
    return this.getConfig().requiresCertification;
  }
}
