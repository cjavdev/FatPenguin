class HomeController < ApplicationController
  def index
    @users = User.all
  end
  
  def message
    Pusher['test_channel'].trigger('message', {
      message: params[:message],
      to_id: params[:id],
      from_id: params[:from_id]
    })
    render :json => nil
  end
end
