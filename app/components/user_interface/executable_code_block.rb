# frozen_string_literal: true

module UserInterface
  class ExecutableCodeBlock < CodeBlock
    def unescaped_content
      code.strip_heredoc.strip
    end
  end
end
