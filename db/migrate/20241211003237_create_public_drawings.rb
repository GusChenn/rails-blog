class CreatePublicDrawings < ActiveRecord::Migration[8.0]
  def change
    create_table :public_drawings do |t|
      t.text :image_data

      t.timestamps
    end
  end
end
