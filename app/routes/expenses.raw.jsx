import { getExpenses } from "~/data/expenses.server";

// this is a resource route -- they fetch data
// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     title: "First Expense",
//     amount: 12.99,
//     date: new Date().toISOString(),
//   },
//   {
//     id: "e2",
//     title: "Second Expense",
//     amount: 16.99,
//     date: new Date().toISOString(),
//   },
// ];

// export function loader() {
//   return DUMMY_EXPENSES;
// }

export function loader() {
  console.log("EXPENSES LOADER in raw page");
  return getExpenses();
}