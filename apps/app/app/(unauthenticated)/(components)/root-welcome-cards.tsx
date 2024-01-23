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

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@lightdotso/ui";
import { Gamepad, Wallet } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { ConnectButton } from "@/components/web3/connect-button";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const RootWelcomeCards: FC = () => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="grid w-full gap-6 md:grid-cols-2">
      <Card className="col-span-1 p-6">
        <CardHeader>
          <div>
            <span className="inline-block rounded-full border border-border-warning bg-background-warning-weakest p-2">
              <Wallet className="size-5 text-border-warning" />
            </span>
          </div>
          <CardTitle>Connect to Light</CardTitle>
          <CardDescription>
            Connect your wallet to Light to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <ConnectButton />
        </CardContent>
      </Card>
      <Card className="col-span-1 p-6">
        <CardHeader>
          <div>
            <span className="inline-block rounded-full border border-border-purple bg-background-purple-weakest p-2">
              <Gamepad className="size-5 text-border-purple" />
            </span>
          </div>
          <CardTitle>Try demo mode</CardTitle>
          <CardDescription>
            Experience Light in demo mode. No wallet required.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Button asChild size="sm" variant="outline">
            <Link href="/demo/overview">
              <Gamepad className="mr-2 size-4" /> Start Demo
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
