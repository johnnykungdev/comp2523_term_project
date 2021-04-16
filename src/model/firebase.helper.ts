function findOne(ref: any, query: { queryType: string, condition: string | number }): any {
  console.log("query condition", query.condition)
  return new Promise((resolve, reject) => {
    ref.orderByChild(query.queryType).equalTo(query.condition).on("value", function(snapshot) {
      if (!snapshot) reject(new Error("Snapshot not existed"))
      // console.log(snapshot.val())
      resolve(snapshot.val())
    }, function(error) {
      reject(new Error("Error occurred when finding"))
    })
  })
}

function insertOne(ref: any, newObject: any) {
  return new Promise((resolve, reject) => {
    ref.push(newObject, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve("success")
      }
    })
  })
}

function fbObjectToArray(fbObject: any): any {
  let resultArray = []
  for (let fbId in fbObject) {
      resultArray.push(fbObject[fbId])
  }
  return resultArray
}

export { fbObjectToArray, findOne, insertOne}