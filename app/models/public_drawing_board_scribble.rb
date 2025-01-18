# == Schema Information
#
# Table name: public_drawing_board_scribbles
#
#  id            :bigint           not null, primary key
#  active        :boolean          default(TRUE)
#  scribble_data :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# I plan to make the scribbles 1000x300 pixels for now
class PublicDrawingBoardScribble < ApplicationRecord
  validates :scribble_data, presence: true
end
