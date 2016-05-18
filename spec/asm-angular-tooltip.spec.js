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
    element.triggerHandler('mouseenter');
    element.triggerHandler('mouseleave');
    expect(scope.isOpen).toBe(true);
    expect(elementBody.children().length).toBe(2);
    timeout.flush(500);
    expect(scope.isOpen).toBe(true);
    expect(elementBody.children().length).toBe(2);
    timeout.flush(500);
    expect(scope.isOpen).toBe(false);
    expect(elementBody.children().length).toBe(1);
  });

  it('should stay open if tooltip is hovered', function() {
    element.triggerHandler('mouseenter');
    element.triggerHandler('mouseleave');
    expect(scope.isOpen).toBe(true);
    var tooltip = angular.element(elementBody.children()[1]);
    tooltip.triggerHandler('mouseenter');
    timeout.flush(1200);
    expect(scope.isOpen).toBe(true);
    tooltip.triggerHandler('mouseleave');
    timeout.flush(500);
    expect(scope.isOpen).toBe(true);
    timeout.flush(600);
    expect(scope.isOpen).toBe(false);
  });

  it('should have text property', function() {
    expect(scope.text).toBeDefined();
    expect(scope.text).toEqual('tooltip text');
  });

});
