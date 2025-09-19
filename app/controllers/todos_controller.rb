class TodosController < ApplicationController
  before_action :set_todo, only: %i[ show edit update destroy complete ]

  # GET /todos or /todos.json
  def index
    todos = Todo.all.order(created_at: :desc)

    # Filter out completed todos if hide_completed parameter is present
    todos = if params[:completed].present? && params[:completed] == "true"
              todos.where.not(completed_at: nil)
            else
              todos.where(completed_at: nil)
            end


    @todos = todos
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @todos }
    end
  end

  # GET /todos/1 or /todos/1.json
  def show
  end

  # GET /todos/new
  def new
    @todo = Todo.new
  end

  # GET /todos/1/edit
  def edit
  end

  # POST /todos or /todos.json
  def create
    @todo = Todo.new(todo_params)

    respond_to do |format|
      if @todo.save
        if turbo_frame_request?
          @created_todo = @todo
          @todo = Todo.new
          format.turbo_stream { render :new }
          format.html { render :new, status: :ok }
        end
        format.json { render :show, status: :created, location: @todo }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /todos/1 or /todos/1.json
  def update
    respond_to do |format|
      if @todo.update(todo_params)
        format.html { redirect_to @todo, notice: "Todo was successfully updated.", status: :see_other }
        format.json { render :show, status: :ok, location: @todo }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /todos/1 or /todos/1.json
  def destroy
    @todo.destroy!

    respond_to do |format|
      format.turbo_stream { render :destroy }
      format.html { redirect_to todos_path, notice: "Todo was successfully deleted.", status: :see_other }
    end
  end

  # POST /todos/1/complete
  def complete
    @todo.complete!

    respond_to do |format|
      format.turbo_stream { render :complete }
      format.html { redirect_to todos_path, notice: "Todo was successfully completed.", status: :see_other }
      format.json { render :show, status: :ok, location: @todo }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def todo_params
      params.expect(todo: [ :name, :description, :priority ])
    end
end
