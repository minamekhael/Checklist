class CreateItems < ActiveRecord::Migration[5.2]
    create_table :items do |t|
      t.string :title

      t.timestamps
    end
  end
