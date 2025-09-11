# frozen_string_literal: true

class Todo < ApplicationRecord
  has_many :todo_categories, dependent: :destroy
  has_many :categories, through: :todo_categories

  enum :priority, {
    very_low: 0,
    low: 1,
    medium: 2,
    high: 3,
    very_high: 4
  }
end
