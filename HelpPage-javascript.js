
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

  // Force re-initialize slider
  let slider = simpleslider.getSlider({
    container: carousel,
    show: 1,  // Show one image at a time
    delay: 3, // Auto-slide every 3 seconds
    duration: 0.5, // Smooth fade transition
    autoPlay: true, // Enable auto sliding
    controls: false // Disable default controls
  });

  // Debugging logs
  console.log("Slider initialized:", slider);

  // Hook up manual prev/next buttons
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      console.log("Prev clicked");
      slider.prev();
    });

    nextBtn.addEventListener("click", () => {
      console.log("Next clicked");
      slider.next();
    });
  } else {
    console.warn("Arrow buttons not found.");
  }
});
