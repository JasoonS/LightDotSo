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

import { baseWidthWrapper } from "@lightdotso/ui";
import { cn } from "@lightdotso/utils";
import type { FC } from "react";
import { FooterCopy } from "./footer-copy";
import { FooterList } from "./footer-list";
import { FooterLogo } from "./footer-logo";
import { FooterModeSelect } from "./footer-mode-select";
import { FooterSocial } from "./footer-social";
import { FooterStatusButton } from "./footer-status-button";
import { FooterVersion } from "./footer-version";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Footer: FC = () => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <footer
      className={cn("border-t border-border", baseWidthWrapper)}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl space-y-4 py-8 md:space-y-8">
        <div className="flex flex-col justify-start space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="flex items-center justify-between space-x-3">
            <FooterLogo />
            <FooterStatusButton />
          </div>
          <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:items-center md:space-x-3 md:space-y-0">
            <FooterModeSelect />
            <span className="hidden text-text/60 md:inline-flex">/</span>
            <FooterSocial />
          </div>
        </div>
        <div>
          <FooterList />
        </div>
        <div className="hidden justify-between md:flex">
          <FooterCopy />
          <FooterVersion />
        </div>
      </div>
    </footer>
  );
};