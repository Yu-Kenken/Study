let dicebtn = document.getElementById("dicebtn");
let dice_result = document.getElementById("dice_result");

//=========ダイスの目の配列を作成
let result_ary = [];

//=========配列の中にダイスの目を生成
for (i = 1; i <= 100; i++) {
    result_ary.push(i);
}
console.log(result_ary);

//=========ボタンクリック時にランダムな値を表示
function btnclick() {
    //=====ランダムは0～1の範囲で出力されるので、配列の長さを掛けて、floorで整数にする
    let random = Math.floor(Math.random() * result_ary.length);
    dice_result.innerHTML = result_ary[random];

}

//========クリック時に関数を起動
dicebtn.addEventListener('click',btnclick);