class SwipesessionsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
      swipesessions = Swipesession.all
      render json: swipesessions
    end
  
    def show
      swipesession = find_swipesession
      render json: swipesession
    end
  
    def create
      swipesession = Swipesession.create!(swipesession_params)
      render json: swipesession, status: :created
    rescue ActiveRecord::RecordInvalid => invalid 
      render json: {error: "invalid!"}, status: 422
    end
  
    def update
      swipesession = find_swipesession
      swipesession.update(swipesession_params)
      render json: swipesession
    end
  
    def destroy
      swipesession = find_swipesession
      swipesession.destroy
      head :no_content
    end
  
  
    private
  
    def find_swipesession
      Swipesession.find(params[:id])
    end
  
    def swipesession_params
      params.permit(:joined, :user_id)
    end
  
    def render_not_found_response
      render json: { error: "Swipesession not found" }, status: :not_found
    end
end
