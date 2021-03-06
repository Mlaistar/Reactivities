import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashoard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/activities/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/error/NotFound';
import ServerError from '../../features/error/ServerError';


function App() {
 const location = useLocation();

  return (
    <>
    <ToastContainer position='bottom-right' hideProgressBar/>
    <Route exact path='/' component={HomePage} />
    <Route
        path={'/(.+)'}
        render={()=> (
          <>
            <NavBar />
              <Container style={{marginTop: '7em'}}>
                <Switch>
                <Route exact path='/activities/' component={ActivityDashboard} />
                <Route exact path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} /> 
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route  component={NotFound} />
                </Switch>
              </Container>
          </>
        )} />
      
    </>
  );
}

export default observer(App);
