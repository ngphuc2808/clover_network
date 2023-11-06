export const authHeader = () => {
  const result = JSON.parse(localStorage.getItem('userLogin')!)

  if (result && result.tokenId)
    return { Authorization: `Bearer ${result.tokenId}` }
  return {}
}
