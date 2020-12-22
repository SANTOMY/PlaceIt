<template>
    <radar-chart :chart-data="datacollection" :options="options"></radar-chart>
</template>

<script>
    import RadarChart from './RadarChart.js'

    export default {
        components: {
            RadarChart,
        },
        props: {
            type: String,
            reviewRating: null
        },
        data () {
            return {

                fontColor: {
                    red: 'rgb(255, 99, 132,0.4)',
                    orange: 'rgb(255, 159, 64,0.4)',
                    yellow: 'rgb(255, 205, 86,0.4)',
                    green: 'rgb(75, 192, 192,0.4)',
                    blue: 'rgb(54, 162, 235,0.4)',
                    purple: 'rgb(153, 102, 255,0.4)',
                    grey: 'rgb(201, 203, 207,0.4)',
                },

                datacollection: null,
                options: {
                    scale: {
                        pointLabels: {
                            fontSize: 20, //font size of radar chart's labels
                        },
                        ticks: {
                            suggestedMin: 0, // グラフのメモリの最小値
                            suggestedMax: 5, // グラフのメモリの最大値
                            stepSize: 1 // グラフのメモリの幅
                        },
                    },
                    // 以下label非表示処理 //
                    legend: {
                        display: false
                    },
                    tooltips: {
                        callbacks: {
                        label: function(tooltipItem) {
                                return tooltipItem.yLabel;
                            }
                        }
                    }
                    // 以上label非表示処理 //

                    // title: { // title of radar chart
                    //     display: true,
                    //     fontSize: 35,
                    //     text: '評価'
                    // },
                }
            }
        },
        created () {
            this.RadarChart(this.type)
        },
        methods: {
            RadarChart (type) {

                this.datacollection = {
                    datasets: [
                        {
                            backgroundColor: this.fontColor.red, // グラフの色
                            borderWidth: 1, // グラフの枠線の太さ
                            label: false,
                            data: this.reviewRating
                        },
                    ],
                }
                if(type=='restaurant'){
                    this.datacollection.labels= ["バリエ―ション", "立地", "価格", "おいしさ", "雰囲気"]
                    // this.datacollection.datasets[0].label = type
                    this.datacollection.datasets[0].backgroundColor = this.fontColor.red
                }else if(type=='travel'){
                    this.datacollection.labels= ["平均評価", "風景", "行きやすさ", "価格帯", "雰囲気"]
                    // this.datacollection.datasets[0].label = type
                    this.datacollection.datasets[0].backgroundColor = this.fontColor.green
                }else if(type=='shopping'){
                    this.datacollection.labels= ["平均評価", "品揃え", "立地", "価格", "雰囲気"]
                    // this.datacollection.datasets[0].label = type
                    this.datacollection.datasets[0].backgroundColor = this.fontColor.blue
                }
            },
        },
    }
</script>

<style>
    .small {
        max-width: 600px;
        margin:  150px auto;
    }
</style>