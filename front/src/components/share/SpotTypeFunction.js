export function getSpotTypeDict(value) {
    // spot type の追加や削除を一括で行うファイル
    var type_dict = {
        restaurant: "mdi-silverware-fork-knife",// restaurantのアイコン
        travel: "mdi-bag-suitcase",             // travelのアイコン
        shopping: "mdi-cart",                   // shoppingのアイコン
        amusements: "mdi-human-scooter",         // amusementsのアイコン
        accomodation: "mdi-bed",                // accomodationのアイコン
        lifework: "mdi-mother-heart",           // lifeworkのアイコン
    }
    var review_dict = {
        restaurant: ["バリエーション", "立地", "価格", "おいしさ", "雰囲気"],   // restaurantで登録されたスポットの評価項目
        travel: ["サービス", "立地", "価格", "雰囲気", "リピート"],            // travelで登録されたスポットの評価項目
        shopping: ["サービス", "品揃え", "立地", "価格", "人気度"],            // shoppingで登録されたスポットの評価項目
        amusements: ["サービス","立地","価格","待ち時間","人気度"],            // amusementsの評価項目
        accomodation: ["サービス", "立地", "価格", "アメニティ", "雰囲気"],    //accomodationのスポット評価項目
        lifework: ["サービス","立地","料金設定","雰囲気","リピート"],              // lifeworkのスポット評価項目
    }
    var name_list = [
        {type:'restaurant', text:'食事'},                 // restrantの内容
        {type:'travel', text:'旅行/観光'},                // travelの内容
        {type:'shopping',text:'買い物'},                // shoppingの内容
        {type:'amusements', text:'スポーツ/レジャー'},     // amusementsの内容
        {type:'accomodation', text:'宿泊/温泉'},          // accomodationの内容
        {type:'lifework', text:'生活/交通施設/学校/会社'},  // lifeworkの内容
    ]
    var jp_list = {
        restaurant: '食事',                 // restrantの内容
        travel: '旅行/観光',               // travelの内容
        shopping: '買い物',                 // shoppingの内容
        amusements: 'スポーツ/レジャー',     // amusementsの内容
        accomodation: '宿泊/温泉',          // accomodationの内容
        lifework: '生活/交通施設/学校/会社'  // lifeworkの内容
    }
    var color_dict = {
        restaurant: 'red',      // restrantのiconなどの色
        travel: 'green',        // travelのiconなどの色
        shopping: 'blue',       // shoppingのiconなどの色
        amusements:'yellow',    // amusementsのiconなどの色
        accomodation:'orange',  // accomodationのiconなどの色
        lifework:'violet',      // lifeworkのiconなどの色
    }
    var spot_types = Object.keys(type_dict)
    if (value=='icon'){
        return type_dict;
    }else if(value=='type'){
        return spot_types
    }else if(value=='review'){
        return review_dict
    }else if(value=='color'){
        return color_dict
    }else if(value=='name'){
        return name_list
    }else if(value=='jp'){
        return jp_list
    }
}

