const maleImages = [
	'../images/avatars/male/1.png',
	'../images/avatars/male/2.png',
	'../images/avatars/male/3.png',
	'../images/avatars/male/4.png',
	'../images/avatars/male/5.png',
	'../images/avatars/male/6.png',
	'../images/avatars/male/7.png',
	'../images/avatars/male/8.png',
	'../images/avatars/male/9.png'
];

const femaleImages = [
	'../images/avatars/female/1.png',
	'../images/avatars/female/2.png',
	'../images/avatars/female/3.png',
	'../images/avatars/female/4.png',
	'../images/avatars/female/5.png',
	'../images/avatars/female/6.png',
	'../images/avatars/female/7.png',
	'../images/avatars/female/8.png',
	'../images/avatars/female/9.png'
];

export const getRandomImage = (gender) => {
	if (gender === 'male') {
		return maleImages[Math.floor(Math.random() * maleImages.length)];
	} else if (gender === 'female') {
		return femaleImages[Math.floor(Math.random() * femaleImages.length)];
	} else {
		const allImages = [...maleImages, ...femaleImages];
		return allImages[Math.floor(Math.random() * allImages.length)];
	}
};
