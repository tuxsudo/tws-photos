var Xray = require('x-ray'),
	Download = require('download'),
	x = new Xray();
	// x('http://skateboarding.transworld.net/photos/wednesday-wallpaper-matt-miller-2', '.article-body a[href$=".jpg"]')(function(err, image) {
	// 			console.log(image);
	// 		});
x('http://skateboarding.transworld.net/tag/wednesday-wallpaper', '.article-hover-deets', [{
	title: '.article-title',
	image: x('.view-more a@href', '.article-body a[href$=".jpg"]@href')
}])
	.write('results.json');

// x('http://skateboarding.transworld.net/photos/wednesday-wallpaper-dylan-rieder', 'a[href$=".jpg"]', [{
// 	href: '@href'
// }])
// 	.write('results.json');

// var images = x('http://skateboarding.transworld.net/photos/wednesday-wallpaper-dylan-rieder', 'a[href$=".jpg"]', [{
// 	href: '@href'
// 	}])
// 		.write();

// console.log(images);

new Download({mode: '755'})
    .get('http://cdn.skateboarding.transworld.net/wp-content/blogs.dir/440/files/dylan-rieder-wednesday-wallpaper/skbp-141000-huf-006-hr1.jpg')
    .dest('dest')
    .run();
