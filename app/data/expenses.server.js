import { prisma } from "./database.server";

export async function addExpense(expenseData, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount, // + converts string to num
        date: new Date(expenseData.date), //convert string to date
        User: { connect: { id: userId } },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add expense.");
  }
}

// retrieve all expenses recorded in DB
export async function getExpenses(userId) {
  if(!userId){
    throw new Error('Failed to get expense.');
  }
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId }, // userId: userId
      orderBy: { date: "desc" },
    });
    return expenses;
  } catch (error) {
    console.log(error);
    throw new Error("failed to get expenses.");
  }
}

export async function getExpense(id) {
  try {
    const expense = prisma.expense.findFirst({ where: { id } });
    return expense;
  } catch (error) {
    console.log(error);
    throw new Error("failed to get expense.");
  }
}

export async function updateExpense(id, expenseData) {
  try {
    await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount, // + converts string to num
        date: new Date(expenseData.date), //convert string to date
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update expense.");
  }
}

export async function deleteExpense(id) {
  try {
    await prisma.expense.delete({
      // where: { id: 'abc' }, // simulate non-existent error
      where: { id },
    });
  } catch (error) {
    console.log("delete error: " + error);
    throw new Error("Failed to delete expense.");
  }
}
