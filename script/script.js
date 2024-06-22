document.addEventListener("DOMContentLoaded", function () {
  const venuelinks = document.querySelectorAll(".venuelink");
  const top = document.getElementsByClassName("top-footer")[0];

  venuelinks.forEach(function (venuelink) {
    venuelink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default anchor click behavior

      top.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
      });
    });
  });
});
