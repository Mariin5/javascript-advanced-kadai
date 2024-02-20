let untyped = '';
let typed = '';
let score = '0';

const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

//テキストリスト
const textlists = [
    'Hello World',
    'This is my App',
    'How are you?',
    'Today is sunny',
    'I love JavaScript!',
    'Good morning',
    'I am Japanese',
    'Let it be',
    'Samurai',
    'Typing Game',
    'Information Technology',
    'I want to be a programmer',
    'What day is today?',
    'I want to build a web app',
    'Nice to meet you',
    'Chrome Firefox Edge Safari',
    'machine learning',
    'Brendan Eich',
    'John Resig',
    'React Vue Angular',
    'Netscape Communications',
    'undefined null NaN',
    'Thank you very much',
    'Google Apple Facebook Amazon',
    'ECMAScript',
    'console.log',
    'for while if switch',
    'var let const',
    'Windows Mac Linux iOS Android',
    'programming'
];

//テキストをランダム表示
const createText = () => {
    typed = '';
    typedfield.textContent = typed;

    let random = Math.floor(Math.random() * textlists.length);

    untyped = textlists[random];
    untypedfield.textContent = untyped;
};


//キー入力判定

/* e : event
+= : 右辺の値と左辺の変数の値を足し算し変数に代入。
下記コードはtyped = typed + untyped.substring(0, 1);と同じ意味 */

/* substring() : 文字列の一部を抽出するメソッド。第1引数は「開始インデックス」、第2引数は「終了インデックス」
「開始インデックス」から「終了インデックスの1つ前」までの文字列を抽出(第2引数は省略可能) */

//classList : https://qiita.com/tomokichi_ruby/items/2460c5902d19b81cace5

const keyPress = e => {
    if(e.key !== untyped.substring(0,1)){
        wrap.classList.add('mistyped');

        setTimeout(() => {
            wrap.classList.remove('mistyped');
        },100,)
        return;
    }

    score++;
    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    //すべて入力済になった場合新しいテキストを用意する
    if(untyped === ''){
        createText();
    }

};

//タイピングスキルのランク判定
//バッククォート(`)で囲むテンプレートリテラルを使用すると、文字列内に${変数名}と記述し文字列内に変数を埋め込むことができる
//~99文字：C、100~199文字：B、200~299文字：A、300文字~：S
//ランク分岐点の文字数からスコアを引く
const rankCheck = socre => {
    let text = '';

    if(score < 100){
        text = `あなたのランクはCです。\n Bランクまであと${100 - score}文字です`;
    }

    else if(score < 200){
        text = `あなたのランクはBです。\n Aランクまであと${200 - score}文字です`;
    }

    else if(score < 300){
        text = `あなたのランクはBです。\n Sランクまであと${300 - score}文字です`;
    }

    else if(score >= 300){
        text = `あなたのランクはSです。 \n おめでとうございます！`;
    }

    return `${score}文字打てました！\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

//ゲーム終了
/*confirm() : OKとキャンセルボタンのダイアログを表示
引数は表示する文字、OkはTrue、キャンセルはFalse*/

const gameOver = id => {
    clearInterval(id);

    const result = confirm(rankCheck(score));

    if(result===true){
        window.location.reload();
    }

};

//カウントダウン
const timer = () => {
    let time = count.textContent;
    const id = setInterval(() => {
        time--;
        count.textContent = time;

        if( time <= 0){
            gameOver(id);
        }
    },1000);
};

//ゲームスタートの処理
start.addEventListener('click',() => {
    timer();
    createText();
    start.style.display = 'none';
    document.addEventListener('keypress',keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';