<template>
    <div class="small">
        <radar-chart :chart-data="datacollection" :options="options"></radar-chart>
    </div>
</template>

<script>
    import RadarChart from './RadarChart.js'

    export default {
        components: {
            RadarChart,
        },
        data () {
            return {

                fontColor: {
                    red: 'rgb(255, 99, 132,0.6)',
                    orange: 'rgb(255, 159, 64,0.6)',
                    yellow: 'rgb(255, 205, 86,0.6)',
                    green: 'rgb(75, 192, 192,0.6)',
                    blue: 'rgb(54, 162, 235,0.6)',
                    purple: 'rgb(153, 102, 255,0.6)',
                    grey: 'rgb(201, 203, 207,0.6)',
                },

                datacollection: null,
                options: {
                    scale: {
                        pointLabels: {
                            fontSize: 20, //font size of radar chart's labels
                        },
                    },
                    title: { // title of radar chart
                        display: true,
                        fontSize: 35,
                        text: '評価'
                    },
                }
            }
        },
        created () {
            this.RadarChart()
        },
        methods: {
            RadarChart () {
                this.datacollection = {
                    labels: ["おいしさ", "立地", "価格", "", "雰囲気"],
                    datasets: [
                        {
                            backgroundColor: 'blue',
                            borderWidth: 1, // グラフの枠線の太さ
                            label: "restaurant",
                            data: [4,3,3,1,5]
                        },
                        {
                            backgroundColor: 'red',
                            borderWidth: 1, // グラフの枠線の太さ
                            label: "shopping",
                            data: [1,0,1,3,2]
                        }
                    ],
                }
            },


        }
    }
</script>

<style>
    .small {
        max-width: 600px;
        margin:  150px auto;
    }
</style>