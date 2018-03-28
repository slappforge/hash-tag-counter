let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

	console.log("Received hash tag message event", event);
	
	event.Records.forEach(function (record) {
		let payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
		let payloadObj = JSON.parse(payload);
		console.log('Decoded payload successfully :', payload);

		let application = payloadObj.Application;
		let hashTags = payloadObj.HashTags;
		console.log('Decoded Application : ' + application + ' and hashtags : ' + hashTags);
		
		hashTags.forEach(hashTag => {
			let currentCount = 0;
			ddb.get({
				TableName: 'HashTags',
				Key: { 'Application': application, 'HashTag': hashTag },
				AttributesToGet: [
					'Count'
				]
			}, function (err, data) {
				if (err) {
					console.log('Error while getting the existing count for the hashtag : ' + hashTag + ' and application : ' + 
						applciation, err);
				} else {
					console.log('Successfully fetched the existing row for hashtag : ' +  hashTag + ' in application : ' + 
						application, data);
					let currentCount = data.Item ? data.Item.Count + 1 : 1;

					ddb.put({
						TableName: 'HashTags',
						Item: { 'Application': application, 'HashTag': hashTag, 'Count': currentCount }
					}, function (err, data) {
						if (err) {
							console.log('Error while updating the hashcount for hashtag : ' + hashTag +' and application : ' + 
							applciation, err);
						} else {
							console.log('Successfully updated the hashtag count to : ' + currentCount + ' for hashtag : ' + 
								hashTag + ' in application : ' + application, data);
						}
					});
				}
			});
		})

	});

	callback(null, 'Successfully executed');
}