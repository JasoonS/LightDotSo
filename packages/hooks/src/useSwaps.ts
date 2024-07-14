// Copyright 2023-2024 LightDotSo.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { useMemo } from "react";
import { SwapProps, useSwap } from "./useSwap";

// -----------------------------------------------------------------------------
// Hook Props
// -----------------------------------------------------------------------------

type SwapsProps = {
  swaps: SwapProps[];
};

// -----------------------------------------------------------------------------
// Query Mutation
// -----------------------------------------------------------------------------

export const useSwaps = ({ swaps }: SwapsProps) => {
  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const swapsParams = useMemo(() => {
    return swaps.map(swap =>
      useSwap({ fromSwap: swap.fromSwap, toSwap: swap.toSwap }),
    );
  }, [swaps]);

  const executionsParams = useMemo(() => {
    return swapsParams.flatMap(swap => swap.executionsParams);
  }, [swapsParams]);

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  return {
    swapParams: swapsParams,
    executionsParams: executionsParams,
  };
};
