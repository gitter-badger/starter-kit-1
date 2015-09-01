module navbar {
  'use strict';

  /** @ngInject */
  function acmeNavbar($location: ng.ILocationService): ng.IDirective {
    'use strict';
    return {
      restrict: 'E',
      scope: {
        creationDate: '='
      },
      templateUrl: 'modules/shell/header/navbar.html',
      controller: navbarController,
      controllerAs: 'vm',
      // bindToController: true,
      link: linkFunc
    };
  }

  function linkFunc(scope: ng.IScope, elem: JQuery, args: any, vm: navbarController) {

      scope.$on('$stateChangeSuccess', activate);
      activate();

      function activate() {
          var hrefs = ['/#' + vm.$location.path(),
                       '#' + vm.$location.path(), // html5: false
                       vm.$location.path()]; // html5: true

          angular.forEach(elem.find('.navbar-nav a'), function (a: JQuery) {
              a = angular.element(a);
              if (-1 !== hrefs.indexOf(a.attr('href'))) {
                  a.parent().addClass('active');
              } else {
                  a.parent().removeClass('active');
              };
          });
      };

  }

  /** @ngInject */
  class navbarController {
    'use strict';

    public $location: any;

    constructor($location: any) {
      this.$location = $location;
    }
  }

  angular
    .module('navbar', [])
    .directive('acmeNavbar', acmeNavbar);

}
