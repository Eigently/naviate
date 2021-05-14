
export REACT_APP_GIT_SHA=$(git rev-parse --short HEAD)
GENERATE_SOURCEMAP=false yarn build