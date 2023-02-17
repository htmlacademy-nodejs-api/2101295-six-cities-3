import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
// import {HttpMethod} from '../../types/http-method.enum.js';
// import {Request, Response} from 'express';
//import CreateUserDto from './dto/create-user.dto.js';
//import { StatusCodes } from 'http-status-codes';
// { ReviewServiceInterface } from './review-service.interface.js';

@injectable()
export default class ReviewController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    //@inject(Component.ReviewServiceInterface) private readonly UserService: ReviewServiceInterface,

  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    //this.addRoute({path: '/', method: HttpMethod.Post, handler: this.index});
  }

  // public async index(_req: Request, res: Response): Promise<void> {
  //   const categories = await this.UserService.create('mail2@mail.com');
  //   this.send(res, StatusCodes.OK, categories);
  // }
}
