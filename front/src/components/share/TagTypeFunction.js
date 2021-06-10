export function getTagTypeDict(value) {
    // spot type の追加や削除を一括で行うファイル
    var type_dict = {
        noodle: "mdi-noodles",                   // noodleのアイコン
        hamburger: "mdi-hamburger",             // hamburgerのアイコン
        karaoke: "mdi-microphone-variant",
        hotel: "mdi-home-city-outline",
        onsen: "mdi-hot-tub"
    }
    var color_dict = {
        noodle: 'red',  // noodleのiconなどの色
        hamburger: 'green',    // hamburgerのiconなどの色
        karaoke: 'green',
        hotel: 'orange',
        onsen: 'orange'
    }
    var spot_type_dict = {
        noodle: ["restaurant"],
        hamburger: ["restaurant"],
        karaoke: ["travel"],
        hotel: ["travel"],
        onsen: ["travel"]

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

