import { Assembly } from "src/lib/assembly/assembly";
import type { AppPageProps } from "src/lib/next/next.types";

export default async function InternalDashboard(props: AppPageProps) {
  const data = await new Assembly().getPageUrlData(props);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <span className="break-all">{data.token}</span>
      </main>
    </div>
  );
}
