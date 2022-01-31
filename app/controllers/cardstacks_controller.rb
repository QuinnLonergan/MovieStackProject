class CardstacksController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
      cardstacks = Cardstack.all
      render json: cardstacks
    end
  
    def show
      cardstack = find_cardstack
      render json: cardstack
    end
  
    def create
      cardstack = Cardstack.create!(cardstack_params)
      render json: cardstack, status: :created
    rescue ActiveRecord::RecordInvalid => invalid 
      render json: {error: "Invalid parameters"}, status: 422
    end
  
    def update
      cardstack = find_cardstack
      cardstack.update(cardstack_params)
      render json: cardstack
    end
  
    def destroy
      cardstack = find_cardstack
      cardstack.destroy
      head :no_content
    end

    def show_genre
      cardstacks = Cardstack.where(user_id: 3)
      render json: cardstacks
    end

  
  
    private
  
    def find_cardstack
      Cardstack.find(params[:id])
    end
  
    def cardstack_params
      params.permit(:name, :user_id)
    end
  
    def render_not_found_response
      render json: { error: "Cardstack not found" }, status: :not_found
    end
end
