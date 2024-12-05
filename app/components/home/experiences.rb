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
          duration: '2021 - 2022',
          tags_data: [
            {
              icon_family: 'fa-brands',
              icon_name: 'react',
              background_color: 'blue-300',
              content: 'React'
            },
            {
              icon_family: 'fa-solid',
              icon_name: 'hexagon-nodes',
              background_color: 'rose-400',
              content: 'GraphQL'
            },
            {
              icon_family: 'fa-solid',
              icon_name: 'recycle',
              background_color: 'pink-300',
              content: 'Styled components'
            }
          ],
          descriptions: [
            'Created a dashboard for monitoring and managing company turnover metrics.'
          ]
        }
    end

    def uol_edtech_experience
      @uol_edtech_experience ||=
        {
          icon_family: 'fa-solid',
          icon_name: 'graduation-cap',
          icon_color: 'yellow-500',
          title: 'UOL EdTech',
          duration: '2023 - 2024',
          tags_data: [
            {
              icon_family: 'fa-regular',
              icon_name: 'gem',
              background_color: 'red-300',
              content: 'Ruby on Rails'
            },
            {
              icon_family: 'fa-brands',
              icon_name: 'react',
              background_color: 'blue-300',
              content: 'React'
            },
            {
              icon_family: 'fa-solid',
              icon_name: 'hexagon-nodes',
              background_color: 'rose-400',
              content: 'GraphQL'
            },
            {
              icon_family: 'fa-brands',
              icon_name: 'angular',
              background_color: 'red-400',
              content: 'Angular JS'
            },
            {
              icon_family: 'fa-solid',
              icon_name: 'recycle',
              background_color: 'pink-300',
              content: 'Styled components'
            }
          ],
          descriptions: [
            'Created a feature that helped users analyse their data and generate reports using an LLM integration',
            'Integrated third party data to our system through GraphQL APIs',
            'Developed part of the application\'s design system',
            'Founded the company\'s front-end chapter'
          ]
        }
    end

    def stayfi_experience
      @stayfi_experience ||=
        {
          icon_family: 'fa-solid',
          icon_name: 'house-signal',
          icon_color: 'blue-500',
          title: 'StayFi',
          duration: '2024 - now',
          tags_data: [
            {
              icon_family: 'fa-regular',
              icon_name: 'gem',
              background_color: 'red-300',
              content: 'Ruby on Rails'
            }
          ],
          descriptions: [
            'Currently working WiFi and makering solutions for vacation rentals'
          ]
        }
    end
    # rubocop:enable Metrics/MethodLength
  end
end
