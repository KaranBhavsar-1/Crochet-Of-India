// import all images from all folders
const images = import.meta.glob('../assets/gallery/*/*.{jpg,png,jpeg}', {
  eager: true,
  import: 'default'
});

export function getGalleryData() {
  const gallery = {};
console.log(images);
  Object.keys(images).forEach((path) => {
    const parts = path.split('/');
    const folderName = parts[parts.length - 2];

    if (!gallery[folderName]) {
      gallery[folderName] = [];
    }

    gallery[folderName].push(images[path]);
  });

  return gallery;
}