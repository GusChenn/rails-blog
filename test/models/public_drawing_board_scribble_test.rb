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
require "test_helper"

class PublicDrawingBoardScribbleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
