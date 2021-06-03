//IMAGES obj
const images = {
  1: "../images/video_symbol.png",
  2: "../images/article_symbol.png",
  3: "../images/quiz_symbol.png",
  4: "../images/blog_symbol.png",
  5: "../images/documentation_symbol.png",
  6: "../images/resource_hub_symbol.png",
  7: "../images/podcast_symbol.png"
};

//SINGLE POST VIEW HANDLER
const singlePostHandler = function() {
  $(".posts").find("#post_titles").click(function() {
    $(".single_post").hide();
    $("#comments_div").hide();
    let target = $(this).closest(".posts").attr('id');
    $(`form.single_post#${target}`).slideToggle();
    $("#comments_div").slideToggle();
    $('form.single_post').find('article').remove();
    $.get(`/api/comments/get_comments?target=${target}`)
      .then(function(comments) {
        renderComments(comments);
      });
  });
};

//FAVOURITE BUTTON HANDLER
const favBtnHandler = function () {
  $(`[name="hearts"]`).off('click');
  $(`[name="hearts"]`).click(function () {
    $(this).toggleClass("makered");

    let $source = $(this);
    const postId = $(this).closest(".posts").attr("id");
    $.post("/api/users/liked", { postId })
      .then(function (post) {
        if (post.counter === 0) {
          let zeroCounter = '0';
          return zeroCounter;
        }
        return `${post.counter.num_favs}`;
      })
      .then(function (counterVal) {
        $source.siblings('.favs-counter').text(counterVal);
      });
  });
};

//COMMENT SUBMISSION HANDLER
const submitCommentHandler = function () {
  $("form.single_post").submit(function (ev) {
    ev.preventDefault();
    const $commentClear = $(this).find("#new_comment");
    const comment = $(this).find("#new_comment").val();
    const rating = $(this).find("#rating").val();
    const postId = $(this).attr("id");
    const dataObj = { comment, rating, postId };
    $.post("/api/comments/newcomment", dataObj)
      .then(function(data) {
        $commentClear.val('');
        renderSingleComment(data);
      });
  });
};

//RENDER A POSTS
const renderPost = function (posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    let $wrapper = `<article class="posts" id ="${obj.post_id}" style="background-image: linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url(${images[obj.resource_type_id]})">${postHTML}</article>`;
    let $commentDiv = $(`
      <form class = "single_post" id = "${obj.post_id}">
      <span id = "post_info">
      <h4>${obj.title}</h4>
      <h6>By: ${obj.poster_name}</h6>
      <div><span>${obj.topic} / </span><span>${obj.name}</span></div>
      <h6 id="description_h">${obj.description}</h6>
      <a href="${obj.url}">GO TO SOURCE</a>
      <hr/>
      <div id="split"><hr/></div>
      </span>
      <textarea id="new_comment" placeholder="enter a comment..."></textarea>
      <div class= "submitComment" >
      <select name="rating" id="rating">
        <option value="1">VeryUnhelpful</option>
        <option value="2">Unhelpful</option>
        <option value="3" selected="selected">Adequate</option>
        <option value="4">Helpful</option>
        <option value="5">VeryHelpful</option>
       </select>
       <button type="submit">SUBMIT</button>
       </div>
      </form>
    `);
    $(".text-post").prepend($wrapper);
    $("#comments_div").prepend($commentDiv);
  }
};

//APPHEND COMMENTS in order
const renderComments = function (comments) {
  let $comment = $(`<div class="composed-comment"></div>`);
  for (const comment of comments.posts) {
    let commentBody = comment.comment_body;
    let username = comment.username;
    let rating = comment.rating;
    let time = comment.created_at;
    let $commentArticle = $(`
    <article class ='comment_article'>
    <header>
    <p>${commentBody}</p>
    </header>
    <div>
      <span> By: ${username}</span>
    </div>
    <footer>
       <div>${timeago.format(time)}</div>
       <div id="rating_number">Rating: ${rating}</div>
    </footer>
  </article>
  `);
    $comment.append($commentArticle);
    //once last comment is reached by loop append intermediate div to the form
    if (comment === comments.posts[comments.posts.length - 1]) {
      $(`form#${comment.post_id}`).append($comment);
    }
  }
};

// will create the html and prepend a comment when a user adds one
const renderSingleComment = function(comment) {
  let $comment = $(`<div class="composed-comment"></div>`);
  let commentBody = comment.posts[0].comment_body;
  let username = comment.posts[0].username;
  let rating = comment.posts[0].rating;
  let time = comment.posts[0].created_at;
  let $commentArticle = $(`
    <article class ='comment_article'>
    <header>
       <div>
          <span> By: ${username}</span>
       </div>
    </header>
       <p>${commentBody}</p>
    <footer>
       <div>${timeago.format(time)}</div>
       <div>${rating}</div>
    </footer>
  </article>
  `);

  //if the div doesnt already exist, creates it and appends new comment to it. otherwise prepends to existing
  if ($(`form#${comment.posts[0].post_id}`).find(`div.composed-comment`).length === 0) {
    $comment.prepend($commentArticle);
    $(`form#${comment.posts[0].post_id}`).append($comment);
  } else {
    $(`div.composed-comment`).prepend($commentArticle);
  }
};

//PREPEND FAVOURITED POSTS into favourites section of my wall
const renderMyFavs = function (posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    let wrapper = `<article class="posts" id ="${obj.post_id}" style="background-image: linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url(${images[obj.resource_type_id]})">${postHTML}</article>`;
    $(".favourite-post").prepend(wrapper);
  }
};

//PREPEND USER POSTS into my posts section of my wall
const renderMyPosts = function (posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    let wrapper = `<article class="posts" id ="${obj.post_id}" style="background-image: linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url(${images[obj.resource_type_id]})">${postHTML}</article>`;
    $(".my-post").prepend(wrapper);
  }
};

//CREATE html elements for posts
const createPostHtml = function (obj) {
  let title = obj.title;
  let url = obj.url;
  let description = obj.description;
  let created = obj.created_at;
  let name = obj.poster_name;
  let favCount = obj.num_favs;
  let $html = `
  <header>
    <h4 id = "post_titles">${title}</h4>
    <h5>By: ${name}</h5>
  </header>
  <body>
    <h6>${description}</h6>
    <div id ="source_button"><a href="${url}" id="short_source">Go To Source</a></div>
  </body>
  <footer id= "timestamp">
    <span>Posted ${timeago.format(created)} </span>
    <span class ="heart"><span class ="favs-counter">${favCount}</span><i class="fas fa-heart fa-2x" name="hearts"></i></span>
  </footer>
  `;
  return $html;
};

//FETCH the users posts and their favourites
const fetchWall = () => {
  $(".text-post").slideUp();
  $('#favourite').off('click');
  $.get('/api/posts/favourites')
    .then(function(posts) {
      renderMyFavs(posts);

    })
    .then(function() {
      $.get('api/posts/my_posts')
        .then(function(posts) {
          renderMyPosts(posts);
          findFavourites();
          $(".my-wall").slideDown();
          $(".mywall-info").slideDown();
          singlePostHandler();
          favBtnHandler();
        });
    });
};

//CREATE AN ARRAY OF POST IDS OF FAVORITES
const favsArray = (data) => {
  let favs = [];

  for (const post in data.posts) {
    favs.push(data.posts[post].post_id);
  }
  return favs;
}

//FINDS THE FAVORITES ON THE PAGE
const findFavourites = () => {
  $.ajax('/api/posts/favourites', {
    method: "GET"
  })
    .then(function (data) {
      const favsAr = favsArray(data);
      $(`[name="hearts"]`).map(function () {
        const postid = $(this).closest(".posts").attr("id");
        if (favsAr.includes(Number(postid))) {
          $(this).addClass("makered");
        }
      })
    })
}

//JQUERY PAGE ELEMENTS
$(document).ready(function () {
  //HIDES all necessary elements on load
  $('#favourite').on('click');
  $(".new_post_form").hide();
  $("#searchBoxContainer").hide();
  $("#edit-name").hide();
  $("header, nav, #footer").hide();
  $("#intro-message").hide();
  $(".mywall-info").hide();
  $('.new-post-error').hide();

  //FADES Intro message
  $("#intro-message").fadeToggle(700, function () {
    setTimeout(function () {
      $("#intro-message").fadeToggle(700);
    }, 1500, function () {
      $("#intro-message").off();
    });
  });
  setTimeout(function () {
    $("header, nav, #footer").fadeIn(700);
  }, 3000);

  //CLICKING home button
  $("#pagename").click(function (ev) {
    ev.preventDefault();
    $(".my-wall").slideUp();
    $(".mywall-info").slideUp();
    setTimeout(function () {
      $(".text-post").slideDown();
      $(".my-post").empty();
      $(".favourite-post").empty();
    }, 500);
    $("#favourite").on('click', fetchWall);
  });

  //INTIAL POST RENDERS
  $.ajax('/api/posts', {
    method: "GET",
  })
    .then(function (posts) {
      renderPost(posts);
    })
    .then(function () {
      findFavourites();
      $(".single_post").hide();
      $("#comments_div").hide();
      favBtnHandler();
      submitCommentHandler();

      //will close single post view when clicking outside
      $(document).on('click', function (event) {
        const container = $(".posts");
        const container2 = $("#comments_div");
        //checking to make sure neither of these two containers are the target of the click
        if (!$(event.target).closest(container).length && !$(event.target).closest(container2).length) {
          $('#comments_div').slideUp();
        }
      });
      singlePostHandler();
    });

  //click handler for toggling search bar
  $("#search_button").click(function () {
    $("#searchBoxContainer").slideToggle();
    $("#edit-name").slideUp();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  //submition handler for search form
  $(`#search-form`).submit(function (ev) {
    ev.preventDefault();
    const title = $('#title').val();
    const topic = $('#topic').val();
    const type = $('#type').val();
    $.get(`/api/posts/search?title=${title}&topic=${topic}&type=${type}`)
      .then(function(posts) {
        $(".text-post").empty();
        renderPost(posts);
        favBtnHandler();
        submitCommentHandler();
        findFavourites();
        singlePostHandler();
      });
  });

  //click handler for rendering my wall
  $('#favourite').click(function () {
    fetchWall();
  });

  //click handler for opening new-post form
  $("#new-post").click(function () {
    $(".new_post_form").slideToggle();
  });

  //new post submition handler
  $(".new_post_form").submit(function (ev) {
    ev.preventDefault();
    const $newPostForm = $(this);
    const title = $('#new_title').val();
    const topic = $('#new_topic').val();
    const description = $('#new_description').val();
    const url = $('#new_url').val();
    const type = $('#new_type').val();
    const newPostObj = { title, topic, description, url, type };
    if (title === "") {
      $(this).find('.new-post-error').show();
      return $(this).find('.new-post-error').text('Please add a title to your post.');
    } else if (topic === "") {
      $(this).find('.new-post-error').show();
      return $(this).find('.new-post-error').text('Please add a topic to your post.');
    } else if (description === "") {
      $(this).find('.new-post-error').show();
      return $(this).find('.new-post-error').text('Please add a description to your post.');
    } else if (url === "") {
      $(this).find('.new-post-error').show();
      return $(this).find('.new-post-error').text('Please add a URL to your post.');
    }
    $.post('/api/posts/create/', newPostObj)
      .then(function(post) {
        $newPostForm.hide();
        renderPost(post);
      }).then(function () {
        favBtnHandler();
      });
  });

  //click handler for opening name update form
  $("#update-button").click(function () {
    $("#searchBoxContainer").slideUp();
    $("#edit-name").slideToggle();
  });

  //Submition for name update form
  $("#update-form").submit(function (ev) {
    ev.preventDefault();
    const newName = $("#username_text").val();

    $.post("/api/users/update-name", { newName })
      .then(function () {
        $("#logged_user").text(`${newName}`);
        $("#edit-name").slideToggle();
      });
  });
});
