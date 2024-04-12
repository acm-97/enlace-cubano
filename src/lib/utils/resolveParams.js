export const resolveParams = (url, params) => {
  if (params) {
    const entries = Object.entries(params)
    let newParams = ''

    if (entries.length > 0) {
      for (const [key, value] of entries) {
        if (key !== 'id') {
          newParams += `${key}=${value}&`
        }
      }

      const character = url?.includes('?') ? '&' : '?'

      return newParams?.length > 0 ? `${url}${character}${newParams}` : url
    }
  }
  return url
}
