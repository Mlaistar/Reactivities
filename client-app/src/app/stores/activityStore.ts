import { Activity } from './../models/activity';
import { makeAutoObservable, runInAction } from "mobx";
import agent from '../api/agent';

export default class ActivityStore {
    //activities: Activity[] = [];
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode =  false;
    loading = false;
    loadingInitial = true;
    
    constructor() {
        makeAutoObservable(this)
    }

get ActivitiesByDate() {
  return Array.from(this.activityRegistry.values()).sort((a, b) => 
        Date.parse(a.date) - Date.parse(b.date))  ;
}

    // either use promises or async awaits.
    loadActivities = async () => {
        this.loadingInitial = true;
        try {
            
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity); 
                 // mutate state in
                    //#region Redux is an immutable state management system, but blowbacks is not that kind of library, Moakes creates mutable objects that we can and should mutate directly. 
                    //It does not use immutable structures so we can mutate our states inside our method here.
                    //#endregion
              })
              this.setLoadingInit(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInit(false);
        }

    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);

        if(activity) {
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                
                this.setLoadingInit(false);
                return activity;
            } catch(error) {
                console.log(error);
                this.setLoadingInit(false);
            }
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0]
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }
    
    setLoadingInit = (state: boolean) => {
        this.loadingInitial = state;
    }
    
    // selectActivity = (id: string) => {
    //     this.selectedActivity = this.activityRegistry.get(id);
    // }

    // cancelSelectedActivity = () => {
    //     this.selectedActivity = undefined;
    // }

    // openForm = (id?: string) => {
    //     id ? this.selectActivity(id) : this.cancelSelectedActivity();
    //     this.editMode = true;
    // }

    // closeForm = () => {
    //     this.editMode = false;
    // }

    createActivity = async (activity: Activity) => {
        
        this.loading = true;
        //activity.id = uuid();

        try {

            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;

        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                //this.activities = [...this.activities.filter(x => x.id === activity.id), activity];
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;

            })

        } catch(error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                //this.activities = [...this.activities.filter(x => x.id !== id)];
                this.activityRegistry.delete(id);
                //if(this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;

            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
