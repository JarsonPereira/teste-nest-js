import { Module } from "@nestjs/common";
import { Back } from "./back/back.module";

@Module({
  imports: [Back],
  controllers: [],
  providers: [],
})

export class AppModule { }
