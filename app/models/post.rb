# frozen_string_literal: true

# Record that represents a post
class Post < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true
end
