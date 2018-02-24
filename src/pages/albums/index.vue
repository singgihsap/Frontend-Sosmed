<template>
  <section class="content margin-top-6 margin-bottom-3">
    <!-- start:Navbar -->
    <Navbar></Navbar>
    <!-- end:/Navbar -->

    <div class="content-page margin-top-3 margin-bottom-3">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <img class="margin-right-1 d-inline" width="100%" src="http://via.placeholder.com/400x400" alt="">
                <div class="description margin-top-1">
                  <h5>Jhone</h5>
                  <p>jhondoe@mail.com</p>
                  <p>Phone +62 600 1029</p>
                </div>
              </div>
            </div>

            <div class="list-group margin-top-2">
              <router-link class="list-group-item list-group-item-action" :to="{ name: 'page_profile_by_user', params: { user_id } }"><i class="fa fa-home" aria-hidden="true"></i> Wall</router-link>
              <router-link class="list-group-item list-group-item-action" :to="{ name: 'page_profile_by_user' }"><i class="fa fa-picture-o" aria-hidden="true"></i> Albums</router-link>
            </div>
          </div>

          <div class="col-md-8">
            <div class="card card--post">
              <div class="card-body">
                <div class="card-body__top margin-bottom-1">
                  <h5 class="card-title d-inline">Jhon Doe</h5>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium dolore excepturi fugiat iusto libero molestias, non numquam odio optio repellat repudiandae soluta ullam. Cupiditate dignissimos illo, iusto neque nobis possimus?</p>
              </div>

              <div class="card-body">
                <!-- start:comments -->
                <div v-for="comment in comments" class="card card--grey-light margin-bottom-1">
                  <div class="card-body">
                    <div class="comment">
                      <div class="card-body__top margin-bottom-1">
                        <h6 class="card-subtitle mb-2 text-muted d-inline">{{ comment.email }}</h6>
                        <div class="action-card d-inline float-right">
                          <i class="fa fa-ellipsis-v"></i>
                          <div class="action-item">
                            <ul class="list-unstyled">
                              <li><i class="fa fa-pencil"></i> Edit</li>
                              <li><i class="fa fa-trash"></i> Delete</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <p>{{ comment.body }}</p>
                    </div>
                  </div>
                </div>
                <!-- end:/comments -->

                <form action="" class="margin-top-2">
                  <div class="form-group">
                    <label>Type Your Comments</label>
                  </div>
                  <div class="form-group">
                    <textarea class="form-control" rows="3"></textarea>
                  </div>
                  <button type="button" class="btn btn-light float-right">Create Comment</button>
                </form>
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
    name : 'profile',
    components: {
      Navbar
    },
    mounted   : function () {
      this.getUser();
      this.getPost();
      this.getComments();
    },
    data () {
      return {
        msg : 'I am Home Page',
        users: [],
        posts: [],
        comments: []
      }
    },
    methods : {
      setMessage: function () {
        this.$store.commit('SET_MESSAGE', 'Mutation')
      },
      getUser : function (id) {
        this.$Progress.start();
        this.$service.users.getUser({}).subscribe(
          function (response) {
            this.users = response;
            this.$Progress.finish()
          }.bind(this),
          function (errors) {
            console.log('onError %s', errors);
            this.$Progress.fail()
          }.bind(this)
        )
      },
      getPost : function (id) {
        this.$Progress.start();
        this.$service.posts.getPost({}).subscribe(
          function (response) {
            this.posts = response;
            this.$Progress.finish()
          }.bind(this),
          function (errors) {
            console.log('onError %s', errors);
            this.$Progress.fail()
          }.bind(this)
        )
      },
      getComments : function (id) {
        this.$Progress.start();
        this.$service.comments.getComments({}).subscribe(
          function (response) {
            this.comments = response;
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
