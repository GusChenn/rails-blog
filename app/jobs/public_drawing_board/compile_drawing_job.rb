module PublicDrawingBoard
  class CompileDrawingJob < ApplicationJob
    def perform(:scribble_id)
      # 1. Fetch scribble
      # 2. Get its image_data and convert it from base64 to binary
      # 3. Get the last PublicDrawing record
      # 4. Get its image_data and convert it from base64 to binary
      # 5. Make a bitwise OR of the two binary image_data
      # 6. Save the new image_data to a new PublicDrawing record

      # 1. Fetch scribble
      scribble = PublicDrawingBoardScribble.find(scribble_id)

      # 2. Get its image_data and convert it from base64 to binary
      scribble_image_data = Base64.decode64(scribble.scribble_data)
    end
  end
end
