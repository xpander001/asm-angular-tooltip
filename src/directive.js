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
        elem.bind('mouseenter', function() {
          $timeout.cancel(closingTimeout);
          scope.isOpen = true;
          show();
        });

        elem.bind('mouseleave', function() {
          closingTimeout = $timeout(function() {
            scope.isOpen = false;
            hide();
          }, CLOSE_DELAY);
        });

        tooltip.bind('mouseenter', function() {
          $timeout.cancel(closingTimeout);
          scope.isOpen = true;
          show();
        });

        tooltip.bind('mouseleave', function() {
          closingTimeout = $timeout(function() {
            scope.isOpen = false;
            hide();
          }, CLOSE_DELAY);
        });
      }

      function show() {
        tooltip.addClass(visibleClassName);
        elem.after(tooltip);
      }

      function hide() {
        tooltip.remove();
      }

      function positionTooltip() {
        var offset;
      }
    }
  }

})();
