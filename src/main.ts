import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RabbitMQ } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  for (const queue of [RabbitMQ.UserQueue, RabbitMQ.TeamQueue]) {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        url: [process.env.AMQP_URL],
        queue
      },
    });
  }
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 8081);
}
bootstrap();
