import Vue from 'vue'
import Router from 'vue-router'
import pageExample from '@/pages/example'
import pageBeranda from '@/pages/beranda'
import pageProfile from '@/pages/profile'
import pagePost from '@/pages/comments'
import pageAlbums from '@/pages/albums'
import pagePhotos from '@/pages/photos'
import pageError from '@/pages/error';

Vue.use(Router);

export default new Router({
  mode  : 'history',
  routes: [
    {
      path     : '/example',
      name     : 'page_example',
      component: pageExample
    },
    {
      path     : '/',
      name     : 'page_beranda',
      component: pageBeranda
    },
    {
      path     : '/profile',
      name     : 'page_profile',
      component: pageProfile
    },
    {
      path     : '/profile/:user_id',
      name     : 'page_profile_by_user',
      component: pageProfile
    },
    {
      path     : '/profile/:user_id/post/:post_id/comments',
      name     : 'page_post_by_user',
      component: pagePost
    },
    {
      path     : '/profile/:user_id/albums/:albums_id',
      name     : 'page_albums_by_user',
      component: pageAlbums
    },
    {
      path     : '/profile/:user_id/albums/:albums_id/photos',
      name     : 'page_photos_by_user',
      component: pagePhotos
    },
    {
      path     : '/401',
      name     : 'page_401',
      component: pageError
    }
  ]
})
