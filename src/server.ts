import { App } from "./App";
import PostController from "./areas/post/controllers/post.controller";
import AuthenticationController from "./areas/authentication/controllers/Authentication.controller";
import { MockAuthenticationService } from "./areas/authentication/services/Authentication.service.mock";
import { PostService, MockPostService } from "./areas/post/services";
import { SearchController } from "./areas/search/controllers/search.controller";
import { MockSearchService } from "./areas/search/services/Search.service.mock";
import * as dotenv from "dotenv"
dotenv.config({ path: __dirname + '/.env' })


import IframeController from "./areas/iframe/controllers/Iframe.controller";

const server = new App([
  new IframeController(),
  new AuthenticationController(new MockAuthenticationService()),
  new PostController(new MockPostService()),
  new SearchController(new MockSearchService()),
]);

server.start();
