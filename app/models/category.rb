# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :todo_categories, dependent: :destroy
  has_many :todos, through: :todo_categories

  validates :name, presence: true, length: { minimum: 1 }
end
