import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator, paramsUserValidator, updateUserValidator } from '#validators/user'

export default class UsersController {
  async index({ request }: HttpContext) {
    if (request.qs().page) {
      return User.query()
        .orderBy('id', 'desc')
        .paginate(request.qs().page, request.qs().pagination ?? 10)
    }
    return User.query().orderBy('id', 'desc')
  }

  async store({ request }: HttpContext) {
    await request.validateUsing(createUserValidator)
    return await User.create(request.body())
  }

  async show({ params, request }: HttpContext) {
    await request.validateUsing(paramsUserValidator)
    return await User.findOrFail(params.id)
  }

  async update({ params, request }: HttpContext) {
    await request.validateUsing(updateUserValidator)

    const user = await User.findOrFail(params.id)
    return await user.merge(request.body()).save()
  }

  async destroy({ params, request }: HttpContext) {
    await request.validateUsing(paramsUserValidator)
    const user = await User.findOrFail(params.id)
    await user.delete()
    return {
      message: 'User has been deleted',
    }
  }
}
