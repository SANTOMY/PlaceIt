<template>

  <div>
    <v-container>
        <h1>ユーザープロファイル</h1>
        <router-link to="/Map">Go to Map</router-link>
    </v-container>

    <v-app>
        <v-content>
        <v-container>
            <v-layout wrap>
            <v-flex xs12 sm6 md4>コンテンツ</v-flex>
            <v-flex xs12 sm6 md4>コンテンツ</v-flex>
            <v-flex xs12 sm6 md4>コンテンツ</v-flex>
            </v-layout>
        </v-container>
        </v-content>
    </v-app>

    <!-- <navbar></navbar>
    <sidebar></sidebar> -->
    <div class="top">
      <div>
        <value-card name="ユーザー名" value="タカタ"></value-card>
        <value-card name="ユーザー画像" value="Not Found"></value-card>
        <value-card name="いいね！した数" value="256"></value-card>
        <value-card name="作成スポット数" value="21,234"></value-card>
      </div>
      <!-- <graph-card name="ユーザー数 推移"></graph-card>
      <graph-card name="プレビュー数 推移"></graph-card>
      <list-card name="データ一覧"></list-card> -->
    </div>
  </div>
</template>

<script>
// import thumb_up  from './assets/thumb_up-24px.svg';
// import Navbar from "../organisms/Navbar";
// import Sidebar from "../organisms/Sidebar";
import ValueCard from "./molecules/ValueCard";
// import GraphCard from "../molecules/GraphCard";
// import ListCard from "../molecules/ListCard";
export default {
  components: {
    //   thumb_up,
    // Navbar,
    // Sidebar,
    ValueCard
    // GraphCard,
    // ListCard
  }
};
</script>
<style scoped lang="scss">
.top {
  padding: 66px 0 0 200px;
}
</style>