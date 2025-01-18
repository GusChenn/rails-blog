require "test_helper"

class PublicWhiteBoardControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get public_white_board_index_url
    assert_response :success
  end
end
