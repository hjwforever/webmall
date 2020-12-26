import http from '../boot/axios'

class GoodDataService {
  getAll(params) {
    return http.get('/goods', { params })
  }

  get(id) {
    return http.get(`/goods/${id}`)
  }

  create(data) {
    return http.post('/goods', data)
  }

  update(id, data) {
    return http.put(`/goods/${id}`, data)
  }

  delete(id) {
    return http.delete(`/goods/${id}`)
  }

  deleteAll() {
    return http.delete(`/goods`)
  }

  findByTitleOrAuthor(search) {
    return http.get(`/goods?title=${search}&author=${search}`)
  }
}

export default new GoodDataService()

