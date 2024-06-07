const PostsService = require('../service/posts.service')

class PostsController {
    async get(req,res,next) {
        try{
            const posts = await PostsService.get()
            return res.status(200).json(posts)
        }catch (e){
            next(e)
        }
    }
    async getList(req,res,next) {
        try{
            const posts = await PostsService.getIds()
            return res.status(200).json(posts)
        }catch (e){
            next(e)
        }
    }
    async getBlocks(req,res,next) {
        try{
            const blocks = await PostsService.getBlocks()
            return res.status(200).json(blocks)
        }catch (e){
            next(e)
        }
    }
    async saveBlocks(req,res,next) {
        try{
            const {blocks} = req.body
            const posts = await PostsService.saveBlocks(blocks)
            return res.status(200).json(posts)
        }catch (e){
            next(e)
        }
    }
    async setRemove(req,res,next) {
        try{
            const {id} = req.body
            const post = await PostsService.remove(id)
            return res.status(200).json(post)
        }catch (e){
            next(e)
        }
    }
    async getPost(req,res,next) {
        try{
            const {id} = req.body
            const post = await PostsService.getPost(id)
            return res.status(200).json(post)
        }catch (e){
            next(e)
        }
    }
    async getSinglePost(req,res,next) {
        try{
            const {id} = req.body
            const post = await PostsService.getSinglePost(id)
            return res.status(200).json(post)
        }catch (e){
            next(e)
        }
    }

    async getSetting(req,res,next) {
        try{
            const {id} = req.body
            const settings = await PostsService.getSettings(id)
            return res.status(200).json(settings)
        }catch (e){
            next(e)
        }
    }

    async create(req,res,next) {
        try{
            const {id,title,text,image,json_data,oncomment} = req.body
            const post = await PostsService.updatePost(id,title,text,image,json_data,oncomment)
            return res.status(200).json(post)
        }catch (e){
            next(e)
        }
    }
    async newComment(req,res,next) {
        try{
            const {post_id,text} = req.body
            const post = await PostsService.addComment(req.user.tn,post_id,text)
            return res.status(200).json(post)
        }catch (e){
            next(e)
        }
    }
    async getComments(req,res,next) {
        try{
            const {post_id} = req.body
            const comments = await PostsService.getComments(post_id)
            return res.status(200).json(comments)
        }catch (e){
            next(e)
        }
    }
    async changeComment(req,res,next) {
        try{
            const {id,text} = req.body
            const comments = await PostsService.changeComment(id,text)
            return res.status(200).json(comments)
        }catch (e){
            next(e)
        }
    }
    async deleteComment(req,res,next) {
        try{
            const {id} = req.body
            const comments = await PostsService.deleteComment(id)
            return res.status(200).json(comments)
        }catch (e){
            next(e)
        }
    }
    async setLike(req,res,next) {
        try{
            const islike = await PostsService.setLike(req.body.id,req.user.id)
            return res.status(200).json(islike)
        }catch (e){
            next(e)
        }
    }

}
module.exports = new PostsController()