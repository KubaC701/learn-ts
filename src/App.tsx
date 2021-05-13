import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useReducer } from 'react';

import Details from './pages/Details/Details';
import HeroesList from './pages/HeroesList/HeroesList';
import NotFound from './pages/NotFound/NotFound';

import NotificationManager from './components/global/NotificationManager/NotificationManager';

import NotificationsContext from './contexts/NotificationsContext';
import notificationReducer from './reducers/notificationReducer';

const App = () : JSX.Element => {
  const [notifications, dispatchNotifications] = useReducer(notificationReducer, []);

  return (
    <main className="container">
      <NotificationsContext.Provider value={{ dispatchNotifications, notifications }}>
        <Router>
          <Switch>
            <Route exact path="/">
              <HeroesList />
            </Route>
            <Route exact path="/details/:id">
              <Details />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>

        <NotificationManager />
      </NotificationsContext.Provider>
    </main>
  );
};

export default App;
