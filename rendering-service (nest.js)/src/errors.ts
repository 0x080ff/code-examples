const startCode = Number(process.env.START_ERROR_NUMBERRING) || 0;

export const UnexpectedError = {
  code: startCode,
  text: 'Unexpected error',
} as const;

export const UnauthorizedError = {
  code: startCode + 1,
  text: 'Unauthorized',
} as const;

export const NotFound = {
  code: startCode + 10,
  text: 'Object not found',
} as const;

export const CreationFailed = {
  code: startCode + 11,
  text: 'Creation failed',
} as const;

export const UpdateFailed = {
  code: startCode + 12,
  text: 'Update failed',
} as const;

export const DelitionFailed = {
  code: startCode + 13,
  text: 'Delition failed',
} as const;

export const InvalidRequest = {
  code: startCode + 14,
  text: 'Invalid request body format',
} as const;
