

import boto3
import json
import requests
from requests_toolbelt.multipart import decoder
import base64
import os
import cloudinary
import openai
from cloudinary.uploader import upload

dynamodb_resource = boto3.resource("dynamodb")
table = dynamodb_resource.Table("mems_30139872")

def lambda_handler(event, context):
    
    body = event["body"]
    if event["isBase64Encoded"]:
        body = base64.b64decode(body)
        
    content_type = event['headers']['content-type']
    
    try:

        ssm = boto3.client("ssm", region_name="ca-central-1")
        
        data = decoder.MultipartDecoder(body, content_type)
        
        binary_data = [part.content for part in data.parts]
        name = binary_data[1].decode()
        born = binary_data[2].decode()
        died = binary_data[3].decode()
        file = binary_data[0]
        
        cloud_api = ssm.get_parameters(
            Names=['cloudinary_api_key'],
            WithDecryption=True
        )['Parameters'][0]['Value']
        
        cloud_secret = ssm.get_parameters(
            Names=['cloudinary_secret_key'],
            WithDecryption=True
        )['Parameters'][0]['Value']
        
        gpt_api = ssm.get_parameters(
            Names=['openai_api_key'],
            WithDecryption=True
        )['Parameters'][0]['Value']

        openai.api_key = gpt_api
        
        response = openai.Completion.create(
            model="davinci-002",
            prompt=f"Write an obituary about a fictional character named {name} who was born on {born} and died on {died}."
        )

        ai_response = response['choices'][0]['text']
        
        cloudinary.config(
          cloud_name = "doczferqd",
          api_key = cloud_api,
          api_secret = cloud_secret,
        )
        
        response = upload(file, transformation=[{'effect': 'art:zorro'}])
        image_url = response['secure_url']

        client = boto3.client('polly')

        voiceres = client.synthesize_speech(
            LanguageCode = 'en-US',
            OutputFormat='mp3',
            Text=ai_response,
            VoiceId='Joanna',
        )
        
        vidres = upload(voiceres['AudioStream'].read(), resource_type="video")
        audio_url = vidres['secure_url']

        item = {
            'name': name,
            'born': born,
            'died': died,
            'response': ai_response,
            'image': image_url,
            'audio': audio_url
        }

        table.put_item(Item=item)
        
        return {
            "statusCode": 200,
             "body": json.dumps(
                {
                    "message": "TEST-10",
                    "name": name,
                    "nametype": str(type(name)),
                    "born": born,
                    "borntype": str(type(born)),
                    "died": died,
                    "diedtype": str(type(died)),
                    "filetype": str(type(file)),
                    "cloudapi": str(cloud_api),
                    "cloudsecret": str(cloud_secret),
                    "gptapi": str(gpt_api),
                    "gptresponse": ai_response,
                    "imagelink": image_url,
                    "audiolink": audio_url
                }
            )
        }
    
    except Exception as exp:
        return {
            "statusCode": 500,
            "body": json.dumps(
                {
                    "message": str(exp),
                    "Fail?": "yeah"
                }
            )
        }