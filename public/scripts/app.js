const images = {
  1: "../images/video_symbol.png",
  2: "../images/article_symbol.png",
  3: "../images/quiz_symbol.png",
  4: "../images/blog_symbol.png",
  5: "../images/documentation_symbol.png",
  6: "../images/resource_hub_symbol.png"
}


const renderPost = function (posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    let wrapper = `<article class="posts" id ="${obj.post_id}" style="background-image: linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url(${images[obj.resource_type_id]})">${postHTML}</article>`;

    let commentDiv = `
      <form class = "single_post" id = "${obj.post_id}">
      <span id = "post_info">
      <h4>${obj.title}</h4>
      <h6>By: ${obj.poster_name}</h6>
      <h6>${obj.topic}</h6>
      <h6>${obj.name}</h6>
      <h6>${obj.url}</h6>
      <h6>${obj.description}</h6>
      </span>
      <textarea id="new_comment">Something</textarea>
      <div class= "submitComment" >
      <button type="submit">Submit</button>
      <select name="rating" id="rating">
        <option value="1">VeryUnhelpful</option>
       <option value="2">Unhelpful</option>
       <option value="3" selected="selected">Adequate</option>
       <option value="4">Helpful</option>
       <option value="5">VeryHelpful</option>
       </select>
       </div>
      </form>
    `
    $(".text-post").prepend(wrapper);
    $("#comments_div").prepend(commentDiv);
  }
};

const renderComments = function (comments) {
  for (const comment of comments.posts) {
    let comment_body = comment.comment_body;
    let username = comment.username;
    let rating = comment.rating;
    let time = comment.created_at;
    let commentArticle = `
    <article id ='comment_article'>
    <header>
       <div>
          <span> By: ${username}</span>
       </div>
    </header>
       <p>${comment_body}</p>
    <footer>
       <div>${timeago.format(time)}</div>
       <div>${rating}</div>
    </footer>
  </article>
  `
    $(`form#${comment.post_id}`).append(commentArticle);
  }
}

const renderMyFavs = function (posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    let wrapper = `<article class="posts" id ="${obj.post_id}" style="background-image: linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url(${images[obj.resource_type_id]})">${postHTML}</article>`;
    $(".favourite-post").prepend(wrapper);
  }
};

const renderMyPosts = function (posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    console.log("myposts", obj);
    let wrapper = `<article class="posts" id ="${obj.post_id}" style="background-image: linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url(${images[obj.resource_type_id]})">${postHTML}</article>`;
    $(".my-post").prepend(wrapper);
  }
}

const createPostHtml = function (obj) {
  let title = obj.title;
  let url = obj.url;
  let description = obj.description;
  let type = obj.name;
  let topic = obj.topic;
  let created = obj.created_at;
  let name = obj.poster_name;

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
    <span class ="heart"></i><i class="fas fa-heart fa-2x" name="hearts"></i></span>
  </footer>

  `;
  return $html;
}

$(document).ready(function () {
  $('#favourite').on('click');
  $(".new_post_form").hide();
  $("#searchBoxContainer").hide();
  // $("#edit-name").hide();

  $.ajax('/api/users', {
    method: "GET",
  })
    .then(function (posts) {
      renderPost(posts);
    })
    .then(function () {
      $(".single_post").hide();
      $("#comments_div").hide();

      //FAVORITE BUTTON
      $(`[name="hearts"]`).click(function () {
        console.log("clicked heart");
        const postId = $(this).closest(".posts").attr("id");
        $.post("/api/users/liked", { postId })
          .then()
      })


      $("form.single_post").submit(function (ev) {
        ev.preventDefault();
        const comment = $(this).find("#new_comment").val();
        const rating = $(this).find("#rating").val();
        const postId = $(this).attr("id");
        const dataObj = { comment, rating, postId }

        $.post("/api/users/newcomment", dataObj)
          .then(function (data) {
            renderComments(data)
          })
      })

      $(".posts").find("#post_titles").click(function () {
        $(".single_post").hide();
        $("#comments_div").hide();
        let target = $(this).closest(".posts").attr('id');

        $(`form.single_post#${target}`).slideToggle();
        $("#comments_div").slideToggle();
        $('form.single_post').find('article').remove();

        $.post('/api/users/get_comments', { target })
          .then(function (comments) {
            renderComments(comments);
          })
      })
    });

  $("#search_button").click(function () {
    $("#searchBoxContainer").slideToggle();
  })

  $(`#search-form`).submit(function (ev) {
    ev.preventDefault();

    const title = $('#title').val();
    const topic = $('#topic').val();
    const type = $('#type').val();
    const dataObj = { title, topic, type };
    $.post('/api/users/search', dataObj)
      .then(function (posts) {
        $(".text-post").empty();
        renderPost(posts);

        //CLICK HANDLER for submitting comments
        $("form.single_post").submit(function (ev) {
          ev.preventDefault();
          const comment = $(this).find("#new_comment").val();
          const rating = $(this).find("#rating").val();
          const postId = $(this).attr("id");
          const dataObj = { comment, rating, postId }

          $.post("/api/users/newcomment", dataObj)
            .then(function (data) {
              renderComments(data)
            })
        })

        //CLICK HANLDER for rendered searched posts
        $(".posts").find("#post_titles").click(function () {
          $(".single_post").hide();
          $("#comments_div").hide();
          let target = $(this).closest(".posts").attr('id');

          $(`form.single_post#${target}`).slideToggle();
          $("#comments_div").slideToggle();
          $('form.single_post').find('article').remove();

          console.log(target);
          $.post('/api/users/get_comments', { target })
            .then(function (comments) {
              renderComments(comments);
            })
        })

      })
  })

  $('#favourite').click(function () {
    $(".text-post").hide();
    $('#favourite').off('click');


    $.get('/api/users/favourites')
      .then(function (posts) {
        renderMyFavs(posts);
      })
      .then(function () {
        $.get('api/users/my_posts')
          .then(function (posts) {
            renderMyPosts(posts);

            //CLICK HANLDER for mywall rendered posts
            $(".posts").find("#post_titles").click(function () {
              $(".single_post").hide();
              $("#comments_div").hide();
              let target = $(this).closest(".posts").attr('id');

              $(`form.single_post#${target}`).slideToggle();
              $("#comments_div").slideToggle();
              $('form.single_post').find('article').remove();

              $.post('/api/users/get_comments', { target })
                .then(function (comments) {
                  renderComments(comments);
                })
            })

            //FAVORITE BUTTON
            $(`[name="hearts"]`).click(function () {
              console.log("clicked heart");
              const postId = $(this).closest(".posts").attr("id");
              $.post("/api/users/liked", { postId })
                .then()
            })
          })
      })
  })

  $("#new-post").click(function () {
    $(".new_post_form").slideToggle();
  });

  $(".new_post_form").submit(function (ev) {
    ev.preventDefault();
    const title = $('#new_title').val();
    const topic = $('#new_topic').val();
    const description = $('#new_description').val();
    const url = $('#new_url').val();
    const type = $('#new_type').val();
    const newPostObj = { title, topic, description, url, type };
    $.post('/api/users/create/', newPostObj)
      .then(function (post) {
        renderPost(post);
      })

  });

  //SUBMITTING UPDATE FORM
  $("#update-form").submit(function(ev) {
    ev.preventDefault();
    const newName = $("#username_text").val();
    $.post("/api/users/update-name", {newName})
    .then(function() {
      location.reload();
    })
  })

});

