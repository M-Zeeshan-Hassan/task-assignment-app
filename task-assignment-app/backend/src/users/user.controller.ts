import { Controller, Get, UseGuards, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.getProfile(req.user.id);
  }

  @Get('search')
  searchUsers(@Query('q') query: string, @Request() req) {
    return this.userService.searchUsers(query, req.user.id);
  }
}