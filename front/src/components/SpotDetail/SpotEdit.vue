<template>
    <v-container>
        <!-- 写真 -->
        <v-carousel
            cycle
            hide-delimiter-background
            show-arrows-on-hover
        >
            <v-carousel-item v-for="photo in photos" :key="photo.id">
                <v-sheet color="black" height=100%>
                    <v-img :src="photo.image" height=500 contain />
                </v-sheet>
            </v-carousel-item>
        </v-carousel>
        <v-row
            justify="center"
            class="mx-10
            mt-3 mb-5"
        >
            <!-- スポット名 -->
            <h1 class="mr-10"> {{ spotData.spot_name }} </h1>
            <!-- スポットタイプ --> 
            <!-- <spot-type-icon v-for="type in spotData.types" :key="type"
                :type="type"
                class="mr-5"
                    large
                    color="gray"        複数タイプに対応していないので一旦コメントアウト
            /> -->
            <spot-type-icon
                :type="spotData.spot_type"
                class="mr-5"
                large
                color="gray"
            />
        
        </v-row>
        <v-row
            justify="center"
            class="mx-10
            mt-3 mb-5"
        >
            <!-- スポット名 -->
            <v-text-field class="mr-10"> </v-text-field>
            <!-- スポットタイプ --> 
            <!-- <spot-type-icon v-for="type in spotData.types" :key="type"
                :type="type"
                class="mr-5"
                    large
                    color="gray"        複数タイプに対応していないので一旦コメントアウト
            /> -->
            <spot-type-icon
                :type="spotData.spot_type"
                class="mr-5"
                large
                color="gray"
            />

        </v-row>
        <v-row>
            <!-- スポットの評価(レーダーチャート) -->
            <v-col>
                <v-row justify="center">
                    <radarChartDisp
                        :type="this.spotData.spot_type"
                        :reviewRating="rating5"
                    />
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>






<script>
import spotTypeIcon from '../share/SpotTypeIcon.vue'
import radarChartDisp from '../share/RadarChartDisp'
export default {
    components: {
        spotTypeIcon,
        radarChartDisp
    },

    props: {
        spotData: Object,
        photos: Array,
        rating5: Array
    }

}
</script>
