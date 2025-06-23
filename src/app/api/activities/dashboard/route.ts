import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { activityDashboardDataSchema } from "@/schemas/dashboard-response-schema";
import { getDashboarData } from "@/lib/db/dashboard/getDashboardData";

export async function GET(request: Request) {
  const session = await getServerSession({ req: request, ...authOptions });
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const rawData = await getDashboarData({ userId });

    const parsedData = activityDashboardDataSchema.parse(rawData);

    return NextResponse.json(
      {
        success: true,
        data: parsedData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
