import { AuthController } from './Controllers/AuthController.js'

import { PostsController } from './Controllers/PostsController.js'

class App {
  authController = new AuthController();
  // valuesController = new ValuesController();
  postsController = new PostsController();
}

// @ts-ignore
window.app = new App()
