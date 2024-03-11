import vine from '@vinejs/vine'
import { existsRule } from '../../rules/exists.js'

const id = vine.number().withoutDecimals().positive().use(existsRule('blogs'))

/**
 * Validates the blogs update action
 */
export const paramsBlogValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: id,
    }),
  })
)

/**
 * Validates the blogs creation action
 */
export const createBlogValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(6).maxLength(255),
    description: vine.string().minLength(6).maxLength(255),
  })
)

export const updateBlogValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(6).maxLength(255),
    description: vine.string().minLength(6).maxLength(255),

    params: vine.object({
      id: id,
    }),
  })
)
