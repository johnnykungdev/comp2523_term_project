import { App } from "./App";
import PostController from "./areas/post/controllers/post.controller";
import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { MockAuthenticationService } from "./areas/authentication/services/Authentication.service.mock";
import { PostService, MockPostService } from "./areas/post/services";
import IframeController from "./areas/iframe/controllers/Iframe.controller";

const server = new App([
  new IframeController(),
  new AuthenticationController(new MockAuthenticationService()),
  new PostController(new MockPostService()),
]);

server.start();
