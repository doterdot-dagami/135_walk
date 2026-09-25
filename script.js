// ===== 共通ロジック =====
// このファイルは campusA / campusB のHTMLで同じものを使い回してください。
// config.js を先に読み込んでおく必要があります（HTML側で <script src="config.js"> を先に書く）。

// --- 文字列をSHA-256でハッシュ化する関数 ---
async function sha256(text) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text.trim())
  );
  return [...new Uint8Array(buf)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// --- localStorage用のキーを作る（会場ごとに分けて保存される） ---
function storageKey(name) {
  return `walkrally:${venueId}:${name}`;
}

window.addEventListener("DOMContentLoaded", () => {
  // ページを開いたときに、保存済みの回答があればラジオボタンに反映する
  Object.keys(answerHashes).forEach(name => {
    const saved = localStorage.getItem(storageKey(name));
    if (saved !== null) {
      const target = document.querySelector(`input[name="${name}"][value="${saved}"]`);
      if (target) target.checked = true;
    }
  });

  // 選択が変わるたびに自動保存する
  document.querySelectorAll(".question input[type=radio]").forEach(input => {
    input.addEventListener("change", e => {
      localStorage.setItem(storageKey(e.target.name), e.target.value);
    });
  });

  // 「回答を送信する」ボタン
  const button = document.getElementById("pinpon");
  if (button) button.addEventListener("click", checkAnswers);

  // 以前このページで全問正解していた場合、再訪問時も成功状態を再現する
  if (localStorage.getItem(storageKey("allCorrect")) === "1") {
    document.getElementById("chushaku").style.display = "none";
    document.querySelector(".success").style.display = "block";
    document.querySelector(".form").style.display = "none";
  }

  // クーポン使用ボタン
  const shiyouButton = document.getElementById("shiyou");
  if (shiyouButton) {
    // 以前すでに使用済みだった場合、再訪問時も使用済み表示を引き継ぐ
    if (localStorage.getItem(storageKey("couponUsed")) === "1") {
      shiyouButton.value = "使用済み";
      shiyouButton.disabled = true;
    }

    shiyouButton.addEventListener("click", () => {
      // すでに使用済みの場合は何もしない（保険）
      if (localStorage.getItem(storageKey("couponUsed")) === "1") return;

      const confirmed = confirm("本当に使用しますか？\n一度使用すると元に戻せません。");
      if (confirmed) {
        localStorage.setItem(storageKey("couponUsed"), "1");
        shiyouButton.value = "使用済み";
        shiyouButton.disabled = true;
      }
    });
  }
});

// --- 送信時のチェック処理 ---
async function checkAnswers() {
  const problems = []; // 未回答 or 不正解だった設問をここに入れる

  for (const name of Object.keys(answerHashes)) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);

    if (!checked) {
      problems.push({ name, reason: "unanswered" });
      continue;
    }

    const hash = await sha256(checked.value);
    if (hash !== answerHashes[name]) {
      problems.push({ name, reason: "wrong" });
    }
  }

  const chushaku = document.getElementById("chushaku");
  const success = document.querySelector(".success");
  const form = document.querySelector(".form");

  if (problems.length === 0) {
    // 全問正解のとき
    chushaku.style.display = "none";
    success.style.display = "block";
    form.style.display = "none";
    localStorage.setItem(storageKey("allCorrect"), "1");
  } else {
    // 未回答 or 不正解があるとき → 設問名と場所を案内する
    const lines = problems.map(p => {
      const label = questionLabels[p.name];
      const place = questionLocations[p.name];
      return p.reason === "unanswered"
        ? `${label}（${place}）：まだ回答されていません`
        : `${label}（${place}）：もう一度確認してみてください`;
    });

    chushaku.textContent = lines.join("\n");
    chushaku.style.display = "block";
    success.style.display = "none";
  }
}

// --- wall.PNGが読み込めなかった場合の処理 ---
// ※同じ内容の関数がindex.htmlのheadにも定義されています（画像読み込み前に確実に用意するため）。
// こちらは重複定義ですが、内容が同じなので動作に影響はありません。
function handleWallError() {
  const img = document.getElementById("wall");
  const fallback = document.getElementById("wallFallback");
  const help = document.getElementById("wallHelp");
  if (img) img.style.display = "none";
  if (help) help.style.display = "none";
  if (fallback) fallback.style.display = "block";
}