export function deepMerge(target, source) {
  if (typeof target !== 'object' || typeof source !== 'object') return target

  const output = { ...target }

  for (const key in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
        output[key] = deepMerge(target[key] || {}, source[key])
      } else {
        output[key] = source[key]
      }
    }
  }

  return output
}
