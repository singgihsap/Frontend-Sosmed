<template>
  <section class="content">
    <!-- start:Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link" href="#">Features</a>
            <a class="nav-item nav-link" href="#">Pricing</a>
            <a class="nav-item nav-link disabled" href="#">Disabled</a>
          </div>
        </div>
      </div>
    </nav>
    <!-- end:/Navbar -->

    <div class="content-page">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="card">
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

            <div class="card card--post">
              <div class="card-body">
                <h5 class="card-title">Jhon Doe</h5>
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
    name      : 'home',
    components: {
      Example
    },
    mounted   : function () {
      this.getUser(1)
    },
    data () {
      return {
        msg : 'I am Home Page',
        user: {}
      }
    },
    methods   : {
      setMessage: function () {
        this.$store.commit('SET_MESSAGE', 'Mutation')
      },
      getUser   : function (id) {
        this.$Progress.start()
        this.$service.users.getUser({id: id}).subscribe(
          function (response) {
            this.user = response
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
