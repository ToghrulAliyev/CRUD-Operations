
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {routes} from "./routes/Route"

function App() {
  return (
    <div className="App">
    <Router>
        <Switch>
          {routes.map((route) => {
            return <Route exact={route.exact} path={route.path} component={route.component}></Route>
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
