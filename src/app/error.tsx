"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{error.message || "Something went wrong!"}</h2>

      <button onClick={() => reset()} type="button">
        Try again
      </button>
    </div>
  );
}
