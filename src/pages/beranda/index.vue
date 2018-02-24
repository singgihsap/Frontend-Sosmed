<template>
  <section class="content margin-top-6 margin-bottom-3">
    <!-- start:Navbar -->
    <Navbar></Navbar>
    <!-- end:/Navbar -->

    <div class="content-page margin-top-3 margin-bottom-3">
      <div class="container">
        <div class="row">
            <div v-for="user in users" class="col-lg-3 col-sm-6">
              <router-link :to="{ name: 'page_profile_by_user', params: { user_id: user.id } }" class="card card--user text-center">
                <img class="card-img-top" src="http://via.placeholder.com/400x400" alt="Card image cap">
                <div class="card-body">
                  <h6 class="card-title">{{ user.name }}</h6>
                  <p><span class="badge badge-light size-12">{{ user.email }}</span></p>
                </div>
              </router-link>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Navbar from '@/components/layouts/navbar'

  export default {
    name      : 'beranda',
    components: {
      Navbar
    },
    mounted   : function () {
      this.getUser();
    },
    data () {
      return {
        msg: 'I am Home Page',
        users: [],
      }
    },
    methods : {
      setMessage: function () {
        this.$store.commit('SET_MESSAGE', 'Mutation')
      },
      // for get all user
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
