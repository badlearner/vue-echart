'use strict'

class LocalStorageUtil {

  getItem (key) {
    let data = localStorage.getItem(key)

    if (data) {
      return JSON.parse(data)
    }
    return false
  }

  setItem (key, obj) {
    let data = JSON.stringify(obj)

    localStorage.setItem(key, data)
  }
}

export default new LocalStorageUtil()
