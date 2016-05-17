/* global describe, it, expect, beforeEach, inject */

describe('Asm angular tooltip', function() {

  var compile;
  var scope;
  var element;
  var elementScope;
  var timeout;

  beforeEach(function() {
    module('asmAngularTooltip');

    inject(function($compile, $rootScope, $timeout) {
      compile = $compile;
      scope = $rootScope;
      timeout = $timeout;

      element = angular.element('<p asm-angular-tooltip="tooltip text">Selector Text</p>');
      compile(element)(scope);
      scope.$digest();
      elementScope = element.scope();
    });

  });

  it('should be closed', function() {
    expect(elementScope.isOpen).toBe(false);
  });

  it('should open on mouseenter', function() {
    element.triggerHandler('mouseenter');
    expect(scope.isOpen).toBe(true);
  });

  it('should close on mouseleave after 1 second', function() {
    element.triggerHandler('mouseenter');
    element.triggerHandler('mouseleave');
    expect(scope.isOpen).toBe(true);
    timeout.flush(500);
    expect(scope.isOpen).toBe(true);
    timeout.flush(500);
    expect(scope.isOpen).toBe(false);
  });

});
