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
              <a href="#" class="list-group-item list-group-item-action"><i class="fa fa-home" aria-hidden="true"></i> Wall</a>
              <a href="#" class="list-group-item list-group-item-action"><i class="fa fa-picture-o" aria-hidden="true"></i> Albums</a>
            </div>
          </div>

          <div class="col-md-8">
            <div class="card card--grey-light">
              <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">Create Post</h6>
                <form action="">
                  <div class="form-group">
                    <textarea class="form-control" rows="3"></textarea>
                  </div>
                  <button type="button" class="btn btn-secondary float-right">Create Post</button>
                </form>
              </div>
            </div>

            <div class="card card--post margin-top-2">
              <div class="card-body">
                <div class="card-body__top">
                  <h5 class="card-title d-inline">Jhon Doe</h5>
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
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium dolore excepturi fugiat iusto libero molestias, non numquam odio optio repellat repudiandae soluta ullam. Cupiditate dignissimos illo, iusto neque nobis possimus?</p>
                <form action="">
                  <div class="form-group">
                    <textarea class="form-control" rows="3"></textarea>
                  </div>
                  <button type="button" class="btn btn-light float-right">Create Comment</button>
                </form>
              </div>

              <div class="card-body">
                <div class="card card--grey-light">
                  <div class="card-body">
                    <div class="comment">
                      <div class="card-body__top">
                        <h6 class="card-subtitle mb-2 text-muted d-inline">Taqim</h6>
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
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid commodi delectus deserunt doloremque expedita illum, iusto laudantium, magni non officiis placeat possimus qui quibusdam ratione, saepe sed tempora tenetur.</p>
                    </div>
                  </div>
                </div>

                <div class="card card--grey-light margin-top-1">
                  <div class="card-body">
                    <div class="comment">
                      <div class="card-body__top">
                        <h6 class="card-subtitle mb-2 text-muted d-inline">Iqbal Taqim</h6>
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
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid commodi delectus deserunt doloremque expedita illum, iusto laudantium, magni non officiis placeat possimus qui quibusdam ratione, saepe sed tempora tenetur.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-for="( post, index ) in posts" class="card card--post margin-top-2">
              <div class="card-body">
                <div class="card-body__top">
                  <h5 class="card-title d-inline">{{ post.title }}</h5>
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
                <p>{{ post.body }}</p>
                <form action="">
                  <button type="button" class="btn btn-light float-right"><i class="fa fa-comments" aria-hidden="true"></i> Comment</button>
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
    },
    data () {
      return {
        msg : 'I am Home Page',
        users: [],
        posts: []
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
            console.log('onError %s', errors)
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
            console.log('onError %s', errors)
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
