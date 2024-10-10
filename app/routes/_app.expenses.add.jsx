import { useNavigate } from "@remix-run/react";
import { redirect } from "@remix-run/node";

import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { addExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";

export default function AddExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate(".."); // back to "/expenses"
  }

  return (
    <Modal onClose={closeHandler}>
      {/* Expenseform is a component with a form object that uses POST request  */}
      {/* when its button is clicked, it activates the action() located in the same scope/route  */}
      {/* action() handles all non-GET requests, export action() enables remix to find it */}
      {/* GET request is handled by remix loader() function  */}
      <ExpenseForm />
    </Modal>
  );
}

// action() is a remix specific fuction, loader() function is another
// "request" in the param is destructured from data.request
// data being a remix object that holds data from form

export async function action({ request }) {
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);
  console.log("Add Expense action: " + JSON.stringify(expenseData), JSON.stringify(formData));

  try {
    validateExpenseInput(expenseData);
  } catch (error) {
    return error;  
    // does not redirect to another page, 
    // but error data can be accessed by ExpenseForm
    // via useActionData()
  }

  await addExpense(expenseData);

  return redirect("/expenses");
}
