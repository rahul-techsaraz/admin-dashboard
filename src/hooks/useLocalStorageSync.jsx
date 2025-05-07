// import { useEffect } from 'react'

// export const useLocalStorageSync = (key, Statekey, state) => {
//   useEffect(() => {
//     const existingData = JSON.parse(localStorage.getItem(key)) || {}
//     localStorage.setItem(key, JSON.stringify({ ...existingData, [Statekey]: state }))
//   }, [Statekey, state])
// }
import { useEffect } from 'react'

// A utility function to initialize the state shape if it's missing in localStorage
const getMergedState = (key, stateKey, initialState) => {
  // Get existing data from localStorage or initialize an empty object
  const existing = JSON.parse(localStorage.getItem(key)) || {}

  // Merge existing data with the initial state
  const merged = {
    ...initialState, // Default shape
    ...existing, // Existing data from localStorage
    [stateKey]: existing[stateKey] || initialState[stateKey] // Update the specific part
  }

  return merged
}

export const useLocalStorageSync = (key, stateKey, stateValue, initialState) => {
  useEffect(() => {
    const mergedState = getMergedState(key, stateKey, initialState)

    // Update the part of the state we are working with, preserving the shape
    const updatedState = {
      ...mergedState,
      [stateKey]: stateValue
    }

    // Save the full merged state to localStorage
    localStorage.setItem(key, JSON.stringify(updatedState))
  }, [stateKey, stateValue, key, initialState])
}
