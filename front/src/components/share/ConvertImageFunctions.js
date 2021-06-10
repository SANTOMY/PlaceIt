/**
 *  base64 --> image file の変換を行う関数
 * 逆方向はうまく関数化できないので未実装
 */

function ConvertToFileFromBase64(base64, fileName) {
    var bin = atob(base64.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    return new File([buffer.buffer], fileName, {type: "image/jpeg"});
}

function ConvertToBase64FromFile(file) {
    console.log(file)
}

export {ConvertToBase64FromFile, ConvertToFileFromBase64};