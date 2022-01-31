class VotesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
      votes = Vote.all
      render json: votes
    end
  
    def show
      vote = find_vote
      render json: vote
    end
  
    def create
      vote = Vote.create!(vote_params)
      render json: vote, status: :created
    rescue ActiveRecord::RecordInvalid => invalid 
      render json: {error: "Invalid parameters!"}, status: 422
    end
  
    def update
      vote = find_vote
      vote.update(vote_params)
      render json: vote
    end
  
    def destroy
      vote = find_vote
      vote.destroy
      head :no_content
    end

    def destroy_user_votes
        votes = Vote.all.where(user_id: params[:id])
        votes.destroy_all
    end   
  
  
    private  
  
    def find_movie
      Vote.find(params[:id])
    end
  
    def vote_params
      params.permit(:liked, :movie_id, :user_id)
    end
  
    def render_not_found_response
      render json: { error: "Vote not found" }, status: :not_found
    end
end
