

import boto3
import json
import requests

dynamodb_resource = boto3.resource("dynamodb")
table = dynamodb_resource.Table("mems_30139872")

def lambda_handler(event, context):

    try:

        response = table.scan()
        mems = response['Items']

        return {
            "statusCode": 200,
             "body": json.dumps(mems)
        }
    
    except Exception as exp:
        return {
            "statusCode": 500,
            "body": json.dumps(
                {
                    "message": str(exp),
                }
            )
        }