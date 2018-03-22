/**
 * angularJs http(json格式)请求
 * $http : http上下文
 * url : 请求的url
 * method :请求方式 get,post
 * data : 请求数据
 */
function request($http, url, type, data) {
  var method = typeof(type) == 'undefined' ? 'get' : type;
  $http.defaults.headers.common = {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  };
  return $http({
    url: url,
    method: method,
    data: data,
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json'
    }
  });
}

function getAjaxHtml(url) {
  return $.ajax({
    url: url,
    type: "GET"
  });
}
/** 自动设置layer弹出的iframe宽度 **/
function autoReHeight() {
  var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
  parent.layer.iframeAuto(index);
}

function closeSelfLayer(ret, data) {
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    if (parent.layer.onok) {
        parent.layer.onok(ret, data);
    }
    parent.layer.close(index); //再执行关闭     
}
/**
 * 自定义错误消息提示(适用于bootstrap的form-group结构)
 */
function customFormValidate(selector, option) {
    var o = {
        tiptype: function(msg, o, cssctl) {
            //msg：提示信息;
            //o:{obj:*,type:*,curform:*}, obj指向的是当前验证的表单元素（或表单对象），type指示提示的状态，值为1、2、3、4， 1：正在检测/提交数据，2：通过验证，3：验证失败，4：提示ignore状态, curform为当前form对象;
            //cssctl:内置的提示信息样式控制函数，该函数需传入两个参数：显示提示信息的对象 和 当前提示的状态（既形参o中的type）;
            if (!o.obj.is("form")) { //验证表单元素时o.obj为该表单元素，全部验证通过提交表单时o.obj为该表单对象;
                var parent = o.obj.parent();
                var formRow = parent.parent();
                var objtip = parent.find('.help-block');
                if (o.type == 3) {
                    formRow.addClass('has-error');
                    if (objtip.length == 0) {
                        $('<div class="clearfix help-block"></div>').appendTo(parent);
                        objtip = parent.find('.help-block');
                    }
                    objtip.text(msg);
                } else if (o.type == 2) {
                    formRow.removeClass('has-error');
                    objtip.remove();
                }
            }
        }
    };
    var op = $.extend(o, option);
    return $(selector).Validform(op);
}
$.fn.extend({
  isDisabled: function() {
    return $(this).prop('disabled');
  },
  disable: function() {
    var t = $(this);
    if (!t.prop('disabled'))
      t.prop('disabled', true);
  },
  enable: function() {
    var t = $(this);
    if (t.prop('disabled'))
      t.prop('disabled', false);
  },
});