<template>
  <v-container
    fluid
    class="pa-0"
  >
    <v-row>
      <v-col
        xs="12"
        md="6"
        class="pa-0"
      >
        <v-img
          eager
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
        ></v-img>
      </v-col>
      <v-col
        xs="12"
        md="6"
        class="pa-0 hidden-sm-and-down"
      >
        <v-card
          id="card"
          outlined
          height="100%"
          width="100%"
          class="pa-0 ma-0"
        >
          <v-card
            height="100%"
            id="red"
            outlined
          >
            <v-container
              class="fill-height ma-0 pa-0"
              fluid
            >
              <v-row
                class="hidden-sm-and-down"
                align="center"
                justify="center"
              >
                <div class="box pa-0">
                  <h1 class="display-1 blue-grey--text text--darken-3 pa-5 font-italic font-weight-bold">NEVER STOP RUNNING</h1>
                  <router-link to="/shop">
                    <p class="title font-weight-light blue-grey--text text--darken-3 text-center">
                      <v-btn
                        text
                        x-large
                      >
                        <p class="blue-grey--text text--darken-3 my-auto">Browse our shop</p>
                        <v-icon
                          class="icon"
                          x-large
                          color="blue-grey darken-3"
                        >storefront</v-icon>
                      </v-btn>
                    </p>
                  </router-link>
                </div>
              </v-row>
            </v-container>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  #red {
    background-color: #cc021b;
    border: none;
  }

  .box {
    border: 1px solid white;
    border-radius: 3px;
    background-color: white;
  }

  .box:hover {
    opacity: 1;
  }

  a {
    text-decoration: none;
  }

  .icon {
    text-decoration: none;
  }

  #card {
    border: none;
  }
</style>
