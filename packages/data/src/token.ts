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

import type { TokenGroupData } from "./tokenGroup";

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

export type TokenData = {
  id: string;
  address: string;
  amount: number;
  balance_usd: number;
  chain_id: number;
  decimals: number;
  name?: string | null;
  symbol: string;
  group?: TokenGroupData | null;
};

export type TokenCountData = {
  count: number;
};