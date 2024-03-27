const {Posts, MainBlocks} = require('../models/models')

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
        const postDto = [{name:'main',title:post.title,image:post.image,content:post.text}]
        const data = JSON.parse(post.json_data)
        data.map( item => {
            postDto.push({name:item.name,content: item.content,image:item.images})
        })
        return postDto
    }
    async getSinglePost(id) {
        const post = await Posts.findOne({where:{id:+id,trash:false}})
        if(!post) throw ApiError.BadRequest('Новость не найденa в базе')
        return {title:post.title,image:post.image,content:post.text,clicks:post.clicks,createdAt:post.createdAt}
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
        console.log(id)
        console.log(!isNaN(+id))
        if (!isNaN(+id)) {
            const post = await Posts.findOne({where: {id: +id}})

            console.log(post)
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
}

module.exports = new PostsService()

