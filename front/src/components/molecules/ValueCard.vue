<template>
  <div class="value-content">
    <card-title :value="name"></card-title>
    <card-number :value="value"></card-number>
  </div>
</template>
<script>
import CardTitle from "../atoms/CardTitle";
import CardNumber from "../atoms/CardNumber";
export default {
  components: {
    CardTitle,
    CardNumber
  },
  props: {
    name: String,
    value: String
  }
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