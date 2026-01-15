"use client";

import { type IconType, Input } from "copilot-design-system";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { ClientIcon } from "./client-icon";

const IconsNames = [
  "AI",
  "API",
  "Airtable",
  "AppSetup",
  "Archive",
  "ArrowDownSolid",
  "ArrowLeft",
  "ArrowNE",
  "ArrowRight",
  "ArrowUpSolid",
  "AssemblyLogo",
  "At",
  "Attachment",
  "Authentication",
  "Automation",
  "Bank",
  "Billing",
  "Bold",
  "Book",
  "BracketsCurly",
  "Building",
  "CSV",
  "Calendar",
  "Callout",
  "Cancel",
  "CaretDown",
  "CaretRight",
  "CaretUp",
  "Chart",
  "Check",
  "Checklist",
  "ChevronDown",
  "ChevronLeft",
  "ChevronRight",
  "ChevronUp",
  "Close",
  "Code",
  "Comment",
  "Compass",
  "Compose",
  "Contract",
  "Copy",
  "Customization",
  "Dash",
  "Disconnect",
  "Doc",
  "Dollar",
  "Dot",
  "Download",
  "DragDrop",
  "Duplicate",
  "Edit",
  "EditSolid",
  "Ellipsis",
  "Email",
  "EmailRead",
  "EmailUnread",
  "Excel",
  "Export",
  "Eye",
  "EyeHidden",
  "Failed",
  "FailedSolid",
  "File",
  "Files",
  "Filter",
  "FitToWidth",
  "FolderLocked",
  "Form",
  "GIF",
  "Gauge",
  "Gift",
  "GraphBarSolid",
  "H1",
  "H2",
  "H3",
  "Helpdesk",
  "Home",
  "Image",
  "ImageMissing",
  "InProgress",
  "Inbox",
  "Info",
  "InfoSolid",
  "Insert",
  "Invite",
  "Invoice",
  "InvoicePaid",
  "Italicize",
  "JPG",
  "Lead",
  "Link",
  "List",
  "Location",
  "LockFilled",
  "LogOut",
  "MOV",
  "MP3",
  "MP4",
  "Marketing",
  "MassFileShare",
  "Mention",
  "Menu",
  "Message",
  "Minus",
  "MobileNumber",
  "MoreVertical",
  "Movie",
  "New",
  "Notification",
  "Number",
  "NumberedList",
  "PDF",
  "PNG",
  "Pause",
  "Pin",
  "PlansPayments",
  "Play",
  "Plus",
  "Profile",
  "Puzzle",
  "QuestionMark",
  "QuickBook",
  "Repeat",
  "Reply",
  "Reposition",
  "ResetZoom",
  "SVG",
  "Scale",
  "Search",
  "Send",
  "SendFilled",
  "Settings",
  "Share",
  "ShoppingBag",
  "Sidebar",
  "SidebarFilled",
  "Smile",
  "Spinner",
  "SquareSolid",
  "Star",
  "Store",
  "Strikethrough",
  "Subtask",
  "Success",
  "SuccessSolid",
  "Table",
  "Tag",
  "Tasks",
  "Teams",
  "Templates",
  "Text",
  "ThumbsDown",
  "ThumbsUp",
  "Time",
  "ToDo",
  "Trash",
  "UnPin",
  "Unarchive",
  "Underline",
  "Unlock",
  "UnorderedList",
  "Upload",
  "Warning",
  "WarningSolid",
  "Web",
  "ZIP",
];

export default function IconsPage() {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");

  const [_isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      startTransition(() => {
        setSearch(inputValue);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const filteredIcons = useMemo(() => {
    return IconsNames.filter((icon) => icon?.toLowerCase()?.includes(search?.toLowerCase()));
  }, [search]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <div className="min-h-dvh px-6">
      {/* Page title */}
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-lg font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-foreground/60">Minimal dashboard shell (sidebar + top bar + content).</p>
      </div>

      {/* Simple cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="rounded-lg border bg-background p-4">
          <p className="text-xs font-medium text-foreground/60">Total Icons</p>
          <p className="mt-2 text-2xl font-semibold">{IconsNames?.length}</p>
          <p className="mt-1 text-xs text-foreground/60">
            {IconsNames?.length} icons discovered from copilot-design-system
          </p>
        </div>
      </div>
      <div className="mb-6 justify-between flex">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Copilot Icons</h1>
          <p className="text-sm text-foreground/60">
            Rendering icons discovered from <code className="font-mono">copilot-design-system/dist/esm/icons</code>.
          </p>
        </div>
        <Input
          className="border-gray-200 border rounded-sm p-2"
          onChange={handleSearch}
          placeholder="Search icons.."
          value={inputValue}
        />
      </div>

      {IconsNames?.length === 0 ? (
        <div className="rounded-lg border p-4 text-sm text-foreground/70">
          No icons could be discovered/imported. Verify the installed package has:
          <div className="mt-2 font-mono text-xs text-foreground/60">
            node_modules/copilot-design-system/dist/esm/icons
          </div>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12">
          {filteredIcons.map((name) => (
            <div className="group flex flex-col items-center gap-2 rounded-lg border bg-background p-3" key={name}>
              <div className="grid size-12 place-items-center rounded-md bg-foreground/5">
                <ClientIcon icon={name as IconType} />
              </div>
              <div className="w-full truncate text-center text-xs text-foreground/70" title={name}>
                {name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
