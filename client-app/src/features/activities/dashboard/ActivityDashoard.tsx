import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityFilters from "./ActivityFilters";
import ActivityList from "./ActivityList";


export default observer(function ActivityDashboard () {

        const {activityStore} = useStore();
        const {loadActivities, activityRegistry} = activityStore;

        useEffect(() => {
            if(activityRegistry.size <= 1) loadActivities();
        }, [activityRegistry.size, loadActivities])
      
        // function handleDeleteActivity(id: string) {
        //   setSubmitting(true);
        //   agent.Activities.delete(id).then(() => {
        //     setActivities([...activities.filter(x=>x.id!==id)]);
        //     setSubmitting(false);
        //   })
          
        // }
      
        // function handleCreateOrEditActivity(activity: Activity) {
        //   setSubmitting(true);
        //   if(activity.id){
        //     agent.Activities.update(activity).then(() => {
        //       setActivities([...activities.filter(x=>x.id!==activity.id), activity])
        //       setSelectedActivity(activity);
        //       setEditMode(false);
        //       setSubmitting(false);
        //     })
        //   }
        //   else {
        //     activity.id = uuid();
        //       agent.Activities.create(activity).then(() => {
        //       setActivities([...activities, activity]);  
        //       setSelectedActivity(activity);
        //       setEditMode(false);
        //       setSubmitting(false);
        //     })
        //   }
          // activity.id 
          // ? setActivities([...activities.filter(x=>x.id!==activity.id), activity])
          // : setActivities([...activities, {...activity, id: uuid()}]);
          
          // setEditMode(false);
          // setSelectedActivity(activity);
        //}
      
        if(activityStore.loadingInitial)  return <LoadingComponent content='Loading app' />
      
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
})