export const Contact_Options = [
  { label: 'Partner', value: 'partner' },
  { label: 'Sponsor', value: 'sponsor' },
  { label: 'Volunteer', value: 'volunteer' },
  { label: 'Student', value: 'student' },
  { label: 'Other', value: 'other' },
];

export const socials = [
  {
    icon: 'mingcute:mail-line',
    label: 'empowerherbym@gmail.com',
    href: 'mailto:empowerherbym@gmail.com',
  },
  {
    icon: 'mingcute:phone-line',
    links: [
      { label: '0805-444-4004', href: 'tel:08054444004' },
      { label: '0906-666-3444', href: 'tel:09066663444' },
    ],
    className: 'hidden! lg:flex!',
  },
  {
    icon: 'mingcute:phone-line',
    label: '0805-444-4004 ',
    href: 'tel:08054444004',
    className: 'lg:hidden!',
  },
  {
    icon: 'mingcute:instagram-line',
    label: 'empowerherbym',
    href: 'https://www.instagram.com/empowerherbym/',
  },
];

export interface GalleryImage {
  title: string;
  image: string;
  thumbnail: string;
}

const addImageVariant = (image: string, variant: '-gallery' | '-thumb'): string =>
  image.replace(/(\.[^.]+)$/u, `${variant}$1`);

const buildGalleryImages = (location: string, images: string[]): GalleryImage[] =>
  images.map((image, index) => ({
    title: `${location} ${String(index + 1)}`,
    image: addImageVariant(image, '-gallery'),
    thumbnail: addImageVariant(image, '-thumb'),
  }));

export const kanoGalleryImages = buildGalleryImages('Kano', [
  '/images/Kano/kanoone.jpg',
  '/images/Kano/kanotwo.jpg',
  '/images/Kano/kanothree.jpg',
  '/images/Kano/kanofour.jpg',
  '/images/Kano/kanofive.jpeg',
  '/images/Kano/kanosix.jpg',
  '/images/Kano/kanoseven.jpg',
  '/images/Kano/kanoeight.jpg',
  '/images/Kano/kanonine.jpg',
  '/images/Kano/kanoten.jpg',
  '/images/Kano/kanoeleven.jpeg',
  '/images/Kano/kanotwelve.jpg',
  '/images/Kano/kanothirteen.jpg',
  '/images/Kano/kanofourteen.jpg',
  '/images/Kano/kanofifteen.jpg',
  '/images/Kano/kanosixteen.jpg',
  '/images/Kano/kanoseventeen.jpeg',
  '/images/Kano/kanoeighteen.jpg',
  '/images/Kano/kanotwenty.jpg',
  '/images/Kano/kanotwentyone.jpg',
  '/images/Kano/kanotwentytwo.jpg',
  '/images/Kano/kanotwentythree.jpeg',
]);

export const abujaGalleryImages = buildGalleryImages('Abuja', [
  '/images/Abuja/abujaone.JPG',
  '/images/Abuja/abujatwo.jpg',
  '/images/Abuja/abujathree.JPG',
  '/images/Abuja/abujafour.jpg',
  '/images/Abuja/abujafive.jpg',
  '/images/Abuja/abujasix.JPG',
  '/images/Abuja/abujaseven.jpg',
  '/images/Abuja/abujaeight.jpg',
  '/images/Abuja/abujanine.jpg',
  '/images/Abuja/abujaten.jpg',
  '/images/Abuja/abujaeleven.jpg',
  '/images/Abuja/abujatwelve.jpg',
  '/images/Abuja/abujathirteen.jpg',
  '/images/Abuja/abujafourteen.jpg',
  '/images/Abuja/abujafifteen.jpg',
  '/images/Abuja/abujasixteen.jpg',
  '/images/Abuja/abujaseventeen.jpg',
  '/images/Abuja/abujaeighteen.jpg',
  '/images/Abuja/abujanineteen.jpg',
  '/images/Abuja/abujatwenty.JPG',
]);
