import multer from 'multer';

import routes from './routes';

const multerVideo = multer({ dest: 'uploads/videos/' });
const multerAvatar = multer({ dest: 'uploads/avatars/' });

// videoFile is the name of the input from upload.pug and .single allow uploading only one file at a time
// https://www.npmjs.com/package/multer
export const uploadVideo = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatar');

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = 'Youtube Clone';
  res.locals.routes = routes;
  // passport가 사용자를 로그인 시킬 때, passport는 쿠키 serialize, deserialize 등의 기능도 지원을 해주면서, 동시에 user가 담긴 object를 req(요청)에도 올려줌
  // 이 정보는 req.user을 통해 접근 가능
  res.locals.loggedUser = req.user || null; // passport로 부터 생성된 user가 존재하지 않으면 빈 object 생성
  return next(); // 미들웨어기 때문에, next()를 실행하지 않으면 다음 순서로 넘어가지 못함
};

export const onlyPublic = (req, res, next) => {
  if (req.user) return res.redirect(routes.home);
  else return next();
};

export const onlyPrivate = (req, res, next) => {
  // req.user 있으면 유저가 로그인 상태이기 때문에, private (ChangePassword) 페이지 access해도 접근 허용
  if (req.user) return next();
  else return res.redirect(routes.home);
};
