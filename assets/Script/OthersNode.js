const Emitter = require("Emitter");
cc.Class({
    extends: cc.Component,

    properties: {
        signUp: cc.Button,
        scrollViewUser: cc.ScrollView,
        itemPrefab: cc.Prefab,
        progressBar: cc.ProgressBar,
        index: 1,
    },

    onLoad () {
        Emitter.instance.registerEvent('addItem', this.onAddItem.bind(this));
        this.signUp.node.on("click", this.onSignUp.bind(this));
    },

    onAddItem(account) {
        var item = new cc.instantiate(this.itemPrefab);
        item.getComponent(cc.Label).string = account;;
        item.y -= 30 * this.index;
        this.index++;
        this.progressBar.progress += 1/8;
        this.scrollViewUser.content.addChild(item);
        if(this.progressBar.progress === 1){
            this.signUp.node.active = false;
            Emitter.instance.emit('stopResgiter');
        }
    },

    onSignUp() {
        Emitter.instance.emit('signUp');
    },

    start () {

    },

    // update (dt) {},
});
