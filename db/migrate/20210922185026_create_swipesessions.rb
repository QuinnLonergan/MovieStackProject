class CreateSwipesessions < ActiveRecord::Migration[6.1]
  def change
    create_table :swipesessions do |t|
      t.datetime :joined
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
