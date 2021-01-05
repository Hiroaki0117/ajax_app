function memo () {
  const submit = document.getElementById("submit"); //index.htmlのsubmitのidを取得
  submit.addEventListener("click", (e) => { //クリックしたら実行される関数の定義
    const formData = new FormData(document.getElementById("form"));
    const XHR =new XMLHttpRequest(); //非同期通信の実装
    XHR.open("POST", "/posts", true); //rails routesでメソッドとパスを確認
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post; //レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list"); //
      const formText = document.getElementById("content"); //
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = ""; //フォームに入力された文字をリセットするため
    };
    e.preventDefault(); //
  });
}
window.addEventListener("load", memo);