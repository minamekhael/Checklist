class CategoriesController < ApplicationController

  def index
    @categories = Category.all
    respond_to do |f|
      f.html
      f.json {render json: @categories}
    end
  end

  def show
    respond_to do |f|
			f.json {render json: @category}
		end
  end

end
