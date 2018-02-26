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
              <router-link class="list-group-item list-group-item-action" :to="{}"><i class="fa fa-home" aria-hidden="true"></i> Wall</router-link>
              <router-link class="list-group-item list-group-item-action" :to="{ name: 'page_albums_by_user', params: { albums_id: user.id } }"><i class="fa fa-picture-o" aria-hidden="true"></i> Albums</router-link>
            </div>
            <!-- end:/sidebar -->
          </div>
          <div class="col-md-8">
            <!-- start:create post -->
            <div class="card card--grey-light margin-bottom-1">
              <div class="card-body">
                <h6 v-if="!isUpdate" class="card-subtitle mb-2 text-muted">Create Post</h6>
                <h6 v-if="isUpdate" class="card-subtitle mb-2 text-muted">Edit Post</h6>
                <form action="">
                  <div class="form-group">
                    <input v-model="inputPost.title" type="text" class="form-control" placeholder="Title Post">
                  </div>
                  <div class="form-group">
                    <textarea v-model="inputPost.body" class="form-control" rows="4" placeholder="Description"></textarea>
                  </div>
                  <button v-if="!isUpdate" v-on:click="addPost" type="button" class="btn btn-secondary float-right"><i class="fa fa-plus-circle" aria-hidden="true"></i> Create Post</button>
                  <button v-if="isUpdate" v-on:click="updatePost" type="button" class="btn btn-success margin-left-1 float-right"><i class="fa fa-pencil" aria-hidden="true"></i> Update Post</button>
                  <button v-if="isUpdate" v-on:click="cancelEdit" type="button" class="btn btn-danger float-right"><i class="fa fa-close" aria-hidden="true"></i> Cancel</button>
                </form>
              </div>
            </div>
            <!-- end:/create post -->

            <!-- start:posts items -->
            <div v-for="(post, index) in posts" class="card card--post margin-bottom-1">
              <div class="card-body">
                <div class="card-body__top">
                  <h5 class="card-title d-inline">{{ post.title }}</h5>
                  <div class="action-card d-inline float-right">
                    <i class="fa fa-ellipsis-v"></i>
                    <div class="action-item">
                      <ul class="list-unstyled">
                        <li v-on:click="editPost(index)" class="pointer"><i class="fa fa-pencil"></i> Edit</li>
                        <li v-on:click="deletePost(index)" class="pointer"><i class="fa fa-trash"></i> Delete</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p class="margin-top-1">{{ post.body }}</p>
                <form action="">
                  <router-link :to="{ name: 'page_post_by_user', params: { post_id: post.id } }">
                    <button type="button" class="btn btn-light float-right"><i class="fa fa-comments" aria-hidden="true"></i> Comment</button>
                  </router-link>
                </form>
              </div>
            </div>
            <!-- end:/posts items -->
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
      this.getUserById(this.$route.params.user_id);
      this.getPostById(this.$route.params.user_id);
    },
    data () {
      return {
        msg : 'I am Home Page',
        inputPost: {
          userId: '',
          id: '',
          title: '',
          body: ''
        },
        indexEditPost: null,
        isUpdate: false,
        user: {},
        posts: []
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
      getPostById: function (id) {
        this.$Progress.start();
        this.$service.posts.getPostById({id: id}).subscribe(
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
      // for add post
      addPost: function () {
        this.inputPost.userId = this.user.id;
        this.inputPost.id = 4444;
        if ( (this.inputPost.title.length > 0) && (this.inputPost.body.length > 0) ) {
          this.posts.unshift(this.inputPost);
          this.inputPost = {
            userId: '',
            id: '',
            title: '',
            body: ''
          }
        }
      },
      // for edit post
      editPost: function (index) {
        this.indexEditPost = index;
        this.isUpdate = true;
        this.inputPost = {
          userId: this.posts[index].userId,
          id: this.posts[index].id,
          title: this.posts[index].title,
          body: this.posts[index].body
        }
      },
      // for update post
      updatePost: function () {
        this.isUpdate = false;
        this.posts[this.indexEditPost] = {
          userId: this.inputPost.userId,
          id: this.inputPost.id,
          title: this.inputPost.title,
          body: this.inputPost.body
        };
        this.inputPost = {
          userId: '',
          id: '',
          title: '',
          body: ''
        }
      },
      // for cancel edit post
      cancelEdit: function () {
        this.isUpdate = false;
        this.indexEditPost = null;
        this.inputPost = {
          userId: '',
          id: '',
          title: '',
          body: ''
        }
      },
      // for delete post
      deletePost: function (index) {
        this.posts.splice(index, 1);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
