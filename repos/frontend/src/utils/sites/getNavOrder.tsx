

export const getNavOrder = (items:string[]) => {
  return items.reduce((acc, str, idx) => {
    acc[str] = idx
    return acc
  }, {})
}
