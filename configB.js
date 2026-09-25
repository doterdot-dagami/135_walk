// ===== キャンパスごとに書き換える設定ファイル =====
// このファイルを丸ごとコピーして、キャンパスA用・キャンパスB用を作ってください。
// （例）config-campusA.js / config-campusB.js のように名前を変えて2つ用意する想定です。

// 会場を区別するためのID（localStorageのキーに使われます。半角英数字で）
const venueId = "campusB"; // ← キャンパスB用ファイルでは "campusB" に変更してください

// 各設問の正答を「SHA-256ハッシュ化した値」で持ちます。
// 正答の生のテキスト（例："3"）はここには書きません。
// ハッシュ値は hash-generator.html を開いて作成し、貼り付けてください。
const answerHashes = {
  ichi:  "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
  ni:    "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
  san:   "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
  shi:   "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
  go:    "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
  roku:  "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
  nana:  "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
  hachi: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
};

// 各設問が掲示されている場所（不正解・未回答時の案内文に使われます）
const questionLocations = {
  ichi:  "〇〇前",
  ni:    "〇〇前",
  san:   "〇〇前",
  shi:   "〇〇前",
  go:    "〇〇前",
  roku:  "〇〇前",
  nana:  "〇〇前",
  hachi: "〇〇前",
};

// 設問の表示名（案内文に使われます。HTML側の見出しと合わせています）
const questionLabels = {
  ichi:  "第1問",
  ni:    "第2問",
  san:   "第3問",
  shi:   "第4問",
  go:    "第5問",
  roku:  "第6問",
  nana:  "第7問",
  hachi: "第8問",
};
