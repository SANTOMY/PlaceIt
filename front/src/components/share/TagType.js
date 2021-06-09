module.exports = class TagType {
    constructor(type, icon, jp, spotTypes) {
        this.type = type;
        this.icon = icon;
        this.jp = jp
        this.spotTypes = spotTypes
    }

    getType() {
        return this.type
    }

    getIcon() {
        /*
        return {
            [this.type]: this.icon
        }
        */
       return this.icon
    }

    getJp() {
        return {
            [this.type]: this.jp
        }
    }

    getSpotTypes() {
        return this.spotTypes
    }
}