angular.element(document).ready(() => {
  const api = (() => {
    const controllerElement = document.querySelector(
      '[data-ng-controller="algxController"]',
    );
    const $scope = angular.element(controllerElement).scope();

    $scope.$watch("alg", () =>
      document.querySelector("#algorithm").setSelectionRange(0, 0),
    );

    function importReconstruction(scramble, reconstruction) {
      const props = {
        puzzle: $scope.puzzle_map["3x3x3"],
        type: $scope.type_map["reconstruction"],
        title: "Solve by Bohdan Chornokondratenko",
        setup: scramble,
        alg: reconstruction,
      };
      $scope.$apply(() => {
        $scope.reset();
        for (i in props) {
          $scope[i] = props[i];
        }
      });
    }

    return { importReconstruction, $scope };
  })();

  window.api = api;
});
