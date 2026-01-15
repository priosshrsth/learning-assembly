"use client";

import { Icon, type IconType } from "copilot-design-system";

export function ClientIcon({ icon }: { icon: IconType }) {
  return <Icon aria-hidden="true" className="size-6" icon={icon} />;
}
