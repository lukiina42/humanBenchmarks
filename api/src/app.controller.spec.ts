import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './user/users.service';

describe('AppController', () => {
  let appController: AppController;
  let usersService: UsersService;
  let authService:  AuthService;

  beforeEach(async () => {
    // const app: TestingModule = await Test.createTestingModule({
    //   controllers: [AppController],
    //   providers: [AppService, AuthService, UsersService, JwtService, ConfigService, DataSource],
    //   imports: [UsersModule]
    // }).compile();

    // appController = app.get<AppController>(AppController);

    usersService = new UsersService(null)
    authService = new AuthService(null, null, null)
    appController = new AppController(authService, usersService)
  });

  describe('healthcheck', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('login', () => {
    it('should login the user', async () => {
      const reqMock = {
        user: {
          id: 1
        }
      }
      const tokenMock = {
        access_token: "blablaVeryJwtToken"
      }
      const highScoresMock = {
        owner: null,
        id: 5,
        verbalMemory: 0,
        numberMemory: 0,
        aimTrainer: 0
      }
      const resultMock = {
        token: tokenMock,
        id: reqMock.user.id,
        highScores: highScoresMock
      }

      jest.spyOn(authService, 'login').mockImplementation(async () => tokenMock);
      jest.spyOn(usersService, 'getHighScore').mockImplementation(async () => highScoresMock)

      
      expect(await appController.login(reqMock)).toStrictEqual(resultMock)
    })
  })
});
