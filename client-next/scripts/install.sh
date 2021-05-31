echo "[Naviate] Installing native wasm packages..."
cd native; ./scripts/build.sh; cd ..
``
echo "[Naviate] Installing yarn packages"
yarn install --check-files
