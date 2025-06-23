import { dbConnection } from "./neon";

export const getDashboarData = async ({ userId }: { userId: string }) => {
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
      DATE_TRUNC('day', start_time AT TIME ZONE 'UTC') AS date,
      COUNT(*) AS quantity
      FROM activities
      WHERE user_id = ${userId}
      GROUP BY date
      ORDER BY date`;

  const frequentTasksByName = await dbConnection`
      SELECT tasks.name, COUNT(*) AS count
      FROM activities AS act
      INNER JOIN tasks ON tasks.id = act.task_id
      WHERE act.user_id = ${userId}
      GROUP BY tasks.name
      ORDER BY count DESC
      LIMIT 5
    `;

  const frequentTasksByNameFormated = frequentTasksByName.map((item) => ({
    name: item.name,
    count: Number(item.count),
  }));

  const historyFormatted = tasksHistory.map((item) => ({
    date: new Date(item.date).toISOString(),
    quantity: Number(item.quantity),
  }));
  const secondsToMinutes = Math.floor(
    longestTimeSpent[0].timespent_seconds / 60
  );

  const secondsToHours = longestTimeSpent[0].timespent_seconds / 3600;

  return {
    total: Number(totalResult[0].count),
    lastActivity: lastActivityResult[0] ?? null,
    longestTimeSpent: {
      name: longestTimeSpent[0].name,
      minutes: secondsToMinutes,
      hours: secondsToHours,
    },
    activitiesConcludedByMonth: activitiesConcludedByMonth,
    history: historyFormatted,
    frequentTasksByName: frequentTasksByNameFormated,
  };
};
