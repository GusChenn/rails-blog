# frozen_string_literal: true

# Table name: public_drawing_board_scribbles
#
#  id            :bigint           not null, primary key
#  active        :boolean          default(TRUE)
#  scribble_data :text
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# I plan to make the scribbles 940x300 pixels for now.
#
# It is important to notice that the image size will make a difference in the decoded image's magic numbers section.
class PublicDrawingBoardScribble < ApplicationRecord
  validates :scribble_data, presence: true

  # Returns the decoded image data (bytes) without any magic numbers nor chunks.
  # The actual image data starts right after the IDAT chunk.
  def decoded_data_with_no_chunks
    idat_marker = 'IDAT'

    idat_index = decoded_data.index(idat_marker)
    return nil unless idat_index

    # Skip the IDAT chunk identifier
    start_index = idat_index + 6

    decoded_data[start_index..]
  end

  private

  # Removes the data URI prefix from the scribble data.
  def base64_data
    scribble_data.split(',')[1]
  end

  def decoded_data
    Base64.decode64(base64_data)
  end
end
