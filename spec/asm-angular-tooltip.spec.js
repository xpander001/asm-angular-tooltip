/* global describe, it, expect, beforeEach, inject */

describe('Asm angular tooltip', function() {

  var scope;
  var elementBody;
  var element;
  var elementScope;
  var timeout;

  beforeEach(function() {
    module('asmAngularTooltip');

    inject(function($compile, $rootScope, $timeout) {
      elementBody = angular.element('<div><p asm-angular-tooltip="tooltip text">Selector Text</p></div>');
      scope = $rootScope;
      timeout = $timeout;
      $compile(elementBody)(scope);
      scope.$digest();
      element = elementBody.find('p');
      elementScope = element.scope();
    });

  });

  it('should be closed', function() {
    expect(elementScope.isOpen).toBe(false);
    expect(elementBody.children().length).toBe(1);
  });

  it('should open on mouseenter', function() {
    element.triggerHandler('mouseenter');
    expect(scope.isOpen).toBe(true);
    // Tooltip added
    expect(elementBody.children().length).toBe(2);
  });

  it('should close on mouseleave after 1 second', function() {
    // Enter and exit element hover
    element.triggerHandler('mouseenter');
    element.triggerHandler('mouseleave');
    // Should be open since timeout has not expired
    expect(scope.isOpen).toBe(true);
    expect(elementBody.children().length).toBe(2);
    // Should be open since timeout has 500 ms remaining
    timeout.flush(500);
    expect(scope.isOpen).toBe(true);
    expect(elementBody.children().length).toBe(2);
    // Should be closed since timeout has expired
    timeout.flush(500);
    expect(scope.isOpen).toBe(false);
    expect(elementBody.children().length).toBe(1);
  });

  it('should stay open if tooltip is hovered', function() {
    // Enter and exit element hover
    element.triggerHandler('mouseenter');
    element.triggerHandler('mouseleave');
    expect(scope.isOpen).toBe(true);
    // Since it's open, the second child of our element body will be the tooltip itself
    var tooltip = angular.element(elementBody.children()[1]);
    // Trigger hover on tooltip, expire timeout and check that it's still open
    tooltip.triggerHandler('mouseenter');
    timeout.flush(1200);
    expect(scope.isOpen).toBe(true);
    // Leave tooltip hover
    tooltip.triggerHandler('mouseleave');
    // Still open, timeout has not expired
    timeout.flush(500);
    expect(scope.isOpen).toBe(true);
    // Timeout expired. Tooltip should be closed
    timeout.flush(600);
    expect(scope.isOpen).toBe(false);
  });

  it('should rebind after closing', function() {
    // Enter and exit element hover
    element.triggerHandler('mouseenter');
    expect(scope.isOpen).toBe(true);
    var tooltip = angular.element(elementBody.children()[1]);
    tooltip.triggerHandler('mouseenter');
    timeout.flush(1200);
    expect(scope.isOpen).toBe(true);
    // Leave tooltip hover
    tooltip.triggerHandler('mouseleave');
    timeout.flush(1200);
    expect(scope.isOpen).toBe(false);
    // Enter again
    element.triggerHandler('mouseenter');
    tooltip = angular.element(elementBody.children()[1]);
    // Trigger hover on tooltip, expire timeout and check that it's still open
    tooltip.triggerHandler('mouseenter');
    timeout.flush(1200);
    expect(scope.isOpen).toBe(true);
  });

  it('should have text property', function() {
    expect(scope.text).toBeDefined();
    expect(scope.text).toEqual('tooltip text');
  });

});
