import { Outlet } from "@remix-run/react";
import marketingStyles from "~/styles/marketing.css";
import MainHeader from "~/components/navigation/MainHeader";

export default function MaketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: marketingStyles }];
}
