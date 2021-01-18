<template>
    <radar-chart :chart-data="datacollection" :options="options"></radar-chart>
</template>

<script>
    import RadarChart from './RadarChart.js'
    import {getSpotTypeDict} from "./SpotTypeFunction"

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
                Chart: null,
                review_dict: getSpotTypeDict('review'),
                spot_types: getSpotTypeDict('type'),
                color_dict: getSpotTypeDict('color'),
                fontColor: {
                    // グラフの色
                    red: 'rgb(255, 99, 132, 0.4)',
                    orange: 'rgb(255, 159, 64, 0.4)',
                    yellow: 'rgb(255, 205, 86, 0.4)',
                    green: 'rgb(75, 192, 192, 0.4)',
                    blue: 'rgb(54, 162, 235, 0.4)',
                    purple: 'rgb(153, 102, 255, 0.4)',
                    grey: 'rgb(201, 203, 207, 0.4)',
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
                    labels: this.review_dict[type],
                    datasets: [
                        {
                            backgroundColor: this.fontColor[this.color_dict[type]], // グラフの色
                            borderWidth: 1, // グラフの枠線の太さ
                            label: false,
    
                            data: this.reviewRating
                        },
                    ],
                }
            },
        },
        // watch: {
        //     datacollection: function() {
        //         // console.log('debug2')
        //         // this.Chart.destroy();
        //     //this.renderChart(this.data, this.options);
        //     // this.renderLineChart();
        //     }
        // }
    }
</script>

<style>
    .small {
        max-width: 600px;
        margin:  150px auto;
    }
</style>