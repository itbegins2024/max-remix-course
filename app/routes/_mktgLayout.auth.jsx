import authStyles from "~/styles/auth.css?url";
import AuthForm from "~/components/auth/AuthForm";
import { validateCredentials } from "~/data/validation.server";
import { login, signup } from "~/data/auth.server";

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  // validate user input
  try {
    if (authMode === "login") {
      // returning redirect response, including the session cookie
      // credentials will be destructures as email & password
      return await login(credentials);

    } else {
      return await signup(credentials);
    }
  } catch (error) {
    if (error.status === 422) {
      return { credentials: error.message };
    }
  }
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
