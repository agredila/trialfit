import { BuddyTier, BuddyTierValue } from "../value-objects/buddy-tier.vo.js";

export interface BuddyProps {
  id: string; // References User ID
  tier: BuddyTier;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  bio: string;
  gymLocation: string;
}

export class Buddy {
  private constructor(private props: BuddyProps) {}

  public static create(props: Omit<BuddyProps, "isVerified" | "rating" | "reviewCount">): Buddy {
    return new Buddy({
      ...props,
      isVerified: false, // Must be approved by admin
      rating: 0,
      reviewCount: 0
    });
  }

  public static reconstitute(props: BuddyProps): Buddy {
    return new Buddy(props);
  }

  public get id(): string {
    return this.props.id;
  }

  public get tier(): BuddyTier {
    return this.props.tier;
  }

  public get isVerified(): boolean {
    return this.props.isVerified;
  }

  public get rating(): number {
    return this.props.rating;
  }

  public get reviewCount(): number {
    return this.props.reviewCount;
  }

  public get bio(): string {
    return this.props.bio;
  }

  public get gymLocation(): string {
    return this.props.gymLocation;
  }

  public getPrice(): number {
    return new BuddyTierValue(this.props.tier).getPrice();
  }

  public verify(): void {
    this.props.isVerified = true;
  }

  public addReview(newRating: number): void {
    const totalScore = this.props.rating * this.props.reviewCount + newRating;
    this.props.reviewCount += 1;
    this.props.rating = parseFloat((totalScore / this.props.reviewCount).toFixed(1));
  }
}
