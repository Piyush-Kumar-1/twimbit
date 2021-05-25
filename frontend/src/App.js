import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notfound from "./pages/notfound";
import Post from "./pages/Post";

const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Posts = lazy(() => import("./pages/Posts"));

function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path={"/login"} exact>
            <Login />
          </Route>
          <Route path={"/signup"} exact>
            <Signup />
          </Route>
          <Route path={"/posts"} exact>
            <Posts />
          </Route>
          <Route path={"/post/:id"}>
            <Post />
          </Route>
          <Route path="*">
            <Notfound />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
