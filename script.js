// ゲーム設定と共通部分
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bird = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 5,
    dy: 0,
    gravity: 0.1,
    lift: -2,
    bounceFactor: 0.7,
    color: 'black',
    sound: new Audio('https://www.soundjay.com/button/beep-07.wav')
};

let bounceCount = 0;
let isOnGround = false;
let gameStarted = false;

// バウンド回数の表示を更新
function updateBounceCount() {
    bounceCount++;
    document.getElementById('bounceCountDisplay').innerText = `バウンド回数: ${bounceCount}`;
}

// 文鳥を描く関数
function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = bird.color;
    ctx.fill();
    ctx.closePath();
}

// 文鳥を更新する関数
function updateBird() {
    bird.dy += bird.gravity;
    bird.y += bird.dy;

    // 画面下部に当たった時に反発
    if (bird.y + bird.radius > canvas.height) {
        bird.y = canvas.height - bird.radius;
        bird.dy = -bird.dy * bird.bounceFactor;
        if (!isOnGround) {
            updateBounceCount(); // バウンド回数を更新
            isOnGround = true; // 地面に着いた
        }
    } else {
        isOnGround = false; // 地面から離れた
    }

    // 画面上部に当たった時に反発
    if (bird.y - bird.radius < 0) {
        bird.y = bird.radius;
        bird.dy = -bird.dy * bird.bounceFactor;
    }

    // 画面左右に当たった時に反発
    if (bird.x + bird.radius > canvas.width || bird.x - bird.radius < 0) {
        bird.dx = -bird.dx;
        bird.sound.play();
        updateBounceCount(); // バウンド回数を更新
    }

    bird.x += bird.dx;
}

// タップで文鳥が上昇
window.addEventListener('click', () => {
    if (gameStarted) {
        bird.dy = bird.lift;
    }
});

// ゲームループ
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird();
    updateBird();
    if (gameStarted) {
        requestAnimationFrame(gameLoop);
    }
}

// モード選択ボタンの処理
document.getElementById('modeRanking').addEventListener('click', () => {
    showStartButton("ランキングモードは、1分間に何回バウンドさせるかを競うモードです。");
});

document.getElementById('modeChallenge').addEventListener('click', () => {
    showStartButton("チャレンジモードは、10秒以内に何回バウンドさせるかを競うモードです。");
});

document.getElementById('modeFree').addEventListener('click', () => {
    showStartButton("フリーモードは、時間制限なく自由にバウンドさせることができるモードです。");
});

// スタートボタンの表示
function showStartButton(ruleText) {
    const ruleTextElement = document.getElementById('ruleText');
    ruleTextElement.style.display = 'block';
    ruleTextElement.innerText = ruleText;
    document.getElementById('startButtonContainer').style.display = 'block';
    gameStarted = false; // ゲーム開始前
}

// スタートボタン押下時
document.getElementById('startButton').addEventListener('click', () => {
    startGame();
    document.getElementById('startButtonContainer').style.display = 'none'; // スタートボタン非表示
    gameLoop(); // ゲーム開始
});

// ゲーム開始時の初期化
function startGame() {
    bird.x = canvas.width / 2;
    bird.y = canvas.height / 2;
    bird.dy = 0;
    bird.dx = 5;
    bounceCount = 0; // バウンド数リセット
    updateBounceCount(); // 表示更新
    gameStarted = true;
}

// Googleサインイン機能
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    alert("Hello, " + profile.getName());
}

// Microsoftサインイン機能
const msalConfig = {
    auth: {
        clientId: "YOUR_MICROSOFT_APP_CLIENT_ID", // MicrosoftアプリのクライアントID
        authority: "https://login.microsoftonline.com/common"
    }
};
const msalInstance = new msal.PublicClientApplication(msalConfig);

document.getElementById('
