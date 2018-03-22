var Wallet = (function() {
  var Return = {
    init: function(wallet) {
      initWallet(wallet);
    }
  };

  function initWallet(wallet) {
    angular.module('app', []).controller('walletCtrl', ['$scope', '$http', function($scope, $http) {
      $scope.wallet = wallet;
      $scope.addToken = function() {
        index = layer.open({
          type: 2,
          title: '添加Token',
          content: '/users/wallets/' + wallet.id + '/tokens/new',
          area: ['600px', '300px'],
          shadeClose: true,
          closeBtn: 1,
          yes: function(index, layero) {

            layer.close(index);
          },
          success: function(layero, index) {
            // layer.iframeAuto(index)
          }
        });
      };
      /**
       * 刷新tokens
       */
      $scope.getTokens = function() {};
      /**
       * 发送token
       */
      $scope.transferToken = function(token) {
        index = layer.open({
          type: 2,
          title: '转账',
          content: '/users/tokens/' + token.id + '/transfer',
          area: ['500px', '400px'],
          shadeClose: true,
          closeBtn: 1,
          yes: function(index, layero) {

            layer.close(index);
          },
          success: function(layero, index) {
            // layer.iframeAuto(index)
          }
        });
      };
    }]);
  }
  return Return;
})();