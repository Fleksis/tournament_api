/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const BlogsController = () => import('#controllers/blogs_controller')

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return {
    message: 'hello world!',
  }
})

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

router.get('/blogs', [BlogsController, 'index'])
router.get('/blogs/:id', [BlogsController, 'show'])

router
  .group(() => {
    router.post('/blogs', [BlogsController, 'store'])
    router.put('/blogs/:id', [BlogsController, 'update'])
    router.delete('/blogs/:id', [BlogsController, 'destroy'])

    router.get('/me', [AuthController, 'user'])
  })
  .use(middleware.auth())

router.get('/users', [UsersController, 'index'])
router.post('/users', [UsersController, 'store'])
router.get('/users/:id', [UsersController, 'show'])
router.put('/users/:id', [UsersController, 'update'])
router.delete('/users/:id', [UsersController, 'destroy'])
