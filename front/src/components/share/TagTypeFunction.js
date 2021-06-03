export function getTagTypeDict(value) {
    // spot type の追加や削除を一括で行うファイル
    var type_dict = {
        noodle: "mdi-noodles",                   // noodleのアイコン
        hamburger: "mdi-hamburger",             // hamburgerのアイコン
        karaoke: "mdi-microphone-variant",
        hotel: "mdi-home-city-outline",
        onsen: "mdi-hot-tub",
        soccer: "mdi-soccer",
        tennis: "mdi-tennis",
        baseball: "mdi-baseball-bat",
        convenience: "mdi-store-24-hour",
        electric: "mdi-fridge-bottom",
        hospital: "mdi-hospital-box",
    }
    //カラーは使ってないからとりあえず適当
    var color_dict = {
        noodle: 'orange',
        hamburger: 'orange',
        karaoke: 'orange',
        hotel: 'orange',
        onsen: 'orange',
        soccer: "orange",
        tennis: "orange",
        baseball: "orange",
        convenience: "orange",
        electric: "orange",
        hospital: "orange",
    }
    var spot_type_dict = {
        noodle: ["restaurant"],
        hamburger: ["restaurant"],
        karaoke: ["amusements"],
        hotel: ["accomodation"],
        onsen: ["travel", "accomodation"],
        soccer: ["amusements"],
        tennis: ["amusements"],
        baseball: ["amusements"],
        convenience: ["shopping"],
        electric: ["shopping"],
        hospital: ["lifework"],
    }
    var tag_types = Object.keys(type_dict)
    if (value=='icon'){
        return type_dict;
    }else if(value=='type'){
        return tag_types;
    }else if(value=='color'){
        return color_dict;
    }else if(value=='stype'){
        return spot_type_dict;
    }

}

