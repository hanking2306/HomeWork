const Emitter = require("Emitter");
cc.Class({
    extends: cc.Component,

    properties: {
        userNote: cc.Label,
        ErrorUserName: cc.Label,
        passWordNote: cc.Label,
        ErrorPassWord: cc.Label,
        noticeHappy: cc.RichText,
        enoughUser: cc.RichText,
        checkUser: false,
        checkPass: false,
    },

    onLoad() {
        this.enoughUser.node.active = false;
        this.hideNoteUser();
        this.hideNotePw();
        Emitter.instance.registerEvent("showRemind", this.onShowRemind.bind(this));
        Emitter.instance.registerEvent("editEnd", this.onEditEnd.bind(this));
        Emitter.instance.registerEvent("showNotify", this.onShowNotify.bind(this));
        Emitter.instance.registerEvent("stopResgiter", this.onStopRegister.bind(this));
    },

    onShowRemind(nameBox) {
        if (nameBox == "UserName") {
            this.userNote.node.active = true;
            this.hideNotePw();
        }
        else {
            this.passWordNote.node.active = true;
            this.hideNoteUser();
        }
    },

    hideNoteUser(){
        this.userNote.node.active = false;
        this.ErrorUserName.node.active = false;
    },

    hideNotePw(){
        this.passWordNote.node.active = false;
        this.ErrorPassWord.node.active = false;
    },

    bugUser() {
        this.checkUser = false;
        this.ErrorUserName.node.active = true;
        this.userNote.node.active = true;
    },

    bugPassWord(){
        this.checkPass = false;
        this.ErrorPassWord.node.active = true;
        this.passWordNote.node.active = true;
    },

    onEditEnd(nameBox) {
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        var upperCase = /[A-Z]/;
        var lowerCase = /[a-z]/;
        var numberCase = /[0-9]/;
        if (nameBox.node.name == "UserName") {
            if (nameBox.string == "") {
                this.bugUser();
            }
            else if (format.test(nameBox.string)) {
                this.bugUser();
            }
            else {
                this.hideNoteUser();
                this.checkUser = true;
            }
        }
        else {
            if (nameBox.string.length < 6) {
                this.bugPassWord();
            }
            else if (!upperCase.test(nameBox.string)) {
                this.bugPassWord();
            }
            else if (!lowerCase.test(nameBox.string)) {
                this.bugPassWord();
            }
            else if (!numberCase.test(nameBox.string)) {
                this.bugPassWord();
            }
            else {
                this.hideNotePw();
                this.checkPass = true;
            }
        }
    },

    onShowNotify(userString) {
        var daytime = new Date();
        var hour = daytime.getHours();
        var minute = daytime.getMinutes();
        var sencond = daytime.getSeconds();
        hour = (hour < 10) ? ("0" + hour) : hour;
        minute = (minute < 10) ? ("0" + minute) : minute;
        sencond = (sencond < 10) ? ("0" + sencond) : sencond;
        if (this.checkUser === true && this.checkPass === true) {
            var itemUser = userString + " : " + hour + ":" + minute + ":" + sencond;
            this.noticeHappy.string = "Chào mừng " + "<color=#ff0000><u>" + userString + "</u></color>"
                + " đã gia nhập lúc " + "<color=#fff000><i>" + hour + ":" + minute + ":" + sencond + "</i></color>";
            Emitter.instance.emit('addItem', itemUser);
            this.checkUser = false;
            this.checkPass = false;
        }
    },

    onStopRegister() {
        this.enoughUser.node.active = true;
        Emitter.instance.emit('hideEditBox');
    },

    start() {

    },

    // update (dt) {},
});