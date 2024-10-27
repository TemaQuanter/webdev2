// This function checks if the object is a file.
export const isFile = (obj) => {
  // Check if the object has properties typical of a file
  return obj && typeof obj === 'object' && 'type' in obj && 'size' in obj
} // end function isFile

// This function checks if the object is an image file.
export const isImageFile = (file) => {
  const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
  const fileName = file.name.toLowerCase()
  const fileExtension = fileName.split('.').pop()
  return acceptedExtensions.includes(fileExtension)
} // end function isImageFile
