import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { Homepage } from './routes/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" component={Homepage} />
          <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
