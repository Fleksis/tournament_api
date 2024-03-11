import { FieldContext } from '@vinejs/vine/types'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'

/**
 * Implementation
 */
async function unique(value: unknown, table: string, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  const row = await db
    .from(table)
    .whereNot('id', field.data.params.id ?? 0)
    .where('email', value)
    .first()

  if (row) {
    field.report(`The {{ field }} has already been taken`, 'unique', field)
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const uniqueRule = vine.createRule(unique)
