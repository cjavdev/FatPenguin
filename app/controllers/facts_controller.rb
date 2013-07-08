class FactsController < ApplicationController
  def index
    @facts = Fact.all
  end

  def show
    @fact = Fact.find(params[:id])
  end
  
  def create
    @fact = Fact.new(params[:fact])
    if @fact.save
      render :show
    else
      render :json => @fact.errors.full_messages, :status => 422
    end
  end
  
  def update
    @fact = Fact.find(params[:id])
    if @fact.update_attributes(params[:fact])
      render :show
    else
      render :json => @fact.errors.full_messages, :status => 422
    end
  end
end
