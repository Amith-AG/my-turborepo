Auth.js with Next.js 14, Prisma, and Vercel Postgres
This project demonstrates how to implement authentication using Auth.js (v5) with Credential Provider, Prisma, and Vercel Postgres (edge-compatible). The session strategy is customized to handle session creation, encryption, and sign-out events manually.

Table of Contents
Introduction
Technologies Used
Project Setup
Session Handling
JWT Callback
Session Callback
JWT Encoding
Edge Compatibility
Useful Links
Introduction
In this setup, manual session management is implemented using Auth.js. This is particularly important when using the database strategy, especially with edge-compatible databases like Vercel Postgres.

The workflow for the credential provider involves manually creating session tokens, saving them in the database with Prisma, and handling encryption. The project is designed for Next.js 14 applications, compatible with edge runtimes.

Technologies Used
Auth.js Version: v5
Provider: Credential Provider
Framework: Next.js 14
Adapter: Prisma
Database: Vercel Postgres (Edge Compatible)
Project Setup
Clone the repository:

bash
Copy code
git clone https://github.com/Amith-AG/my-turborepo/tree/main/apps/auth
Install dependencies:

bash
Copy code
npm install
Set up your Prisma schema and migrate your database:

bash
Copy code
npx prisma migrate dev
Update the environment variables for your Vercel Postgres database.

Start the development server:

bash
Copy code
npm run dev
Session Handling
JWT Callback
The JWT callback is responsible for creating the session token and storing it in the database using Prisma.

js
Copy code
callbacks: {
  async jwt({ account, user, token }) {
    if (account?.provider === 'credentials') {
      const sessionToken = uuidv4();
      const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000); // 30 days expiration

      const session = await PrismaAdapter(db).createSession({
        userId: user.id,
        sessionToken,
        expires,
      });
      token.sessionId = session.sessionToken;
    }
    return token;
  },
}
If the provider is credentials, we manually create a session token and expiration date.
The session data is saved into the database via the Prisma Adapter.
Session Callback (Optional)
The Session callback is used to add extra information to the session data returned to the client.

js
Copy code
callbacks: {
  session({ session }) {
    if (!session.user) return session;
    const user = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      emailVerified: session.user.emailVerified,
      image: session.user.image,
      role: session.user.role,
    };
    session.user = user;
    return session;
  },
}
This ensures that additional fields like role are included in the session object.

JWT Encoding
The JWT encode function handles setting the session token in the browser.

js
Copy code
jwt: {
  async encode({ token }) {
    return token?.sessionId as unknown as string;
  },
}
The session token generated in the JWT callback is used here to manage session encryption.
Edge Compatibility
This project is designed to be edge-compatible, which is critical for Vercel's serverless architecture. The Prisma Adapter works with Vercel Postgres, an edge-compatible database, allowing for seamless integration with Vercel's edge runtime.

Check out the list of edge-compatible database drivers for Prisma for more details.

Useful Links
GitHub Repository: Auth.js with Prisma on Vercel Postgres
Session Strategy Concept in Auth.js
Auth.js with Prisma and Edge Compatibility
