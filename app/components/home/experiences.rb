# frozen_string_literal: true

# To add new experiences, just create a method that returns a hash like
# the other ones and add it to the `experiences` method.
module Home
  class Experiences < ApplicationComponent
    def experiences
      @experiences ||= [qulture_rocks_experience, uol_edtech_experience, stayfi_experience]
    end

    private

    # rubocop:disable Metrics/MethodLength
    def qulture_rocks_experience
      @qulture_rocks_experience ||=
        {
          icon_family: 'fa-solid',
          icon_name: 'rocket',
          icon_color: 'violet-500',
          title: 'Qulture.Rocks',
          content: <<~HTML
            I worked as a full-stack developer at Qulture.Rocks,
            a company that helps other companies to improve their culture
            and employee engagement.
          HTML
        }
    end

    def uol_edtech_experience
      @uol_edtech_experience ||=
        {
          icon_family: 'fa-solid',
          icon_name: 'graduation-cap',
          icon_color: 'yellow-500',
          title: 'UOL EdTech',
          content: 'I worked as a full-stack developer at UOL EdTech, ' \
                  'a company that provides online courses for students and professionals.'
        }
    end

    def stayfi_experience
      @stayfi_experience ||=
        {
          icon_family: 'fa-solid',
          icon_name: 'house-signal',
          icon_color: 'blue-500',
          title: 'StayFi',
          content: 'I worked as a full-stack developer at StayFi, ' \
                  'a company that provides WiFi marketing solutions for hotels and resorts.'
        }
    end
    # rubocop:enable Metrics/MethodLength
  end
end
