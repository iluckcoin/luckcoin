angular.module('app', []).controller('walletCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.data = {
    metaMaskAddress: '',
    wallets: []
  };
  $scope.connectToMetaMask = function() {
    web3.eth.getAccounts(function(error, accounts) {
      console.log('accounts');
      console.log(accounts);
      console.log(web3.eth.accounts[0]);
      $scope.$apply(function() {
        $scope.data.metaMaskAddress = accounts[0];
      });

    });
  }
  $scope.createWallet = function() {
    layer.confirm('确认创建钱包?', {}, function(index) {
      //yes
      request($http, '/users/wallets', 'post').then(function(response) {
        $scope.data.wallets.push(response.data);
      });
      layer.close(index);
    });
  };
  /**
   * 获取用户钱包
   */
  $scope.getWallets = function() {
    request($http, '/users/wallets', 'get').then(function(response) {
      $scope.data.wallets = response.data;
    });
  };
  $scope.importWallet = function() {
    layer.prompt({ title: '输入钱包密钥', formType: 0 }, function(private_key, index) {
      layer.close(index);
      request($http, '/users/wallets/import', 'post', { private_key: private_key }).then(function(response) {
        if (response.success)
          $scope.data.wallets.push(response.data);
        else
          layer.alert(response.message);
      });
    });
  };
  /**
   * 刷新余额
   */
  $scope.refreshBalance = function(wallet) {
    request($http, '/users/wallets/' + wallet.id, 'get').then(function(response) {
      for (var i = 0; i < $scope.data.wallets.length; i++) {
        if ($scope.data.wallets[i].id == wallet.id) {
          $scope.data.wallets[i] = response.data;
          break;
        }
      }
    });
  };
  $scope.transfer = function(wallet) {
    index = layer.open({
      type: 2,
      title: '转账',
      content: '/users/wallets/' + wallet.id + '/transfer',
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
  }
  $scope.getWallets();
}]);