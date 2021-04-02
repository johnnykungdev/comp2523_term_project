import { DbHelper } from "../../../model/helpers/dbHelper";

export class MockSearchService {

  public getUsersByName(userName: string): object {
    return DbHelper.getUsersByName(userName)
  }

  public getUserPostsByKeyWord(keyWord: string): object {
    return DbHelper.getUserPostsByKeyWord(keyWord)
  }
}
