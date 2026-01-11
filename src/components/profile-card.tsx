"use client";

import { Building2, Calendar, Mail, Shield, User } from "lucide-react";
import Image from "next/image";

export interface ProfileData {
  id?: string;
  object?: string;
  createdAt?: string;
  givenName?: string;
  familyName?: string;
  email?: string;
  role?: string;
  fallbackColor?: string;
  isClientAccessLimited?: boolean;
  companyAccessList?: string[];
  avatarImageUrl?: string;
  updatedAt?: string;
}

interface ProfileCardProps {
  profile: ProfileData | null;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  if (!profile) {
    return (
      <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 p-8 shadow-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-center h-64">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">No profile data available</p>
        </div>
      </div>
    );
  }

  const fullName = [profile.givenName, profile.familyName].filter(Boolean).join(" ") || "Unknown User";
  const initials = [profile.givenName?.[0], profile.familyName?.[0]].filter(Boolean).join("").toUpperCase();

  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return "N/A";
    }
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 hover:shadow-3xl hover:scale-[1.01]">
      {/* Header with gradient background */}
      <div className="relative h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      </div>

      {/* Profile Content */}
      <div className="relative px-8 pb-8">
        {/* Avatar */}
        <div className="flex justify-center -mt-16 mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg opacity-50" />
            <div className="relative bg-white dark:bg-zinc-900 rounded-full p-2 shadow-xl">
              {profile.avatarImageUrl ? (
                <Image
                  alt={fullName}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-zinc-800"
                  height={112}
                  src={profile.avatarImageUrl}
                  width={112}
                />
              ) : (
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold text-white border-4 border-white dark:border-zinc-800"
                  style={{ backgroundColor: profile.fallbackColor || "#6366f1" }}
                >
                  {initials || "?"}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Name and Role */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{fullName}</h2>
          {profile.role && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 border border-blue-500/20 dark:border-blue-500/30">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                {profile.role}
              </span>
            </div>
          )}
        </div>

        {/* Profile Details Grid */}
        <div className="space-y-4">
          {/* Email */}
          {profile.email && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
                  Email
                </p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{profile.email}</p>
              </div>
            </div>
          )}

          {/* User ID */}
          {profile.id && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
                  User ID
                </p>
                <p className="text-sm font-mono text-zinc-900 dark:text-white truncate">{profile.id}</p>
              </div>
            </div>
          )}

          {/* Created At */}
          {profile.createdAt && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
                  Member Since
                </p>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{formatDate(profile.createdAt)}</p>
              </div>
            </div>
          )}

          {/* Company Access */}
          {profile.companyAccessList && profile.companyAccessList.length > 0 && (
            <div className="flex items-start gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-2">
                  Company Access ({profile.companyAccessList.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.companyAccessList.map((company) => (
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
                      key={company}
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Access Status */}
          {profile.isClientAccessLimited !== undefined && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <div className="flex-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center shadow-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mb-1">
                      Access Level
                    </p>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {profile.isClientAccessLimited ? "Limited" : "Full Access"}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    profile.isClientAccessLimited
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800"
                      : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                  }`}
                >
                  {profile.isClientAccessLimited ? "⚠️ Limited" : "✓ Full"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {profile.updatedAt && (
          <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
              Last updated: {formatDate(profile.updatedAt)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
