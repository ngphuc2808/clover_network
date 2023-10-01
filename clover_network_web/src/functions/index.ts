export const authHeader = () => {
  const result = JSON.parse(localStorage.getItem("persist:root")!);

  if (result.isLoggedIn && result.tokenId)
    return { Authorization: `Bearer ${result.tokenId.slice(1, -1)}` };
  return {};
};
