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

import { ResultAsync, err, ok } from "neverthrow";
import type { ClientType } from "../client";
import { getClient } from "../client";

// -----------------------------------------------------------------------------
// GET
// -----------------------------------------------------------------------------

export const getWalletNotificationSettings = async (
  {
    params,
  }: {
    params: {
      query: { address: string; user_id?: string | null | undefined };
    };
  },
  clientType?: ClientType,
) => {
  const client = getClient(clientType);

  return ResultAsync.fromPromise(
    client.GET("/wallet/notification/settings/get", {
      // @ts-ignore
      next: { revalidate: 300, tags: [params?.query?.address] },
      params,
    }),
    () => new Error("Database error"),
  ).andThen(({ data, response, error }) => {
    return response.status === 200 && data ? ok(data) : err(error);
  });
};

// -----------------------------------------------------------------------------
// PUT
// -----------------------------------------------------------------------------

export const updateWalletNotificationSettings = async (
  {
    params,
    body,
  }: {
    params: {
      query: { address: string };
    };
    body: {
      wallet_notification_settings: {
        settings?: { key: string; value: boolean }[] | null | undefined;
      };
    };
  },
  clientType?: ClientType,
) => {
  const client = getClient(clientType);

  return ResultAsync.fromPromise(
    client.PUT("/wallet/notification/settings/update", {
      // @ts-ignore
      next: { revalidate: 0 },
      params,
      body,
    }),
    () => new Error("Database error"),
  ).andThen(({ data, response, error }) => {
    return response.status === 200 && data ? ok(data) : err(error);
  });
};