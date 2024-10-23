import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./database.server";
import bcrypt from "bcryptjs";

const SESSION_SECRET = process.env.SESSION_SECRET;

// in production, should use https,
// but here in dev server we use http
const sessionStorage = createCookieSessionStorage({
  cookie: {
    // secure set to true means https
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET], // agnostic to frontend
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true, // prevents client side javascript accessing cookie
  },
});

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  console.log("createUserSession-userId: " + JSON.stringify(userId));

  session.set("userId", userId); // gen cookie associated with user
  // redirect and also send generated cookie to browser
  // that requested login/signup

  return redirect(redirectPath, {
    headers: {
      // dash in key requires it to be in quote to be valid JS
      "Set-Cookie": await sessionStorage.commitSession(session),
      //   "Set-Cookie": await commitSession(session),
    },
  });
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");
  if (!userId) {
    return null;
  }
  return userId;
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    throw redirect("/auth?mode=login");
  }

  return userId;
}

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    // not a response error, Error is a regular js object
    // won't trigger the usual error boundary
    const error = new Error("This email is already in use.");
    error.status = 422; // incorrect user input
    throw error;
  }

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);

  const user = await prisma.user.create({
    data: { email: email, password: passwordHash },
  });

  // return redirect response that includes session cookie
  return createUserSession(user.id, "/expenses");
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  console.log("existingUser: " + JSON.stringify(existingUser));

  if (!existingUser) {
    const error = new Error("Cannot login, no such user! Check credentials.");
    error.status = 401;
    throw error;
  }
  const passwordCorrect = await bcrypt.compareSync(
    password,
    existingUser.password
  );
  console.log("passwordCorrect: " + passwordCorrect);

  if (!passwordCorrect) {
    const error = new Error("Cannot login! Check password.");
    error.status = 401;
    throw error;
  }

  // return redirect response that includes session cookie
  return createUserSession(existingUser.id, "/expenses");
}
