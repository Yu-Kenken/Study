//==========子要素を追加する場所のIDを取得
let time_min = document.getElementById("time_min");
let time_sec = document.getElementById("time_sec");


//=========ここは内部での数字（html上には表示されない）================
//=============countがタイマーの数値。
let count = 0;
let minutes = 0;
let seconds = 0;
//==================================================================


//============それぞれのidを取得
let start_button = document.getElementById("start_button");
let stop_button = document.getElementById("stop_button");
let reset_button = document.getElementById("reset_button");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let music = document.getElementById("music");
let volume = document.getElementById("volume");
//============タイマーのidを設定
let timeid;

//==============プルダウンで選択した数値を決定するボタンのIDを取得
let select_time = document.getElementById("select_time");

//==========プルダウンメニューに要素を追加。
//=========1~60までの要素を生成できる。（分）
for (i = 1; i <= 60; i++) {
    //==========追加するoption要素を作成
    let min_op = document.createElement("option");
    //==========追加する要素のvalueとtextを作成
    min_op.value = i;
    min_op.text = i;
    //==========親要素に子要素を追加する
    time_min.appendChild(min_op);

};

//=============秒の時間を設定（1~59まで）0は初期値である
for (i = 1; i < 60; i++) {
    //==========追加するoption要素を作成
    let sec_op = document.createElement("option");
    //==========追加する要素のvalueとtextを作成
    sec_op.value = i;
    sec_op.text = i;
    //==========親要素に子要素を追加する
    time_sec.appendChild(sec_op);

};


//============タイマーのカウントダウン関数
function timer() {

    //============カウントがゼロになった場合の処理
    if (count === 0) {
        alert('count complete');
        clearInterval(timeid);
        select_time.disabled = null;
        start_button.disabled = "disabled";
        stop_button.disabled = "disabled";
        return;

        //=========カウントが60で割り切れる時（＝〇分ぴったりの時）
    } else if (count % 60 == 0) {
        minutes--;
        count--;
        seconds = 59;
        //=========画面上に内部の分と秒を表示
        min.innerHTML = minutes;
        sec.innerHTML = seconds;
        console.log(count);

        //============それ以外（1～59秒の時）
    } else {
        count--;
        seconds--;

        //==========秒数が一桁になるときに頭に0の文字列を追加する。
        if (seconds < 10) {
            seconds = '0' + seconds;
        };

        //=========画面上に内部の分と秒を表示
        min.innerHTML = minutes;
        sec.innerHTML = seconds;
        console.log(count);
    }
}

//==============時間決定ボタンクリック時の実行関数
function btn_click() {
    //===========0秒で決定を押された場合の処理
    if ((Number(time_min.value) * 60) + (Number(time_sec.value)) === 0) {
        alert('時間が設定されていません。')

    } else {
        //==========countに時間を挿入
        count = (Number(time_min.value) * 60) + (Number(time_sec.value));
        console.log(count);

        //=============minは60で割った時の整数値
        minutes = Math.floor(count / 60);
        //============secは60で割った余り
        seconds = count % 60;
        console.log(minutes + '分' + seconds + '秒');

        //============スタートボタンをクリックできるようにする。
        start_button.disabled = null;

        //============開始時間を画面に表示
        min.innerHTML = minutes;
        //===========10秒未満の場合、頭に0を追加
        if (seconds < 10) {
            sec.innerHTML = '0' + seconds;
        } else {
            sec.innerHTML = seconds;
        }
    };

}


//==============ストップボタンクリック時の実行関数
function timer_stop() {
    //======タイマー停止
    clearInterval(timeid);

    //======停止時間を保持
    let holdtime = count;
    //======各種ボタンの有効化・非有効化処理
    start_button.disabled = null;
    select_time.disabled = null;
    stop_button.disabled = "disabled";
    //======音楽の一時停止
    music.pause();
};


//==============リセットボタンクリック時の実行関数
function reset_timer() {
    //======タイマー停止
    clearInterval(timeid);

    //======プルダウンメニューの数値をゼロに
    time_min.value = 0;
    time_sec.value = 0;
    //======カウントの数値をゼロに
    count = 0;
    //======タイマーの表示をゼロに
    min.innerHTML = '0';
    sec.innerHTML = '00';
    //====各種ボタンの有効化・非有効化処理
    start_button.disabled = "disabled";
    select_time.disabled = null;
    stop_button.disabled = "disabled";
    //=====音楽停止
    music.pause();
    //=====再生時間を0秒に
    music.currentTime = 0;
}

//==============時間決定ボタンクリック時のイベント
select_time.addEventListener('click', btn_click);


//==========スタートボタンクリック時の挙動（タイマー起動）
start_button.addEventListener('click', function () {
    //======タイマー処理
    timeid = setInterval(timer, 1000);
    //======各種ボタンの有効化・非有効化処理
    start_button.disabled = "disabled";
    stop_button.disabled = null;
    select_time.disabled = "disabled";
    //======音楽再生
    music.play();

});


//==============リセットボタンの挙動
reset_button.addEventListener('click', reset_timer);

//=========ストップボタン押下時の処理
stop_button.addEventListener('click', timer_stop);

//=========音楽再生終了時に実行（再度スタート）
music.addEventListener('ended', function () {
    music.play();
});

//========ボリューム操作
volume.addEventListener('input', function (event) {
    music.volume = event.target.value;
})