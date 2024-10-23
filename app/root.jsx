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
import ErrorPage from "./components/util/Error";

// export const meta = () => ({
//   charSet: "utf-8",
//   title: "New Remix App",
//   viewport: "width=device-width,initial-scale=1",
// });
// export function meta() {
//   return [
//     {
//       title: "All Notes",
//       description: "Manage all your notes",
//     },
//   ];
// }
export const meta = () => {
  return [
    { title: "Very cool app | Remix" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
};

export function Layout({ title, children }) {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
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
    <>
      {isRouteErrorResponse(error) ? (
        <Layout title={error.status}>
          <main>
            <ErrorPage title={error.status}>
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
            </ErrorPage>
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
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}

export default function App() {
  return <Outlet />;
}
