import App from "./App";
import PostController from "./areas/post/controllers/post.controller";
import SearchController from "./areas/interact/controllers/interact.controller";

import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import IframeController from "./areas/iframe/controllers/Iframe.controller";

// import { MockAuthenticationService } from "./areas/authentication/services/Authentication.service.mock";
import { AuthenticationService } from "./areas/authentication/services/Authentication.service";

import { PostService, MockPostService } from "./areas/post/services";

const server = new App([
  new PostController(new PostService()),
  new AuthenticationController(new AuthenticationService()),
  new SearchController(),
  new IframeController(),
]);

server.start();
