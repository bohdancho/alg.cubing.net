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

    function tweakStyles() {
      // TODO move to a separate CSS file
      const styles = `
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap');
      #info > h1, #twizzle, #cycleView, [data-ng-show="view.extraControls"] > div > *:not(:nth-child(3)), #hint_stickers, #hint_stickers ~ *, #metrics {
        visibility: hidden !important;
        position: absolute;
      }
      #setup, #algorithm {
        background: #18232C;
      } 
      #setup:hover, #setup:focus, #algorithm:hover, #algorithm:focus {
        border: none;
      }
      .moves {
        border-radius: 5px;
        border: none;
      }
      #display-wrapper {
        background: none;
      }
      body {
        background-color: #11191F !important;
      }
      body, textarea {
        font-family: 'Space Grotesk', sans-serif;
        color: #CFD1D2;
        font-weight: 400;
      }
      #info-wrapper, #info h2 {
        background: none;
      }
      #info h2 {
        text-transform: lowercase;
        font-variant: normal;
        border-top: none;
      }
      #controls {
        margin-top: 15px;
      }
      #controls .control {
        width: 80px;
        height: 58px;
        border-radius: 5px;
        background: #18232C;
        color: #CFD1D2;
        text-align: center;
      }
      #controls .control:not(:nth-child(-2)) {
        margin-right: 12px;
      }
    `;
      const styleSheet = document.createElement("style");
      styleSheet.innerText = styles;
      document.head.appendChild(styleSheet);
    }

    function setup() {
      tweakStyles()
    }
   
    setup()
    return { importReconstruction };
  })();

  window.api = api;
});
