import { Link, useSearchParams } from "@remix-run/react";
import { FaLock, FaUserPlus } from "react-icons/fa";

// url parameter shape -- path?name=value e.g., auth/mode=login
function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  //if null use default/alternative
  const authMode = searchParams.get("mode") || "login"; // in mode not set, "login" is default value
  const submitBtnCaption = authMode === "login" ? "Login" : "Create User"; // true logic
  const toggleBtnCaption =
    authMode === "login" ? "Create a new user" : "Login with existing user"; // rev logic

  return (
    <>
      <form method="post" className="form" id="auth-form">
        <div className="icon-img">
          {authMode === "login" ? <FaLock /> : <FaUserPlus />}
        </div>
        <p>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" minLength={7} />
        </p>
        <div className="form-actions">
          <button>{submitBtnCaption}</button>
          {/* link to a relative path (no "/auth") just the endpoint name  */}
          {/* observe thi Link toggling param in the path when it is repeatedly clicked !!!!! */}
          <Link to={authMode === "login" ? "?mode=signup" : "?mode=login"}>
            {toggleBtnCaption}
          </Link>
        </div>
      </form>
      ;
    </>
  );
}

export default AuthForm;
