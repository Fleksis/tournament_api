import type { HttpContext } from '@adonisjs/core/http'
import Blog from '#models/blog'
import { createBlogValidator, paramsBlogValidator, updateBlogValidator } from '#validators/blog'
import { blogSerializer } from '../../helpers/serializers.js'

export default class BlogsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    if (request.qs().page) {
      const blogs = await Blog.query()
        .preload('user')
        .orderBy('id', 'desc')
        .paginate(request.qs().page, request.qs().pagination ?? 10)
      return blogs.serialize(blogSerializer)
    }
    return Blog.query().orderBy('id', 'desc')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    await request.validateUsing(createBlogValidator)
    const blog = await Blog.create({ userId: auth.getUserOrFail().id, ...request.body() })

    await blog.refresh()
    await blog.load('user')
    return blog.serialize(blogSerializer)
  }

  /**
   * Show individual record
   */
  async show({ params, request }: HttpContext) {
    await request.validateUsing(paramsBlogValidator)

    const blog = await Blog.findOrFail(params.id)
    await blog.load('user')
    return blog.serialize(blogSerializer)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth }: HttpContext) {
    await request.validateUsing(updateBlogValidator)

    const blog = await Blog.findOrFail(params.id)

    if (blog.userId !== auth.getUserOrFail().id) {
      return {
        message: 'User is not allowed to edit this blog',
      }
    }

    await blog.merge(request.body()).save()
    await blog.load('user')

    return blog.serialize(blogSerializer)
  }

  /**
   * Delete record
   */
  async destroy({ params, request, auth }: HttpContext) {
    await request.validateUsing(paramsBlogValidator)

    const blog = await Blog.findOrFail(params.id)

    if (blog.userId !== auth.getUserOrFail().id) {
      return {
        message: 'User is not allowed to edit this blog',
      }
    }

    await blog.delete()

    return {
      message: 'Blog was success deleted',
    }
  }
}
