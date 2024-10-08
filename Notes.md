# Next.js 13

Next is a framework for building fast and search engine friendly applications, it's built on top of React.js

**React**: is a library for building interactive UI

**Next**: is a framework a collection of tools libraries and conventions

Next comes with it's own **router** no need for `npm i react-router-dom`, **compiler** transform and minify JS code, **CLI** build and start apps, **Node.js runtime** execute JS code

with Next you can render pages on the server **(SSR)**, improve **SEO**, fast, pre-render pages and serve them when needed **(SSG)**

## Setup development server

`npx create-next-app@latest app-name`

`npx create-next-app@13.4 app-name`

## Project Structure

### app folder/router

this is the container for our route, routes are represented by file-system just create a new folder and it makes a new route with the corresponding name.

in the app folder these files reside beside route folders:

- **favicon.ico**: the favorite icon shown in the title of page
- **global.css**: global styles
- **layout.tsx**: the component that holds the common layout shared among all the subsequent pages
- **page.tsx**: which represents the **home** page in the root of app router and the main entry of the route in it's corresponding folder
- **public**: this folder is used to store public assets like images
- the other files and folder are for configurations and usually there is no need to alter it

## Routing and Navigation

In the app folder create a **users** folder and add a **page.tsx** file with your UI components init this becomes a route **http://localhost:3000/users** which displays your UI, routes in Next is based on convention not configuration which means you can put any other files and folder as long it's not what Next expecting it's inaccessible from the outside/client-side.

for navigation use Next's **Link** component instead of **a** tags this way the not everything is downloaded from the serve instead it's used from the cache which improves performance and reduce band-width this is called **client-side navigation**.

## Client vs Server side rendering

With Next we got two environments to render our components **Client (browser)** and **Server (Node.js runtime)**

- **Client-side Rendering**:
  - large bundles: contend sent as large bundles to the browser to be rendered
  - resource intensive: large bundles require a lot of resources
  - no SEO: search-engine crawlers can't scan the content
  - less secure: all sensitive information ends up on the client side
- **Server-side Rendering**:
  - smaller bundles: only the necessary parts are sent
  - resource efficient: requires less resources
  - SEO: page content is already rendered so search-engines can scan it with no problem
  - more secure: we can keep all sensitive information secure in the server

**Note**:

Server-Side rendering has limitations:

listen to browser events:
access browser APIs: like localStorage, sessionStorage
Maintain state:
Use effects:

## Data Fetching

### Client Side Fetching

- useState()+useEffect()
- React Query
- large bundles
- resource intensive
- no SEO
- less secure
- extra roundtrip to the server

### Serve Side Fetching

With fetching data on the server-side we eliminate all those problems.

using `fetch()` API we can call an endpoint and there is no need for having state, the data is just there ready to be used.

## Caching

we can provide an extra options object to the **fetch()** function which allows to store data in cache or not cache at all `fetch("https://google.com",{cache:{"no-store"}})` or `{next:{revalidate: 10}}` to refresh cache data every 10sec

## Static Rendering

Render pages at build time and send it to the client when they request

by default when you have a call to `fetch()` and the cache is not disabled Next treats the page as static-page

## Dynamic Rendering

which is rendered at request time only rendered when requested

when you disable the cache Next treats the page as dynamic

## Routing Overview

Routing in Next is based on file system (the folder structure inside the app folder represents the routing structure of the app).

### Special Files

- **page.tsx**: this file makes a route publicly accessible
- **layout.tsx**: represents or forms the common UI or UI structure shared among subsequent pages/routes
- **loading.tsx**: the component shown while downloading content from the server
- **route.tsx**: file that handles the API logic
- **not-found.tsx**: for displaying custom error page when an end point is not found
- **error.tsx**: for general custom error page i.e API call failed...

## Dynamic Routes

A dynamic route is a route with a route parameter

start by defining a folder with it's name like this `[id]` or it can be any other parameter not just **id**

then that parameter is accessible in the `page.tsx` file in the props of the main component as **params**

if there is another component that needs to have access to that parameter grab the parameter in the page and pass it as prop to that component

```typescript
type Props = {
  params: {
    id: number;
  };
};

const UserDetails = (props: Props) => {
  return <div>user id: {props.params.id}</div>;
};

export default UserDetails;
```

## Catch All Segments

sometimes we need varying number of parameter in a route i.e **http://localhost:3000/products/grocery/dairy/milk**
in this situation we're not gonna create a separate folder for each one! instead create a `product` folder and inside it create another folder with `[...slug]` name (called it slug because it contains a URL slug like 'grocery/dairy/milk').

```typescript
type Props = {
  params: {
    slug: string[];
  };
};

const ProductPage = ({ params: { slug } }: Props) => {
  return (
    <div>
      ProductPage
      <br />
      {slug}
      <br />
    </div>
  );
};
export default ProductPage;
```

here is a tiny problem! with `[...slug]` we need to pass at least one parameter otherwise we get a **404 page not found** error to fix it we need to make it optional this way `[[...slug]]`

## Accessing Query String Parameters

Query string parameters are additional information attached at the end of a URL, starting with `?` name1=value1`&`name2=value2, `http://locahost:3000/api/products?limit=4&filter=name`

```typescript
// first add searchParams to the interface since query-parameters are passed as second object to the props
type Props = {
  params: {
    slug: string[];
  };
  searchParams: {
    sortOrder: string;
    limit: number;
  };
};

// to catch multiple url segments/slugs create a folder
// with this name "[...segments] "inside of it a page.tsx component
// here we have access to all the url segments passed
// "[...segments]" requires at least one parameter
// to make it optional use "[[...segments]]"
//
//A URL slug refers to the end part of a URL after the backslash (“/”) that identifies the specific page or post. Each slug on your web pages needs to be unique, and they provide readers and search engines alike with information about the contents of a web page or post.

// accessing query-parameters
const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder, limit },
}: Props) => {
  return (
    <div>
      ProductPage
      <br />
      {slug}
      <br />
      <p>sortOrder: {sortOrder}</p>
      <p>limit: {limit}</p>
    </div>
  );
};
export default ProductPage;
```

## Navigation

Next's Link component here is the benefits:

1. only downloads the contents of the target page
2. pre-fetches the links that are in the viewport
3. cache pages on the client

### Programmatic Navigation

Sometimes we need to navigate to a certain page programmatically for this purpose Next provides the `useRouter()` hook which gives access to the router when called (be cautious to import it from `"next/navigation"`)
then use the `push` method to navigate to the route you want.

```typescript
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NewUserPage = () => {
  const router = useRouter(); // userRouter hook is provided to navigate between pages programmatically
  // make sure useRouter is coming from "navigation" the new "app router" not from the "router" which is the old "router"
  // router.push > navigates to the provide route
  // router.back > navigates to the previous route just like back button
  // router.forward > navigates to the previous route just like next button
  // router.refresh > refreshes the page
  return (
    <div>
      {/* this is navigation using the Link component */}
      {/* <Link href={"/users"}> users page</Link>  */}
      <button className="btn" onClick={() => router.push("/users")}>
        users page
      </button>
    </div>
  );
};
export default NewUserPage;
```

## Showing Loading UI

Next provides `loading.tsx` file which contains the loading component and is displayed at loading time

```typescript
const loading = () => {
  return (
    <div className="loading loading-spinner loading-lg">loading users...</div>
  );
};
export default loading;
```

## Handling Not Found Errors

Next provides `not-found.tsx` file which contains the UI that will be displayed if the user is navigating to a page that doesn't exists

```typescript
// this file is one of the special files Next.js looks for, used to show when accessing a route that doesn't exist
//
const NotFound = () => {
  return <div>this is the not found page</div>;
};
export default NotFound;
```

the cool part is that with Next you can have different `not-found` UIs for each route for example: we can have a separate `not-found.tsx` file in the `users/not-found.tsx` route.

there is also a `notFound()` function defined in the `next/navigation` which we can call it and programmatically bring the `not-found` page up.

## Handling Unexpected Errors

Next provides `error.tsx` file which contains the UI that will be displayed if there is an unexpected error like an URL mismatch or server error

```typescript
"use client";
// this component is the one rendered when an unexpected error happens like failed to get data from an api
// this has to be a client-side component
// we have access to the error that occurred through the props

// there is a reset function passed by Next.js along with the error through the props and that allows us to
// give the user a second chance to retry
interface Props {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  console.log("-----------------------------------");
  console.log(error);
  console.log("-----------------------------------");
  return (
    <div>
      Error
      <button onClick={() => reset()} className={"btn"}>
        Retry
      </button>
    </div>
  );
};
export default Error;
```

same as before we can have `error.tsx` file specific for each route if we need to.
