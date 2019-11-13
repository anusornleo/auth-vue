<template>
  <div>
    <p>{{message}}</p>
    <el-button type="danger" @click="logout()">Logout</el-button>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      message: [],
      errors: []
    };
  },
  created() {
    Axios.get("https://test-node-js-by-leo.herokuapp.com")
      .then(res => {
        this.message = res.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  mounted(){
    if (!localStorage.userMyLogin) {
      // this.hadLogin = true;
      this.$router.push({
        name: "Login"
      });
    }
  },
  methods: {
    logout() {
      localStorage.userMyLogin = "";
    }
  }
};
</script>