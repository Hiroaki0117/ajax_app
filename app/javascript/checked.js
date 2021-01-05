function check() {  
  const posts = document.querySelectorAll(".post"); //postをクラス名にもつ要素を取得できる
  posts.forEach(function (post) { //postsの数だけ配列をループさせる
    if (post.getAttribute("data-road") != null) {
      return null;
    }
    post.setAttribute("data-road", "true");
    post.addEventListener("click", () => {   //対象要素.addEventListener(種類, () => {
      const postId = post.getAttribute("data-id"); //変数 = 要素.getAttribute(属性);メモのidを取得
      const XHR = new XMLHttpRequest(); //XMLHttpRequestのメソッドを使用
      XHR.open("GET", `/posts/${postId}`, true); //XMLHttpRequestのリクエスト内容を指定
      XHR.responseType = "json"; //欲しい情報の形式のレスポンスの形式をJSONに指定
      XHR.send(); //リクエストの送信をする
      XHR.onload = () => {
        if (XHR.status != 200) { //HTTPステータスコードが200以外の場合
          alert(`Error ${XHR.status}: ${XHR.statusText}`); //アラートを表示、エラ〜メッセージを表示す
          return null; //JavaScriptの処理から抜け出すためで後に記述している処理をしないため
        }
        const item = XHR.response.post; //postsコントローラーから取得
        if (item.checked === true) { //既読をしている場合
          post.setAttribute("data-check", "true"); //data-checkの属性値にtrue
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }     
      };
    });
  }); 
} 
setInterval(check, 1000); //windowがロードされた時にcheckを実行する
