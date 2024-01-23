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

export const getNotifications = async (
  {
    params,
  }: {
    params: {
      query?:
        | {
            offset?: number | null | undefined;
            limit?: number | null | undefined;
            owner?: string | null | undefined;
          }
        | undefined;
    };
  },
  clientType?: ClientType,
) => {
  const client = getClient(clientType);

  return ResultAsync.fromPromise(
    client.GET("/notification/list", {
      // @ts-ignore
      next: { revalidate: 300, tags: [params?.query?.address] },
      params,
    }),
    () => new Error("Database error"),
  ).andThen(({ data, response, error }) => {
    return response.status === 200 && data ? ok(data) : err(error);
  });
};

export const getNotificationsCount = async (
  {
    params,
  }: {
    params: {
      query?:
        | {
            offset?: number | null | undefined;
            limit?: number | null | undefined;
            owner?: string | null | undefined;
          }
        | undefined;
    };
  },
  clientType?: ClientType,
) => {
  const client = getClient(clientType);

  return ResultAsync.fromPromise(
    client.GET("/notification/list/count", {
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
// POST
// -----------------------------------------------------------------------------

export const createNotification = async (
  {
    params,
    body,
  }: {
    params: {};
    body: {
      notifications: {
        id: string;
      }[];
    };
  },
  clientType?: ClientType,
) => {
  const client = getClient(clientType);

  return ResultAsync.fromPromise(
    client.POST("/notification/read", {
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