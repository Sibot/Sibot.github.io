"use strict";
var xhr = new XMLHttpRequest(),
	url = "https://public-api.wordpress.com/rest/v1/sites/fend14tobis.wordpress.com/posts/";

function parsePosts(posts){
	"use strict";
	var main = document.getElementsByTagName('main')[0];
	for (var i = 0; i < posts.length; i++) {
		main.appendChild(createArticle(posts[i]));
	}
}
function createArticle(post){
	var article = document.createElement("article"),
		title = document.createElement("h2"),
		section = document.createElement("section"),
		readMoreLink = document.createElement("a");

	readMoreLink.setAttribute("href", post.URL);
	readMoreLink.className = "more_link"

	readMoreLink.innerHTML = "Read more...";
	title.innerHTML = post.title;
	section.innerHTML = post.excerpt;

	article.appendChild(title);
	article.appendChild(section);
	article.appendChild(readMoreLink);
	return article;
}

xhr.onreadystatechange = function(){
	"use strict";
	if (xhr.readyState === 4 && xhr.status === 200){
		var response = JSON.parse(xhr.responseText);
		parsePosts(response.posts);
	}
};
xhr.open("GET", url, true);
xhr.send();
