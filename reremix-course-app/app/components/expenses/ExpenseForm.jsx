import { Form, Link, useActionData, useNavigation } from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  const validationErrors = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state !== "idle";

  // html element form sent by browser will cause reload with every change,
  // Remix Form is sent by remix, will solve this, no new page download

  // onSubmit handler can be used, useful for validation logic,
  // but the remix action() already does the form submission job.
  return (
    <Form method="post" className="form" id="expense-form">
      <p>
        <label htmlFor="title">Expense Title</label>
        <input type="text" id="title" name="title" required maxLength={30} />
      </p>

      <div className="form-row">
        <p>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            min="0"
            step="0.01"
            required
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" max={today} required />
        </p>
      </div>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Saving ..." : "Save Expense"}
        </button>
        {/* <Link> is used instead of <a> to avoid making another call to backend, causing a download of a new page */}
        <Link to="..">Cancel</Link>
      </div>
    </Form>
  );
}

export default ExpenseForm;
