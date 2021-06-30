<template>
    <v-container fluid>
        <v-row justify="center" align="center">
            <v-col cols="1">
                <v-progress-circular
                    id="map-loading"
                    indeterminate
                    absolute
                    color="primary"
                ></v-progress-circular>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
#map-loading{
    z-index: 1000;
}
</style>

