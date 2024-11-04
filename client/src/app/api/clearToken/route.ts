import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  return Response.json({ msg: "Worked" });
}
