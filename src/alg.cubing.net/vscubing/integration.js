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

    function setup() {
      const scrambleTitleElement = document.querySelector(
        '[data-ng-bind="type.setup"]',
      );
      const solveTitleElement = document.querySelector(
        '[data-ng-bind="type.alg"]',
      );
      const speedTitleElement = document.querySelector(
        '[data-ng-show="view.extraControls"] .section + div > h2',
      );

      scrambleTitleElement.innerHTML = "scramble";
      solveTitleElement.innerHTML = "solve";
      speedTitleElement.innerHTML = "speed";
    }

    setup();
    return { importReconstruction };
  })();

  window.addEventListener(
    "message",
    (event) => {
      if (event.data.source !== "vs-integration") {
        return;
      }
      const { scramble, reconstruction } = event.data.solve;
      api.importReconstruction(scramble, reconstruction);
    },
    false,
  );
});
