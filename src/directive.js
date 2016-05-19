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

    var tooltipTemplate = '<div class="asm-tooltip">{{text}}<div class="asm-tooltip-arrow"></div></div>';

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
        positionTooltip();
        bindTooltipEvents();
        tooltip.addClass(visibleClassName);
      }

      function hide() {
        tooltip.remove();
        unbindTooltipEvents();
        tooltip.toggleClass(visibleClassName);
      }

      function positionTooltip() {
        var position;
        var tooltipWidth;
        var tooltipHeight;
        var tooltipPosition;

        // // position = appendToBody ? $position.offset( element ) : $position.position( element );
        position = (elem[0]).getBoundingClientRect();

        // Get the height and width of the tooltip so we can center it.
        tooltipWidth = tooltip.prop('offsetWidth');
        tooltipHeight = tooltip.prop('offsetHeight');

        // Calculate the tooltip's top and left coordinates to center it with
        // this directive.
        scope.tt_placement = 'bottom';
        switch (scope.tt_placement) {
          case 'right':
            tooltipPosition = {
              top: position.top + position.height / 2 - tooltipHeight / 2,
              left: position.left + position.width + 10
            };
            tooltip.addClass('asm-tooltip-right');
            break;
          case 'bottom':
            tooltipPosition = {
              top: position.top + position.height + 10,
              left: position.left
            };
            tooltip.addClass('asm-tooltip-bottom');
            break;
          case 'left':
            tooltipPosition = {
              top: position.top + position.height / 2 - tooltipHeight / 2,
              left: position.left - tooltipWidth - 10
            };
            tooltip.addClass('asm-tooltip-left');
            break;
          default:
            tooltipPosition = {
              top: position.top - tooltipHeight - 10,
              left: position.left
            };
            tooltip.addClass('asm-tooltip-top');
            break;
        }

        tooltipPosition.top += 'px';
        tooltipPosition.left += 'px';

        // Now set the calculated positioning.
        tooltip.css(tooltipPosition);
      }
    }
  }

})();
