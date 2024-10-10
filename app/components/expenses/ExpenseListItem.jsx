import { Form, Link, useFetcher, useSubmit } from "@remix-run/react";

function ExpenseListItem({ id, title, amount }) {
  // useSubmit() has the same redirect effect as the Form.
  // const submit = useSubmit(); // programatic equivalence to Form
  // remix presumes after submit, navigation is required,
  // use useFetcher() instead
  const fetcher = useFetcher();

  function deleteExpenseItemHandler() {
    const proceed = confirm('Are you sure? Do you want to delete this item?');
    // submit(null, {
    //   method: 'delete',
    //   action: `/expenses/${id}`,
    // });

    if(!proceed){
      return;
    }

    // this sends a delete request without subsequent navigation action
    fetcher.submit(null, { method: "delete", action: `/expenses/${id}` });
  }

  if (fetcher.state !== "idle") {
    return (
      <article className="expense-item locked">
        <p>Deleting ...</p>
      </article>
    );
  }

  return (
    <article className="expense-item">
      <div>
        <h2 className="expense-title">{title}</h2>
        <p className="expense-amount">${amount.toFixed(2)}</p>
      </div>
      <menu className="expense-actions">
        <button onClick={deleteExpenseItemHandler}>Delete</button>

        {/* html form element has no 'delete' http method, 
        but Remix Form does */}
        {/* This list item component is rendered inside expenses route,
        therefore its action method should be coded there, 
        BUT ... the $id route which handles specific exepense item
        makes more sense for action */}

        {/* The following react Form results in the use of redirect the 
        in the target route, namely, _app.expenses.$id. 
        But this is a single page app, there should be not redirects,
        so we revert to use of button with useSubmit, instead, but this has the same
        behavior. 
        Final solution use useFetcher in button. */}

        {/* <Form method="delete" action={`/expenses/${id}`}>
          <button>Delete</button>
        </Form> */}

        {/* to expenses.$id route */}
        <Link to={id}>Edit</Link>
      </menu>
    </article>
  );
}

export default ExpenseListItem;
