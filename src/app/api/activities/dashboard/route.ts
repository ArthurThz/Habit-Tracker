import { NextResponse } from "next/server";
import { dbConnection } from "@/lib/neon";

export async function GET(request: Request) {

    const {searchParams} = new URL(request.url)

    const userId = searchParams.get("userId")
  


  try {
   const totalResult = await dbConnection`SELECT COUNT(*) FROM activities WHERE user_id = ${userId}`

   const lastActivityResult = await  dbConnection`SELECT name FROM tasks INNER JOIN activities AS act ON tasks.user_id = act.user_id WHERE act.user_id = ${userId} ORDER BY act.finish_time DESC LIMIT 1`

  return NextResponse.json({
    success:true,
    data:{
        total:Number(totalResult[0].count),
        lastActivity:lastActivityResult[0] ?? null
    }
  },{status:200})




  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
