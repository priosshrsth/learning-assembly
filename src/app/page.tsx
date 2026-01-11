import Link from "next/link";
import { Suspense } from "react";
import { ProfileCard } from "src/components/profile-card";
import { getAssemblyClient } from "src/lib/assembly/assembly-client";
import type { AppPageProps } from "src/lib/next/next.types";

export default async function ClientDashboard(props: AppPageProps) {
  const client = await getAssemblyClient(props);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-black dark:via-zinc-950 dark:to-black font-sans">
      <main className="flex min-h-screen w-full flex-col items-center gap-8 py-16 px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="w-full max-w-2xl text-center mb-4">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">Internal Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Welcome to your profile overview</p>
        </div>

        {/* Profile Card */}
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileCard token={client.token} />
        </Suspense>

        {/* Navigation */}
        <div className="w-full max-w-2xl flex justify-center mt-4">
          <Link
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            href={`/internal/companies?token=${client.token}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Building icon</title>
              <path
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            View Companies
          </Link>
        </div>
      </main>
    </div>
  );
}
