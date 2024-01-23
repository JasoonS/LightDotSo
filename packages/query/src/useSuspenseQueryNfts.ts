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

import { getNftsByOwner } from "@lightdotso/client";
import type { NftDataPage } from "@lightdotso/data";
import type { NftListParams } from "@lightdotso/params";
import { queryKeys } from "@lightdotso/query-keys";
import { useAuth } from "@lightdotso/stores";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";

export const useSuspenseQueryNfts = (params: NftListParams) => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { clientType } = useAuth();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const currentData: NftDataPage | undefined = queryClient.getQueryData(
    queryKeys.nft.list({
      address: params.address,
      is_testnet: params.is_testnet,
      limit: params.limit,
      cursor: null,
    }).queryKey,
  );

  const { data: nftPage } = useSuspenseQuery<NftDataPage | null>({
    queryKey: queryKeys.nft.list({
      address: params.address,
      is_testnet: params.is_testnet,
      limit: params.limit,
      cursor: null,
    }).queryKey,
    queryFn: async () => {
      if (typeof params.address === "undefined") {
        return null;
      }

      const res = await getNftsByOwner(
        {
          address: params.address,
          limit: params.limit,
          isTestnet: params.is_testnet,
          cursor: null,
        },
        clientType,
      );

      // Return if the response is 200
      return res.match(
        data => {
          return data as NftDataPage;
        },
        _ => {
          return currentData ?? null;
        },
      );
    },
  });

  return {
    nftPage,
  };
};