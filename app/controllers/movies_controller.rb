class MoviesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
      movies = Movie.all
      render json: movies
    end
  
    def show
      movie = find_movie
      render json: movie
    end
  
    def create
      movie = Movie.create!(movie_params)
      render json: movie, status: :created
    rescue ActiveRecord::RecordInvalid => invalid 
      render json: {error: "invalid!"}, status: 422
    end
  
    def update
      movie = find_movie
      movie.update(movie_params)
      render json: movie
    end
  
    def destroy
      movie = find_movie
      movie.destroy
      head :no_content
    end
  
  
    private
  
    def find_movie
      Movie.find(params[:id])
    end
  
    def movie_params
      params.permit(:title, :runtime, :poster, :plot, :released, :director, :awards, :cardstack_id)
    end
  
    def render_not_found_response
      render json: { error: "Movie not found" }, status: :not_found
    end
end
