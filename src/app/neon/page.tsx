import { neon } from "@neondatabase/serverless";
async function getData() {
  const sql = neon(process.env.DATABASE_URL!);
  const response = await sql`SELECT * FROM users`;
  console.log(response);
  return response[0];
}

export default async function Page() {
  const data = await getData();
  return <>{`id:${data.id} - name:${data.name}`}</>;
}
