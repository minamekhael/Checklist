class Item < ActiveRecord::Base
	belongs_to :user
	belongs_to :category

	def completed?
		!completed_at.blank?
	end
end
