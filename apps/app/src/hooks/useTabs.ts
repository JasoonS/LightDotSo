// Copyright (C) 2023 Light, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Full complete example from: https://github.com/hqasmei/youtube-tutorials/blob/ee44df8fbf6ab4f4c2f7675f17d67813947a7f61/vercel-animated-tabs/src/hooks/use-tabs.tsx
// License: MIT

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export type Tab = {
  label: string;
  id: string;
  href: string;
  number: number;
  icon: (_props: { className?: string }) => ReactNode;
};

export function useTabs({ tabs }: { tabs: Tab[] }) {
  const pathname = usePathname();
  const tabIds = tabs.map(tab => tab.id);

  // The index of the selected tab
  const [selectedTabIndex, setSelectedTabIndex] = useState<number | undefined>(
    undefined,
  );

  // Set the initialTabId to the matching slug in tabIds array
  useEffect(() => {
    // Split the path using '/' as delimiter and remove empty strings
    const slugs = pathname.split("/").filter(slug => slug);
    // Get the matching slug in tabIds array
    const matchingId = tabIds.find(slug => slugs.includes(slug));
    // Set the mount id
    const mountId = matchingId || "overview";
    // Set the initialTabId to the mount id
    const indexOfInitialTab = tabs.findIndex(tab => tab.id === mountId);
    // Set the initial tab
    setSelectedTabIndex(indexOfInitialTab === -1 ? 0 : indexOfInitialTab);
    // Only run on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    tabProps: {
      tabs,
      selectedTabIndex,
      setSelectedTabIndex,
    },
    selectedTab: selectedTabIndex !== undefined ? tabs[selectedTabIndex] : null,
    contentProps: {
      direction: 0,
      selectedTabIndex,
    },
  };
}