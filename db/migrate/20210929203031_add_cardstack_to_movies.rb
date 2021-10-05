class AddCardstackToMovies < ActiveRecord::Migration[6.1]
  def change
    add_reference :movies, :cardstack, null: false, foreign_key: true
  end
end
