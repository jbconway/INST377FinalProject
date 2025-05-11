
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("carousel");

  if (!carousel) {
    console.error("Help carousel not found.");
    return;
  }

  // Confirm SimpleSlider is loaded
  if (typeof simpleslider === "undefined") {
    console.error("SimpleSlider is not loaded.");
    return;
  }

  console.log("Initializing Help Page slider...");

    // Set direction flag
  let isNext = true;

  // Force re-initialize slider
  const slider = simpleslider.getSlider({
    container: carousel,
    // children: carousel.querySelectorAll("figure"), // ONLY slide figure elements
    prop: 'left',  // sliding direction
    unit: '%',     // use percentage for responsive design
    init: 100,    // start at -100% (1 slide to the left)
    end: -100,      // end at +100% (1 slide to the right)
    show: 0,       // start at first slide
    duration: 5,  // 1.5 seconds slide duration
    autoPlay: false,
    controls: false
  });
  // Debugging logs
  console.log("Slider initialized:", slider);

  // Hook up manual prev/next buttons
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

    if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", (e) => {
      if (isNext) {
        slider.reverse();
        isNext = false;
      }
      slider.next(); // still call .next() even for "prev"
    });

    nextBtn.addEventListener("click", (e) => {
      if (!isNext) {
        slider.reverse();
        isNext = true;
      }
      slider.next();
    });
  } else {
    console.warn("Arrow buttons not found.");
  }
});
