# add your get-notes function here

import boto3
import json

dynamodb_resource = boto3.resource("dynamodb")
table = dynamodb_resource.Table("notes_30139872")

def lambda_handler(event, context):
    email1 = event['headers']['email']
    accesstoken = event['headers']['accesstoken']
    if ((accesstoken is None) or (email1 is None)):
        return {
            "statusCode": 401,
            "body": json.dumps(
                    {
                        "message": "unauthorized",
                    }
                )
        }
    email = event['queryStringParameters']['email']
    try:
        response = table.query(
            KeyConditionExpression='email = :email',
            ExpressionAttributeValues={
                ':email': email
            }
        )
        notes = response['Items']
        return {
            "statusCode": 200,
            "body": json.dumps(notes)
        }
    except Exception as exp:
        return {
            "statusCode": 500,
            "body": json.dumps(
                {
                    "message": str(exp),
                    "useremail": email,
                }
            )
        }
