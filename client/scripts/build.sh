
export NEXT_PUBLIC_GIT_SHA=$(git rev-parse HEAD)
GENERATE_SOURCEMAP=false yarn build