const {Posts, MainBlocks, PostComments, User} = require('../models/models')
const ApiError = require('../exceptions/api.error')

class PostsService{
    async get() {
        const posts = await Posts.findAll({ where: { trash: false},  order: [['id', 'DESC']] })
        if(!posts) throw ApiError.BadRequest('База с новостями пуста')
        return posts
    }
    async getIds() {
        const posts = await Posts.findAll({ where: { trash: false},  order: [['id', 'DESC']] })
        if(!posts) throw ApiError.BadRequest('База с новостями пуста')
        return posts.map( item => item.id)
    }
    async getBlocks() {
        const posts = await MainBlocks.findAll({order: [['id', 'ASC']] })
        if(!posts) throw ApiError.BadRequest('База с блоками пуста')
        return posts
    }
    async addComment(creator_tn,post_id,text) {
        const post = await Posts.findOne({where: {id:post_id}})
        if(!post) throw ApiError.BadRequest('Новость не найдена')
        if(post.oncomment){
            return await PostComments.create({creator_tn,post_id,text,trash:false})
        }
        return {message:'Коментирование запрещено'}
    }
    async getComments(post_id) {
        const comments = await PostComments.findAll({where: {post_id:post_id,trash:false},order:[['createdAt','DESC']]})
        if(comments.length){
            const commDto = comments.map( async item => {
                const user = await User.findOne({where:{tn:item.creator_tn}})
                return {...item.dataValues,avatar:user.avatar,full_name:user.full_name}
            })
            return await Promise.all(commDto)
        }
        return {message:'Коментарии отсутствуют'}
    }
    async changeComment(id,text) {
        const comment = await PostComments.findOne({where:{id:+id}})
        if(!comment) throw ApiError.BadRequest('Коментарий не найден')
        comment.text = text
        await comment.save()
        return comment
    }
    async deleteComment(id) {
        const comment = await PostComments.findOne({where:{id:+id}})
        if(!comment) throw ApiError.BadRequest('Коментарий не найден')
        comment.trash = true
        await comment.save()
        return {message:'Комментарий удален'}
    }

    async getSettings(id) {
        const post = await Posts.findOne({where:{id:+id,trash:false}})
        if(!post) throw ApiError.BadRequest('Новость не доступна для редактирования')
        return post
    }

    async getPost(id) {
        const post = await Posts.findOne({where:{id:+id,trash:false}})
        if(!post) throw ApiError.BadRequest('Новость не найденa в базе')
        post.clicks++
        await post.save()
        const postDto = [{name:'main',title:post.title,image:post.image,content:post.text,oncomment:post.oncomment,views:post.clicks,likes:post.user_id_likes}]
        const data = JSON.parse(post.json_data)
        data.map( item => {
            postDto.push({name:item.name,content: item.content,image:item.images})
        })
        return postDto
    }
    async getSinglePost(id) {
        const post = await Posts.findOne({where:{id:+id,trash:false}})
        if(!post) throw ApiError.BadRequest('Новость не найденa в базе')
        const comments = await PostComments.findAll({where: {post_id:+id,trash:false}})
        return {id:post.id,title:post.title,image:post.image,content:post.text,clicks:post.clicks,createdAt:post.createdAt,likes:post.user_id_likes,comments:comments.length}
    }
    async saveBlocks(blocks){
        return blocks.map(async item => {
            const block = await MainBlocks.findOne({where: {id:+item.id}})
            block.type = item.type
            block.block_id = item.block_id
            await block.save()
            return block
        })
    }

    async remove(id) {
        const post = await Posts.findOne({where:{id:+id}})
        if(!post) throw ApiError.BadRequest('Нет вопроса с таким id в базе')
        post.trash = true
        post.save()
        return {post}
    }
    async updatePost(id,title,text,image,json_data,oncomment=true,trash = false) {
        if (!isNaN(+id)) {
            const post = await Posts.findOne({where: {id: +id}})
            if (Posts) {
                post.text = text
                post.title = title
                post.image = image
                post.json_data = json_data
                post.oncomment = oncomment
                post.trash = trash
                await post.save()
                return {post}
            }
        }
        return await this.createPost(title,text,image,json_data,oncomment,trash)
    }
    async createPost(title,text,image,json_data,oncomment=true,trash = false) {
        const post = await Posts.create({title,text,image,json_data,oncomment,trash,clicks:0})
        return {post}
    }
    async setLike(id,user_id) {
        const post = await Posts.findByPk(id)
        console.log(post)
        if(post){
            if(post.user_id_likes === null) {
                post.user_id_likes = []
                await post.save()
            }
            if(post.user_id_likes.includes(user_id)){
                post.set('user_id_likes', post.user_id_likes.filter(value => value !== user_id))
                await post.save()
                return false
            }else{
                post.set('user_id_likes', [...post.user_id_likes, user_id])
                await post.save()
                return true
            }
        }
        return false
    }


}

module.exports = new PostsService()

