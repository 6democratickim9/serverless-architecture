import boto3
import json
from urllib.parse import unquote

s3= boto3.client('s3')

def lambda_handler(event, context):
	
	print(event)

    message = event['Records'][0]['Sns']['Message']
    print(message)

	message = json.loads(message)
	print(message)

	bucket = message['Records'][0]['s3']['bucket']['name']
	print(bucket)
	key = message['Records'][0]['s3']['object']['key']
	print(key)

    response = s3.put_object_acl


