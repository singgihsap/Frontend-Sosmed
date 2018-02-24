import Rx from 'rx'
import http from './../http'

export default {
  getPost: function (params) {
    return Rx.Observable.create(function (observer) {
      http.GET(observer, 'https://jsonplaceholder.typicode.com' + '/posts/', params);
      return function () {
        console.log('disposed')
      }
    })
  }
}
