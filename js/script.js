const imageContainter = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Check if all images loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    loader.hidden = true;
    ready = true;
    count = 30;
  }
};

// Helper function for setting attributes
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotosOnWebpage = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run ForEach to get photos from photosArray
  photosArray.forEach(photo => {
    // Create anchor to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank"
    });

    // Create image
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // Event to check if each has finished loading everything.
    img.addEventListener("load", imageLoaded);

    // Put image inside the <a> and then put that <a> in the image container
    item.appendChild(img);
    imageContainter.appendChild(item);
  });
};

// API URL
let count = 10;
const apiKey = "j_yFn6aSJAQk62sqciOmNPrGnYwF04R1aaRSSL9tQs8";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotosFromUnsplash() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotosOnWebpage();
  } catch (error) {
    // Catch error here
    console.log(error);
  }
}

// Check to see if scrolling near the bottom, and then load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotosFromUnsplash();
  }
});

// on Page Load
getPhotosFromUnsplash();
