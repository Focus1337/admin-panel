import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from '@/api/subs/subs.entity';
import { SubsService } from '@/api/subs/subs.service';
import { SubsController } from '@/api/subs/subs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  providers: [SubsService],
  controllers: [SubsController],
  exports: [SubsService],
})
export class SubsModule {}
