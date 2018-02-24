import Rx from 'rx'
import http from './../http'

export default {
  getUser: function (params) {
    return Rx.Observable.create(function (observer) {
      http.GET(observer, 'https://jsonplaceholder.typicode.com' + '/users/', params);
      return function () {
        console.log('disposed')
      }
    })
  }
}
