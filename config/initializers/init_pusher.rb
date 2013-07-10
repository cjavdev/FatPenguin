require 'pusher'

Pusher.url = "http://689695ee0bc2f7abe48c:a589d261acf1244bf211@api.pusherapp.com/apps/49128"
Pusher.logger = Rails.logger

# app/controllers/hello_world_controller.rb
class HelloWorldController < ApplicationController
  def hello_world
    Pusher['test_channel'].trigger('my_event', {
      message: 'hello world'
    })
  end
end