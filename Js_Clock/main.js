//============HTMLの出力する場所のIDを取得=========================
let clock_area = document.getElementById("clock_area");

/*
//============時刻データを取得================
let nowtime = new Date();
//============各種年月日を取得================
let nowyear = nowtime.getFullYear();
//============月は0~11の数値を返す============
let nowmonth = nowtime.getMonth() + 1;
//============日はdateで取得する==============
let nowdate = nowtime.getDate();
//============dayメソッドは曜日を取得する0~6で日曜からスタート=======
let nowday = nowtime.getDay();
//============時刻を取得==========================================
let nowhours = nowtime.getHours();
let nowminutes = nowtime.getMinutes();
let nowseconds = nowtime.getSeconds();
//============曜日を数字から変換するために固定配列を用意=============
const dayname = ['日', '月', '火', '水', '木', '金', '土'];

//============これで年月日が出力できる=============================
console.log(nowyear + '年' + nowmonth + '月' + nowdate + '日' + '(' + dayname[nowday] + ')');

//============変数timeに取得したデータをまとめ格納=================
let time = nowyear + '年' + nowmonth + '月' + nowdate + '日' + '(' + dayname[nowday] + ')' + nowhours + ':' + nowminutes + ':' + nowseconds;

console.log(time);
//============HTMLの所定の位置にtimeのデータを出力================
//============読み込みの関係上、scriptタグはbodyの最後に記述しなければならない===
clock_area.innerHTML = time;
*/

//============上記のコードを自動で更新するために関数にする================
//============時計の表示で01,02などといった二桁前提の表示にしたい=========

//============桁数調整関数=============================================
function digits(num) {
    let sec;
    //========一桁の場合、頭に0を追加する==================
    if (num < 10) {
        sec = '0' + num;
    } else {
        sec = num;
    }
    return sec;
}

//============時計の出力関数===========================================
function Clock() {
    let nowtime = new Date();
    let nowyear = nowtime.getFullYear();
    let nowmonth = nowtime.getMonth() + 1;
    let nowdate = nowtime.getDate();
    let nowday = nowtime.getDay();
    let nowhours = digits(nowtime.getHours());
    let nowminutes = digits(nowtime.getMinutes());
    let nowseconds = digits(nowtime.getSeconds());
    const dayname = ['日', '月', '火', '水', '木', '金', '土'];

    let time = nowyear + '年' + nowmonth + '月' + nowdate + '日' + '(' + dayname[nowday] + ')' + nowhours + ':' + nowminutes + ':' + nowseconds;
    clock_area.innerHTML = time;

}

//===========1秒ごとに時計関数を出力し続ける処理=================
setInterval('Clock()', 1000);

//===========現状だと、ページ読み込みの一秒後に時計が表示されるようになる=====
//===========画面読み込み時に時計関数を起動======================
window.addEventListener("load",Clock());
