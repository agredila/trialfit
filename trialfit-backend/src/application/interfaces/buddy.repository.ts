import { Buddy } from "../../domain/entities/buddy.entity.js";

export interface IBuddyRepository {
  findById(id: string): Promise<Buddy | null>;
  save(buddy: Buddy): Promise<void>;
}
