import { initializeOpentelemtry } from './tracing';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if(process.env.IS_OTEL_ENABLED == 'true'){
    initializeOpentelemtry(process.env.COMPONENT_NAME, process.env.OTEL_COLLECTOR_URL);
  }
  const config = new DocumentBuilder()
    .setTitle(process.env.COMPONENT_NAME)
    .setDescription(process.env.COMPONENT_DESCRIPTION)
    .setVersion('1.0')
    .build();
    app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
