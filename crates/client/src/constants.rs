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

use lazy_static::lazy_static;

// The public base api url
lazy_static! {
    pub static ref PUBLIC_BASE_API_URL: String = "https://api.light.so/v1".to_string();
}

// The admin base api url
lazy_static! {
    pub static ref ADMIN_BASE_API_URL: String = "https://api.light.so/admin/v1".to_string();
}

// The mini crypto base api url
lazy_static! {
    pub static ref MINI_CRYPTO_BASE_API_URL: String =
        "https://min-api.cryptocompare.com".to_string();
}
