<template>
  <div class="title-label">{{ value }}</div>
</template>
<script>
export default {
  props: ["value"]
};
</script>
<style scoped lang="scss">
.title-label {
  font-size: 20px;
  font-weight: bold;
  color: grey;
  padding-bottom: 3px;
  border-bottom: solid 2px #3280f57e;
}
</style>