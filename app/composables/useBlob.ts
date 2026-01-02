export const useBlob = () => {
  const getBlobs = async () => {
    const blobs = await $fetch('/api/blob')
    return blobs
  }

  const uploadBlob = async (blob: {file: File, type: string, path: string}) => {
    const formData = new FormData()
    formData.append(`file`, blob.file)  
    formData.append(`type`, blob.type)
    
    const response = await $fetch(`/api/blob/${blob.path}`, {
      method: 'PUT',
      body: formData
    })

    return response
  }

  const deleteBlob = async (blob: string) => {
    const response = await $fetch(`/api/blob/${blob}`, {
      method: 'DELETE',
    })

    return response
  }

  return {
    getBlobs,
    uploadBlob,
    deleteBlob
  }
}
