# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Starting the application
- `bin/dev` - Start the development server with Tailwind CSS watching (uses foreman with Procfile.dev)
- `bin/rails server` - Start Rails server only
- `bin/rails tailwindcss:watch` - Watch and rebuild Tailwind CSS

### Database
- `bin/rails db:create` - Create databases
- `bin/rails db:migrate` - Run migrations  
- `bin/rails db:seed` - Seed the database
- `bin/rails db:reset` - Drop, create, migrate, and seed

### Testing
- `bin/rails test` - Run all tests
- `bin/rails test test/models/post_test.rb` - Run specific test file
- `bin/rails test:system` - Run system tests

### Code Quality
- `bin/rubocop` - Run Ruby linter (uses rubocop-rails-omakase)
- `bin/brakeman` - Security vulnerability scanner

### Utilities
- `bin/rails console` - Rails console
- `bin/rails generate` - Generate Rails files
- `bin/annotaterb` - Add schema annotations to models

## Architecture Overview

This is a Rails 8.0 blog application with the following key architectural components:

### Technology Stack
- **Backend**: Rails 8.0 with PostgreSQL database
- **Frontend**: Stimulus + Turbo (Hotwire), Tailwind CSS
- **Components**: ViewComponent for reusable UI components
- **Assets**: Importmap for JavaScript modules, Propshaft for asset pipeline
- **Background Jobs**: Solid Queue (database-backed)
- **Caching**: Solid Cache (database-backed)
- **WebSockets**: Solid Cable (database-backed Action Cable)

### Application Structure

#### Models
- `Post` - Blog posts with title and content validation
- `PublicDrawing` - Stores compiled drawing data
- `PublicDrawingBoardScribble` - Individual drawing actions/scribbles

#### Controllers & Routes
- `PostsController` - Standard CRUD for blog posts (root route)
- `PublicDrawingBoardController` - Interactive drawing board feature
- `ShaderExperimentController` - WebGL/shader experiments
- `CustomEventSystemExperimentController` - JavaScript event system demos

#### View Components (ViewComponent Architecture)
- `ApplicationComponent` - Base component class with attribute assignment
- `Home::*` components - Homepage sections (about, experiences, icons)
- `UserInterface::*` components - Reusable UI elements (modals, code blocks, post cards)

#### JavaScript (Stimulus Controllers)
- `animations_controller.js` - Animation controls
- `custom_event_controller.js` - Custom event system demonstrations
- `highlight_controller.js` - Code syntax highlighting
- `public_drawing_board/main_controller.js` - Drawing board functionality
- `shader_controller.js` - WebGL shader management
- `user_interface/modal_controller.js` - Modal interactions

### Database Configuration
- Uses PostgreSQL with separate databases for development/test/production
- Production uses multiple databases: primary, cache, queue, and cable
- Database names follow pattern: `rails_blog_{environment}_{purpose}`

### Key Features
1. **Blog System** - Standard post creation/viewing
2. **Interactive Drawing Board** - Real-time collaborative drawing with WebSocket support  
3. **Shader Experiments** - WebGL shader playground
4. **Custom Event System** - JavaScript event handling demonstrations
5. **Component-Based UI** - ViewComponent architecture for maintainable frontend

### Development Notes
- Uses SQLite for development storage (see storage/ directory)
- Tailwind CSS for styling with custom components
- Font Awesome icons integrated
- Code highlighting with highlight.js
- Background job processing for drawing compilation