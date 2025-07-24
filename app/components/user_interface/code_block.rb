# frozen_string_literal: true

module UserInterface
  class CodeBlock < ApplicationComponent
    attr_accessor :code, :language

    def formatted_content
      return '' unless code

      CGI.escape_html(code.strip_heredoc.strip).html_safe
    end
  end
end
