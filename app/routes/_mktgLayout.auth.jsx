import authStyles from '~/styles/auth.css?url';
import AuthForm from '~/components/auth/AuthForm'

export default function AuthPage() {
  return <AuthForm />;
}

export async function action({request}) {
  const searcParams = new URL(request.url).searchParams;
  const authMode = searcParams.get('mode') || 'login';

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  // validate user input

  if (authMode === 'login'){
    // login logic
  } else {
    // sign up logic
  }
}

export function links() {
  return [{ rel: 'stylesheet', href: authStyles }];
}