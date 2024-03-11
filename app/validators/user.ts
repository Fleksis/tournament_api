import vine from '@vinejs/vine'
import { existsRule } from '../../rules/exists.js'
import { uniqueRule } from '../../rules/unique.js'

/**
 * Validates the users update action
 */
export const paramsUserValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().withoutDecimals().positive().use(existsRule('users')),
    }),
  })
)

/**
 * Validates the users creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    firstname: vine.string().minLength(6).maxLength(255),
    lastname: vine.string().minLength(6).maxLength(255),
    email: vine.string().email().toLowerCase().maxLength(255).use(uniqueRule('users')),
    password: vine.string().minLength(6).confirmed(),
  })
)

/**
 * Validates the users update action
 */
export const updateUserValidator = vine.compile(
  vine.object({
    firstname: vine.string().minLength(6).maxLength(255),
    lastname: vine.string().minLength(6).maxLength(255),
    email: vine.string().email().toLowerCase().maxLength(255).use(uniqueRule('users')),
    password: vine.string().minLength(6).confirmed(),
  })
)
