import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useMatches,
  useNavigation,
  useParams,
} from "@remix-run/react";

function ExpenseForm() {
  const today = new Date().toISOString().slice(0, 10); // yields something like 2023-09-10
  
  // ExpenseForm component is used in expenses.add route. 
  // On submit, the action function in scope collects input errors
  // which are captured in useActionData(), used here to
  // notify user.
  const validationErrors = useActionData();

  const params = useParams();
  // const expenseData = useLoaderData(); // with child route loader removed this won't work
  
  const matches = useMatches(); // get data from all loaders by route
  console.log("matches: " + JSON.stringify(matches));

  // filter data from loader in parent route, i.e., "routes/_app.expenses"
  const expenses = matches.find(
    (match) => match.id === "routes/_app.expenses"
  ).data;
  // find expense of specific id, i.e., param.id, from expenses list
  const expenseData = expenses.find((expense) => expense.id === params.id);

  // same form is used to add expense (no id)
  // edit expense url has id but maybe non-existent,
  // this handles both
  if(params.id && !expenseData){
    // throw new Response() // Remix only handle error in action or loaders
    return <p>Invalid expense id.</p>
  }

  const navigation = useNavigation();

  // no specific expenseData, populate form fields with ''
  const defaultValues = expenseData
    ? {
        title: expenseData.title,
        amount: expenseData.amount,
        date: expenseData.date,
      }
    : {
        title: "",
        amount: "",
        date: "",
      };

  const isSubmitting = navigation.state !== "idle";

  // html element form sent by browser will cause reload with every change,
  // Remix Form is sent by remix, will solve this, no new page download

  // onSubmit handler can be used, useful for validation logic,
  // but the remix action() already does the form submission job.
  return (
    // same form used for update and new post, 
    // but delete requires no form
    // expenseData only true for update, not new post
    <Form
      method={expenseData ? "patch" : "post"}
      className="form"
      id="expense-form"
    >
      <p>
        <label htmlFor="title">Expense Title</label>
        {/* defaultValue prop is provided by react */}
        <input
          type="text"
          id="title"
          name="title"
          required
          maxLength={30}
          defaultValue={defaultValues.title}
        />
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
            defaultValue={defaultValues.amount}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            max={today}
            required
            defaultValue={
              defaultValues.date ? defaultValues.date.slice(0, 10) : ""
            }
          />
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
