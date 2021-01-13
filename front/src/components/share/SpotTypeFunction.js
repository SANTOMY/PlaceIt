export function getSpotTypeDict(value) {
    // spot type の追加や削除を一括で行うファイル
    var type_dict = {
        restaurant: "mdi-silverware-fork-knife",
        travel: "mdi-bag-suitcase",
        shopping: "mdi-cart"
    }
    var review_dict = {
        restaurant: ["バリエ―ション", "立地", "価格", "おいしさ", "雰囲気"],
        travel: ["平均評価", "風景", "行きやすさ", "価格帯", "雰囲気"],
        shopping: ["平均評価", "品揃え", "立地", "価格", "雰囲気"]
    }
    var color_dict = {
        restaurant: 'red',
        travel: 'green',
        shopping: 'blue'
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

