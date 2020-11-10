<template>
    <h1>spot-register</h1>
</template>

<script>
export default {
    data: function(){
      return {
        lat:0,
        lon:0,
      };
    },
    mounted: async function() {
        this.lat=this.$route.query.lat;
        this.lon=this.$route.query.lon;
        console.log(this.lat)//debug
        console.log(this.lon)//debug
    }
}
</script>