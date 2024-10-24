import { Outlet } from "@remix-run/react";
import marketingStyles from "~/styles/marketing.css?url";
import MainHeader from "~/components/navigation/MainHeader";
import { getUserFromSession } from "~/data/auth.server";

export default function MaketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
}

export function loader({request}) {
  return getUserFromSession(request);
}

export function links() {
  return [{ rel: "stylesheet", href: marketingStyles }];
}

// this header would prevent update of changes 
// on this page for 1 hour
export function headers() {
  return {
    'Cache-Control': 'max-age-3600' // 60 mins
  }
}