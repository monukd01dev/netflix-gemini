/**
 * Evaluates raw data objects against any specified Zod schema.
 * Enforces a strict, functional Result data contract.
 * 
 * @param {import('zod').ZodSchema} schema 
 * @param {Object} data 
 * @returns {{success: true, data: any} | {success: false, errors: Record<string, string[]>}}
 */
export const runValidator = (schema, data) => {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    };
  }

  return {
    success: true,
    data: result.data
  };
};