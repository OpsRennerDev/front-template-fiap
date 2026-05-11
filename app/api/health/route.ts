export const runtime = "edge";

export async function GET() {
  return Response.json({
    status: "ok",
    service: "next-app",
    timestamp: new Date().toISOString(),
  });
}
