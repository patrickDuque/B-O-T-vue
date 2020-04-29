<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        sm="8"
        md="6"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="blue-grey darken-3"
            dark
            flat
          >
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form lazy-validation>
              <v-text-field
                color="blue-grey darken-3"
                label="Email"
                name="login"
                prepend-icon="person"
                type="email"
                v-model="email"
                :rules="[rules]"
              />

              <v-text-field
                color="blue-grey darken-3"
                id="password"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="password"
              />
            </v-form>
          </v-card-text>
          <v-col
            sm="12"
            md="8"
            offset-md="2"
          >
            <v-btn
              color="blue-grey darken-3"
              block
              class="white--text"
              :disabled="disable"
              @click="login"
            >Login</v-btn>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      email: "",
      password: "",
      disable: false
    }),
    methods: {
      login() {
        const data = {
          email: this.email,
          password: this.password
        };
        this.$store.dispatch("user/login", data);
      },
      rules(email) {
        // eslint-disable-next-line no-useless-escape
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
          this.disable = false;
          return true;
        } else {
          this.disable = true;
          return "Please enter a valid email";
        }
      }
    }
  };
</script>