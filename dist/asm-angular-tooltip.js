(function () {
  'use strict';

  angular.module('asmAngularTooltip', []);
})();

(function () {

  'use strict';

  angular
    .module('asmAngularTooltip')
    .directive('asmAngularTooltip', asmAngularTooltip);

  /* @ngInject */
  function asmAngularTooltip() {

    var directive = {
      restrict: 'A',
      scope: {
        tooltip: '=tooltip'
      },
      link: link,
    };

    return directive;

    function link(scope, elem, attrs) {
      console.log('pedete');
      /* Private functions */
      scope.text = attrs.tooltip;
    }
  }

})();
