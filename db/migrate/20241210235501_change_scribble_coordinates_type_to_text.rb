class ChangeScribbleCoordinatesTypeToText < ActiveRecord::Migration[8.0]
  def up
    change_column :public_drawing_board_scribbles, :scribble_coordinates, :text
  end

  def down
    change_column :public_drawing_board_scribbles, :scribble_coordinates, :binary
  end
end
