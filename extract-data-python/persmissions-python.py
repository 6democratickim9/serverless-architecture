import boto3

def lambda_handler(event, context):
	# event 구조를 출력
	print(event)

    s3 = boto3.client('s3')

    # Messages 추출
    message = event['Records'][0]['Sns']['Message']
    print(message)

	# 추출한 Messages를 JSON 형식으로 변형
	message = json.loads(message)
	print(message)

	# 버킷 이름과 객체 이름을 출력
	bucket = message['Records'][0]['s3']['bucket']['name']
	print(bucket)
	key = message['Records'][0]['s3']['object']['key']
	print(key)

	# 객체의 ACL 변경
	# https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.put_object_acl
	response = s3.put_object_acl(ACL='public-read', Bucket=bucket, Key=key)
	print(response)

	return response
