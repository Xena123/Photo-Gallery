        

        // PHOTO GALLERY //


var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');
var $caption = $('<p></p>');
var $prevArrow = $('<div id="prevArrow"><img src="icons/prevArrow.png" alt="previous" /></div>');
var $nextArrow = $('<div id="nextArrow"><img src="icons/nextArrow.png" alt="next" /></div>');
var $closeLightbox = $('<div id="closeLightbox"><img src="icons/close.png" alt="next" /></div>');

// Add overlay to the body
$('body').append($overlay);

// Add the image to the overlay
$overlay.append($image);

// Add the caption to the overlay
$overlay.append($caption);

//Append buttons to overlay
$overlay.append($closeLightbox);
$overlay.append($prevArrow);
$overlay.append($nextArrow);

//Capture the click event on a link to an image
$('#imageGallery a').click(function(event) {

  //Prevent the link from following through 
  event.preventDefault();
  
  getCurrentImage(this);

  //Update the overlay with the image linked in the link


  //Show the overlay
  $overlay.fadeIn(1000);

  //Stop the page from scrolling when the lightbox is active
  document.body.style.overflow='hidden';

  //Show the caption
  var captionText = $(this).children("img").attr("alt");
  $caption.text(captionText);

});

//When you click the escape key the overlay disappears
$('body').keydown(function(e){
    console.log(e.which);
    if(e.which == 27){
        $overlay.fadeOut(1000);
        document.body.style.overflow='auto';
    }
});

//When you click the overlay the overlay disappears 
  $closeLightbox.click(function(event) {
    $overlay.fadeOut(1000);
    //Allow the page to scroll when the lightbox is inactive
    document.body.style.overflow='auto';
});


      // PHOTO GALLERY NAVIGATION


var $index = 0;

/* When the next button is clicked... */
$nextArrow.on("click", function(event) {
    getNextImage();
});
/* When right arrow key is pressed... */
$("body").keydown(function(event){
    if ( event.which == 39 ) {
        getNextImage();
  }
});

/* When the previous button is clicked... */
$prevArrow.on("click", function(event){
    getPrevImage();
});

/* When left arrow key is pressed... */
$("body").keydown(function(event){
    if ( event.which == 37 ) {
        getPrevImage();
  }
});


function getCurrentImage(currentImage) {
    thisImage = currentImage;
    var imageLocation = $(currentImage).attr("href");// accessing attributes from currentImage to pull the href value 
    $image.attr("src", imageLocation);//Update overlay with the image linked in the link

    //Get child's alt attribute and set caption
    var captionText = $(currentImage).children("img").attr("alt");
    $caption.text(captionText);
}

function getPrevImage() {//Create function called getPrevImage
    imageParent = $(thisImage).parent().prev();
    if(imageParent.length!=0){
      thisImage = $(imageParent).children("a");
      // imageLocation = $(thisImage).attr("href");
      // $image.attr("src", imageLocation);
    }
    getCurrentImage(thisImage);
    
}

function getNextImage() {//Create function called getNextImage
    imageParent = $(thisImage).parent().next();
    if(imageParent.length!=0){
    thisImage = $(imageParent).children("a");
    // imageLocation = $(thisImage).attr("href");
    // $image.attr("src", imageLocation);
    }
    getCurrentImage(thisImage);
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
      $(img.element).closest('li')[0].style.display = index === -1 ? 'none' : '';
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





