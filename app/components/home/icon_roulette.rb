# frozen_string_literal: true

module Home
  class IconRoulette < ViewComponent::Base
    POSSIBLE_ICONS = %w[lemon poo bomb hippo umbrella tag barcode book droplet money-bill paint-roller gamepad palette poo-storm hand-point-up shower otter kiwi-bird worm wave-square smoking shrimp pepper-hot florin-sign dog chess-king chess-rook chess-queen chess-pawn chess-knight chess-bishop cat burger bottle-water bed bacterium bacon angles-right angle-right computer-mouse computer compact-disc graduation-cap frog].freeze # rubocop:disable Layout/LineLength
    POSSIBLE_COLORS = %w[slate-600 zinc-700 stone-500 red-400 orange-400 yellow-700 lime-500 green-400 teal-400 blue-500 indigo-800 violet-700 purple-400 pink-600 rose-400].freeze # rubocop:disable Layout/LineLength

    def icons_data
      @icons_data ||= selected_icons.zip(selected_color).to_h
    end

    private

    def selected_icons
      POSSIBLE_ICONS.sample(20)
    end

    def selected_color
      Array.new(20) { POSSIBLE_COLORS.sample }
    end
  end
end
