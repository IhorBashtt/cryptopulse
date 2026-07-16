import { NextResponse } from "next/server";
import { getCoinDetail } from "@/lib/coingecko";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const data = await getCoinDetail(id);

    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: `Failed to fetch coin details: ${message}`,
      },
      { status: 502 },
    );
  }
}
