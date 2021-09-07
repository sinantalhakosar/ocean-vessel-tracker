import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { SearchPage } from './routes/Searchpage.route';
import { UploadPage } from './routes/UploadPage.route';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/search" component={SearchPage} />
          <Route path="/upload" component={UploadPage} />
          <Redirect from="*" to="/search" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
