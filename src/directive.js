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

        bindElementEvents();
      }

      /* Event binding  */

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

      function bindTooltipEvents() {
        tooltip.bind('mouseenter', onEnter);
        tooltip.bind('mouseleave', onleave);
      }

      function unbindTooltipEvents() {
        tooltip.unbind('mouseenter', onEnter);
        tooltip.unbind('mouseleave', onleave);
      }

      function bindElementEvents() {
        elem.bind('mouseenter', onEnter);
        elem.bind('mouseleave', onleave);
      }

      /* Element addition and position */

      function show() {
        elem.after(tooltip);
        bindTooltipEvents();
        tooltip.addClass(visibleClassName);
      }

      function hide() {
        tooltip.remove();
        unbindTooltipEvents();
        tooltip.toggleClass(visibleClassName);
      }

      function positionTooltip() {
        // Lets position on the right by default
        var offset;
      }
    }
  }

})();
