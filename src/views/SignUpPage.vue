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
    <v-row v-if="loading">
      <div class="loader">Loading...</div>
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
      disable: false,
      loading: false
    }),
    methods: {
      register() {
        this.loading = true;
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

<style scoped>
  .loader {
    color: #37474f;
    font-size: 90px;
    text-indent: -9999em;
    overflow: hidden;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin: 72px auto;
    position: relative;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load6 1.7s infinite ease, round 1.7s infinite ease;
    animation: load6 1.7s infinite ease, round 1.7s infinite ease;
  }
  @-webkit-keyframes load6 {
    0% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    5%,
    95% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    10%,
    59% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
        -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
        -0.297em -0.775em 0 -0.477em;
    }
    20% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
        -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
        -0.749em -0.34em 0 -0.477em;
    }
    38% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
        -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
        -0.82em -0.09em 0 -0.477em;
    }
    100% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
  }
  @keyframes load6 {
    0% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    5%,
    95% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
    10%,
    59% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em,
        -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em,
        -0.297em -0.775em 0 -0.477em;
    }
    20% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em,
        -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em,
        -0.749em -0.34em 0 -0.477em;
    }
    38% {
      box-shadow: 0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em,
        -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em,
        -0.82em -0.09em 0 -0.477em;
    }
    100% {
      box-shadow: 0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em,
        0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em;
    }
  }
  @-webkit-keyframes round {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes round {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>