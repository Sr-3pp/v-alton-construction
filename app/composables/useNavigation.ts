export const useNavigation = () => {  
  const navigation = useAsyncData('navigation', async() => {
    const nav = await queryCollectionNavigation('content', ['meta']).where('path', 'NOT LIKE', '%extra%')
    return nav[0].children
  })

  const getSubmenu = (path: string, nav: []) => {
    const findElements = (obj: [], pth: string) => {
      const pathArr = pth.split('/')
      const currentPath = pathArr.shift()
      const currentElement = obj.find((nav: any) => nav.path.includes(currentPath))
      if (!currentElement) return null
      if (pathArr.length === 0) return (currentElement as { children: [] }).children
      return findElements((currentElement as { children: [] }).children, pathArr.join('/'))
    }
    return findElements(nav, path)
  }

  return {
    navigation,
    getSubmenu
  }
}
