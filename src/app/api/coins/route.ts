import { NextResponse } from "next/server";
import { getTopCoins } from "@/lib/coingecko";

export async function GET() {
  try {
    const data = await getTopCoins();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: `Failed to fetch coins: ${message}`,
      },
      { status: 502 },
    );
  }
}
