class PostsController < ApplicationController

  def index 
   @posts = Post.all.order(id: "DESC")
  end

  def create
    post = Post.create(content: params[:content], checked: false)
    render json: { post: post }
  end

  def checked
    post = Post.find(params[:id]) #既読したメモのidのレコードを取得
    if post.checked               #もし既読をしていれば
      post.update(checked: false) #既読を解除するためにfalseに変更
    else
      post.update(checked: true) #既読でなければ、trueにして既読に変更
    end

    item = Post.find(params[:id]) #更新したレコードを取得
    render json: { post: item }   #JSON形式でchecked.jsに返却
  end
 
end
