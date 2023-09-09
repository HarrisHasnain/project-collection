



import boto3
import json

dynamodb_resource = boto3.resource("dynamodb")
table = dynamodb_resource.Table("notes_30139872")

def lambda_handler(event, context):
    email = event['headers']['email']
    accesstoken = event['headers']['accesstoken']
    if ((accesstoken is None) or (email is None)):
        return {
            "statusCode": 401,
            "body": json.dumps(
                    {
                        "message": "unauthorized",
                    }
                )
        }
    body = json.loads(event["body"])
    try:
        table.put_item(Item=body)
        return {
            "statusCode": 201,
             "body": json.dumps(
                {
                    "message": "success",
                    "email": email,
                    "accesstoken": accesstoken
                }
            )
        }
    except Exception as exp:
        return {
            "statusCode": 500,
            "body": json.dumps(
                {
                    "message": str(exp)
                }
            )
        }
