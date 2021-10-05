class CreateMovies < ActiveRecord::Migration[6.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :runtime
      t.string :poster
      t.text :plot
      t.string :released
      t.string :director
      t.string :awards

      t.timestamps
    end
  end
end
