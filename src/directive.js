(function() {

  'use strict';

  angular
    .module('asmAngularTooltip')
    .directive('asmAngularTooltip', asmAngularTooltip);

  /* @ngInject */
  function asmAngularTooltip($timeout, $compile) {

    var directive = {
      restrict: 'A',
      scope: false,
      link: link,
    };

    var CLOSE_DELAY = 1000;

    var tooltipTemplate = '<div class="asm-tooltip asm-tooltip-up">{{text}}<div class="asm-tooltip-arrow"></div></div>';

    return directive;

    function link(scope, elem, attrs) {

      var tooltip = $compile(tooltipTemplate)(scope);
      var visibleClassName = 'asm-tooltip-visible';
      var closingTimeout;

      init();

      /* Private functions */
      function init() {
        scope.isOpen = false;
        scope.text = attrs.asmAngularTooltip;

        bindEvents();
      }

      function bindEvents() {

        function onEnter() {
          $timeout.cancel(closingTimeout);
          scope.isOpen = true;
          show();
        }

        function onleave() {
          closingTimeout = $timeout(function() {
            scope.isOpen = false;
            hide();
          }, CLOSE_DELAY);
        }

        elem.bind('mouseenter', onEnter);
        elem.bind('mouseleave', onleave);
        tooltip.bind('mouseenter', onEnter);
        tooltip.bind('mouseleave', onleave);

      }

      function show() {
        elem.after(tooltip);
        tooltip.addClass(visibleClassName);
      }

      function hide() {
        tooltip.remove();
        tooltip.toggleClass(visibleClassName);
      }

      function positionTooltip() {
        var offset;
      }
    }
  }

})();
