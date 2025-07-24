# frozen_string_literal: true

module UserInterface
  class CodeBlock < ApplicationComponent
    def formatted_content
      return '' unless content

      content_lines = content.split("\n")
      content_lines.shift if content_lines.first.blank?

      CGI.escape_html(content_lines.join("\n")).html_safe
    end
  end
end
