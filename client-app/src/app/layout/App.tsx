import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashoard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/activities/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';


function App() {
 
  return (
    <>
      <NavBar />
        <Container style={{marginTop: '7em'}}>
            {/* <Route path='/' component={HomePage} />
            <Route path='/activities' component={ActivityDashboard} />
            <Route path='/createActivity' component={ActivityForm} /> */}
            <ActivityDashboard />
        </Container>
    </>
  );
}

export default observer(App);
