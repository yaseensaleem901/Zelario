import type { NextRequest } from "next/server";

export const REWARD_AMOUNT = 50;

// In-memory only: resets on server restart since this project has no database yet.
// Shared between the status (GET) and claim (POST) routes.
const lastClaimDateByUser = new Map<string, string>();

export function getUserId(request: NextRequest): string | null {
  const userId = request.headers.get("x-user-id");
  if (userId) return userId;

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);

  return null;
}

export function todayISODate(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getLastClaimDate(userId: string): string | null {
  return lastClaimDateByUser.get(userId) ?? null;
}

export function hasClaimedToday(userId: string): boolean {
  return lastClaimDateByUser.get(userId) === todayISODate();
}

export function recordClaim(userId: string): void {
  lastClaimDateByUser.set(userId, todayISODate());
}
