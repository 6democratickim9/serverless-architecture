// P209
var videoController = {
    data: {
        config: null
    },
    uiElements: {
        videoCardTemplate: null, 
        videoList: null
    }, 
    init: function(config) {
        // index.html 문서에 id 속성이 video-template, video-list인 요소를 참조
        this.uiElements.videoCardTemplate = $('#video-template');
        this.uiElements.videoList = $('#video-list');
 
        // config.js 파일에 있는 내용을 참조
        this.data.config = config;
 
        this.getVideoList();
    }, 
    // get-video-list API를 호출
    getVideoList: function() {
        var that = this;
 
        // get-video-list API 호출 URL + 리소스 이름
        // videos 리소스를 GET 방식으로 호출 --> get-video-list 람다 함수를 실행하고 결과를 반환 받음
        var url = this.data.config.getFileListApiUrl + '/videos';
        $.get(url, function(data, status) {
            that.updateVideoFrontPage(data);
        });
    }, 
    // get-video-list 람다 함수의 실행 결과를 목록으로 화면에 출력
    updateVideoFrontPage: function(data) {
        console.log(data);
        // TODO
    }
};
