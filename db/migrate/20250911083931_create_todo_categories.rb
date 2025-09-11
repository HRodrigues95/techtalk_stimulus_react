class CreateTodoCategories < ActiveRecord::Migration[8.0]
  def change
    create_table :todo_categories do |t|
      t.references :todo, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end

    # Add unique index to prevent duplicate associations
    add_index :todo_categories, [ :todo_id, :category_id ], unique: true
  end
end
