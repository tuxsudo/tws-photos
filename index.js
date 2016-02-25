var Xray = require('x-ray'),
	Download = require('download'),
	x = new Xray();
	// x('http://skateboarding.transworld.net/photos/wednesday-wallpaper-matt-miller-2', '.article-body a[href$=".jpg"]')(function(err, image) {
	// 			console.log(image);
	// 		});

//
// x('http://skateboarding.transworld.net/tag/wednesday-wallpaper', '.article-hover-deets', [{
// 	title: '.article-title',
// 	detail: '.view-more a@href',
// 	image: x('.view-more a@href', '.article-body a[href$=".jpg"]@href')
// }]).write('results.json');



function grabDetailPageUrls() {
	return new Promise(function(resolve, reject) {
		x('http://skateboarding.transworld.net/tag/wednesday-wallpaper', '.article-hover-deets', ['.view-more a@href'])
		(function(err, data) {
			if(err) return reject(err);
			resolve(data);
		});
	});
}

function grabWallPaperMeta(url) {
	return new Promise(function(resolve, reject) {
		x(url, 'body', [{
			title: '.main h1',
			dl: '.article-body a[href$=".jpg"]@href'
		}])
		(function(err, data) {
			if(err) return reject(err);
			resolve(data);
		});
	});
}


grabDetailPageUrls()

	.then( function(urls) {
		var promises = urls.map( grabWallPaperMeta );
		return Promise.all(promises);
	})

	.then(function(results) {
		return results.map( function(obj) {
			return {
				title: obj.title.split(':')[1],
				dl: obj.dl
			}
		})
	})

	.then(console.log);




// x('http://skateboarding.transworld.net/photos/wednesday-wallpaper-dylan-rieder', 'a[href$=".jpg"]', [{
// 	href: '@href'
// }])
// 	.write('results.json');

// var images = x('http://skateboarding.transworld.net/photos/wednesday-wallpaper-dylan-rieder', 'a[href$=".jpg"]', [{
// 	href: '@href'
// 	}])
// 		.write();

// console.log(images);

// new Download({mode: '755'})
//     .get('http://cdn.skateboarding.transworld.net/wp-content/blogs.dir/440/files/dylan-rieder-wednesday-wallpaper/skbp-141000-huf-006-hr1.jpg')
//     .dest('dest')
//     .run();
