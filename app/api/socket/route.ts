import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // This endpoint is for Socket.IO to upgrade the connection
  // The actual Socket.IO server needs to be initialized in server.ts or a custom server
  return new Response("Socket.IO endpoint", { status: 200 });
}

export const dynamic = "force-dynamic";
