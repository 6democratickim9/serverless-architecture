'use strict';
var AWS = require('aws-sdk');
// 어플리케이션이 실행되는 호스트의 쉘에서 명령어를 실행
var exec = require('child_process').exec;    
var fs = require('fs');

// PATH 환경 변수에 LAMBDA_TASK_ROOT 환경 변수를 추가
process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];


var s3 = new AWS.S3();

// 메타데이터를 S3 버킷에 파일(객체)로 저장
// body: 메타데이터 내용
function saveMetadataToS3(body, bucket, key, callback) {
    console.log('Saving metadata to S3');
    s3.putObject({
        Bucket: bucket, 
        Key: key, 
        Body: body     // key(파일)의 내용
    }, function(error, data) {
        if (error) {
            callback(error);
        }
    });
}

// 동영상의 메타데이터를 추출 (ffprobe 프로그램을 이용해서)
function extractMetadata(sourceBucket, sourceKey, localFilename, callback) {
    console.log('Extracting metadata');

    var cmd = 'bin/ffprobe -v quiet -print_format json -show_format "/tmp/' + localFilename + '"';
    //                     ~~~~~~~~ ~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //                     로그생략 출력형식           메타데이터   동영상경로
    // 명령어 실행에 성공하면 JSON 형식의 메타데이터가 stdout으로 전달
    // 프로젝트 디렉터리(extract-metatdata) 아래에 bin/ffprobe가 존재해야 함
    exec(cmd, function(error, stdout, stderr) {
        if (error === null) {
            // 원본 파일명의 확장자를 json으로 변경
            var metadataKey = sourceKey.split('.')[0] + '.json';
            saveMetadataToS3(stdout, sourceBucket, metadataKey, callback);
        } else {
            console.log(stderr);
            callback(error);
        }
    });
}

// S3 버킷에 있는 동영상을 작업 디렉터리(tmp)로 가져오는 함수
function saveFileToFilesystem(sourceBucket, sourceKey, callback) {
    console.log('Saving to filesystem');

    // 파일명(확장자 포함)만 추출해서 tmp 아래에 파일을 생성
    var localFilename = sourceKey.split('/').pop();
    var file = fs.createWriteStream('/tmp/' + localFilename);

    // S3 버킷의 파일을 읽어와서 tmp 아래에 있는 파일에 저장
    var stream = s3.getObject({
        Bucket: sourceBucket, 
        Key: sourceKey
    }).createReadStream().pipe(file);

    stream.on('error', function(error) {
        callback(error);
    });

    // 파일을 다 가져오면 메타 데이터 추출 함수를 호출
    stream.on('close', function() {
        extractMetadata(sourceBucket, sourceKey, localFilename, callback);
    });
}

exports.handler = function (event, context, callback) {
    // 버킷 이름과 경로 및 확장자를 포함한 파일명을 이벤트에서 추출
    var message = JSON.parse(event.Records[0].Sns.Message);
    var sourceBucket = message.Records[0].s3.bucket.name;
    var sourceKey = decodeURIComponent(message.Records[0].s3.object.key.replace(/\+/g, ' '));

    saveFileToFilesystem(sourceBucket, sourceKey, callback);
};
