class CreatePublicDrawingBoardScribbles < ActiveRecord::Migration[8.0]
  def change
    create_table :public_drawing_board_scribbles do |t|
      t.binary :scribble_coordinates
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
