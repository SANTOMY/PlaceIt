<template>
  <div class="number-label">{{ value }}</div>
</template>
<script>
export default {
  props: ["value"]
};
</script>
<style scoped lang="scss">
.number-label {
  text-align: center;
  margin-top: 30px;
  font-size: 40px;
}
</style>