/* global describe, it, expect, beforeEach, inject */

describe('Asm angular tooltip', function() {

  var compile;
  var scope;
  var directiveElem;

  beforeEach(function() {
    module('asmAngularTooltip');

    inject(function($compile, $rootScope) {
      compile = $compile;
      scope = $rootScope;
    });

    directiveElem = getCompiledElement();
  });

  function getCompiledElement() {
    var element = angular.element('<p asm-angular-tooltip="tooltip text">Selector Text</p>');
    var compiledElement = compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  it('should be closed', function() {
    expect(directiveElem.scope().isOpen).toBe(false);
  });

});
