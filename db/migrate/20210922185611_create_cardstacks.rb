class CreateCardstacks < ActiveRecord::Migration[6.1]
  def change
    create_table :cardstacks do |t|
      t.string :name
      t.belongs_to :swipesession, null: false, foreign_key: true

      t.timestamps
    end
  end
end
