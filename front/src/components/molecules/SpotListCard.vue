<template>
  <v-app>
    <v-card v-bind:class="color" >

      <v-toolbar
        color="indigo"
        dark
      >

        <v-app-bar-nav-icon>


        </v-app-bar-nav-icon>

        <v-toolbar-title>{{name}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-toolbar>

      <v-container fluid>
        <v-row dense>
          <v-col
            v-for="card in list"
            :key="card"
            :cols="card.flex"
          >
            <v-card>
              <v-img
                src="@/assets/pose_kuyashii_man.png"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>

              <v-card-actions>
                <!-- <v-card-actions-title>
                  {{n.name}}
                </v-card-actions-title> -->
                <v-spacer></v-spacer>

                <!-- <v-btn icon> -->
                  <v-icon class="mr-1">mdi-heart</v-icon>
                <!-- </v-btn> -->
                <span class="subheading mr-2">{{card.good}}</span>
                <!-- <span class="mr-1">・</span> -->

                <!-- <v-btn icon>
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn> -->

                <!-- <v-btn icon >
                  <v-icon class="mr-1">mdi-share-variant</v-icon>
                </v-btn>
                <span class="subheading">45</span> -->
              </v-card-actions>

            </v-card>
          </v-col>
        </v-row>
      </v-container>



   
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