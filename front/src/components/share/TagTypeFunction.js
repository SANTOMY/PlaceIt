const TagType = require("./TagType");
export function getTagTypeDict(value) {
    // spot type の追加や削除を一括で行うファイル
    var tagTypes = [new TagType("noodle", "mdi-noodles", "麺類", ["restaurant"]),
                    new TagType("hamburger", "mdi-hamburger", "ハンバーガー", ["restaurant"]),
                    new TagType("karaoke", "mdi-microphone-variant", "カラオケ", ["amusements"]),
                    new TagType("hotel", "mdi-home-city-outline", "ホテル", ["accomodation"]),
                    new TagType("onsen", "mdi-hot-tub", "温泉", ["travel", "accomodation"]),
                    new TagType("soccer", "mdi-soccer", "サッカー", ["amusements"]),
                    new TagType("tennis", "mdi-tennis", "テニス", ["amusements"]),
                    new TagType("baseball", "mdi-baseball-bat", "野球", ["amusements"]),
                    new TagType("convenience", "mdi-store-24-hour", "コンビニ", ["shopping"]),
                    new TagType("electric", "mdi-fridge-bottom", "家電", ["shopping"]),
                    new TagType("hospital", "mdi-hospital-box", "病院", ["lifework"]),
                    new TagType("coffee", "mdi-coffee-outline", "喫茶店", ["restaurant"]),
                    new TagType("gas", "mdi-gas-station", "ガソリンスタンド", ["lifework"]),
                    new TagType("sea", "mdi-palm-tree", "海水浴", ["travel", "amusements"]),
                    new TagType("mountain", "mdi-image-filter-hdr", "山", ["travel"]),
                    new TagType("homecenter", "mdi-hammer-screwdriver", "ホームセンター", ["shopping"]),
                    new TagType("zoo", "mdi-panda", "動物園", ["travel"]),
                    new TagType("game", "mdi-chess-knight", "ゲーム", ["amusements", "shopping"]),
                    new TagType("golf", "mdi-golf", "ゴルフ", ["amusements"]),
                    new TagType("pill", "mdi-pill", "薬局", ["lifework"]),
                    new TagType("sushi", "mdi-hololens", "寿司", ["restaurant"]),
                    new TagType("don", "mdi-rice", "丼もの", ["restaurant"]),
                    new TagType("book", "mdi-book-open-page-variant-outline", "本屋", ["shopping"]),
                    new TagType("libraly", "mdi-book-open-page-variant-outline", "図書館", ["lifework"]),
                    new TagType("movie", "mdi-filmstrip", "映画館", ["amusements"]),
                    new TagType("netcafe", "mdi-desktop-classic", "ネットカフェ", ["accomodation"]),
                    new TagType("bar", "mdi-glass-wine", "居酒屋，バー", ["restaurant"]),
                    new TagType("harbor", "mdi-anchor", "港", ["lifework"]),
                    new TagType("station", "mdi-train", "駅", ["lifework"]),
                    new TagType("bus", "mdi-bus-stop", "バス停", ["lifework"]),
                    new TagType("super", "mdi-basket-outline", "スーパー", ["shopping"]),
                    new TagType("fashion", "mdi-hanger", "ファッション", ["shopping"]),
                    new TagType("aquarium", "mdi-jellyfish-outline", "水族館", ["travel"]),
                    new TagType("school", "mdi-school-outline", "学校", ["lifework"]),
                    //new TagType("", "mdi-", "", [""]),

    ]

    if (value == "icon") {
        var iconDict = {}
        tagTypes.forEach(function(tag) {
            iconDict[tag.getType()] = tag.getIcon()
        })
        return iconDict
    } else if (value == "jp") {
        var jpDict = {}
        tagTypes.forEach(function(tag) {
            jpDict[tag.getType()] = tag.getJp()
        })
        return jpDict
    }

    return tagTypes
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