import { Flex } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../error/not_found/not_found";
import { FullPageLoading } from "../loader/full_page_loader/full_page_loading";

const HomeContainer = lazy(async () => {
  return import("../home/container/home_container");
});

export const Routes = () => (
  <Router>
    <Flex direction="column" minHeight="100vh">
      <Suspense fallback={<FullPageLoading />}>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Flex>
  </Router>
);
