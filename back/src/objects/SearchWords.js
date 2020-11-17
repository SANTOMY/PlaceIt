module.exports = class SearchWords {
    constructor(spotId = null, spotName = null, geom = null, spotType = null, userId = null){
        this.spotId = spotId;
        this.spotName = spotName;
        this.geom = geom;
        this.spotType = spotType;
        this.userId = userId;
    }
}