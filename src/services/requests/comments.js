import Rx from 'rx'
import http from './../http'

export default {
  getCommentsById: function (params) {
    return Rx.Observable.create(function (observer) {
      http.GET(observer, 'https://jsonplaceholder.typicode.com' + '/posts/' + params.id + '/comments', {});
      return function () {
        console.log('disposed')
      }
    })
  },
}
