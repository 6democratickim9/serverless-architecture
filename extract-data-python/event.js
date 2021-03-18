{
    "Records":[
       {
          "EventSource":"aws:sns",
          "EventVersion":"1.0",
          "EventSubscriptionArn":"arn:aws:sns:us-east-1:199503606661:transcoded-video-notifications:7d6fe943-417f-4104-b8a1-33a40f64f1d2",
          "Sns":{
             "Type":"Notification",
             "MessageId":"01f0cbfa-dea5-595f-94bc-933e0e2bc7ba",
             "TopicArn":"arn:aws:sns:us-east-1:199503606661:transcoded-video-notifications",
             "Subject":"Amazon S3 Notification",
             "Message":"{\"Records\":[{\"eventVersion\":\"2.1\",\"eventSource\":\"aws:s3\",\"awsRegion\":\"us-east-1\",\"eventTime\":\"2021-03-12T02:13:24.863Z\",\"eventName\":\"ObjectCreated:Copy\",\"userIdentity\":{\"principalId\":\"A357J5TEV9LLY5\"},\"requestParameters\":{\"sourceIPAddress\":\"211.33.180.73\"},\"responseElements\":{\"x-amz-request-id\":\"5RM6ZHKZZ14DMZP5\",\"x-amz-id-2\":\"me++pK16BL4UKGnkm67PcTgbdSP9TdoWJRG8uQ8HrEeBGFfHg5yTjD+R5LAGbZH1fp2ERN2V5NZLc/PGYFKUvM4sylRxpbzz\"},\"s3\":{\"s3SchemaVersion\":\"1.0\",\"configurationId\":\"Transcoded Video\",\"bucket\":{\"name\":\"serverless-videotranscoded-myanjini\",\"ownerIdentity\":{\"principalId\":\"A357J5TEV9LLY5\"},\"arn\":\"arn:aws:s3:::serverless-videotranscoded-myanjini\"},\"object\":{\"key\":\"my_video_v4/my_video_v4-1080p.mp4\",\"size\":14044196,\"eTag\":\"3c111f7192177b6f371fab15825edf4a\",\"sequencer\":\"00604ACE4C53A62126\"}}}]}",
             "Timestamp":"2021-03-12T02:13:34.747Z",
             "SignatureVersion":"1",
             "Signature":"lQeXkSTSUvF/avT9x43HWXMpMYP8QNte20MRgEHrbILotiGoioN3Y5WAoeFFosnl+US3NqBHK67DgVnXC4JZZttXsLQnK2u4ceBl0F66KXuJQMKS9a5XHKY0hoSa3YHwOObG4ppxSB8+zjXN/QjL1Xv6wDIfVikc/PCEp6aF/Ly/P5CrjGA1wiv7rc3EWqju33l9cBFz/jClHeZLSFfsPtR1NGcqvd0jG7ovYT2NM2qQAdCSSweUMVAxahCc2hSHV+zV9DVMlklTxEoCAZ7YwtDo3IVEGgrXjxUOgq/Dho/e8SgvGiwaNjmOot302lsb4gm4a4nfNVD4opzwPAsONQ==",
             "SigningCertUrl":"https://sns.us-east-1.amazonaws.com/SimpleNotificationService-010a507c1833636cd94bdb98bd93083a.pem",
             "UnsubscribeUrl":"https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:199503606661:transcoded-video-notifications:7d6fe943-417f-4104-b8a1-33a40f64f1d2",
             "MessageAttributes":{
                
             }
          }
       }
    ]
 }
 
 