import {
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
// import "./tailwind.css";

import sharedStyles from "~/styles/shared.css?url";
import Error from "./components/util/Error";

export function Layout({ title, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>Heading in Root</header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// for all errors, caught or uncaught ...
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    // error with status, status.text and message 
    // : no status, no status text  : nothing, unknown
    <div>
      {isRouteErrorResponse(error) ? (
        <Layout title={error.status}>
          <main>
            <Error title={error.status}>
              <h1>
                {error.status} {error.statusText}
              </h1>
              <p>
                {error.data?.message ||
                  "Something went wrong, please try again later!"}
              </p>
              <p>
                Back to <Link to="/">safety</Link>.
              </p>
            </Error>
          </main>
        </Layout>
      ) : error instanceof Error ? (
        <Layout title={error}>
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </Layout>
      ) : (
        <Layout title={error}>
          <h1>Unknown Error</h1>
        </Layout>
      )}
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}

export default function App() {
  return <Outlet />;
}
