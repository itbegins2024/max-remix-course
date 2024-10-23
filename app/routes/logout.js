// this is a js and not jsx file
// because there aren't and components here
import { json } from "@remix-run/node";
import { destroyUserSession } from "~/data/auth.server";


export function action({ request }) {
  if (request.method !== "POST") {
    throw json({ message: "Invalid request method" }, { status: 400 });
  }

  return destroyUserSession(request);
}
