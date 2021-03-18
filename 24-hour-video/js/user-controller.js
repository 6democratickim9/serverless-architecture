var userController = {
    data: {
        auth0Lock: null,
        config: null
    }, 
    uiElements: {
        loginButton: null,
        logoutButton: null, 
        profileButton: null, 
        profileNameLabel: null,
        profileImage: null
    }, 
    init: function (config) {
        var that = this;
 
        this.uiElements.loginButton = $('#auth0-login');
        this.uiElements.logoutButton = $('#auth0-logout');
        this.uiElements.profileButton = $('#user-profile');
        this.uiElements.profileNameLabel = $('#profilename');
        this.uiElements.profileImage = $('#profilepicture');
 
        this.data.config = config;
 
        var auth0Options = {
            auth: { 
                responseType: 'token id_token'
            }
        };
        this.data.auth0Lock = new Auth0Lock(config.auth0.clientId, config.auth0.domain, auth0Options);
        
        this.configureAuthenticatedRequests();
        
        var accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            this.data.auth0Lock.getProfile(accessToken, function (err, profile) {
                if (err) {
                    return alert('프로필을 가져오는데 실패했습니다. ' + err.message);
                }
                that.showUserAuthenticationDetails(profile);
            });
        }
        this.wireEvents();
    },
    configureAuthenticatedRequests: function() {
        $.ajaxSetup({
            'beforeSend': function (xhr) {
                console.log(xhr);
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('idToken'));
                xhr.setRequestHeader('AccessToken', localStorage.getItem('accessToken'));
            }
        })
    }, 
    showUserAuthenticationDetails: function(profile) {
        var showAuthenticationElements = !!profile;
        if (showAuthenticationElements) {
            this.uiElements.profileNameLabel.text(profile.nickname);
            this.uiElements.profileImage.attr('src', profile.picture);
        }
        this.uiElements.loginButton.toggle(!showAuthenticationElements);
        this.uiElements.logoutButton.toggle(showAuthenticationElements);
        this.uiElements.profileButton.toggle(showAuthenticationElements);
    }, 
    wireEvents: function() {
        var that = this;

        this.uiElements.profileButton.click(function(e){
            var url = that.data.config.apiBaseUrl + '/user-profile';
            console.log(url);
            $.get(url,function(data, status){
                console.log('data', data);
                console.log('status', status);
            }).fail(function(e) {
                console.log(e);
            });
        });
 
        this.data.auth0Lock.on('authenticated', function(authResult) {
            console.log(authResult);
            localStorage.setItem('accessToken', authResult.accessToken);
            localStorage.setItem('idToken', authResult.idToken);
 
            that.data.auth0Lock.getUserInfo(authResult.accessToken, function (error, profile) {
                if (!error) {
                    that.showUserAuthenticationDetails(profile);
                }
            });
        });
        this.uiElements.loginButton.click(function(e) {
            that.data.auth0Lock.show();
        });
        this.uiElements.logoutButton.click(function(e) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('idToken');
            that.uiElements.logoutButton.hide();
            that.uiElements.profileButton.hide();
            that.uiElements.loginButton.show();
        });
    }
};


const ip = require('ip');
 
app.get('/',(req,res) => {
    res.send('AWS 팀 이름: 000000000 .@' + ip.address());
});