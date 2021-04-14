import * as mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

const is_heroku = process.env.IS_HEROKU || false;

const herokuURI = "mongodb+srv://theMongoAdmin:accidentalLoginSteps@cluster0.puvj9.mongodb.net/myFirstDatabase?retryWrites=true";

const localURI = "mongodb://localhost/?authSource=admin&retryWrites=true";
if (is_heroku) {
	var client = new MongoClient(herokuURI, {useNewUrlParser: true, useUnifiedTopology: true});
}
else {
	var client = new MongoClient(localURI, {useNewUrlParser: true, useUnifiedTopology: true});
}

export default client;