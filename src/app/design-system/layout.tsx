import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="grid min-h-dvh grid-cols-1 md:grid-cols-[16rem_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r bg-background md:block">
          <div className="flex h-14 items-center gap-2 px-4">
            <div aria-hidden="true" className="size-8 rounded-md bg-foreground/10" />
            <span className="text-sm font-semibold tracking-tight">Dashboard</span>
          </div>

          <nav className="px-2 py-3">
            <a
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-foreground/5"
              href="/"
            >
              Overview
            </a>
            <a
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-foreground/5"
              href="/"
            >
              Projects
            </a>
            <a
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-foreground/5"
              href="/"
            >
              Team
            </a>
            <a
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-foreground/5"
              href="/"
            >
              Settings
            </a>
          </nav>

          <div className="mt-auto border-t p-4 text-xs text-foreground/60">
            <p className="font-medium text-foreground/80">Signed in</p>
            <p className="truncate">you@example.com</p>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-col">
          {/* Top bar */}
          <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
            <div className="flex h-14 items-center gap-3 px-4">
              {/* Mobile "brand" */}
              <div className="md:hidden">
                <span className="text-sm font-semibold tracking-tight">Dashboard</span>
              </div>

              {/* Search */}
              <div className="flex w-full items-center md:max-w-md">
                <label className="sr-only" htmlFor="dashboard-search">
                  Search
                </label>
                <input
                  className="h-9 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-foreground/50 focus-visible:ring-2 focus-visible:ring-foreground/20"
                  id="dashboard-search"
                  placeholder="Search…"
                />
              </div>

              {/* Actions */}
              <div className="ml-auto flex items-center gap-2">
                <button
                  className="inline-flex h-9 items-center rounded-md border px-3 text-sm font-medium hover:bg-foreground/5"
                  type="button"
                >
                  New
                </button>
                <div aria-hidden="true" className="size-9 rounded-full bg-foreground/10" />
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 md:p-6">
            {/* Page title */}
            <div className="mb-6 flex flex-col gap-1">
              <h1 className="text-lg font-semibold tracking-tight">Overview</h1>
              <p className="text-sm text-foreground/60">Minimal dashboard shell (sidebar + top bar + content).</p>
            </div>

            {/* Simple cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-background p-4">
                <p className="text-xs font-medium text-foreground/60">Revenue</p>
                <p className="mt-2 text-2xl font-semibold">$12,340</p>
                <p className="mt-1 text-xs text-foreground/60">+12% from last month</p>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <p className="text-xs font-medium text-foreground/60">Active Users</p>
                <p className="mt-2 text-2xl font-semibold">1,284</p>
                <p className="mt-1 text-xs text-foreground/60">+6% from last week</p>
              </div>
              <div className="rounded-lg border bg-background p-4">
                <p className="text-xs font-medium text-foreground/60">Errors</p>
                <p className="mt-2 text-2xl font-semibold">23</p>
                <p className="mt-1 text-xs text-foreground/60">-18% from yesterday</p>
              </div>
            </div>

            {/* Routed page content */}
            <div className="mt-6 min-w-0">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
