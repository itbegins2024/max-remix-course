# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

Notes on handling error:
1. All errors caught and uncaught are now handled in the special function ErrorBoundary.
This function configured in the root. jsx diffrentiate errors as 3 options: 
errors with status, status.text and message, or
errors with message and stack, or
errors with nothing presented as "Unknown Error"

==================
Error generated from server api file caught in root.jsx:
Simulate error of deleting non-existing expense using invalid id in expenses.sever.js:
export async function deleteExpense(id) {
  try {
    await prisma.expense.delete({
      where: { id: 'abc' }, 
    });
  } catch (error) {
    console.log(error);
    throw new Error('Failed to delete expense.');
  }

This should throw the error as configured -- Failed to delete expense, using option 2 message & stack

==================
Empty expense list scenario:
Error generated from loader or action function will evaluate as true at isRouteErrorResponse(error) and output option 1 with status, status.text & message

The loader function in the expense.jsx route can be configures with:
  if(!expenses || expenses.length === 0){
    throw json(
      {message: 'Could not find any expense.'},
      {status: 404, statusText: 'No expenses found'}
    ) 
    
But this will eclipse the page leaving no way to add an expense item. Moreover empty list is not an error. This approach results in poor user experience.

ALTERNATIVELY ...
configure a catch boundary right here closer to the issue
this would generate the error on the page withour eclipsing the 
main menu. But this is only marginally better since the add 
button is still prevented from being rendering.

BEST SOLUTION ...
Conditionally render expenses list if !== 0
And render an error section id expenses === 0