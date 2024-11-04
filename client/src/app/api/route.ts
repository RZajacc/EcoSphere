import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  //   If there is a token return only its value
  if (token) {
    return Response.json(token.value);
  } else {
    return undefined;
  }
}
