import type { HttpContext } from '@adonisjs/core/http'
import { updateUserValidator } from '#validators/user'

export default class UsersController {
  async update({ request, auth }: HttpContext) {
    const validated = await request.validateUsing(updateUserValidator)
    const user = auth.getUserOrFail()
    return await user.merge(validated).save()
  }

  async destroy({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    await user.delete()
    return {
      message: 'User has been deleted',
    }
  }
}
