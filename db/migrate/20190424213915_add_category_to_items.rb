class AddCategoryToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :category_id, :int
  end
end
