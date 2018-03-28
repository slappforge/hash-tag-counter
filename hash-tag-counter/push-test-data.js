let AWS = require('aws-sdk');
const kinesis = new AWS.Kinesis();

exports.handler = function (event, context, callback) {

	console.log("Receiveed messages for hash tags", event.body);

	let hashTagMessages = JSON.parse(event.body).HashTagData;
	hashTagMessages.forEach(hashTagMessage => {
		let message = JSON.stringify(hashTagMessage);
		console.log("HashTag message", message)
		kinesis.putRecord({
			Data: message,
			PartitionKey: 'SocialMedia',
			StreamName: 'hash-tag-stream'
		}).promise()
			.then(putRecordData => {
				console.log("Push message successfully to hash-tag-stream with response", putRecordData);
				let response = {
					'statusCode': 200,
					'headers': {
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json'
					},
					'body': JSON.stringify({
						'Code': 'Success',
						'Message': 'Hash tag records are successfully populated to hash-tag-stream',
						'Data': putRecordData
					}),
					'isBase64Encoded': false
				};
				callback(null, response);
			})
			.catch(err => {
				console.log("Error while pushing message to hash-tag-stream with response", err);
				let response = {
					'statusCode': err.statusCode,
					'headers': {
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json'
					},
					'body': JSON.stringify({
						'Code': err.code,
						'Message': err.message
					}),
					'isBase64Encoded': false
				};
				callback(null, response);
			});
	})
}