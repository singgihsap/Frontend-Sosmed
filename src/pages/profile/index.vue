<template>
  <section class="content">
    <!-- start:Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Dashboard Sosmed</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
    <!-- end:/Navbar -->

    <div class="content-page margin-top-3">
      <div class="container">
        <div class="row">
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
            </div>

          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-body">
                <h6 class="card-subtitle mb-2 text-muted">List User</h6>
                <ul class="list-unstyled margin-top-1">
                  <li v-for="userSosmed in user" class="margin-bottom-1">
                    <a href="#">
                      <img class="margin-right-1 d-inline" width="35" src="../../assets/images/avatar.svg" alt="">
                      <span class="d-inline">{{ userSosmed.name }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Example from '@/components/example'

  export default {
    name      : 'beranda',
    components: {
      Example
    },
    mounted   : function () {
      this.getUser();
    },
    data () {
      return {
        msg : 'I am Home Page',
        user: {}
      }
    },
    methods : {
      setMessage: function () {
        this.$store.commit('SET_MESSAGE', 'Mutation')
      },
      getUser : function (id) {
        this.$Progress.start();
        this.$service.users.getUser({id: id}).subscribe(
          function (response) {
            this.user = response;
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
