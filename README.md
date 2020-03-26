# Shopping Basket Recruitment Test

A skeleton react app and node server designed as a starting point for the Shopping Basket test.

## Outline

You will write a React.js web application to display a list of products, build a shopping basket, and submit the basket to a server.
You may start with the supplied template react app if you wish to use it.

Once done we expect to receive the the code for your website.

## Requirements

You'll need node installed. The instructions also use `yarn` but you can use `npm` instead.

To use the provided template, type `yarn` to install dependencies then `yarn dev` to run the webapp and server together.

(Using npm: `npm install` then `npm run dev`.)

## The problem

We have a server running which provides endpoints for querying the available products, as well as sending orders.

You need to build a website that can show the products to users, allow them to shop by adding products to a basket, then checkout the basket (which will post their selection of products back to the server).

`yarn server` will start the server on port 5000, or `yarn dev` will start both the server and the skeleton react app together.

You are required to build the following pages:

### Product Listing Page

This page will list all the products which are available, with their name, price, image, and buttons to add or remove the product from the basket.

Each product can be added to the basket multiple times.

Somewhere on the product page there will be a basket summary showing the total number of products currenty in the basket, along with the total cost of the basket.

On this page will be a link or button leading to the checkout page.

The product information should be retrieved from the server by your app. The endpoint is `GET http://localhost:5000/api/products`. More detailed API documentation is available in [the swagger documentation](http://localhost:5000/api-docs/) whent the server is running.

### Checkout page

This page will list the products currently in the basket, with the quantity, and the total price (quantity x product price).

There will be a button which checks out the basket.

The endpoint to checkout a basket is is `POST http://localhost:5000/api/checkout`, with the product IDs in the body. More detailed API documentation is available in [the swagger documentation](http://localhost:5000/api-docs/) when the server is running.

The ability to edit the quantities or remove items from this page is out of scope.

### Success page

This page will display a success message and the order number from the server, after your app has successfully checked out.

Returning to another page after successfully checking out will show an empty basket.

## Wireframes

We have included a set of wireframes from our design team demonstrating the functionality of the page. You can find these in the `/wireframes` directory.

Since this is a prototype, there are no designs, and you will not be judged on the style of the page, as long as it is clear and useable.

## Submissions

Once done, please upload the entire codebase as a zip or tarball.
