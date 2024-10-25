// This function checks if the object is a file.
export const isFile = (obj) => {
  // Check if the object has properties typical of a file
  return obj && typeof obj === 'object' && 'type' in obj && 'size' in obj
} // end isFile
