
      // PHOTO GALLERY //

var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');
var $caption = $('<p></p>');

// Add arrow variables
var $prevArrow = $('<div id="prevArrow"><img src="icons/prevArrow.png" alt="previous" /></div>');
var $nextArrow = $('<div id="nextArrow"><img src="icons/nextArrow.png" alt="next" /></div>');
// Keep track of image index for arrow buttons //
var $index = 0;



//Append the overlay to the image
$overlay.append($image);

//Append the caption to the overlay
$overlay.append($caption);

//Append the overlay to the body
$("body").append($overlay);


//Append buttons to overlay
  $overlay.append($prevArrow);
  $overlay.append($nextArrow);


//Declare a click function 
$("#imageGallery a").click(function(event) {

  //Prevent the default event when clicked (which is to go through to the link of the image)
	event.preventDefault();

  //Get the image location
	var imageLocation = $(this).attr("href");

	$image.attr("src", imageLocation);

  //Show the overlay
	$overlay.fadeIn(1000);

  //Stop the page from scrolling when the lightbox is active
  document.body.style.overflow='hidden'

  // get index for current image //
  $index = $(this).parent().index();

  //Show the caption
	var captionText = $(this).children("img").attr("alt");
	$caption.text(captionText);

  // add back and forward navigation buttons when lightbox is visible //
  $image.after($prevArrow);
  $image.before($nextArrow);

});

/* When the next button is clicked... */
$nextArrow.on("click", function(event) {
    nextImage();
});
/* When right arrow key is pressed... */
$("body").keydown(function(event){
    if ( event.which == 39 ) {
        nextImage();
  }
});

/* When the previous button is clicked... */
$prevArrow.on("click", function(event){
    previousImage();
});

/* When left arrow key is pressed... */
$("body").keydown(function(event){
    if ( event.which == 37 ) {
        previousImage();
  }
});

//When you click the overlay the overlay disappears 
$overlay.click(function() {
	$overlay.hide();
  //Allow the page to scroll when the lightbox is inactive
  document.body.style.overflow='auto'
});



function updateImage(imageLocation, imageCaption) {
    /* update image source */
    $image.attr("src", imageLocation);
    /* set caption text */
    $caption.text(imageCaption);
}



function nextImage() {
     /* update index */
    $index++;
    /* loop up to first image in gallery */
    if ($index >= $("#imageGallery .photo").length) {
        $index = 0;
    }
    /* use index to get next image */
    var nextImage = $("#imageGallery .photo").get($index).getElementsByTagName("a");
    /* get new image location and caption */
    var imageLocation = $(nextImage).attr("href");
    var imageCaption =  $(nextImage).children("img").attr("alt");
    /* update the overlay image */
    updateImage(imageLocation, imageCaption);
}



function previousImage() {
    /* update the index */
    $index--;
    /* loop back to last image in gallery */
    if ($index < 0) {
        $index = $("#imageGallery .photo").length - 1;
    }
    /* get the previous image by index */
    var prevImage = $("#imageGallery .photo").get($index).getElementsByTagName("a");
    /* update the image location and caption */
    var imageLocation = $(prevImage).attr("href");
    var imageCaption =  $(prevImage).children("img").attr("alt");
    /* update the overlay */
    updateImage(imageLocation, imageCaption);
}




      // SEARCH BAR //

// Get the images
var $imgs = $('#imageGallery img'); 
// Get the input element              
var $search = $('#filter-search');   
 // Create an array called cache             
var cache = [];                                  

// Lives in an IIFE
(function() {   
// For each image                                  
  $imgs.each(function() {  
   // Add an object to the cache array                       
    cache.push({
    // This image                                 
      element: this,
      // Its alt text (lowercase trimmed)                              
      text: this.alt.trim().toLowerCase()         
    });
  });


  // Declare filter() function
  function filter() { 
  // Get the query                            
    var query = this.value.trim().toLowerCase();
    // For each entry in cache pass image   
    cache.forEach(function(img) { 
    // Set index to 0                
      var index = 0;                              
    // If there is some query text
      if (query) { 
      // Find if query text is in there                               
        index = img.text.indexOf(query);          
      }
      // Show / hide
      img.element.style.display = index === -1 ? 'none' : '';  
    });
  }
  // If browser supports input event
  if ('oninput' in $search[0]) { 
  // Use input event to call filter()                 
    $search.on('input', filter); 
  // Otherwise         
  } else {  
   // Use keyup event to call filter()                              
    $search.on('keyup', filter);         
  }     
}());





