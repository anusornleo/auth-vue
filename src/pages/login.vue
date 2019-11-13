<template>
  <div class="img-background py-20 sm:py-20 md:py-20 lg:py-48 lg:py-48">
    <div class="container mx-auto px-4">
      <!-- <el-card shadow="always" class="w-full sm:w-4/5 md:w-1/3 lg:w-1/3 xl:w-1/3 mx-auto">
      <el-form :label-position="labelPosition" status-icon label-width="100px" :model="LoginForm" ref="LoginForm">
        <el-form-item label="Username">
          <h2 v-if="data.message == 'Username not found'">Username not found</h2>
          <el-input v-model="LoginForm.username" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Password">
              <h2 v-if="data.message == 'Password Invalid'">Password Invalid</h2>
          <el-input v-model="LoginForm.password" type="text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">Submit</el-button>
        </el-form-item>
      </el-form>
      </el-card>-->
      <form
        :model="LoginForm"
        class="w-full sm:w-4/5 md:w-1/3 lg:w-1/3 xl:w-1/3 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label
            v-if="!usernameValidate"
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >Username</label>
          <label
            v-else
            class="block text-red-500 text-sm font-bold mb-2"
            for="username"
          >{{usernameError}}</label>
          <!-- <p v-if="usernameValidate" class="text-red-500 text-xs italic">Please input a Username.</p> -->
          <input
            v-model="LoginForm.username"
            v-bind:class="{'border-red-500':usernameValidate}"
            @change="useranmeEvent"
            @input="useranmeEvent"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
          />
        </div>
        <div class="mb-6">
          <label
            v-if="!passwordValidate"
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >Password</label>
          <label
            v-else
            class="block text-red-500 text-sm font-bold mb-2"
            for="password"
          >{{passwordError}}</label>
          <!-- <p v-if="passwordValidate" class="text-red-500 text-xs italic">Please input a password.</p> -->
          <input
            v-model="LoginForm.password"
            v-bind:class="{'border-red-500':passwordValidate}"
            @change="passwordEvent"
            @input="passwordEvent"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="text"
          />
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="flex items-center justify-between">
          <button
            v-if="LoginForm.username.length != 0  && LoginForm.password.length != 0"
            @click="submitForm()"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >Sign In</button>

          <button
            v-else
            disabled
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
          >Sign In</button>

          <!-- <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
          >Forgot Password?</a>-->
        </div>
      </form>
    </div>
    <div v-if="isLoading" class="opacity_bg">
      <div class="loading">
        <div class="lds-css ng-scope">
          <div style="width:100%;height:100%;" class="lds-rolling">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      labelPosition: "right",
      LoginForm: {
        username: "",
        password: ""
      },
      data: [],
      hadLogin: false,
      usernameValidate: false,
      passwordValidate: false,
      checkUsername: false,
      checkPassword: false,
      usernameError: "",
      passwordError: "",
      isLoading: false
    };
  },
  mounted() {
    if (localStorage.userMyLogin) {
      this.hadLogin = true;
      this.$router.push({
        name: "Home"
      });
    }
  },
  methods: {
    submitForm() {
      this.isLoading = true;
      axios
        .post("https://test-node-js-by-leo.herokuapp.com/users/login", {
          username: this.LoginForm.username,
          password: this.LoginForm.password
        })
        .then(response => {
          this.data = response.data;
          this.isLoading = false;
          if (this.data.data === "home") {
            this.saveLocalStorage();
            this.goHome();
          } else {
            if (this.data.message == "Username not found") {
              this.usernameValidate = true;
              this.usernameError = "Username not found";
            } else if (this.data.message == "Password Invalid") {
              this.passwordValidate = true;
              this.passwordError = "Password not Correct";
            }
          }
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    saveLocalStorage() {
      localStorage.userMyLogin = this.LoginForm.username;
    },
    useranmeEvent({ type, target }) {
      const event = {
        type,
        target: {
          value: target.value
        }
      };
      if (event.target.value == 0) {
        this.usernameValidate = true;
        this.usernameError = "Username is required";
      } else {
        this.usernameValidate = false;
        this.usernameError = "";
      }
    },
    passwordEvent({ type, target }) {
      const event = {
        type,
        target: {
          value: target.value
        }
      };
      if (event.target.value == 0) {
        this.passwordValidate = true;
        this.passwordError = "Password is required";
      } else {
        this.passwordValidate = false;
        this.passwordError = "";
      }
    },
    goHome() {
      this.$router.push({
        name: "Home"
      });
    }
  }
  // computed: {
  //   checkUsername() {
  //     let a = this.LoginForm.password;
  //     let b = false;
  //     if (a.length == 0) {
  //       b = true;
  //     }
  //     return b;
  //   },
  //   checkPassword() {
  //     let a = this.LoginForm.password;
  //     let b = false;
  //     if (a.length == 0) {
  //       b = true;
  //     }
  //     return b;
  //   }
  // }
};
</script>

<style scoped>
.opacity_bg{
  left: 0;
  top: 0;
  z-index: 22;
  position:absolute;
  width: 100%;
  height: 100vh;
  background-color:black;
  opacity: .5;
}
.lds-css {
  position: relative;
  left: -50%;
  top: -40%;
}
.loading {
  position: absolute;
  left: 50%;
  top: 40%;
}
.img-background {
  background-image: url("../assets/login-wallpaper.jpg");
  background-size: 100% 100%;
  /* background-color: #1d3f72; */
  height: 100vh;
}
@keyframes lds-rolling {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@-webkit-keyframes lds-rolling {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.lds-rolling {
  position: relative;
}
.lds-rolling div,
.lds-rolling div:after {
  position: absolute;
  width: 198px;
  height: 198px;
  border: 30px solid #0089d0;
  border-top-color: transparent;
  border-radius: 50%;
}
.lds-rolling div {
  -webkit-animation: lds-rolling 1s linear infinite;
  animation: lds-rolling 1s linear infinite;
  top: 100px;
  left: 100px;
}
.lds-rolling div:after {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.lds-rolling {
  width: 60px !important;
  height: 60px !important;
  -webkit-transform: translate(-30px, -30px) scale(0.3) translate(30px, 30px);
  transform: translate(-30px, -30px) scale(0.3) translate(30px, 30px);
}
</style>