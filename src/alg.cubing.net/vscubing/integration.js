angular.element(document).ready(() => {
  const api = (() => {
    const controllerElement = document.querySelector(
      '[data-ng-controller="algxController"]',
    );
    const $scope = angular.element(controllerElement).scope();

    $scope.$watch("alg", () =>
      document.querySelector("#algorithm").setSelectionRange(0, 0),
    );

    // reconstruction: {scramble: string, solution: string}
    function importReconstruction(reconstruction) {
      const props = {
        puzzle: $scope.puzzle_map["3x3x3"],
        type: $scope.type_map["reconstruction"],
        title: "Solve by Bohdan Chornokondratenko",
        setup: reconstruction.scramble,
        alg: reconstruction.solution,
      };
      window._twistyScene.play.reset();
      $scope.$apply(() => {
        $scope.reset();
        for (i in props) {
          $scope[i] = props[i];
        }
      });
    }

    function importMetadata({
      link,
      contestNumber,
      scramblePosition,
      username,
      formattedTime,
    }) {
      const linkButton = document.querySelector(".vs-copy-link-btn");
      const infoTextElement = document.querySelector(".vs-info-text");
      linkButton.dataset.link = link;
      infoTextElement.innerHTML = `Contest ${contestNumber}: Scramble ${scramblePosition}</br>${username}</br>${formattedTime}`;
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

      const infoBlockElement = document.createElement("div");
      infoBlockElement.classList = "vs-info-block";

      const infoTextElement = document.createElement("p");
      infoTextElement.classList = "vs-info-text";

      const copyLinkBtn = document.createElement("button");
      copyLinkBtn.innerHTML = linkSvgString;
      copyLinkBtn.classList = "vs-copy-link-btn";
      copyLinkBtn.addEventListener("click", (e) => {
        const link = e.target.dataset.link;
        if (!link) {
          alert("An unexpected error occured while copying the link");
          return;
        }
        navigator.clipboard.writeText(link).then(
          () => alert("Link copied"),
          () => alert("An unexpected error occured while copying the link"),
        );
      });

      infoBlockElement.append(infoTextElement);
      infoBlockElement.append(copyLinkBtn);
      document.querySelector("#info").prepend(infoBlockElement);
    }

    setup();
    return { importReconstruction, importMetadata };
  })();

  window.addEventListener(
    "message",
    (event) => {
      if (event.data.source !== "vs-integration") {
        return;
      }
      const { reconstruction, metadata } = event.data.payload;
      api.importReconstruction(reconstruction);
      api.importMetadata(metadata);
    },
    false,
  );
});

const linkSvgString = `<svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" preserveAspectRatio="none" xml:space="preserve" viewBox="55.66 55.52 89.35 89.33"><path fill="currentColor" d="M115.182 106.648c-2.7 0-5.2-1-7.1-2.9-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0 2.3 2.3 6.2 2.3 8.5 0l19.8-19.8c2.3-2.3 2.3-6.1 0-8.5l-11.3-11.3c-2.3-2.3-6.1-2.3-8.5 0l-19.8 19.7c-2.3 2.3-2.3 6.1 0 8.5.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-3.9-3.9-3.9-10.2 0-14.1l19.8-19.8c3.9-3.9 10.3-3.9 14.2 0l11.3 11.3c3.9 3.9 3.9 10.2 0 14.1l-19.8 19.9c-1.9 1.9-4.4 2.9-7.1 2.9zM76.982 144.848c-2.6 0-5.1-1-7.1-2.9l-11.3-11.4c-3.9-3.8-3.9-10.2 0-14.1l19.8-19.8c3.8-3.8 10.4-3.8 14.1 0 .8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-2.3-2.3-6.2-2.3-8.5 0l-19.7 19.8c-2.3 2.3-2.3 6.1 0 8.5l11.3 11.3c2.3 2.3 6.1 2.3 8.5 0l19.8-19.8c2.3-2.3 2.3-6.1 0-8.5-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0 3.9 3.9 3.9 10.2 0 14.1l-19.8 19.9c-2 1.9-4.5 2.9-7.1 2.9z"></path><path fill="currentColor" d="M76.982 125.548c-.5 0-1-.2-1.4-.6-.8-.8-.8-2 0-2.8l45.3-45.3c.8-.8 2-.8 2.8 0 .8.8.8 2 0 2.8l-45.3 45.3c-.4.4-.9.6-1.4.6z"></path></svg>`;
