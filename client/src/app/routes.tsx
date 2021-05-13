/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FullPageLoading } from "../features/fullpageloading/FullPageLoading";

const HomeContainer = lazy(async () => {
  return import("../features/home/container/HomeContainer");
});

export const Routes = () => (
  <Router>
    <div
      css={css`
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      `}
    >
      <Suspense fallback={<FullPageLoading />}>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
        </Switch>
      </Suspense>
    </div>
  </Router>
);
