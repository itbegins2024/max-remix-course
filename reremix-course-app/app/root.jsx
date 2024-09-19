import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
// import "./tailwind.css";

import sharedStyles from "~/styles/shared.css?url";

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          Heading in Root
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}

export default function App() {
  return <Outlet />;
}
