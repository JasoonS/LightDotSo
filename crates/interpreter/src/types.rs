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

use ethers_main::{
    abi::{Address, Uint},
    types::Log,
};
use foundry_evm::{trace::node::CallTraceNode, CallKind};
use revm::interpreter::InstructionResult;
use serde::{Deserialize, Serialize};

// Entire file is derived from https://github.com/EnsoFinance/transaction-simulator/blob/42bc679fb171de760838457820d5c6622e53ab15/src/simulation.rs
// License: MIT

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct InterpretationResponse {
    /// Gas used by the transaction
    pub gas_used: u64,
    /// Block number of the simulation
    pub block_number: u64,
    /// Whether the transaction was successful
    pub success: bool,
    /// Trace of the transaction
    pub traces: Vec<CallTrace>,
    /// Logs of the transaction
    pub logs: Vec<Log>,
    /// Exit reason of the transaction
    pub exit_reason: InstructionResult,
    /// Formatted trace of the transaction
    pub formatted_trace: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct CallTrace {
    pub call_type: CallKind,
    pub from: Address,
    pub to: Address,
    pub value: Option<Uint>,
}

impl From<CallTraceNode> for CallTrace {
    fn from(node: CallTraceNode) -> Self {
        CallTrace {
            call_type: node.kind(),
            from: node.trace.caller,
            to: node.trace.address,
            value: Some(node.trace.value),
        }
    }
}