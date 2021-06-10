export function SpotExampleData() {
    // おすすめスポットの仮データ取得関数
    var spot = [ // spot仮データ
        {
            spotName: 'マクドナルド',
            spotId: '000000',
            type: 'restaurant',
            user_id: '2bedc185-298d-49c4-b1e7-20897646dd92',
            username: 'asada',
            good: 4.2,
            src: require("@/assets/Mac.jpg"),
            review:[
                { user_id:'000000' },
                { user_id:'000001' }
            ]
        },
        {
            spotName: 'モスバーガー',
            spotId: '000001',
            type: 'restaurant',
            username: 'takata',
            user_id: '000001',
            good: 4.5,
            src: require('@/assets/mos.png'),
            review:[
                { user_id:'000001' },
                { user_id:'000002' }
            ]
        },      
        {
            spotName: 'KFC',
            spotId: '000002',
            type: 'restaurant',
            user_id: '000002',
            username: 'matsuo',
            good: 3.7,
            src: require('@/assets/KFC.jpg'), 
            review:[
                { user_id:'000002' },
                { user_id:'000000' }
            ]
        },
        {
            spotName: 'Lotteria',
            spotId: '000003',
            type: 'restaurant',
            user_id: '000003',
            username: 'nakamura',
            good: 3.9,
            src: require('@/assets/lotteria.png'), 
            review:[
                { user_id:'000002' },
                { user_id:'000000' }
            ]
        } 
    ]

    return spot

}

