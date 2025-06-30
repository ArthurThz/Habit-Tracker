import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { activityDashboardDataSchema } from "@/schemas/dashboard-response-schema";
import { getDashboarData } from "@/lib/db/dashboard/getDashboardData";
import { HttpError } from "@/types/http-error";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new HttpError("No session found", 401);
  }

  const userId = session.user.id;

  try {
    const rawData = await getDashboarData({ userId });

    const parsedData = activityDashboardDataSchema.safeParse(rawData);

    if (!parsedData.success) {
      throw new HttpError("Invalid data format", 400);
    }

    return NextResponse.json(
      {
        success: true,
        data: parsedData.data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    if (err instanceof HttpError) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
