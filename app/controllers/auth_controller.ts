import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user'
import { userSerializer } from '../../helpers/serializers.js'

export default class AuthController {
  async register({ request }: HttpContext) {
    const validated = await request.validateUsing(createUserValidator)
    const user = await User.create(validated)
    await user.refresh()

    return user
  }

  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    return {
      user: user,
      accessToken: await User.accessTokens.create(user),
    }
  }

  async user({ auth }: HttpContext) {
    return auth.getUserOrFail().serialize(userSerializer)
  }
}
