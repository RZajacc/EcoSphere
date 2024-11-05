import { cookies } from "next/headers";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  //   If there is a token return only its value
  if (token) {
    return Response.json({ authorized: true, token: token.value });
  } else {
    return Response.json({ authorized: false, token: undefined });
  }
}

export async function POST() {
  const cookieStore = cookies();
  cookieStore.delete("auth-token");
  return Response.json({ msg: "Logging out successcull" });
}
