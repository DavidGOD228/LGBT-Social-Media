class PageRoute extends Error {
  route: string

  constructor(message) {
    super(message)
    this.route = message
  }
}

export default PageRoute
