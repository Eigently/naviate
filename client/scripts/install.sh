echo "[Naviate] Running build script..."

echo "[Naviate] Installing Rust..."
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source $HOME/.cargo/env

echo "[Naviate] Installing native wasm packages..."
cd native; ./scripts/build.sh; cd ..

echo "[Naviate] Installing yarn packages"
yarn install
