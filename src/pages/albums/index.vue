<template>
  <section class="content margin-top-6 margin-bottom-3">
    <!-- start:navbar -->
    <Navbar></Navbar>
    <!-- end:/navbar -->

    <div class="content-page margin-top-3 margin-bottom-3">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <!-- start:sidebar -->
            <div class="card">
              <div class="card-body">
                <img class="margin-right-1 d-inline" width="100%" src="http://via.placeholder.com/400x400" alt="">
                <div class="description margin-top-1">
                  <h5>{{ user.name }}</h5>
                  <p><span class="badge badge-secondary size-12"><i class="fa fa-envelope margin-right-1"></i>{{ user.email }}</span></p>
                  <p><span class="badge badge-secondary size-12"><i class="fa fa-phone margin-right-1"></i> {{ user.phone }}</span></p>
                  <p><span class="badge badge-secondary size-12"><i class="fa fa-globe margin-right-1"></i> {{ user.website }}</span></p>
                </div>
              </div>
            </div>
            <div class="list-group margin-top-2 margin-bottom-2">
              <router-link class="list-group-item list-group-item-action" :to="{ name: 'page_profile_by_user', params: { user_id: user.id } }"><i class="fa fa-home" aria-hidden="true"></i> Wall</router-link>
              <router-link class="list-group-item list-group-item-action" :to="{ }"><i class="fa fa-picture-o" aria-hidden="true"></i> Albums</router-link>
            </div>
            <!-- end:/sidebar -->
          </div>
          <div class="col-md-8">
            <div class="row">

              <div v-for="album in albums" class="col-md-4">
                <router-link :to="{ name: 'page_photos_by_user', params: { albums_id: album.id } }">
                <div class="card card--albums">
                  <img src="../../assets/images/albums.jpg" alt="">
                  <div class="card-body">
                    <p class="card-body__albums-name">{{ album.title }}</p>
                  </div>
                </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Navbar from '@/components/layouts/navbar'

  export default {
    name : 'page_albums_by_user',
    components: {
      Navbar
    },
    mounted   : function () {
      this.getUserById(this.$route.params.user_id);
      this.getAlbumsById(this.$route.params.user_id);
    },
    data () {
      return {
        msg : 'Page Albums',
        user: {},
        albums: [],
        photos: []
      }
    },
    methods : {
      setMessage: function () {
        this.$store.commit('SET_MESSAGE', 'Mutation')
      },
      // for get user by id
      getUserById: function (id) {
        this.$Progress.start();
        this.$service.users.getUserById({id: id}).subscribe(
          function (response) {
            this.user = response;
            this.$Progress.finish()
          }.bind(this),
          function (errors) {
            console.log('onError %s', errors);
            this.$Progress.fail()
          }.bind(this)
        )
      },
      // for get post by id
      getAlbumsById: function (id) {
        this.$Progress.start();
        this.$service.albums.getAlbumsById({id: id}).subscribe(
          function (response) {
            this.albums = response;
            this.$Progress.finish()
          }.bind(this),
          function (errors) {
            console.log('onError %s', errors);
            this.$Progress.fail()
          }.bind(this)
        )
      },
      // for get post by id
      getPhotosById: function (id) {
        this.$Progress.start();
        this.$service.albums.getPhotosById({id: id}).subscribe(
          function (response) {
            this.photos = response;
            this.$Progress.finish()
          }.bind(this),
          function (errors) {
            console.log('onError %s', errors);
            this.$Progress.fail()
          }.bind(this)
        )
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
