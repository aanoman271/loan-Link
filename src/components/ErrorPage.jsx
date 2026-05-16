import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-app-bg px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-primary">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-app-text sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-app-text-muted sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-focus focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;

