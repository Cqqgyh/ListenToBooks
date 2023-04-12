import Service from '../utils/request'

class CateGory extends Service {
  findAllCategory1() {
    return this.get({
      url: '/api/album/category/findAllCategory1'
    })
  }
}

export const courseService = new CateGory()
