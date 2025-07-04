import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';

@Module({
  controllers: [NotificationsController],
  providers: [],
  exports: []
})
export class NotificationsModule {} 