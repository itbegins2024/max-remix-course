import { redirect, useLoaderData, useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";

import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

// 1. id does not exist handle in ExpenseForm component
// 2. empty expense list? hand inside expense expense layout UI

// ordinarily, entering a non-existent id route expenses/xyz 
// in the url will invoke the empty add expense form
// but this situation can be rectified with Error Handling 
// inside the form 
export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}

// in order to speed up rendering,
// all nested route are executed in parallel
// in this case /expenses and /expenses/$id
// export async function loader({ params }) {
//   console.log("EXPENSE ID LOADER");
//   const expenseId = params.id;
//   const expense = await getExpense(expenseId);
//   return expense;
// }

// moving forward ...
// This loader was removed since data was already fetched in parent route

export async function action({ params, request }) {
  // this function is triggered upon non-get request
  // i.e., POST request, in the ExpenseForm
  const expenseId = params.id;

  if (request.method === "PATCH") {
    const formdata = await request.formData();
    const expenseData = Object.fromEntries(formdata);

    try {
      validateExpenseInput(expenseData);
    } catch (error) {
      return error;
    }

    await updateExpense(expenseId, expenseData);
    return redirect("/expenses");
    
  } else if (request.method === "DELETE") {
    await deleteExpense(expenseId);
    // return redirect('/expenses'); // this redirects to a pade we are already at
    return { deletedId: expenseId };  // so we simply send some json
  }
}
