const TagType = require("./TagType");
export function getTagTypeDict(value) {
    // spot type の追加や削除を一括で行うファイル
    var tagTypes = [new TagType("noodle", "mdi-noodles", "麺類", ["restaurant"]),
                    new TagType("hamburger", "mdi-hamburger", "ハンバーガー", ["restaurant"]),
    ]

    if (value == "all")
        return tagTypes
    else {
        var tagDict = {}
        tagTypes.forEach(function(tag) {
            tagDict[tag.getType()] = tag.getIcon()
        })
        return tagDict
    }
    /*
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
    var name_dict = {
        
        noodle: '麺類',
        hamburger: 'ハンバーガー',
        karaoke: 'カラオケ',
        hotel: 'ホテル',
        onsen: '温泉',
        soccer: 'サッカー',
        tennis: 'テニス',
        baseball: '野球',
        convenience: 'コンビニ',
        hospital: '病院',
        
        
        //{type:'noodle', text:'麺類'},
        //{type:'hamburger', text:'ハンバーガー'},
        //{type:'karaoke',text:'カラオケ'},
        //{type:'hotel', text:'ホテル'},
        //{type:'onsen', text:'温泉'},
        //{type:'soccer', text:'サッカー'},
        //{type:'tennis', text:'テニス'},
        //{type:'baseball', text:'野球'},
        //{type:'convenience', text:'コンビニ'},
        //{type:'hospital', text:'病院'},
        
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
    */
}