import $api from "../http";
export default class TasksService {
    static fetchPriority() {
        return $api.get('/tasks/priority')
    }
    static fetchObjects() {
        return $api.get('/tasks/objects')
    }
    static fetchUsers() {
        return $api.get('/tasks/users')
    }
    static fetchGroups() {
        return $api.get('/tasks/groups')
    }
    static createGroup(name,group) {
        return $api.post('/tasks/creategroup',{name,group})
    }
    static deleteGroup(id) {
        return $api.post('/tasks/deletegroup',{id})
    }
    static createTask(name,text,exp,prio,obj,filenames,group) {
        return $api.post('/tasks/create',{name,text,exp,prio,obj,filenames,group})
    }
}