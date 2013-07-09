class UsersController < ApplicationController
  before_filter :authenticate_user!
  before_filter :correct_user?, :except => [:index]

  def index
    close = [current_user]
    close += current_user.nearbys(30)
    @users = close
  end

  def edit
    @user = User.find(params[:id])
  end
  
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user])
      render :show
    else
      render :edit
    end
  end
  
  def show
    @user = User.find(params[:id])
  end
end
