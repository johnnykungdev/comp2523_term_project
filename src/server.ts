import App from "./App";
import PostController from "./areas/post/controllers/post.controller";
import SearchController from "./areas/interact/controllers/interact.controller";

import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import IframeController from "./areas/iframe/controllers/Iframe.controller";

// import { MockAuthenticationService } from "./areas/authentication/services/Authentication.service.mock";
import { AuthenticationServiceMongoDb, AuthenticationServiceMysql } from "./areas/authentication/services";

import { PostServiceMysql, MockPostServiceMongodb } from "./areas/post/services";

const server = new App([
  new PostController(new PostServiceMysql()),
  new AuthenticationController(new AuthenticationServiceMysql()),
  new SearchController(),
  new IframeController(),
]);

server.start();
