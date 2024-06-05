import { isArray, isEffectArray, isString } from 'asura-eye'

export const getInfo = (target: any) => {
  if (isString(target)) {
    return { name: target }
  }
  if (isEffectArray(target)) {
    const [name, children] = target
    return { name, children }
  }
  return {}
}
