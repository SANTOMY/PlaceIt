<template>
  <v-app>
    <v-card v-bind:class="color" width="600px">
      <v-card-title>
        <h1 class="CardTitle">{{name}}</h1>
      </v-card-title>
      <v-row
        v-bind:class="color + ' lighten-4'" 
        justify="center" align-content="center"
      >
        <v-col cols=8 v-for="n in list" :key="n">
          <v-card width="400px" elevation="12">
            <v-card-title>
              <h1 class="CardTitle">{{n.name}}</h1>
            </v-card-title>
            <v-card-text>
              <v-avatar size="100%">
                <img src="../../assets/pose_kuyashii_man.png">
              </v-avatar>
                <br>
                <h1 class="CardDetaile">作成者：{{n.username}}</h1>
                <br>
                <h1 class="CardDetaile">いいね！の数：{{n.good}}</h1>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>  
    </v-card>  
  </v-app>
</template>
<script>
// import CardTitle from "../atoms/CardTitle";
// import CardNumber from "../atoms/CardNumber";
export default {
  components: {

  },
  
  props: {
    name: String,
    color: String,
    'list':{
      name: String,
      good: Number
    }
  },

  
};
</script>
<style scoped lang="scss">
.value-content {
  display: inline-block;
  margin: 40px 0 40px 40px;
  height: 130px;
  width: 350px;
  background-color: white;
  border: 0 solid #aaa;
  border-radius: 4px;
  box-shadow: 2px 2px 2px 2px #ccc;
  padding: 15px;
}
</style>