import Rx from 'rx'
import http from './../http'

export default {
  getAlbumsById: function (params) {
    return Rx.Observable.create(function (observer) {
      http.GET(observer, 'https://jsonplaceholder.typicode.com' + '/albums?userId=' + params.id, {});
      return function () {
        console.log('disposed')
      }
    })
  },
  getPhotosById: function (params) {
    return Rx.Observable.create(function (observer) {
      http.GET(observer, 'https://jsonplaceholder.typicode.com' + '/albums/' + params.id + '/photos', {});
      return function () {
        console.log('disposed')
      }
    })
  }
}
