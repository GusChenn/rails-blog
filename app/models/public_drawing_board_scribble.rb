# frozen_string_literal: true

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

  def scribble_base64_encoded_data
    scribble_data.split(',')[1]
  end
end
