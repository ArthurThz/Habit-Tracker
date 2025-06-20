import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/db/neon";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { activityDashboardDataSchema } from "@/schemas/dashboard-response-schema";

export async function GET(request: Request) {
  const session = await getServerSession({ req: request, ...authOptions });
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const totalResult =
      await dbConnection`SELECT COUNT(*) FROM activities WHERE user_id = ${userId}`;

    const lastActivityResult =
      await dbConnection`SELECT name FROM tasks INNER JOIN 
      activities AS act ON tasks.user_id = act.user_id WHERE act.user_id = ${userId} 
      AND tasks.id = act.task_id ORDER BY act.finish_time DESC LIMIT 1`;

    const longestTimeSpent = await dbConnection`SELECT tasks.name, 
      EXTRACT(EPOCH FROM (finish_time - start_time)) AS timespent_seconds
      FROM activities AS act
      INNER JOIN tasks ON tasks.id = act.task_id
      WHERE act.user_id = ${userId}
      ORDER BY timespent_seconds DESC
      LIMIT 1;`;

    const activitiesConcludedByMonth = await dbConnection`SELECT
      TO_CHAR(start_time, 'FMMonth') AS month,
      COUNT(*) AS tasks
      FROM activities
      WHERE user_id = ${userId}
      GROUP BY TO_CHAR(start_time, 'FMMonth'), EXTRACT(MONTH FROM start_time)
      ORDER BY EXTRACT(MONTH FROM start_time)`;

    const tasksHistory = await dbConnection`SELECT
    TO_CHAR(start_time, 'YYYY-MM-DD') AS date,
    COUNT(*) AS quantity
    FROM activities
    WHERE user_id = ${userId}
    GROUP BY TO_CHAR(start_time, 'YYYY-MM-DD')
    ORDER BY date;`;

    const secondsToMinutes = Math.floor(
      longestTimeSpent[0].timespent_seconds / 60
    );

    const secondsToHours = longestTimeSpent[0].timespent_seconds / 3600;

    const rawData = {
      total: Number(totalResult[0].count),
      lastActivity: lastActivityResult[0] ?? null,
      longestTimeSpent: {
        name: longestTimeSpent[0].name,
        minutes: secondsToMinutes,
        hours: secondsToHours,
      },
      activitiesConcludedByMonth: activitiesConcludedByMonth,
      history: tasksHistory,
    };

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
