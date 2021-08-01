import http from './http_common'

function Services() {
    const getAll = () => {
    return http.get("/home")
  }
  
  const get = (id) => {
    return http.get(`/home/${id}`)
  }
  
  const create = (data) => {
    return http.post("/home", data)
  }
  
  const update = (id, data) => {
    return http.put(`/home/${id}`, data)
  }
  
  const remove = (id) => {
    return http.delete(`/home/${id}`)
  }
  
  const removeAll = () => {
    return http.delete(`/home`)
  }
  
  const findByTitle = (title) => {
    return http.get(`/home?title=${title}`)
  }
  
  const TakeServices = {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
  }
}

  export default Services