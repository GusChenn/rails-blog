class RenameScribbleCoordinatesToScribbleData < ActiveRecord::Migration[8.0]
  def change
    rename_column :public_drawing_board_scribbles, :scribble_coordinates, :scribble_data
  end
end
