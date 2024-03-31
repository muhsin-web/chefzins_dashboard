import routes from 'next-routes';

const router = new routes()
  .add('home', '/')
  .add('about', '/about', 'about')
  .add('blog', '/blog/:slug', 'blog'); 

  export default router;