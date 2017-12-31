import dateFormat from 'dateformat'

export const isValidDate = (v) => !Number.isNaN(new Date(v).getTime())
export const format = (v, f = 'yyyy-mm-dd HH:MM') => dateFormat(new Date(v), f)
export const floorToDate = (v) => {
  const ret = new Date(v)
  ret.setHours(0, 0, 0, 0)
  return ret
}