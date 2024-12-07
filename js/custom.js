document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".gallery, .video-wrap, .image-wrap, timeline-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  var cardWrapElement = document.querySelector('.card-wrap');
  if (cardWrapElement) {
    // Card Slider
    var flkty = new Flickity(cardWrapElement, {
      contain: true,
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      adaptiveHeight: true,
      setGallerySize: false,
      selectedAttraction: 0.05,
      freeScrollFriction: .1
    });
  }

  // use typeit for <pre> elements with span children
  document.querySelectorAll('pre').forEach((preElement) => {
    const spans = preElement.querySelectorAll('span'); // pre 태그 안의 모든 span 요소 선택
    spans.forEach((span) => {
      new TypeIt(span, {
        cursor: false // 커서를 숨김
      })
      .pause(1000)
      .go();
    });
  });

  // Initialize TypeIt for elements with class 'typeIt'
  document.querySelectorAll('.typeIt').forEach((element) => {
    new TypeIt((element), {
      speed: 50,
      lifeLike: true
    })
    .pause(1000)
    .go();
  });
});
