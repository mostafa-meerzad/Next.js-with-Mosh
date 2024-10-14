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

## Handling API Calls

As a best practice inside the app router create a `api` folder and put all your api endpoints init.
a route handler is a function that handles an http request

### Getting a collection of objects

```typescript
import { NextRequest, NextResponse } from "next/server";

// if you add this request argument in the route-handler `function GET(request: NextRequest)` the Next.js will not cache the results, if you remove it will do so `function GET()`

// export a function with GET name to handle get requests
export function GET(request: NextRequest) {
  // return NextResponse.json("hello")
  // return NextResponse.json([
  // { id: 1, name: "John" },
  // { id: 2, name: "Sam" },
  // ]);

  // now instead of hard coding the user objects we query the DB to get the users
  const users = [{ user1 }, { user2 }];
  // console.log(users);
  return NextResponse.json(users);
}
```

### Getting a single object

just like the way we access route params in the page components we do the same thing here but the params are passed as the second argument to the route handler

```typescript
import { NextRequest, NextResponse } from "next/server";

// one way
// interface Props {
//   params: {
// id: number;
//   };
// }

export function GET(request: NextRequest, props: Props) {}
// or destructure it
export function GET(request: NextRequest, { params }: Props) {}
// or
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {}
```

### Creating an object

just like the GET request handler we export a function with `POST` name which is responsible for handling POST requests

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json(); // request.json() return a promise!
  //----------------------------
  // in this function we want to return whatever get in the request body
  return NextResponse.json(body);
}
```

### Updating an object

```typescript
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // todo
  // validate the request, if not valid return 400
  // find product and update in db, if not found return 404
  // return updated product object
}
```

### Deleting an object

```typescript
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // todo
  // if invalid id return 404
  // delete product and return
  if (params.id > 10) {
    return NextResponse.json({ error: "product not found" }, { status: 404 });
  }
  return NextResponse.json({}, { status: 201 });
}
```

## Validating Requests with Zod

### What is Zod?

Zod is a TypeScript-first schema declaration and validation library. It's designed to help you define the structure of your data in a clear, type-safe way. With Zod, you can validate user inputs, API responses, or any other form of data that needs to adhere to a specific structure. It works seamlessly with TypeScript, ensuring that the types you define with Zod are automatically inferred throughout your codebase.

### Key Features:

- **Schema Declaration**: Define the shape of your data, including types, length constraints, and custom validation rules.
- **Validation**: Validate inputs against the declared schema, and get detailed error messages when validation fails.
- **Type Inference**: Automatically infers TypeScript types from the schema you define.

### How to Use Zod with Next.js and TypeScript

1. **Install Zod**

   First, install Zod in your Next.js project:

   ```bash
   npm install zod
   ```

2. **Defining Schemas**

   Zod allows you to define schemas that represent the shape of your data. For example, if you're building a form with user inputs, you can define a Zod schema for the data:

   ```ts
   import { z } from "zod";

   const userSchema = z.object({
     name: z.string().min(1, "Name is required"),
     email: z.string().email("Invalid email address"),
     age: z.number().int().min(18, "Must be at least 18 years old"),
   });
   ```

   This schema defines that the data should have a `name` (required string), `email` (valid email), and `age` (integer, at least 18).

3. **Using Zod for Form Validation in a Next.js API Route**

   When handling form submissions in a Next.js API route, you can use Zod to validate the incoming data:

   ```ts
   // /pages/api/register.ts
   import { NextApiRequest, NextApiResponse } from "next";
   import { z } from "zod";

   // Define a schema for the request body
   const registerSchema = z.object({
     name: z.string().min(1),
     email: z.string().email(),
     password: z.string().min(6),
   });

   export default function handler(req: NextApiRequest, res: NextApiResponse) {
     if (req.method !== "POST") {
       return res.status(405).json({ message: "Method not allowed" });
     }

     // Validate the incoming request body
     const result = registerSchema.safeParse(req.body);

     if (!result.success) {
       // If validation fails, send the errors back to the client
       return res.status(400).json(result.error);
     }

     // Proceed with valid data
     const { name, email, password } = result.data;
     // Continue handling the registration logic...

     res.status(200).json({ message: "User registered successfully!" });
   }
   ```

   In this example, the API route validates the incoming POST request body against the `registerSchema`. If validation fails, it returns a 400 status code along with the validation errors. Otherwise, it proceeds with the validated data.

4. **Using Zod in the Frontend**

   You can also use Zod for validating form inputs on the client side before submitting to the server. For example, when a user fills out a form, you can validate the form data before sending it to the API.

   ```ts
   import { useState } from "react";
   import { z } from "zod";

   const registerSchema = z.object({
     name: z.string().min(1),
     email: z.string().email(),
     password: z.string().min(6),
   });

   const RegisterForm = () => {
     const [formData, setFormData] = useState({
       name: "",
       email: "",
       password: "",
     });
     const [errors, setErrors] = useState<{ [key: string]: string }>({});

     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();

       // Validate the form data with Zod
       const result = registerSchema.safeParse(formData);

       if (!result.success) {
         // Extract and display validation errors
         const errorMessages = result.error.errors.reduce(
           (acc: any, err) => ({ ...acc, [err.path[0]]: err.message }),
           {}
         );
         setErrors(errorMessages);
         return;
       }

       // If the form is valid, send the data to the server
       const response = await fetch("/api/register", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(result.data),
       });

       const data = await response.json();
       console.log(data);
     };

     return (
       <form onSubmit={handleSubmit}>
         <div>
           <label>Name:</label>
           <input
             type="text"
             value={formData.name}
             onChange={(e) =>
               setFormData({ ...formData, name: e.target.value })
             }
           />
           {errors.name && <span>{errors.name}</span>}
         </div>
         <div>
           <label>Email:</label>
           <input
             type="email"
             value={formData.email}
             onChange={(e) =>
               setFormData({ ...formData, email: e.target.value })
             }
           />
           {errors.email && <span>{errors.email}</span>}
         </div>
         <div>
           <label>Password:</label>
           <input
             type="password"
             value={formData.password}
             onChange={(e) =>
               setFormData({ ...formData, password: e.target.value })
             }
           />
           {errors.password && <span>{errors.password}</span>}
         </div>
         <button type="submit">Register</button>
       </form>
     );
   };

   export default RegisterForm;
   ```

### Zod and TypeScript Integration

Zod is built with TypeScript in mind, which means the types are automatically inferred based on the schema. You can also extract the TypeScript types from Zod schemas for reuse:

```ts
const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number(),
});

// Infer TypeScript types from Zod schema
type User = z.infer<typeof userSchema>;

const user: User = {
  name: "John Doe",
  email: "john@example.com",
  age: 25,
};
```

This makes Zod a powerful tool for ensuring type safety across your Next.js applications.

### Conclusion

Zod is a great library for validating data in Next.js applications, both on the server and client sides. With its TypeScript-first approach, it offers seamless integration with your TypeScript codebase, making it easy to enforce strict type safety and data validation.

## Database Integration

### Prisma overview

Prisma is an open-source ORM (Object-Relational Mapping) tool for Node.js and TypeScript. It simplifies database access by allowing you to interact with your database using a type-safe and auto-generated query API, instead of writing raw SQL queries.

Here’s how Prisma works and why it’s useful:

### Key Features of Prisma:

1. **Schema Definition**: You define your database schema in a `prisma.schema` file using Prisma's schema language. This schema is then used to generate the database structure and the TypeScript client.

2. **Type-Safe Database Queries**: Prisma auto-generates TypeScript types for your models based on the schema. This makes sure that your database queries are type-safe, so you’ll catch errors during development.

3. **Database Abstraction**: Prisma allows you to work with your database at a higher level. You don't need to write SQL directly; instead, you use Prisma's query API to interact with the database.

4. **Supports Multiple Databases**: Prisma works with popular databases like PostgreSQL, MySQL, SQLite, SQL Server, and even MongoDB.

5. **Migration System**: Prisma offers a built-in migration system that tracks changes to your schema and applies them to your database, similar to other tools like `Knex` or `Sequelize`.

### How it works:

1. **Prisma Client**: After defining your schema, you generate the Prisma Client. This client provides a query API for accessing your database, and it’s fully typed, which means you'll get auto-completion and error-checking when writing queries.
2. **Migration**: With Prisma Migrate, you can easily evolve your database schema over time. It generates SQL migration files that can be applied to your database to keep it up-to-date.

3. **Prisma Studio**: Prisma also provides a web-based UI called Prisma Studio for visualizing and interacting with your data. You can explore your database, add records, and modify them directly through this interface.

### Why use Prisma?

- **Type safety**: Ensures that the queries match your database schema and helps catch potential bugs early.
- **Auto-generated queries**: You don't have to write boilerplate SQL or worry about common SQL injection issues.
- **Database agnostic**: Prisma works with multiple databases and abstracts away many database-specific details.
- **Migration management**: Its migration tool helps you keep track of database schema changes without manually writing SQL migration scripts.

Here’s an example of how you might query a database using Prisma:

```typescript
const users = await prisma.user.findMany({
  where: {
    email: "test@example.com",
  },
});
```

Prisma makes it easier for full-stack developers to work with databases, especially when combined with technologies like Next.js or GraphQL.

### Working with Prisma

Let's walk through **Prisma** step by step with detailed explanations to help you get started. I’ll guide you through setting it up, using the Prisma schema, performing basic queries, and managing database migrations.

### Step 1: Setting up Prisma

#### 1.1 Prerequisites:

Before using Prisma, make sure you have these tools installed:

- **Node.js** (v14 or later)
- A package manager like `npm` or `yarn`

#### 1.2 Initialize a Node.js project:

If you haven’t already, create a new Node.js project:

```bash
mkdir my-prisma-project
cd my-prisma-project
npm init -y
```

#### 1.3 Install Prisma:

Install Prisma and its CLI to your project:

```bash
npm install prisma --save-dev
```

After installation, you need to initialize Prisma to generate the initial files:

```bash
npx prisma init
```

This creates a `prisma` directory and a `.env` file in your project. The `prisma` folder contains a file called `schema.prisma`, which is where you define your database models.

#### 1.4 Setting up the database:

In the `.env` file, you’ll find this line:

```env
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

Replace the `DATABASE_URL` with the connection string of the database you want to use. Prisma supports databases like **PostgreSQL, MySQL, SQLite, MongoDB**, etc. Here’s an example for SQLite:

```env
DATABASE_URL="file:./dev.db"
```

### Step 2: Defining Your Schema

The `schema.prisma` file defines your data models, their fields, relationships, and more. Here’s an example of what it looks like:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"   // Define the database provider
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  posts     Post[]   // Relation to the Post model
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}
```

### Explanation of the schema:

- **generator client**: This section tells Prisma to generate a JavaScript/TypeScript client that you'll use to interact with your database.
- **datasource db**: Defines the database connection details, such as the database provider (SQLite in this case).
- **model User** and **model Post**: These are the models (tables in the database). Each model maps to a table, and its fields represent the table columns.
  - `@id`: Marks the `id` field as the primary key.
  - `@default`: Sets default values, like auto-incrementing IDs or timestamps.
  - `@relation`: Defines relationships between models. In the `Post` model, the `user` field links the post to the `User` table.

### Step 3: Applying Migrations (Database Schema Changes)

Once you’ve defined your models, you need to apply these models to your database. Prisma will generate the necessary SQL to create the tables.

#### 3.1 Generate the migration:

Run the following command to create a migration file and update your database schema:

```bash
npx prisma migrate dev --name init
```

This command:

- **`--name init`**: Names the migration (you can use any descriptive name).
- Applies the migration to your database, creating the tables defined in `schema.prisma`.

#### 3.2 Generate Prisma Client:

After the migration, you need to generate the Prisma client, which will be used in your code:

```bash
npx prisma generate
```

This creates a fully typed client that you’ll use to interact with the database.

### Step 4: Using Prisma in Your Code

You can now start querying your database with Prisma! Here's how you might use it in your Node.js project.

#### 4.1 Connect to Prisma:

First, import and initialize the Prisma client in your code:

```javascript
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
```

#### 4.2 Perform CRUD Operations:

With Prisma, you can easily perform **CRUD** (Create, Read, Update, Delete) operations.

- **Create a new user**:

```javascript
async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
    },
  });
  console.log(newUser);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
```

- **Read (find) users**:

```javascript
const allUsers = await prisma.user.findMany();
console.log(allUsers);
```

- **Update a user**:

```javascript
const updatedUser = await prisma.user.update({
  where: { email: "alice@example.com" },
  data: { name: "Alice Wonderland" },
});
console.log(updatedUser);
```

- **Delete a user**:

```javascript
const deletedUser = await prisma.user.delete({
  where: { email: "alice@example.com" },
});
console.log(deletedUser);
```

### Step 5: Managing Relationships

Prisma also makes working with relationships easy. For example, if you want to create a post for a user:

```javascript
const newPost = await prisma.post.create({
  data: {
    title: "Prisma is awesome!",
    content: "Learn how to use Prisma with this tutorial.",
    user: {
      connect: { email: "alice@example.com" }, // Connect to an existing user by email
    },
  },
});
```

You can query related records using **nested queries**:

```javascript
const userWithPosts = await prisma.user.findUnique({
  where: { email: "alice@example.com" },
  include: { posts: true }, // Include related posts
});
console.log(userWithPosts);
```

### Step 6: Prisma Studio

Prisma comes with **Prisma Studio**, a web-based GUI to view and edit your data visually. To run Prisma Studio, simply run:

```bash
npx prisma studio
```

This opens a browser interface where you can see all the tables, records, and even modify the data manually.

### Summary of the Flow:

1. **Install Prisma** and initialize your project.
2. Define your database schema in `schema.prisma`.
3. Run migrations to create/update your database schema.
4. Use the Prisma Client to query your database.
5. Utilize Prisma Studio for visual data management.

By now, you should have a good understanding of how to set up Prisma, define schemas, work with migrations, and perform basic queries. Let me know if you’d like help with any specific part!

## Authentication

1. Set up NextAuth using their guides provided on the website
2. configure a project in google
3. and you're ready to use your app

### Accessing sessions on the client

next-auth provides a `useSession` hook that gives the essential info about the logged-in user

```typescript
"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <nav className="flex gap-2 bg-gray-500 p-3">
      <Link href={"/"}>Home</Link>
      <Link href={"/users"}>Users</Link>
      <Link href={"/admin"}>Admin</Link>
      <Link href={"/products"}>Products</Link>
      {status === "loading" && <div>loading...</div>}
      {status === "unauthenticated" && (
        <Link href={"/api/auth/signin"}>Login</Link>
      )}
      {status === "authenticated" && (
        <div>
          {session.user!.name}
          <Link href={"api/auth/signout"} className="ml-3">
            sign out
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
```

### Accessing sessions on the server

next-auth also provides `getServerSession` you can use it to get user info in the server-side this function works both on the `page.tsx` and `route.tsx` files

```typescript
import Link from "next/link";
import AddToChart from "./components/AddToCard";
import ProductCard from "./components/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <main>
      {/* <h1>Hello Next.js</h1> */}
      {
        <h1>
          Hello <span>{session && session.user!.name}</span>
        </h1>
      }
      {/* using a normal "a" tag in routing causes all the resources to be fetched again */}
      {/* <a href="/users">users</a> */}
      {/* to fix it use "Link" component defined in next.js */}
      <Link href={"/users"}>users</Link>
      <ProductCard />
    </main>
  );
}
```

### Handle signing-out

all you need to do is to head to this route `/api/auth/singout` and this is the UI element responsible for showing it to the client `<Link href={"api/auth/signout"} className="ml-3">sign out</Link>` and next-auth takes care of the rest

```typescript
// import  from "@//client";
import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

```typescript "use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { status, data: session } = useSession();

  return (
    <nav className="flex gap-2 bg-gray-500 p-3">
      <Link href={"/"}>Home</Link>
      <Link href={"/users"}>Users</Link>
      <Link href={"/admin"}>Admin</Link>
      <Link href={"/products"}>Products</Link>
      {status === "loading" && <div>loading...</div>}
      {status === "unauthenticated" && (
        <Link href={"/api/auth/signin"}>Login</Link>
      )}
      {status === "authenticated" && (
        <div>
          {session.user!.name}
          <Link href={"api/auth/signout"} className="ml-3">
            sign out
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
```

### Protecting Our Routes

to protect our routes we use `middleware` with middleware we can run code before a request is completed, this way we can check if a user is trying to access a protected part of our application and see if they are allowed to do so.

in the root of you project create a file with `middleware.ts` and put the following inside it

```typescript
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // here you handle the actions that must be taken before getting to a protected route
  return NextResponse.redirect(new URL("/new-page", request.url));
}
// if you don't specify the 'config' object the middleware function is executed on every request

// this config object is one of conventions Next.js is looking for
export const config = {
  // matcher object is a single string or an array of strings indicating routes
  // you can also include parameters like "id" here
  matcher: ["/users/:id*"],
  // *: zero or more => /users/ or /users/:id or /users/:id/:something/:else
  // +: one or more => /users/:id or /users/:something/:else not this /users/
  // ?: zero or one => /users/ or /users/:id not this /users/:id/:something
};
```

here is a simpler and shorter way of import and exporting of the middleware function

```typescript
// do this
export { default } from "next-auth/middleware";

// instead of these two lines
import middleware from "next-auth/middleware";
export default middleware;
```

### Using Adapters to Store User Info in DB

In **NextAuth.js**, an **adapter** is used to connect the authentication system to your database. It allows NextAuth to manage user data, sessions, accounts, and more by integrating with a custom or supported database system, such as PostgreSQL, MySQL, MongoDB, or others.

When using an adapter, NextAuth handles the following actions through the database:

- **Storing user information:** User profiles, credentials, etc.
- **Managing sessions:** Authentication tokens and session states.
- **Linking accounts:** Associating external OAuth accounts (like Google, GitHub) with your users.
- **Handling verification tokens:** For email sign-in or passwordless login.

### Key points:

- **Default behavior without an adapter:** NextAuth can work without a custom adapter by storing data in memory or relying on JWTs for session management. This is suitable for simple use cases but doesn't persist data across sessions (e.g., no user data stored in a database).
- **With an adapter:** You can store all authentication-related data in your preferred database.

for farther info got to the next-auth page and look for adapters

### Configuring Credential Providers

## Send Emails with react-email

for this project and version of Next run this command `npm i react-email@1.9.4 @react-email/components@0.0.7`

then add this line `"preview-email": "email dev -p 3030"` in the scripts section of `package.json` file this gives a server to preview our email templates

### Creating an Email template

The version of **react-email** your instructor is using, specifically `"react-email: 1.9.4"` and `"@react-email/components: 0.0.7"`, seems to be more modular and specific to email design. This approach leverages pre-built components from `@react-email/components`, which abstracts away a lot of the complexity involved in designing email layouts.

### How the Instructor's Code Works:

#### Importing Components:

```tsx
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from "@react-email/components";
```

These components simplify the process of creating well-structured HTML emails:

- **Html**: Wraps the email's entire content.
- **Body**: Defines the email body content.
- **Container**: Provides a responsive layout container.
- **Text**: Adds formatted text inside the email.
- **Link**: For adding hyperlinks in the email.
- **Preview**: Defines a brief preview of the email (often displayed as a preview text in the recipient's inbox).

#### The Template Structure:

```tsx
const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Body>
        <Container>
          <Text>Hello {name}</Text>
          <Link href="https://google.com">google.com</Link>
        </Container>
      </Body>
    </Html>
  );
};
```

- **`<Preview>`**: This line provides a short preview of the email content (often shown beside the subject in the inbox).
- **`<Body>` and `<Container>`**: These elements provide structure and layout to the email. The body wraps the content, while the container centers and structures it.
- **`<Text>`**: Displays the personalized greeting using the `name` prop.
- **`<Link>`**: Adds a clickable hyperlink (`google.com` in this case).

### How to Set Up Your Project:

#### Step 1: Install `react-email` and `@react-email/components`

To set up the project the same way as your instructor:

```bash
npm install react-email @react-email/components
```

#### Step 2: Create Your Email Template

You can create a TypeScript file for your email template (e.g., `WelcomeTemplate.tsx`) with the same structure as your instructor:

```tsx
// emails/WelcomeTemplate.tsx
import React from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from "@react-email/components";

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Body>
        <Container>
          <Text>Hello {name}</Text>
          <Link href="https://google.com">google.com</Link>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeTemplate;
```

#### Step 3: Render and Send the Email

Follow the same process to render the email and send it, as I described earlier, using your Next.js API route.

This approach makes it easier to create email templates because you don't have to write raw HTML and inline CSS from scratch. It’s more like writing regular React components but with special email layout components tailored for email clients.

### Previewing Emails

first add this line in the `.gitignore` file `.react-email/` and run `npm run preview-email` running this command generates a bunch of files that doesn't need to be tracked and is generated every time you run that command

### Styling Emails

#### using pure CSS

```typescript
import React, { CSSProperties } from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from "@react-email/components";

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      {/* <Body style={{background:"darkGray"}}> */}
      <Body style={body}>
        <Container>
          <Text style={heading}>Hello {name}</Text>
          <Link href="https://google.com">google.com</Link>
        </Container>
      </Body>
    </Html>
  );
};

// annotate the style object with "CSSProperties" which is coming from "react" to get css intellisense
const body: CSSProperties = {
  background: "#fff",
};

const heading: CSSProperties = {
  fontSize: "32px",
  fontWeight: "bold",
};
export default WelcomeTemplate;
```

#### using TailwindCss

```typescript
import React, { CSSProperties } from "react";
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Tailwind,
  Preview,
} from "@react-email/components";

// just import "Tailwind" from "@react-email/components

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome Aboard!</Preview>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Text className="text-3xl font-bold">Hello {name}</Text>
            <Link href="https://google.com">google.com</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeTemplate;
```

## Sending Emails

from now on sending emails requires to have a domain which I can't afford right now