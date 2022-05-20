$(document).ready(function() {
  // Select already existing elements
  var $app = $('#app');
  $app.html('');

  // Attach timeago plugin
  jQuery("time.timeago").timeago();

  // Create new HTML elements
  var $title = $('<h1>Twiddler</h1>');
  var $button = $('<button id="update-feed">Update Feed</button>');
  var $feed = $('<div id="feed"> </div>');

  // Create event handler functions
  var handleTitleClick = function(event) {
    alert('The title of this page is: ' + event.target.innerText);
  };

  var handleUsernameClick = function(event) {
    // Clear the feed page
    $feed.html('');

    // Change button text to 'back'
    $button.html('back');

    // Call renderfeed function to render user specific feed
    var readableUserName = event.target.innerText.slice(1);
    renderFeed(readableUserName);

  };

  var handleUpdateButtonClick = function(event) {
    // Clear feed page
    $feed.html('');

    // Change button text to 'update'
    $button.html('Update Feed');

    // Call rederfeed function to update all the tweets
    renderFeed();
  };

  var index = 0;
  var tweetObject;
  var streamType;
  // Function to render the 'feed' page
  var renderFeed = function(usernameSelected) {
    if (arguments.length === 0) {
      // no argument is detected, thus, tweet and index should target the 'home' streams
      // which contain all tweets from all users
      index = streams.home.length - 1;
      streamType = streams.home; // return the streams of all user's feed
    } else {
      // Argument is detected, thus, tweet and index should target the 'user' streams
      // which contains tweet from a specific user
      index = streams.users[usernameSelected].length - 1;
      streamType = streams.users[usernameSelected]; // return the streams of the user's feed
    }

    console.log();
    while (index >= 0) {
      // Selecting already existing elements
      tweetObject = streamType[index];

      // Creating HTML container
      var $tweetHeader = $('<div class="tweetHeader"> </div>');

      // Creating new HTML elements
      var $tweet = $('<div class="tweet"> </div>');
      var $message = $('<div class="message"> </div>');
      var $username = $('<div class="username"> </div>');
      var $timestamp = $('<div class="timestamp"> </div>');
      var $profilePhoto = $('<img class="profile-photo" src= "' + tweetObject.profilePhotoURL + '">');
      var $comment = $('<i class="icon fa-solid fa-comment comment"></i>');
      var $retweet = $('<i class="icon fa-solid fa-retweet retweet"></i>');
      var $like = $('<i class="icon fa-solid fa-thumbs-up like"></i>');
      var $share = $('<i class="icon fa-solid fa-share share"></i>');
      var $footer = $('<div class="tweet_footer"> </div>');

      // Give data to each new HTML elements
      $message.text(tweetObject.message);
      $username.text('@' + tweetObject.user);
      $timestamp.text(jQuery.timeago(tweetObject.created_at));

      // Set event listeners (providing appropriate handlers as input)
      $username.on("click", handleUsernameClick);

      // Append new HTML element to HTML Page
      $profilePhoto.appendTo($tweetHeader);
      $username.appendTo($tweetHeader);
      $tweetHeader.appendTo($tweet);

      $message.appendTo($tweet);

      $comment.appendTo($footer);
      $retweet.appendTo($footer);
      $like.appendTo($footer);
      $share.appendTo($footer);

      $timestamp.appendTo($footer);

      $footer.appendTo($tweet);

      $tweet.appendTo($feed);

      index -= 1;
    }
  };

  // Occupy webpage with tweets
  renderFeed();

  // Set event listeners (providing appropriate handlers as input)
  $title.on("click", handleTitleClick);
  $button.on("click", handleUpdateButtonClick);

  // Append new HTML elements to the DOM
  $title.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($app);

  window.isItBeautifulYet = true;
});