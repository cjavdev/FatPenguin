class HomeController < ApplicationController
  def index
    @users = User.all
  end
  
  def hello_world
    Pusher['test_channel'].trigger('my_event', {
      message: 'hello world'
    })
  end
end
