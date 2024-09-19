import ExpenseStatistics from "~/components/expenses/ExpenseStatistics";
import Chart from "~/components/expenses/Chart";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "First Expense",
    amount: 12.99,
    date: new Date().toISOString(),
  },
  {
    id: "e2",
    title: "Second Expense",
    amount: 16.99,
    date: new Date().toISOString(),
  },
];

// notice this route does not require expenses list in layout, 
// therefore does not include .expenses in its route path 
// but it does enjoy the layout from _app.jsx, which is routeless

export default function ExpensesAnalysisPage() {
  return (
    <main>
      <Chart expenses={DUMMY_EXPENSES} />
      <ExpenseStatistics expenses={DUMMY_EXPENSES} />
    </main>
  );
}
