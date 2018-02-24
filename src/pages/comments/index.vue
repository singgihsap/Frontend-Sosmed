<template>
  <section class="content margin-top-6 margin-bottom-3">
    <!-- start:Navbar -->
    <Navbar></Navbar>
    <!-- end:/Navbar -->

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
            <div class="list-group margin-top-2">
              <router-link class="list-group-item list-group-item-action" :to="{ name: 'page_profile_by_user', params: { user_id: user.id } }"><i class="fa fa-home" aria-hidden="true"></i> Wall</router-link>
              <router-link class="list-group-item list-group-item-action" :to="{ name: 'page_albums_by_user', params: { albums_id: user.id } }"><i class="fa fa-picture-o" aria-hidden="true"></i> Albums</router-link>
            </div>
            <!-- end:/sidebar -->
          </div>

          <div class="col-md-8">
            <div class="card card--post">
              <div class="card-body">
                <div class="card-body__top margin-bottom-1">
                  <h5 class="card-title d-inline">{{ posts.title }}</h5>
                </div>
                <p>{{ posts.body }}</p>
              </div>
              <div class="card-body">
                <!-- start:comments post -->
                <div v-for="(comment, index) in comments" class="card card--grey-light margin-bottom-1">
                  <div class="card-body">
                    <div class="comment">
                      <div class="card-body__top margin-bottom-1">
                        <h6 class="card-subtitle mb-2 text-muted d-inline">{{ comment.name }}</h6>
                        <div class="action-card d-inline float-right">
                          <i class="fa fa-ellipsis-v"></i>
                          <div class="action-item">
                            <ul class="list-unstyled">
                              <li v-on:click="editComments(index)" class="pointer"><i class="fa fa-pencil"></i> Edit</li>
                              <li v-on:click="deleteComments(index)" class="pointer"><i class="fa fa-trash"></i> Delete</li>
                            </ul>
                          </div>
                        </div>
                        <p><span class="badge badge-success">{{ comment.email }}</span></p>
                      </div>
                      <p>{{ comment.body }}</p>
                    </div>
                  </div>
                </div>
                <!-- end:/comments post -->

                <!-- start:for input comments -->
                <form action="" class="margin-top-2">
                  <div class="form-group">
                    <label v-if="!isUpdate">Type Your Comments</label>
                    <label v-if="isUpdate">Edit Your Comments</label>
                  </div>
                  <div class="form-group">
                    <input v-model="inputComments.name" type="text" class="form-control" placeholder="Type title">
                  </div>
                  <div class="form-group">
                    <input v-model="inputComments.email" type="email" class="form-control" placeholder="Type your email">
                  </div>
                  <div class="form-group">
                    <textarea v-model="inputComments.body" class="form-control" rows="4" placeholder="Type comments"></textarea>
                  </div>
                  <button v-if="!isUpdate" v-on:click="addComments" type="button" class="btn btn-secondary float-right"><i class="fa fa-plus-circle" aria-hidden="true"></i> Create Comment</button>
                  <button v-if="isUpdate" v-on:click="updateComments" type="button" class="btn btn-success float-right margin-left-1"><i class="fa fa-pencil" aria-hidden="true"></i> Update Comment</button>
                  <button v-if="isUpdate" v-on:click="cancelComments" type="button" class="btn btn-danger float-right"><i class="fa fa-close" aria-hidden="true"></i> Cancel</button>
                </form>
                <!-- end:/for input comments -->
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
      this.getPostCommentsById(this.$route.params.post_id);
      this.getCommentsById(this.$route.params.post_id);
      this.getUserById(this.$route.params.user_id);
      this.getPhotosById(this.$route.params.user_id);
    },
    data () {
      return {
        msg : 'I am Home Page',
        posts: {},
        user: {},
        comments: {},
        inputComments: {
          postId: '',
          id: '',
          name: '',
          email: '',
          body: ''
        },
        indexEditComments: null,
        isUpdate: false
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
      // for get post comment by id
      getPostCommentsById : function (id) {
        this.$Progress.start();
        this.$service.posts.getPostCommentsById({id: id}).subscribe(
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
      // for get comment by id
      getCommentsById : function (id) {
        this.$Progress.start();
        this.$service.comments.getCommentsById({id: id}).subscribe(
          function (response) {
            this.comments = response;
            this.$Progress.finish()
          }.bind(this),
          function (errors) {
            console.log('onError %s', errors);
            this.$Progress.fail()
          }.bind(this)
        )
      },
      // for add comment
      addComments : function () {
        this.inputComments.postId = this.posts.id;
        this.inputComments.id = 5555;
        this.comments.push(this.inputComments);
        this.inputComments = {
          postId: '',
          id: '',
          name: '',
          email: '',
          body: ''
        }
      },
      // for edit comments
      editComments: function (index) {
        this.indexEditComments = index;
        this.isUpdate = true;
        this.inputComments = {
          postId: this.comments[index].postId,
          id: this.comments[index].id,
          name: this.comments[index].name,
          email: this.comments[index].email,
          body: this.comments[index].body
        }
      },
      // for update post
      updateComments: function () {
        this.isUpdate = false;
        this.comments[this.indexEditComments] = {
          postId: this.inputComments.postId,
          id: this.inputComments.id,
          name: this.inputComments.name,
          email: this.inputComments.email,
          body: this.inputComments.body
        };
        this.inputComments = {
          postId: '',
          id: '',
          name: '',
          email: '',
          body: ''
        }
      },
      // for cancel edit post
      cancelComments: function () {
        this.isUpdate = false;
        this.indexEditComments = null;
        this.inputComments = {
          postId: '',
          id: '',
          name: '',
          email: '',
          body: ''
        }
      },
      // for delete post
      deleteComments: function (index) {
        this.comments.splice(index, 1);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
