export function deepParseTypedJSON(obj) {
  if (typeof obj === 'string') {
    try {
      const parsed = JSON.parse(obj)
      // If parsed is an object or array, recursively parse its elements
      if (typeof parsed === 'object' && parsed !== null) {
        return deepParseTypedJSON(parsed)
      } else {
        return parsed // Return the parsed primitive (like a number or string)
      }
    } catch (e) {
      return obj // If not JSON parsable, return the original string
    }
  } else if (Array.isArray(obj)) {
    return obj.map((item) => deepParseTypedJSON(item)) // Parse each item in the array
  } else if (typeof obj === 'object' && obj !== null) {
    const parsedObj = {}
    for (const key in obj) {
      parsedObj[key] = deepParseTypedJSON(obj[key]) // Recursively parse each value
    }
    return parsedObj
  } else {
    return tryParseTyped(obj) // Handle other types (number, boolean, etc)
  }
}

function tryParseTyped(value) {
  if (typeof value === 'string') {
    // Try parsing numbers and booleans from string
    const numberValue = Number(value)
    if (!isNaN(numberValue)) return numberValue // If it's a valid number
    if (value.toLowerCase() === 'true') return true // If it's "true"
    if (value.toLowerCase() === 'false') return false // If it's "false"

    // Try parsing dates
    const dateValue = new Date(value)
    if (!isNaN(dateValue)) return dateValue // If it's a valid date

    return value // Else return the string as is
  }
  return value // If it's not a string, return the value as is (e.g., number, boolean)
}
