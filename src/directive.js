(function() {

  'use strict';

  angular
    .module('asmAngularTooltip')
    .directive('asmAngularTooltip', asmAngularTooltip);

  /* @ngInject */
  function asmAngularTooltip() {

    var directive = {
      restrict: 'A',
      scope: false,
      link: link,
    };

    return directive;

    function link(scope, elem, attrs) {
      scope.isOpen = false;
      /* Private functions */
    }
  }

})();
