class TodoSerializer < Blueprinter::Base
  identifier :id

  fields :name, :description, :priority, :created_at, :updated_at


  association :categories, blueprint: CategorySerializer
end
