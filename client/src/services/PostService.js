import $api from "../http";
export default class PostService {
    static fetch() {
        return $api.get('/posts/get')
    }
    static fetchBlocks() {
        return $api.get('/posts/getblocks')
    }
    static saveBlocks(blocks) {
        return $api.post('/posts/saveblocks',{blocks})
    }
    static fetchList() {
        return $api.get('/posts/getlist')
    }
    static fetchPost(id) {
        return $api.post('/posts/getpost',{id})
    }
    static fetchSinglePost(id) {
        return $api.post('/posts/getsinglepost',{id})
    }
    static fetchSetting(id) {
        return $api.post('/posts/setting',{id})
    }
    static createPost(id,title,text,image,json_data,oncomment) {
        return $api.post('/posts/create',{id,title,text,image,json_data:JSON.stringify(json_data),oncomment})
    }
    static removePost(id) {
        return $api.post('/posts/remove',{id})
    }
}