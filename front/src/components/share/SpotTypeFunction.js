export function getSpotTypeDict(value) {
    // spot type の追加や削除を一括で行うファイル
    var type_dict = {
        restaurant: "mdi-silverware-fork-knife",// restaurantのアイコン
        travel: "mdi-bag-suitcase",             // travelのアイコン
        shopping: "mdi-cart"                    // shoppingのアイコン
    }
    var review_dict = {
        restaurant: ["バリエーション", "立地", "価格", "おいしさ", "雰囲気"],    // restaurantで登録されたスポットの評価項目
        travel: ["食事", "景観", "交通の便", "コスパ", "雰囲気"],         // travelで登録されたスポットの評価項目
        shopping: ["景観", "品揃え", "立地", "価格", "雰囲気"]              // shoppingで登録されたスポットの評価項目
    }
    var color_dict = {
        restaurant: 'red',  // restrantのiconなどの色
        travel: 'green',    // travelのiconなどの色
        shopping: 'blue'    // shoppingのiconなどの色
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
    }
}

