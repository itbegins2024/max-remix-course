import { PrismaClient } from '@prisma/client';

// using .server in file name prevents remix from confusing it for front end, thus exposing it 
// this is a security feature

/**
 * @type PrismaClient
 */
let prisma;

// checking if in production or dev mode
// but if in dev mode as now, prevent multiple DB connections
// as happens in dev with multiple reloads in as many restarts
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  prisma = global.__db;
}

export { prisma }; 