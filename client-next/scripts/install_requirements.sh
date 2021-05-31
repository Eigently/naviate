#!/usr/bin/env bash

echo "[Naviate] Running build script..."

echo "[Naviate] Installing Rust..."
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env

./native/scripts/install_requirements.sh
./scripts/install.sh