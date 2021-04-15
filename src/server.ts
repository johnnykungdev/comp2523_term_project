import App from "./App";
import PostController from "./areas/post/controllers/post.controller";
import SearchController from "./areas/interact/controllers/interact.controller";

import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import IframeController from "./areas/iframe/controllers/Iframe.controller";

// import { MockAuthenticationService } from "./areas/authentication/services/Authentication.service.mock";
import { AuthenticationServiceMongoDb, AuthenticationServiceMysql } from "./areas/authentication/services";

import { PostServiceMysql, MockPostServiceMongodb } from "./areas/post/services";

import { InteractServiceMock } from "./areas/interact/services";


const server = new App([
  new AuthenticationController(new AuthenticationServiceMongoDb()),
  new PostController(new MockPostServiceMongodb()),
  new SearchController(new InteractServiceMock()),
  new IframeController(),
]);

server.start();
