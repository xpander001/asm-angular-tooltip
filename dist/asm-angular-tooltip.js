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
      },
      link: link,
    };

    return directive;

    function link(scope, elem, attrs) {

      setScope(scope, elem, attrs);

      /* Private functions */

      function setScope(scope, element, atributes) {
        scope.el = element;
      }
    }
  }

})();
