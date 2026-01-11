import Link from "next/link";
import { CompanyGrid } from "src/components/company-card";
import { getAssemblyClient } from "src/lib/assembly/assembly-client";
import type { AppPageProps } from "src/lib/next/next.types";

export default async function CompaniesList(props: AppPageProps) {
  const client = await getAssemblyClient(props);
  const response = await client.api.listCompanies({ limit: 100, isPlaceholder: false });
  const companies = response?.data || [];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-black dark:via-zinc-950 dark:to-black font-sans">
      <main className="flex min-h-screen w-full flex-col items-center gap-8 py-16 px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="w-full max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">Companies</h1>
              <p className="text-zinc-600 dark:text-zinc-400">
                {companies.length} {companies.length === 1 ? "company" : "companies"} found
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              href={`/internal?token=${client.token}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <title>Back arrow</title>
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              Back to Profile
            </Link>
          </div>
        </div>

        {/* Company Grid */}
        <CompanyGrid companies={companies} />

        {/* Pagination Info */}
        {response?.nextToken && (
          <div className="w-full max-w-6xl mt-4">
            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
                More companies available. Pagination not yet implemented.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
