'use strict';

class Spot{
    constructor(spot_id, spot_name, geom, picture, spot_type, user_id){
        this.spot_id = spot_id;
        this.spot_name = spot_name;
        this.geom = geom;
        this.picture = picture;
        this.spot_type = spot_type;
        this.user_id = user_id;
    }
}

module.exports = Spot;