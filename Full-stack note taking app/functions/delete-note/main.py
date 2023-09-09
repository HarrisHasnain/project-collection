# add your delete-note function here

import boto3
import json
import uuid

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
    body = json.loads(event["body"])
    userid = str((body["id"]))
    email = str((body["email"]))
    try:
        table.delete_item(
            Key = {
                "email": email,
                "id": userid
            }
        )

        return {
            "statusCode": 200,
             "body": json.dumps(
                {
                    "message": "success"
                }
            )
        }
    
    except Exception as exp:
        return {
            "statusCode": 500,
            "body": json.dumps(
                {
                    "message": str(exp),
                    "conent": body,
                    "other": userid
                }
            )
        }
