# Tech Test Write Up

I approached this tech test the same way I like to approach development in general:

- Get a skeleton of the app into source control and deployed to production.
- Adding tooling that speeds up development (e.g. linting and formatting).
- Prototype a basic version of each feature I am building, to validate assumptions.
- Refine the prototype into something ready to release (given this is a tech test I didn't spend too long on refinments!).

## Getting a deployable version of the app

In order to have a version of the app that was simple to deploy I went slightly off piste and migrate the codebase to Next.js 😱

Next.js apps can contain server and client code, and can be easily deployed using Vercel.

Another option here would have been to find a host that could have deployed the existing server and client code separately. But given the limited time for the tech test I went with what I knew, which was Next.js.

## Server rendered pages

Using Next.js allowed me to server render the product page. When the user loads the page they immediately see the full product listing, there is no loading spinner and no extra requests.

This gives a great performance score in Lighthouse.

By server rendering the page we also avoided the hard coded intermittent errors in the products API. But don't worry, I handle the intermittent errors in the checkout API to show I know how to do it 😄

## Storing the basket client side

Ideally the contents of your basket would be stored server side and matched up to your user id.

I did think about doing this, but decided against it mainly due to time constraints.

It would have involved creating a concept of a user and new end points for reading and updating a basket on the server.

Instead I decided to store the basket contents in client side state. This has the unfortunate side effect of losing your basket contents if you ever refresh the page. Not ideal, but a tradeoff given the time constraints.

## Checkout

When it came time to implementing the checkout I noticed that the existing checkout API had a less than ideal interface. It required sending across a duplicate id for each copy of an item in your basket.

I made the call here to modify the API interface to better support the UI. The new interface takes an array of product id and count pairs. This makes it simple to generate the POST body in the front end.

Modifying the API matches how I would approach this problem in general. I will push for changes across the whole stack if that is what gives the best result for the user and code.

## Data related code

When it became clear that adding and removing items from the basket wasn't going to be a trivial affair, I've moved that code out into a reducer so it could be handled away from the component code.

For the less complex code (e.g. submitting payment) I'm happy to leave it within the component until there is a concrete reason to move it out. This strategy helps avoid premature architecture decisions that could make further development more awkward than it needs to be.

## Styling and user experience

I will admit to spending very little time working on the styling, I got the app looking reasonable and followed the designs in the wireframes pretty much exactly.

In a real app a lot more time and effort would be spent on the styling and user experience (e.g. colour, animations, etc).
