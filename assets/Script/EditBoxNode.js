const Emitter = require("Emitter");
cc.Class({
    extends: cc.Component,

    properties: {
        userName: cc.EditBox,
        passWord: cc.EditBox,
    },

    onLoad () {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('hideEditBox', this.onHideEditBox.bind(this));
        Emitter.instance.registerEvent('signUp', this.onSignUp.bind(this));
    },

    onHideEditBox(){
        this.userName.node.active = false;
        this.passWord.node.active = false;
    },

    onSignUp(){
        Emitter.instance.emit('showNotify',this.userName.string);
    },

    onEditBegan(nameBox){
        Emitter.instance.emit('showRemind', nameBox.node.name);
    },

    onEditEnd(nameBox) {
        Emitter.instance.emit('editEnd', nameBox, nameBox.string);
    },

    start () {
        
    },

    // update (dt) {},
});
