import { prisma } from "./database.server";

export async function addExpense(expenseData) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount, // + converts string to num
        date: new Date(expenseData.date), //convert string to date
        dateAdded: expenseData.dateAdded,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// retrieve all expenses recorded in DB
export async function getExpenses() {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: { date: "desc" },
    });
    return expenses;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
