# frozen_string_literal: true

class PublicDrawingBoardController < ApplicationController
  IMAGE_HEIGHT = 300
  IMAGE_WIDTH = 940

  def index
    @height = IMAGE_HEIGHT
    @width = IMAGE_WIDTH
  end

  # Called directly by stimulus controller
  def create
    scribble = PublicDrawingBoardScribble.new(
      scribble_data: permitted_params[:image_data]
    )

    if scribble.save
      PublicDrawingBoard::CompileDrawingJob.perform_later(scribble_id: scribble.id)

      respond_to do |format|
        format.json { render json: { status: :ok } }
      end
    else
      respond_to do |format|
        format.json { render json: { errors: scribble.errors }, status: :unprocessable_entity }
      end
    end
  end

  private

  def permitted_params
    params.require(:drawing).permit(:image_data)
  end
end
