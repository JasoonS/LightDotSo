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

use crate::{
    namespace::USER_OPERATION, produce_message, traits::ToJson,
    types::user_operation::UserOperationMessage,
};
use eyre::Result;
pub use rdkafka;
use rdkafka::producer::FutureProducer;
use std::sync::Arc;

// -----------------------------------------------------------------------------
// Producer
// -----------------------------------------------------------------------------

/// Produce a message with UserOperation topic.
pub async fn produce_user_operation_message(
    producer: Arc<FutureProducer>,
    msg: &UserOperationMessage,
) -> Result<()> {
    let message = msg.to_json();

    produce_message(producer, USER_OPERATION.as_str(), &message, None).await?;
    Ok(())
}
