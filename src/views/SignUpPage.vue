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
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-form lazy-validation>
              <v-text-field
                color="blue-grey darken-3"
                label="Full Name"
                name="name"
                prepend-icon="person"
                type="email"
                v-model="name"
                :rules="[required]"
              />
              <v-text-field
                color="blue-grey darken-3"
                label="Email"
                name="login"
                prepend-icon="alternate_email"
                type="email"
                v-model="email"
                hint="Must be a valid email"
                :rules="[rules]"
              />
              <v-text-field
                color="blue-grey darken-3"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="password"
                hint="Must be atleast 8 characters"
                :rules="[required]"
              />
              <v-text-field
                color="blue-grey darken-3"
                label="Confirm Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="cpassword"
                hint="Must be atleast 8 characters"
                :rules="[cpass]"
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
              :disabled="disable || password.length < 8 || cpassword.length < 8"
              @click="register"
            >Register</v-btn>
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
      cpassword: "",
      name: "",
      disable: false
    }),
    methods: {
      register() {
        const form = {
          email: this.email,
          password: this.password,
          name: this.name
        };
        this.$store.dispatch("user/signup", form);
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
      },
      cpass(pass) {
        if (this.password !== pass) {
          this.disable = true;
          return "Password did not match";
        } else {
          this.disable = false;
          return true;
        }
      },
      required(i) {
        if (i.length < 0) {
          this.disable = true;
          return "This Field is required";
        } else {
          this.disable = false;
          return true;
        }
      }
    }
  };
</script>