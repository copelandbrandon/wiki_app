const images = {
  1: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1040&q=80",
  2: "https://images.unsplash.com/photo-1586488902367-b1ef9e974582?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  3: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  4: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
  5: "https://images.unsplash.com/photo-1533747122906-9ac6b6709832?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80",
  6: "https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
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

const renderComments = function(comments) {
  console.log(comments);
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
    let wrapper = `<article class="posts" style="background-image: linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url(${images[obj.resource_type_id]})">${postHTML}</article>`;;
    $(".favourite-post").prepend(wrapper);
  }
};

const renderMyPosts = function (posts) {
  for (const obj of posts.posts) {
    let postHTML = createPostHtml(obj);
    let wrapper = `<article class="posts" style="background-image: linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url(${images[obj.resource_type_id]})">${postHTML}</article>`;
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
    <h4>${title}</h4>
    <h5>By: ${name}</h5>
  </header>
  <body>
    <h6>${description}</h6>
    <div id ="source_button"><a href="${url}" id="short_source">Go To Source</a></div>
  </body>
  <footer id= "timestamp">
    <span>Posted ${timeago.format(created)} </span>
    <span class ="heart"></i><i class="fas fa-heart fa-2x"></i></span>
  </footer>

  `;
  return $html;
}

$(document).ready(function () {
  $('#favourite').on('click');
  $(".new_post_form").hide();
  $("#searchBoxContainer").hide();

  $.ajax('/api/users', {
    method: "GET",
  })
    .then(function (posts) {
      renderPost(posts);
    })
    .then(function() {
      $(".single_post").hide();
      $(".posts").click(function () {
        $(".single_post").hide();
        let target = $(this).attr('id');
        $(`form.single_post#${target}`).slideToggle();
        $('form.single_post').find('article').remove();

        $.post('/api/users/get_comments', { target })
        .then(function(comments) {
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

  $(".posts").click(function () {
    $.get('/api/users/get_comments')
      .then(function(comments) {
      })
  })
});

