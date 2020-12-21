export function getSpotTypeDict(value) {
    // spot type の追加や削除を一括で行うファイル
    var type_dict = {
        restaurant: "mdi-silverware-fork-knife",
        travel: "mdi-bag-suitcase",
        shopping: "mdi-cart"
    }
    var spot_types = Object.keys(type_dict)
    if (value=='icon'){
        return type_dict;
    }else if(value=='type'){
        return spot_types
    }
}

