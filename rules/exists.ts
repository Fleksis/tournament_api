import { FieldContext } from '@vinejs/vine/types'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'

/**
 * Implementation
 */
async function exists(value: unknown, table: string, field: FieldContext) {
  if (typeof value !== 'number') {
    return
  }

  const row = await db.from(table).where('id', value).first()

  if (!row) {
    field.report(`No query results for table ${table} {{ field }}`, 'exists', field)
  }
}

/**
 * Converting a function to a VineJS rule
 */
export const existsRule = vine.createRule(exists)
