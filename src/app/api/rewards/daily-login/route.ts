import { NextRequest, NextResponse } from "next/server";
import {
  REWARD_AMOUNT,
  getLastClaimDate,
  getUserId,
  todayISODate,
} from "@/lib/rewards/daily-login-store";

export async function GET(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const lastClaimDate = getLastClaimDate(userId);
    const eligible = lastClaimDate !== todayISODate();

    return NextResponse.json({
      eligible,
      lastClaimDate,
      rewardAmount: REWARD_AMOUNT,
    });
  } catch (error) {
    console.error("Error fetching daily login reward status:", error);
    return NextResponse.json(
      { error: "Failed to fetch daily login reward status" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
