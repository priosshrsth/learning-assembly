import { Building2, Calendar, Info } from "lucide-react";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import { AssemblyClient } from "src/lib/assembly/assembly-client";

export interface CompanyData {
  id?: string;
  object?: string;
  createdAt?: string;
  name?: string;
  fallbackColor?: string;
  iconImageUrl?: string;
  isPlaceholder?: boolean;
}

interface CompanyCardProps {
  company: CompanyData;
}

export function CompanyCard({ company }: CompanyCardProps) {
  const displayName = company.name || "Unnamed Company";
  const initials = company.name
    ? company.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return "N/A";
    }
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="group relative rounded-xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1">
      {/* Placeholder Badge */}
      {company.isPlaceholder && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800 text-xs font-semibold">
            <Info className="w-3 h-3" />
            Placeholder
          </div>
        </div>
      )}
      {/* Gradient Header */}
      <div
        className="relative h-24 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600"
        style={{
          background: company.fallbackColor
            ? `linear-gradient(135deg, ${company.fallbackColor} 0%, ${company.fallbackColor}dd 100%)`
            : undefined,
        }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      </div>
      {/* Company Icon/Avatar */}
      <div className="relative px-6 pb-6">
        <div className="flex justify-center -mt-12 mb-4">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-2xl blur-lg opacity-50"
              style={{ backgroundColor: company.fallbackColor || "#6366f1" }}
            />
            <div className="relative bg-white dark:bg-zinc-900 rounded-2xl p-2 shadow-xl">
              {company.iconImageUrl ? (
                <Image
                  alt={displayName}
                  className="w-20 h-20 rounded-xl object-cover border-4 border-white dark:border-zinc-800"
                  height={80}
                  src={company.iconImageUrl}
                  width={80}
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl font-bold text-white border-4 border-white dark:border-zinc-800"
                  style={{ backgroundColor: company.fallbackColor || "#6366f1" }}
                >
                  {initials}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Company Name */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 truncate">{displayName}</h3>
          {company.id && <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate">{company.id}</p>}
        </div>

        {/* Company Details */}
        <div className="space-y-3">
          {/* Created Date */}
          {company.createdAt && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Created</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{formatDate(company.createdAt)}</p>
              </div>
            </div>
          )}

          {/* Object Type */}
          {company.object && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">Type</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white capitalize">{company.object}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

interface Props {
  token: string;
}

export async function CompanyGrid({ token }: Props) {
  "use cache";
  cacheLife("hours");
  cacheTag("companies-grid");
  const client = new AssemblyClient({ token });
  const response = await client.api.listCompanies({ limit: 100, isPlaceholder: false });
  const companies = response?.data || [];
  if (!companies || companies.length === 0) {
    return (
      <div className="w-full max-w-6xl rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 p-12 shadow-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col items-center justify-center gap-4">
          <Building2 className="w-16 h-16 text-zinc-400 dark:text-zinc-600" />
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">No companies found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {companies.map((company) => (
            <CompanyCard company={company} key={company.id || Math.random()} />
          ))}
        </div>
      </div>
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
    </>
  );
}
