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
  },
  getPostById: function (params) {
    return Rx.Observable.create(function (observer) {
      http.GET(observer, 'https://jsonplaceholder.typicode.com' + '/posts?userId=' + params.id, {});
      return function () {
        console.log('disposed')
      }
    })
  },
  getPostCommentsById: function (params) {
    return Rx.Observable.create(function (observer) {
      http.GET(observer, 'https://jsonplaceholder.typicode.com' + '/posts/' + params.id, {});
      return function () {
        console.log('disposed')
      }
    })
  },
  addPost: function (params) {
    return Rx.Observable.create(function (observer) {
      const payload = {
        title: params.title,
        body: params.body
      };
      http.GET(observer, 'https://jsonplaceholder.typicode.com' + '/posts/', payload, params);
      return function () {
        console.log('disposed')
      }
    })
  }
}
