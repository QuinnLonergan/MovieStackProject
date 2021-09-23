# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(username: "Frank", password:"frankspassword")

Swipesession.create!(user_id:1, id:1)

Cardstack.create!(name: 'MVP carstack', id:1, swipesession_id:1)

puts "cardstack created"

Movie.create!(title:"Faker::Movie.title", cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)
Movie.create!(title:Faker::Movie.title, cardstack_id:1)

puts "movies created"