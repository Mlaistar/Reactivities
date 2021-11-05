import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashoard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/activities/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/details/ActivityDetails';


function App() {
 const location = useLocation();

  return (
    <>
    <Route exact path='/' component={HomePage} />
    <Route
        path={'/(.+)'}
        render={()=> (
          <>
            <NavBar />
              <Container style={{marginTop: '7em'}}>
                <Route exact path='/activities/' component={ActivityDashboard} />
                <Route exact path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} /> 
                {/* <ActivityDashboard /> */}
              </Container>
          </>
        )} />
      
    </>
  );
}

export default observer(App);
