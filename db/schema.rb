# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_22_185958) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cardstacks", force: :cascade do |t|
    t.string "name"
    t.bigint "swipesession_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["swipesession_id"], name: "index_cardstacks_on_swipesession_id"
  end

  create_table "movies", force: :cascade do |t|
    t.string "title"
    t.string "runtime"
    t.string "poster"
    t.text "plot"
    t.string "released"
    t.string "director"
    t.string "awards"
    t.bigint "cardstack_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["cardstack_id"], name: "index_movies_on_cardstack_id"
  end

  create_table "swipesessions", force: :cascade do |t|
    t.datetime "joined"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_swipesessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "votes", force: :cascade do |t|
    t.boolean "liked"
    t.bigint "movie_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["movie_id"], name: "index_votes_on_movie_id"
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "cardstacks", "swipesessions"
  add_foreign_key "movies", "cardstacks"
  add_foreign_key "swipesessions", "users"
  add_foreign_key "votes", "movies"
  add_foreign_key "votes", "users"
end
