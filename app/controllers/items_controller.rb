class ItemsController < ApplicationController
	before_action :find_item, only: [:show, :edit, :update, :destroy]
	before_action :authenticate_user!, except: [:index]

	def index
		if user_signed_in?
			if params[:category_id]
				@category = Category.find(params[:category_id])
				@items = current_user.items.where(category_id: params[:category_id])
			else
				@items = Item.where(:user_id => current_user.id).order("created_at DESC")
			end
			respond_to do |f|
				f.html
				f.json {render json: @items}
			end
		end
	end

	def show
		@item = Item.find(params[:id])
		respond_to do |f|
			f.html
			render json: @item, :includes => [:category_id]
		end
	end

	def new
		@item = current_user.items.build
		if params[:category_id]
			@category = Category.find(params[:category_id])
		end
	end

	def create
		@item = current_user.items.build(item_params)
		if @item.save
			render json: @item
		else
			render 'new'
		end
	end

	def edit
		@categories = Category.all.map{|c| [ c.name, c.id ] }
	end

	def update
		if @item.update(item_params)
			redirect_to root_path
		else
			render 'edit'
		end
	end

	def destroy
		@item.destroy
		redirect_to root_path
	end

	def complete
		@item = Item.find(params[:id])
		@item.update_attribute(:completed_at, Time.now)
		redirect_to root_path, notice: "Item successfully completed!"
	end

	private
		def item_params
			params.require(:item).permit(:title, :description, :category_id)
		end


		def find_item
			@item = Item.find(params[:id])
		end

end
