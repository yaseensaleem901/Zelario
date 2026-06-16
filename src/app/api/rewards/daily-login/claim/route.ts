import { NextRequest, NextResponse } from "next/server";
import {
  REWARD_AMOUNT,
  getUserId,
  hasClaimedToday,
  recordClaim,
} from "@/lib/rewards/daily-login-store";

export async function POST(request: NextRequest) {
  try {
    const userId = getUserId(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (hasClaimedToday(userId)) {
      return NextResponse.json(
        { success: false, message: "You have already claimed today's reward" },
        { status: 409 }
      );
    }

    recordClaim(userId);

    return NextResponse.json({
      success: true,
      message: "Reward claimed successfully",
      rewardAmount: REWARD_AMOUNT,
    });
  } catch (error) {
    console.error("Error claiming daily login reward:", error);
    return NextResponse.json(
      { success: false, message: "Failed to claim daily login reward" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
