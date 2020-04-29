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
        <v-card
          id="card"
          outlined
          height="100%"
          class="pa-0 ma-0"
        >
          <v-card
            height="100%"
            id="red"
            outlined
          >
            <v-container
              class="fill-height"
              fluid
            >
              <v-row
                align="center"
                justify="center"
              >
                <div class="box">
                  <h1 class="display-1 red--text text--darken-4 pa-5 font-italic font-weight-bold">NEW ERA BEGINS</h1>
                  <router-link to="/shop">
                    <p class="title font-weight-light font red--text text--darken-4 text-center">
                      <v-btn
                        text
                        x-large
                      >
                        <v-icon
                          class="icon"
                          x-large
                          color="red darken-4"
                        >storefront</v-icon>
                        <p class="red--text text--darken-4 my-auto">Browse our shop</p>
                      </v-btn>
                    </p>
                  </router-link>
                </div>
              </v-row>
            </v-container>
          </v-card>
        </v-card>
      </v-col>
      <v-col
        xs="12"
        md="6"
        class="pa-0"
      >
        <v-container
          fluid
          class="pa-0"
        >
          <v-img src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"></v-img>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  #red {
    background-color: #e2e6e9;
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
