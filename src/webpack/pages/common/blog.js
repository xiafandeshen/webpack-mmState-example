var blog = avalon.define({
    $id: "blog"
})

module.exports = avalon.controller(function($ctrl) {
    // 视图渲染后，意思是avalon.scan完成
    $ctrl.$onRendered = function() {
    }
    // 进入视图
    $ctrl.$onEnter = function() {
        console.log(11111,mmState.query);
    }
    // 对应的视图销毁前
    $ctrl.$onBeforeUnload = function() {}
    // 指定一个avalon.scan视图的vmodels，vmodels = $ctrl.$vmodels.concact(DOM树上下文vmodels)
    $ctrl.$vmodels = []
})
